'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step(
        (generator = generator.apply(thisArg, _arguments || [])).next(),
      );
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
require('dotenv').config();
require('reflect-metadata');
const typeorm_1 = require('typeorm');
const logger_config_1 = __importDefault(
  require('./configs/logger.config'),
);
const express_config_1 = __importDefault(
  require('./configs/express.config'),
);
const PORT = process.env.PORT || 5000;
const connect = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const connection = yield typeorm_1.createConnection(); // Connect to the DB that is setup in the ormconfig.js
      yield connection.runMigrations(); // Run all migrations
      logger_config_1.default.info('Connect to database successfully');
      express_config_1.default.listen(PORT, () => {
        logger_config_1.default.info(`Server running at ${PORT}`);
      });
    } catch (e) {
      logger_config_1.default.info(
        `The connection to database was failed with error: ${e}`,
      );
    }
  });
connect();
