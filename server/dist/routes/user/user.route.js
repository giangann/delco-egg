"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schemaValidator = require('express-joi-validator');
// Controller
const user_controller_1 = __importDefault(require("../../controllers/user/user.controller"));
// Middleware
const permission_handler_middleware_1 = require("../../middlewares/permission-handler.middleware");
const router = express_1.default.Router();
router.get('/', permission_handler_middleware_1.isAdmin(), user_controller_1.default.list);
router.delete('/:id', permission_handler_middleware_1.isAdmin(), user_controller_1.default.remove);
router.put('/:id', permission_handler_middleware_1.isAdmin(), user_controller_1.default.update);
router.post('/create', permission_handler_middleware_1.isAdmin(), user_controller_1.default.create);
exports.default = router;
