"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeActionSchema = exports.idActionSchema = exports.upsertActionSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const upsertActionSchema = joi_1.default.object({
    code: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
});
exports.upsertActionSchema = upsertActionSchema;
const idActionSchema = joi_1.default.object({
    id: joi_1.default.string().uuid().required(),
});
exports.idActionSchema = idActionSchema;
const codeActionSchema = joi_1.default.object({
    code: joi_1.default.string().required(),
});
exports.codeActionSchema = codeActionSchema;
