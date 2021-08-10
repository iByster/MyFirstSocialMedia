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
exports.createTransporter = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const googleapis_1 = require("googleapis");
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
const createTransporter = () => __awaiter(void 0, void 0, void 0, function* () {
    const OAuth2 = googleapis_1.google.auth.OAuth2;
    const oauth2Client = new OAuth2(process.env.OAUTH_CLIENT_ID, process.env.OAUTH_CLIENT_SECRET, 'https://developers.google.com/oauthplayground');
    oauth2Client.setCredentials({
        refresh_token: process.env.OAUTH_REFRESH_TOKEN,
    });
    const accessToken = yield new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                reject();
            }
            resolve(token);
        });
    });
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            accessToken,
            clientId: process.env.OAUTH_CLIENT_ID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        },
    });
    return transporter;
});
exports.createTransporter = createTransporter;
