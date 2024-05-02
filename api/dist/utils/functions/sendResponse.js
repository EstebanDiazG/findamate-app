"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const sendResponse = (req, res, json, statusCode = 200, error = null) => {
    logger_1.default.info({
        url: req.originalUrl,
        method: req.method,
        body: req.method === 'POST' ? req.body : '',
        params: req.method !== 'POST' ? req.params : '',
        query: req.method === 'GET' ? req.query : '',
    });
    res.status(statusCode).json({
        success: error ? false : true,
        data: json,
        error,
    });
};
exports.default = sendResponse;
