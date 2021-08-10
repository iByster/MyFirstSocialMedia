"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoblinResolver = void 0;
const type_graphql_1 = require("type-graphql");
const path_1 = __importDefault(require("path"));
const base64Encoder_1 = require("../utils/base64Encoder");
let GoblinResolver = class GoblinResolver {
    logo() {
        const logoPath = path_1.default.join(__dirname, '..', 'public', 'images', 'logo.png');
        const encodedImage = base64Encoder_1.base64Encoder(logoPath);
        return encodedImage;
    }
};
__decorate([
    type_graphql_1.Query(() => String)
], GoblinResolver.prototype, "logo", null);
GoblinResolver = __decorate([
    type_graphql_1.Resolver()
], GoblinResolver);
exports.GoblinResolver = GoblinResolver;
