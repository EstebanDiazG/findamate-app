"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMessageSchema = exports.createMesaggeSchema = exports.idTopicMessageTopicSchema = exports.idPersonMessageTopicSchema = exports.idMessageTopicSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const idMessageTopicSchema = joi_1.default.object({
    id: joi_1.default.string().uuid().required(),
});
exports.idMessageTopicSchema = idMessageTopicSchema;
const idPersonMessageTopicSchema = joi_1.default.object({
    id_person: joi_1.default.string().uuid().required(),
});
exports.idPersonMessageTopicSchema = idPersonMessageTopicSchema;
const idTopicMessageTopicSchema = joi_1.default.object({
    id_topic: joi_1.default.string().uuid().required(),
});
exports.idTopicMessageTopicSchema = idTopicMessageTopicSchema;
const createMesaggeSchema = joi_1.default.object({
    id_person: joi_1.default.string().uuid().required(),
    id_topic: joi_1.default.string().uuid().required(),
    content: joi_1.default.string().optional(),
    id_media: joi_1.default.string().uuid().optional(),
});
exports.createMesaggeSchema = createMesaggeSchema;
const updateMessageSchema = joi_1.default.object({
    content: joi_1.default.string().optional()
});
exports.updateMessageSchema = updateMessageSchema;
