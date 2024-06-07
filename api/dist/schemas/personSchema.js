"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idPersonInterestGroupSchema = exports.idInterestGroupSchema = exports.idPersonGroupSchema = exports.idStudyGroupSchema = exports.rutPersonSchema = exports.idPersonSchema = exports.upsertPersonSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const upsertPersonSchema = joi_1.default.object({
    rut: joi_1.default
        .string()
        .pattern(/^\d{7,8}-[\dk]$/)
        .required(),
    name: joi_1.default.string().required(),
    paternalLastName: joi_1.default.string().required(),
    maternalLastName: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
});
exports.upsertPersonSchema = upsertPersonSchema;
const idPersonSchema = joi_1.default.object({
    id: joi_1.default.string().uuid().required(),
});
exports.idPersonSchema = idPersonSchema;
const rutPersonSchema = joi_1.default.object({
    rut: joi_1.default
        .string()
        .pattern(/^\d{7,8}-[\dk]$/)
        .required(),
});
exports.rutPersonSchema = rutPersonSchema;
const idStudyGroupSchema = joi_1.default.object({
    groupId: joi_1.default.string().uuid().required(),
});
exports.idStudyGroupSchema = idStudyGroupSchema;
const idPersonGroupSchema = joi_1.default.object({
    personId: joi_1.default.string().uuid().required(),
});
exports.idPersonGroupSchema = idPersonGroupSchema;
const idInterestGroupSchema = joi_1.default.object({
    id_interest: joi_1.default.string().uuid().required(),
});
exports.idInterestGroupSchema = idInterestGroupSchema;
const idPersonInterestGroupSchema = joi_1.default.object({
    id_person: joi_1.default.string().uuid().required(),
});
exports.idPersonInterestGroupSchema = idPersonInterestGroupSchema;
