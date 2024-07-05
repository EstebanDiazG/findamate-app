"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchMediaSchema = exports.mediaIdParams = void 0;
const joi_1 = __importDefault(require("joi"));
exports.mediaIdParams = joi_1.default.object({
    id: joi_1.default.string().uuid().required(),
});
exports.searchMediaSchema = joi_1.default.object({
    page: joi_1.default.number().default(1),
    limit: joi_1.default.number().default(10),
    statusCode: joi_1.default.number(),
});
