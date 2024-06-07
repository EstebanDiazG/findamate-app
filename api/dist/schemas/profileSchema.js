"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileSchema = exports.id_personProfileSchema = exports.idProfileSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const idProfileSchema = joi_1.default.object({
    id: joi_1.default.string().uuid().required(),
});
exports.idProfileSchema = idProfileSchema;
const id_personProfileSchema = joi_1.default.object({
    id_person: joi_1.default.string().uuid().required(),
});
exports.id_personProfileSchema = id_personProfileSchema;
const updateProfileSchema = joi_1.default.object({
    description: joi_1.default.string(),
    name: joi_1.default.string(),
    paternalLastName: joi_1.default.string(),
    maternalLastName: joi_1.default.string(),
});
exports.updateProfileSchema = updateProfileSchema;
