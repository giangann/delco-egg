"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schemaValidator = require('express-joi-validator');
// Controller
const user_controller_1 = __importDefault(require("../../controllers/admin/user.controller"));
// Middleware
const router = express_1.default.Router();
router.get('/', user_controller_1.default.list);
router.get('/:id', user_controller_1.default.detail);
router.delete('/:id', user_controller_1.default.remove);
router.put('/:id', user_controller_1.default.update);
router.post('/create', user_controller_1.default.create);
router.put('/reset-password/:userId', user_controller_1.default.resetPasswordDefault);
router.get('/client-order-overview/:userId', user_controller_1.default.clientOrderOverview);
router.get('/client-order-egg-statistic/:userId', user_controller_1.default.clientOrderEggStatistic);
exports.default = router;
