"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileIdParams = exports.searchFilesSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.searchFilesSchema = joi_1.default.object({
    page: joi_1.default.number().integer().min(1).default(1),
    statusCode: joi_1.default.number().allow(0, 1, null).empty("").default(null),
});
exports.fileIdParams = joi_1.default
    .object({
    id: joi_1.default.string().uuid().required(),
})
    .required();
