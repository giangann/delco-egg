"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const default_route_1 = __importDefault(require("./default/default.route"));
const auth_route_1 = __importDefault(require("./auth/auth.route"));
const me_route_1 = __importDefault(require("./me/me.route"));
const user_route_1 = __importDefault(require("./user/user.route"));
const egg_route_1 = __importDefault(require("./egg/egg.route"));
const egg_price_qty_route_1 = __importDefault(require("./egg-price-qty/egg-price-qty.route"));
const order_route_1 = __importDefault(require("./order/order.route"));
const router = express.Router();
router.use('/', default_route_1.default);
router.use('/auth', auth_route_1.default);
router.use('/me', me_route_1.default);
router.use('/user', user_route_1.default);
router.use('/egg', egg_route_1.default);
router.use('/egg-price-qty', egg_price_qty_route_1.default);
router.use('/order', order_route_1.default);
exports.default = router;
