"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = require("./entities/Post");
const User_1 = require("./entities/User");
exports.default = {
    type: 'postgres',
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [Post_1.Post, User_1.User],
};
