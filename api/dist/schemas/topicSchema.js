"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTopicSchema = exports.createTopicSchema = exports.idPersonTopicSchema = exports.idTopicSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const idTopicSchema = joi_1.default.object({
    id: joi_1.default.string().uuid().required(),
});
exports.idTopicSchema = idTopicSchema;
const idPersonTopicSchema = joi_1.default.object({
    id_person: joi_1.default.string().uuid().required(),
});
exports.idPersonTopicSchema = idPersonTopicSchema;
const createTopicSchema = joi_1.default.object({
    id_person: joi_1.default.string().uuid().required(),
    title: joi_1.default.string().required(),
    content: joi_1.default.string().optional(),
    id_interest: joi_1.default.string().uuid().required(),
});
exports.createTopicSchema = createTopicSchema;
const updateTopicSchema = joi_1.default.object({
    content: joi_1.default.string().optional(),
});
exports.updateTopicSchema = updateTopicSchema;
