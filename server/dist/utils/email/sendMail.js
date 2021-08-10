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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const createTransporter_1 = require("./createTransporter");
const sendEmail = (emailOptions) => __awaiter(void 0, void 0, void 0, function* () {
    let emailTransporter = yield createTransporter_1.createTransporter();
    yield emailTransporter.sendMail(Object.assign(Object.assign({}, emailOptions), { from: 'redgoblinmask@gmail.com' }));
});
exports.sendEmail = sendEmail;
