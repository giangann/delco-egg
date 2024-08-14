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
exports.OrderNoti = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../base/base.entity");
const user_entity_1 = require("../user/user.entity");
const order_entity_1 = require("../order/order.entity");
let OrderNoti = class OrderNoti extends base_entity_1.BaseEntity {
    id;
    from_user_id;
    to_user_id;
    order_id;
    new_status;
    content;
    is_read;
    is_display;
    from_user;
    to_user;
    order;
};
exports.OrderNoti = OrderNoti;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], OrderNoti.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], OrderNoti.prototype, "from_user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], OrderNoti.prototype, "to_user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], OrderNoti.prototype, "order_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], OrderNoti.prototype, "new_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OrderNoti.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], OrderNoti.prototype, "is_read", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: true }),
    __metadata("design:type", Boolean)
], OrderNoti.prototype, "is_display", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'from_user_id', referencedColumnName: 'id' }),
    __metadata("design:type", user_entity_1.User)
], OrderNoti.prototype, "from_user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'to_user_id', referencedColumnName: 'id' }),
    __metadata("design:type", user_entity_1.User)
], OrderNoti.prototype, "to_user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.Order, (order) => order.notis),
    (0, typeorm_1.JoinColumn)({ name: 'order_id', referencedColumnName: 'id' }),
    __metadata("design:type", order_entity_1.Order)
], OrderNoti.prototype, "order", void 0);
exports.OrderNoti = OrderNoti = __decorate([
    (0, typeorm_1.Entity)('order_notification', { orderBy: { createdAt: 'DESC' } })
], OrderNoti);
