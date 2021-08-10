// import { MikroORM } from '@mikro-orm/core';
// import { __prod__ } from './constants';
// import { Post } from './entities/Post';
// import path from 'path';
// import { User } from './entities/User';
// import dotenv from 'dotenv';
// dotenv.config();

// export default {
//   migrations: {
//     path: path.join(__dirname, './migrations'),
//     pattern: /^[\w-]+\d+\.[tj]s$/,
//   },
//   entities: [Post, User],
//   dbName: process.env.DB_NAME,
//   type: 'postgresql',
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   debug: !__prod__,
// } as Parameters<typeof MikroORM.init>[0];
