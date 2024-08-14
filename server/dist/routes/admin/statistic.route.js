"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const statistic_controller_1 = __importDefault(require("../../controllers/admin/statistic.controller"));
const statisticRouter = express_1.default.Router();
statisticRouter.get('/overview-by-date', statistic_controller_1.default.todayOverview);
statisticRouter.get('/egg-price-qty-history', statistic_controller_1.default.getEggPriceQtyHistory);
statisticRouter.get('/egg-price-qty-by-date', statistic_controller_1.default.getEggPriceQtyByDate);
exports.default = statisticRouter;
