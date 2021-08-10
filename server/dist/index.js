"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
// import { MikroORM } from '@mikro-orm/core';
// import microConfig from './mikro-orm.config';
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const PostResolver_1 = require("./resolvers/PostResolver");
const UserResolver_1 = require("./resolvers/UserResolver");
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const constants_1 = require("./constants");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_core_1 = require("apollo-server-core");
const GoblinResolver_1 = require("./resolvers/GoblinResolver");
const typeorm_1 = require("typeorm");
// import { sendEmail } from './utils/sendMail';
// import typeormConfig from './type-orm.config';
const Post_1 = require("./entities/Post");
const User_1 = require("./entities/User");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    // sendEmail('bob@bob.com', '<b>Hello world?</b>');
    dotenv_1.default.config();
    const PORT = process.env.PORT || 4000;
    yield typeorm_1.createConnection({
        type: 'postgres',
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        logging: true,
        synchronize: true,
        entities: [Post_1.Post, User_1.User],
    });
    // const orm = await MikroORM.init(microConfig);
    // await orm.getMigrator().up();
    const app = express_1.default();
    app.use(cors_1.default({
        origin: 'http://localhost:3000',
        credentials: true,
    }));
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redis = new ioredis_1.default();
    app.use(express_session_1.default({
        name: process.env.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            sameSite: 'lax',
            secure: constants_1.__prod__,
        },
        saveUninitialized: false,
        secret: 'djapsjdasjdaisdbvc[uewuwr-yewhfbfclkvn',
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [hello_1.HelloResolver, PostResolver_1.PostResolver, UserResolver_1.UserResolver, GoblinResolver_1.GoblinResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res, redis }),
        plugins: [
            apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground({
            // options
            }),
        ],
    });
    yield apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
main().catch((err) => {
    console.log(err);
});
