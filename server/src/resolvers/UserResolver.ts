import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { User } from '../entities/User';
import { MyContext } from '../types';
import argon2 from 'argon2';
import * as EmailValidator from 'email-validator';
import { sendEmail } from '../utils/email/sendMail';
import { v4 } from 'uuid';
import { FORGOT_PASSWORD_PREFIX } from '../constants';
import { getConnection } from 'typeorm';
import { GoblinMask } from '../entities/GoblinMask';

@InputType()
class RegisterInput {
  @Field(() => String)
  username!: string;
  @Field(() => String)
  password!: string;
  @Field(() => String)
  email!: string;
}

@ObjectType()
class FieldError {
  @Field(() => String)
  field!: string;

  @Field(() => String)
  message!: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Boolean, { nullable: true })
  ok?: Boolean;

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  //? test
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | undefined | null> {
    if (!req.session.userId) {
      return null;
    }

    return await getConnection()
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.goblinMask', 'goblinMask')
      .where('user.id = :id', { id: req.session.userId })
      .getOne();

    // console.log(users);

    // return User.findOne(req.session.userId);
  }

  @FieldResolver()
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    if (req.session.userId === user.id) {
      return user.email;
    }

    return '';
  }

  @Mutation(() => UserResponse)
  public async changePassword(
    @Arg('newPassword', () => String) newPassword: string,
    @Arg('confNewPassword', () => String) confNewPassword: string,
    @Arg('token', () => String) token: string,
    @Ctx() { redis }: MyContext
  ): Promise<UserResponse> {
    if (newPassword.length < 5) {
      return {
        errors: [
          {
            field: 'newPassword',
            message: 'password need to have at least 5 characters',
          },
        ],
      };
    }

    if (newPassword !== confNewPassword) {
      return {
        errors: [
          {
            field: 'confNewPassword',
            message: 'passwords must match',
          },
        ],
      };
    }

    const key = FORGOT_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);

    if (!userId) {
      return {
        errors: [
          {
            field: 'token',
            message: 'token expired',
          },
        ],
      };
    }

    const userIdNum = parseInt(userId);
    const user = await User.findOne(userIdNum);

    if (!user) {
      return {
        errors: [
          {
            field: 'token',
            message: "this user doen't exists",
          },
        ],
      };
    }

    const newPasswordHash = await argon2.hash(newPassword);
    await User.update({ id: userIdNum }, { password: newPasswordHash });

    redis.del(key);

    return { user };
  }

  @Mutation(() => UserResponse)
  public async forgotPassword(
    @Arg('email', () => String) email: string,
    @Ctx() { redis }: MyContext
  ): Promise<UserResponse> {
    if (!email) {
      return {
        errors: [
          {
            field: 'email',
            message: 'please enter an email',
          },
        ],
      };
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // no user with that email
      return {
        errors: [
          {
            field: 'email',
            message: 'the email is invalid',
          },
        ],
      };
    }

    const token = v4();
    redis.set(
      FORGOT_PASSWORD_PREFIX + token,
      user.id,
      'ex',
      1000 * 60 * 60 * 24 * 2
    );
    const resetLink = `<a href="http://localhost:3000/change-password/${token}">click here</a>`;
    const body = `${resetLink}`;

    sendEmail({
      html: body,
      to: user.email,
      subject: 'Reset Password',
    });

    return { ok: true };
  }

  @Mutation(() => UserResponse)
  public async register(
    @Arg('options', () => RegisterInput) options: RegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const { username, password, email } = options;
    const errors = [];

    if (!EmailValidator.validate(email)) {
      errors.push({
        field: 'email',
        message: 'invalid email',
      });
    }

    if (username.length < 5) {
      errors.push({
        field: 'username',
        message: 'username need to have at least 5 characters',
      });
    }

    if (username.includes('@')) {
      errors.push({
        field: 'username',
        message: 'username cannot include @',
      });
    }

    if (password.length < 5) {
      errors.push({
        field: 'password',
        message: 'password need to have at least 5 characters',
      });
    }

    if (errors.length > 0) return { errors };

    const passwordHash = await argon2.hash(password);
    let user;
    try {
      user = await User.create({
        username,
        email,
        password: passwordHash,
        goblinMask: { id: Math.floor(Math.random() * 4 + 1) },
      }).save();
    } catch (err: any) {
      // duplicate username error
      if (err.detail.includes('email')) {
        errors.push({
          field: 'email',
          message: 'this email is already taken',
        });
      } else {
        errors.push({
          field: 'username',
          message: 'this username is already taken',
        });
      }
    }

    if (errors.length > 0) return { errors };

    if (user) {
      req.session!.userId = user.id;
    }

    let goblinMask: GoblinMask;

    if (user) {
      // req.session!.userId = user.id;
      try {
        goblinMask = (await GoblinMask.findOne(user?.goblinMask.id))!;
        user.goblinMask = goblinMask;
      } catch (err: any) {
        console.log('Mask error');
      }
    }

    return { user };
  }

  @Mutation(() => UserResponse)
  public async login(
    @Arg('usernameOrEmail', () => String)
    usernameOrEmail: string,
    @Arg('password', () => String) password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = [];

    if (!usernameOrEmail) {
      errors.push({
        field: 'usernameOrEmail',
        message: 'please enter your username',
      });
    }

    if (!password) {
      errors.push({
        field: 'password',
        message: 'please enter your password',
      });
    }
    if (errors.length > 0) {
      return { errors };
    }

    const user = await User.findOne(
      usernameOrEmail.includes('@')
        ? { where: { email: usernameOrEmail }, relations: ['goblinMask'] }
        : { where: { username: usernameOrEmail }, relations: ['goblinMask'] }
    );

    if (!user) {
      return {
        errors: [
          {
            field: 'usernameOrEmail',
            message: 'incorrect username/email',
          },
          {
            field: 'password',
            message: 'incorrect password',
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'incorrect password',
          },
          {
            field: 'usernameOrEmail',
            message: 'incorrect username/email',
          },
        ],
      };
    }

    // store user id session
    // this will set a cookie on the user
    // keep them logged in
    req.session!.userId = user.id;

    return { user };
  }

  @Query(() => User, { nullable: true })
  async getUserById(
    @Arg('userId', () => Int) userId: number
  ): Promise<User | undefined | null> {
    return await User.findOne({
      where: { id: userId },
      relations: ['goblinMask'],
    });
  }

  @Query(() => [User])
  public async users(): Promise<User[]> {
    return await User.find();
  }

  @Mutation(() => Boolean)
  public logout(@Ctx() { req, res }: MyContext): Promise<Boolean> {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        if (err) {
          resolve(false);
          return;
        }
        res.clearCookie(process.env.COOKIE_NAME as string);
        resolve(true);
      });
    });
  }
}
