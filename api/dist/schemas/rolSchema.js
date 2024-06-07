"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionRolSchema = exports.idRolSchema = exports.upsertRolSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const upsertRolSchema = joi_1.default.object({
    code: joi_1.default.string().required(),
    name: joi_1.default.string().max(60).required(),
});
exports.upsertRolSchema = upsertRolSchema;
const idRolSchema = joi_1.default.object({
    id: joi_1.default.string().uuid().required(),
});
exports.idRolSchema = idRolSchema;
const ActionRolSchema = joi_1.default.object({
    actionId: joi_1.default.string().uuid().required(),
});
exports.ActionRolSchema = ActionRolSchema;
