"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idStudyGroupSchema = exports.upsertStudyGroupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const upsertStudyGroupSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    type: joi_1.default.string().required(),
});
exports.upsertStudyGroupSchema = upsertStudyGroupSchema;
const idStudyGroupSchema = joi_1.default.object({
    id: joi_1.default.string().uuid().required(),
});
exports.idStudyGroupSchema = idStudyGroupSchema;
