"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const egg_price_qty_controller_1 = __importDefault(require("../../controllers/admin/egg-price-qty.controller"));
const eggPriceQtyRoute = express_1.default.Router();
eggPriceQtyRoute.get('/', egg_price_qty_controller_1.default.list);
eggPriceQtyRoute.put('/:id', egg_price_qty_controller_1.default.update);
eggPriceQtyRoute.post('/update-day-price', egg_price_qty_controller_1.default.updateDayPrice);
eggPriceQtyRoute.post('/update-day-quantity', egg_price_qty_controller_1.default.updateDayQuantity);
exports.default = eggPriceQtyRoute;
