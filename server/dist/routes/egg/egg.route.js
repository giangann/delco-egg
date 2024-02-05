"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const egg_controlelr_1 = __importDefault(require("../..//controllers/egg/egg.controlelr"));
const permission_handler_middleware_1 = require("../..//middlewares/permission-handler.middleware");
const eggRouter = express_1.default.Router();
eggRouter.get('/', egg_controlelr_1.default.list);
eggRouter.post('/', permission_handler_middleware_1.isAdmin(), egg_controlelr_1.default.create);
eggRouter.put('/:id', permission_handler_middleware_1.isAdmin(), egg_controlelr_1.default.update);
eggRouter.delete('/:id', permission_handler_middleware_1.isAdmin(), egg_controlelr_1.default.remove);
exports.default = eggRouter;
