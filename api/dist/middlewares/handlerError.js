"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = __importDefault(require("@hapi/boom"));
const logger_1 = __importDefault(require("../utils/functions/logger"));
const handlerError = (err, req, res, next) => {
    if (err) {
        const wrapperError = err.isBoom ? err : boom_1.default.badImplementation(err);
        logger_1.default.error({
            url: req.originalUrl,
            method: req.method,
            body: req.method === 'POST' ? req.body : '',
            params: req.method !== 'POST' ? req.params : '',
            query: req.method === 'GET' ? req.query : '',
            error: err.message,
        });
        return res.status(wrapperError.output.statusCode).json({
            success: false,
            data: null,
            error: wrapperError.output.payload.message,
        });
    }
    next();
};
exports.default = handlerError;
