import { Post } from './entities/Post';
import { User } from './entities/User';

export default {
  type: 'postgres',
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: true,
  synchronize: true,
  entities: [Post, User],
};
