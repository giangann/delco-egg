"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
class DateTimeUtility {
    static getCurrentTimeStamp() {
        return (0, moment_1.default)(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    }
    static getCurrentDate() {
        return (0, moment_1.default)(Date.now()).format('YYYY-MM-DD');
    }
    static getDateAfterNDay(nDays) {
        return (0, moment_1.default)(Date.now()).add(nDays, 'day').format('YYYY-MM-DD');
    }
    static sqlFormatToViewer(date) {
        let arr = date.split('-');
        return arr.reverse().join('-');
    }
}
exports.default = DateTimeUtility;
