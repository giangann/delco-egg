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
exports.EggPriceQty = void 0;
const typeorm_1 = require("typeorm");
const egg_entity_1 = require("../egg/egg.entity");
// Entities
let EggPriceQty = class EggPriceQty {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int' }),
    __metadata("design:type", Number)
], EggPriceQty.prototype, "id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: 'egg_id', referencedColumnName: 'id' }),
    typeorm_1.OneToOne(() => egg_entity_1.Egg),
    __metadata("design:type", egg_entity_1.Egg)
], EggPriceQty.prototype, "egg", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: false, unique: true }),
    __metadata("design:type", Number)
], EggPriceQty.prototype, "egg_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], EggPriceQty.prototype, "price_1", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], EggPriceQty.prototype, "price_2", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], EggPriceQty.prototype, "price_3", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], EggPriceQty.prototype, "quantity", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, default: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", String)
], EggPriceQty.prototype, "date", void 0);
EggPriceQty = __decorate([
    typeorm_1.Entity('egg_price_qty')
], EggPriceQty);
exports.EggPriceQty = EggPriceQty;
