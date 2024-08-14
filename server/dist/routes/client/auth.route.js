"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schemaValidator = require('express-joi-validator');
// Controller
const user_controller_1 = __importDefault(require("../../controllers/client/user.controller"));
// Schema
const user_schema_1 = __importDefault(require("../../validations/schemas/user.schema"));
const authRoute = express_1.default.Router();
authRoute.post('/login', schemaValidator(user_schema_1.default.login), user_controller_1.default.login);
authRoute.get('/logout', user_controller_1.default.logout);
exports.default = authRoute;
