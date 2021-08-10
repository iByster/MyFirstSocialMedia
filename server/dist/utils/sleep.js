"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 3000);
    });
};
exports.sleep = sleep;
