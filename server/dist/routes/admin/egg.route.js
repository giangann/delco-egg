"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const egg_controller_1 = __importDefault(require("../../controllers/admin/egg.controller"));
const eggRouter = express_1.default.Router();
eggRouter.get('/', egg_controller_1.default.list);
eggRouter.post('/', egg_controller_1.default.create);
eggRouter.put('/:id', egg_controller_1.default.update);
eggRouter.delete('/:id', egg_controller_1.default.remove);
exports.default = eggRouter;
