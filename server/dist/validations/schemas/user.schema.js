"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = {
    register: {
        body: {
            username: joi_1.default.string().required(),
            password: joi_1.default.string().min(6).max(30).required(),
            phone_number: joi_1.default.string().min(3).max(100).required(),
            fullname: joi_1.default.string().min(3).max(100).required(),
        },
    },
    login: {
        body: {
            username: joi_1.default.string().required(),
            password: joi_1.default.string().required(),
        },
    },
    updateMe: {
        body: {
            company_name: joi_1.default.string().min(3).max(100).required(),
            fullname: joi_1.default.string().min(3).max(100).required(),
            phone_number: joi_1.default.string().min(3).max(100).required(),
        },
    },
};
