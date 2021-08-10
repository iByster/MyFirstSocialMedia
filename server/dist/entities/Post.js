"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const type_graphql_1 = require("type-graphql");
const BaseEntity_1 = require("./BaseEntity");
const typeorm_1 = require("typeorm");
let Post = class Post extends BaseEntity_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column({ type: 'text' })
], Post.prototype, "title", void 0);
Post = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Post);
exports.Post = Post;
