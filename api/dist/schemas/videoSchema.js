"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoLikeVideoSchema = exports.personLikeVideoSchema = exports.personVideoSchema = exports.idVideoSchema = exports.upsertVideoSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const upsertVideoSchema = joi_1.default.object({
    idPerson: joi_1.default.string().uuid().required(),
    url: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
});
exports.upsertVideoSchema = upsertVideoSchema;
const idVideoSchema = joi_1.default.object({
    id: joi_1.default.string().uuid().required(),
});
exports.idVideoSchema = idVideoSchema;
const personVideoSchema = joi_1.default.object({
    idPerson: joi_1.default.string().uuid().required(),
});
exports.personVideoSchema = personVideoSchema;
const personLikeVideoSchema = joi_1.default.object({
    idPerson: joi_1.default.string().uuid().required(),
});
exports.personLikeVideoSchema = personLikeVideoSchema;
const videoLikeVideoSchema = joi_1.default.object({
    idVideo: joi_1.default.string().uuid().required(),
});
exports.videoLikeVideoSchema = videoLikeVideoSchema;
