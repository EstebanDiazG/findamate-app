"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../utils/functions/config"));
const logger_1 = __importDefault(require("../utils/functions/logger"));
const auth = (req, res, next) => {
    const { apiKey } = config_1.default;
    if (req.headers.id !== apiKey.toString()) {
        logger_1.default.error("Incorrect api key");
        res.status(401).json({ message: "Incorrect api key" });
        return;
    }
    return next();
};
exports.default = auth;
