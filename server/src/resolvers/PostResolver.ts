import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Post } from '../entities/Post';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';

@InputType()
class PostInput {
  @Field()
  title!: string;

  @Field()
  text!: string;
}

@InputType()
class PostMetaData {
  @Field(() => Int)
  limit!: number;

  @Field({ nullable: true })
  cursor?: string;
}

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts!: Post[];
  @Field()
  hasMore?: boolean;
}

@Resolver()
export class PostResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async vote(
    @Arg('postId') postId: number,
    @Arg('value') value: number,
    @Ctx() { req }: MyContext
  ) {
    const isUpdoot = value !== -1;
    const realValue = isUpdoot ? 1 : -1;

    const { userId } = req.session;

    await getConnection().query(
      `
      START TRANSACTION;
      INSERT INTO updoot ("userId", "postId", value)
      VALUES (${userId}, ${postId}, ${value});

      UPDATE post
      SET points = points + ${realValue}
      WHERE id = ${postId};
      COMMIT
      `
    );

    return true;
  }

  @Query(() => PaginatedPosts)
  public async posts(
    @Arg('metadata') metadata: PostMetaData
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, metadata.limit);
    const reaLimitPlusOne = realLimit + 1;

    const replacements: any[] = [reaLimitPlusOne];

    if (metadata.cursor) {
      replacements.push(new Date(parseInt(metadata.cursor)));
    }
    // LEFT JOIN "goblin_mask" "goblinMask" ON "goblinMask"."id"="user"."goblinMaskId"
    const posts = await getConnection().query(
      `
    select p.*,
    json_build_object(
      'id', u.id,
      'username', u.username,
      'goblinMask', json_build_object(
        'id', g.id
      )
    ) as creator
    from post p
    inner join public.user u on u.id = p."creatorId"
    left join public.goblin_mask g on g.id = u."goblinMaskId"
    ${metadata.cursor ? `where p."createdAt" < $2` : ''}
    order by p."createdAt" DESC
    limit $1
    `,
      replacements
    );

    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === reaLimitPlusOne,
    };
  }

  @Query(() => Post, { nullable: true })
  public post(@Arg('id', () => Int) id: number): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  public async createPost(
    @Arg('input', () => PostInput) input: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    return Post.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
  }

  @Mutation(() => Post, { nullable: true })
  public async updatePost(
    @Arg('id', () => Int) id: number,
    @Arg('title', () => String, { nullable: true }) title: string
  ): Promise<Post | null> {
    const post = await Post.findOne(id);
    if (!post) {
      return null;
    }

    if (typeof title !== undefined) {
      await Post.update({ id }, { title });
    }
    return post;
  }

  @Mutation(() => Boolean)
  public async deletePost(@Arg('id', () => Int) id: number): Promise<Boolean> {
    await Post.delete(id);
    return true;
  }
}
