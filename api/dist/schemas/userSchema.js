"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rutUserSchema = exports.idUserSchema = exports.upsertUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const upsertUserSchema = joi_1.default.object({
    email: joi_1.default.string().required(),
    password: joi_1.default
        .string()
        .regex(/^(?=.*[!@#$%^&*()-+=])(?=.*[0-9]).{8}$/)
        .required(),
    personId: joi_1.default.required(),
});
exports.upsertUserSchema = upsertUserSchema;
const idUserSchema = joi_1.default.object({
    id: joi_1.default.string().uuid().required(),
});
exports.idUserSchema = idUserSchema;
const rutUserSchema = joi_1.default.object({
    rut: joi_1.default
        .string()
        .pattern(/^\d{7,8}-[\dk]$/)
        .required(),
});
exports.rutUserSchema = rutUserSchema;
