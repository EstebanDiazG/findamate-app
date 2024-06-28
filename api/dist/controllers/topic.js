"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.update = exports.upsert = exports.getByIdPerson = exports.getById = exports.getAll = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const sendResponse_1 = __importDefault(require("../utils/functions/sendResponse"));
const topicSchema_1 = require("../schemas/topicSchema");
const Topic_1 = __importDefault(require("../models/Topic"));
const getAll = async (req, res, next) => {
    try {
        const response = await Topic_1.default.getAll();
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
        const schemaValidate = topicSchema_1.idTopicSchema.validate(params);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { id } = schemaValidate.value;
        const response = await Topic_1.default.getById(id);
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
        const schemaValidate = topicSchema_1.idPersonTopicSchema.validate(params);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { id_person } = schemaValidate.value;
        const response = await Topic_1.default.getByIdPerson(id_person);
        (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.getByIdPerson = getByIdPerson;
const upsert = async (req, res, next) => {
    try {
        const { body } = req;
        const schemaValidate = topicSchema_1.createTopicSchema.validate(body);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { id_person, title, content, id_interest } = schemaValidate.value;
        const response = await Topic_1.default.upsert(id_person, title, content, id_interest);
        return (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.upsert = upsert;
const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const schemaValidate = topicSchema_1.idTopicSchema.validate({ id });
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const schemaValidate2 = topicSchema_1.updateTopicSchema.validate({ content });
        if (schemaValidate2.error) {
            return next(boom_1.default.badRequest(schemaValidate2.error));
        }
        const response = await Topic_1.default.update(id, content);
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
        const schemaValidate = topicSchema_1.idTopicSchema.validate(params);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { id } = schemaValidate.value;
        const response = await Topic_1.default.deleteById(id);
        (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.deleteById = deleteById;
