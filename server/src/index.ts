import 'reflect-metadata';
// import { MikroORM } from '@mikro-orm/core';
// import microConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/PostResolver';
import { UserResolver } from './resolvers/UserResolver';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { __prod__ } from './constants';
import { MyContext } from './types';
import dotenv from 'dotenv';
import cors from 'cors';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { GoblinResolver } from './resolvers/GoblinResolver';
import { createConnection } from 'typeorm';
// import { sendEmail } from './utils/sendMail';
// import typeormConfig from './type-orm.config';
import { Post } from './entities/Post';
import { User } from './entities/User';

const main = async () => {
  // sendEmail('bob@bob.com', '<b>Hello world?</b>');

  dotenv.config();

  const PORT = process.env.PORT || 4000;

  await createConnection({
    type: 'postgres',
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [Post, User],
  });

  // const orm = await MikroORM.init(microConfig);
  // await orm.getMigrator().up();

  const app = express();

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    session({
      name: process.env.COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: 'djapsjdasjdaisdbvc[uewuwr-yewhfbfclkvn',
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver, GoblinResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res, redis }),
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        // options
      }),
    ],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

main().catch((err) => {
  console.log(err);
});
