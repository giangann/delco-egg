"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Egg = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../base/base.entity");
// Entities
// columns: id, type_name, weight, createdAt
let Egg = class Egg extends base_entity_1.BaseEntity {
    id;
    type_name;
    weight;
    isDeleted;
};
exports.Egg = Egg;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], Egg.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: false }),
    __metadata("design:type", String)
], Egg.prototype, "type_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Egg.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Egg.prototype, "isDeleted", void 0);
exports.Egg = Egg = __decorate([
    (0, typeorm_1.Entity)('egg', { orderBy: { id: 'DESC' } })
], Egg);
