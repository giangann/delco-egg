"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const logger_config_1 = __importDefault(require("./configs/logger.config"));
const express_config_1 = __importDefault(require("./configs/express.config"));
const ws_server_config_1 = __importDefault(require("./configs/ws-server.config"));
const PORT = process.env.PORT || 5000;
const connect = async () => {
    try {
        const connection = await (0, typeorm_1.createConnection)(); // Connect to the DB that is setup in the ormconfig.js
        // await connection.runMigrations(); // Run all migrations
        logger_config_1.default.info('Connect to database successfully');
        const httpServer = express_config_1.default.listen(PORT, () => {
            logger_config_1.default.info(`Server running at ${PORT}`);
        });
        const webSocketServer = (0, ws_server_config_1.default)(httpServer);
        global.wsServerGlob = webSocketServer;
    }
    catch (e) {
        logger_config_1.default.info(`The connection to database was failed with error: ${e}`);
    }
};
connect();
