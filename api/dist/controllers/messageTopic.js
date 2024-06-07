"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.update = exports.createMessage = exports.getByIdTopic = exports.getByIdPerson = exports.getById = exports.getAll = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const sendResponse_1 = __importDefault(require("../utils/functions/sendResponse"));
const messageTopicSchema_1 = require("../schemas/messageTopicSchema");
const MessageTopic_1 = __importDefault(require("../models/MessageTopic"));
const getAll = async (req, res, next) => {
    try {
        const response = await MessageTopic_1.default.getAll();
        (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.getAll = getAll;
const getById = async (req, res, next) => {
    try {
        const { params } = req;
        const schemaValidate = messageTopicSchema_1.idMessageTopicSchema.validate(params);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { id } = schemaValidate.value;
        const response = await MessageTopic_1.default.getById(id);
        (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.getById = getById;
const getByIdPerson = async (req, res, next) => {
    try {
        const { params } = req;
        const schemaValidate = messageTopicSchema_1.idPersonMessageTopicSchema.validate(params);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { id_person } = schemaValidate.value;
        const response = await MessageTopic_1.default.getByIdPerson(id_person);
        (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.getByIdPerson = getByIdPerson;
const getByIdTopic = async (req, res, next) => {
    try {
        const { params } = req;
        const schemaValidate = messageTopicSchema_1.idTopicMessageTopicSchema.validate(params);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { id_topic } = schemaValidate.value;
        const response = await MessageTopic_1.default.getByIdTopic(id_topic);
        (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.getByIdTopic = getByIdTopic;
const createMessage = async (req, res, next) => {
    try {
        const { body } = req;
        const schemaValidate = messageTopicSchema_1.createMesaggeSchema.validate(body);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { id_person, id_topic, content } = schemaValidate.value;
        const response = await MessageTopic_1.default.createMessage(id_person, id_topic, content);
        return (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.createMessage = createMessage;
const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const schemaValidate = messageTopicSchema_1.idMessageTopicSchema.validate({ id });
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const schemaValidate2 = messageTopicSchema_1.updateMessageSchema.validate({ content });
        if (schemaValidate2.error) {
            return next(boom_1.default.badRequest(schemaValidate2.error));
        }
        const response = await MessageTopic_1.default.update(id, content);
        return (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.update = update;
const deleteById = async (req, res, next) => {
    try {
        const { params } = req;
        const schemaValidate = messageTopicSchema_1.idMessageTopicSchema.validate(params);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { id } = schemaValidate.value;
        const response = await MessageTopic_1.default.deleteById(id);
        (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.deleteById = deleteById;
