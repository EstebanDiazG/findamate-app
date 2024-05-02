"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/functions/logger"));
const handlerRequest = (req, res, next) => {
    logger_1.default.info({
        url: req.originalUrl,
        method: req.method,
        body: req.method === 'POST' ? req.body : '',
        params: req.method !== 'POST' ? req.params : '',
        query: req.method === 'GET' ? req.query : '',
    });
    return next();
};
exports.default = handlerRequest;
