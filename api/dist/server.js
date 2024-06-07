"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./utils/functions/logger"));
const config_1 = __importDefault(require("./utils/functions/config"));
const app_1 = __importDefault(require("./app"));
const { apiPort } = config_1.default;
app_1.default.listen(apiPort);
logger_1.default.info(`🚀API listening port ${apiPort}`);
