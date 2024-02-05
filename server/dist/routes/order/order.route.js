"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = __importDefault(require("../../controllers/order/order.controller"));
const orderRouter = express_1.default.Router();
orderRouter.get('/', order_controller_1.default.list);
orderRouter.get('/:id', order_controller_1.default.detail);
orderRouter.post('/', order_controller_1.default.create);
orderRouter.put('/:id', order_controller_1.default.update);
orderRouter.put('/:id/update-status', order_controller_1.default.updateStatus);
exports.default = orderRouter;
