"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_noti_controller_1 = __importDefault(require("../../controllers/client/order-noti.controller"));
const orderNotiRouter = express_1.default.Router();
orderNotiRouter.get('/', order_noti_controller_1.default.list);
orderNotiRouter.put('/:id', order_noti_controller_1.default.maskAsRead);
exports.default = orderNotiRouter;
