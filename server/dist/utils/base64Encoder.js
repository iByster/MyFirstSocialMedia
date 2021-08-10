"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64Encoder = void 0;
const fs_1 = __importDefault(require("fs"));
function base64Encoder(file) {
    return fs_1.default.readFileSync(file, 'base64');
}
exports.base64Encoder = base64Encoder;
