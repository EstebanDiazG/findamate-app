"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIdSchema = exports.idRolSchema = exports.validateUserSchema = exports.updatePassword = exports.rutPersonSchema = exports.idUserSchema = exports.upsertUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const upsertUserSchema = joi_1.default.object({
    rut: joi_1.default
        .string()
        .pattern(/^\d{7,8}-[\dk]$/)
        .required(),
    name: joi_1.default.string().required(),
    paternalLastName: joi_1.default.string().required(),
    maternalLastName: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
exports.upsertUserSchema = upsertUserSchema;
const idUserSchema = joi_1.default.object({
    id: joi_1.default.string().uuid().required(),
});
exports.idUserSchema = idUserSchema;
const rutPersonSchema = joi_1.default.object({
    rut: joi_1.default
        .string()
        .pattern(/^\d{7,8}-[\dk]$/)
        .required(),
});
exports.rutPersonSchema = rutPersonSchema;
const updatePassword = joi_1.default.object({
    personId: joi_1.default.string().uuid().required(),
    password: joi_1.default.string().required(),
});
exports.updatePassword = updatePassword;
const validateUserSchema = joi_1.default.object({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
exports.validateUserSchema = validateUserSchema;
const idRolSchema = joi_1.default.object({
    rolId: joi_1.default.string().uuid().required(),
});
exports.idRolSchema = idRolSchema;
const userIdSchema = joi_1.default.object({
    userId: joi_1.default.string().uuid().required(),
});
exports.userIdSchema = userIdSchema;
