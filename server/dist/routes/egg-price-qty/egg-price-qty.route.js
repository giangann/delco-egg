"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const egg_price_qty_controller_1 = __importDefault(require("../../controllers/egg-price-qty/egg-price-qty.controller"));
const permission_handler_middleware_1 = require("../../middlewares/permission-handler.middleware");
const eggPriceQtyRoute = express_1.default.Router();
eggPriceQtyRoute.get('/', egg_price_qty_controller_1.default.list);
eggPriceQtyRoute.put('/:id', permission_handler_middleware_1.isAdmin(), egg_price_qty_controller_1.default.update);
eggPriceQtyRoute.post('/update-day-price', permission_handler_middleware_1.isAdmin(), egg_price_qty_controller_1.default.updateDayPrice);
eggPriceQtyRoute.post('/update-day-quantity', permission_handler_middleware_1.isAdmin(), egg_price_qty_controller_1.default.updateDayQuantity);
exports.default = eggPriceQtyRoute;
