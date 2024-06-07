"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.upsert = exports.getById = exports.getAll = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const sendResponse_1 = __importDefault(require("../utils/functions/sendResponse"));
const studyGroupSchema_1 = require("../schemas/studyGroupSchema");
const StudyGroup_1 = __importDefault(require("../models/StudyGroup"));
const getAll = async (req, res, next) => {
    try {
        const response = await StudyGroup_1.default.getAll();
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
        const schemaValidate = studyGroupSchema_1.idStudyGroupSchema.validate(params);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { id } = schemaValidate.value;
        const response = await StudyGroup_1.default.getById(id);
        (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.getById = getById;
const upsert = async (req, res, next) => {
    try {
        const { body } = req;
        const schemaValidate = studyGroupSchema_1.upsertStudyGroupSchema.validate(body);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { name, description, type } = schemaValidate.value;
        const response = await StudyGroup_1.default.upsert(name, description, type);
        (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.upsert = upsert;
const deleteById = async (req, res, next) => {
    try {
        const { params } = req;
        const schemaValidate = studyGroupSchema_1.idStudyGroupSchema.validate(params);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { id } = schemaValidate.value;
        const response = await StudyGroup_1.default.delete(id);
        (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.deleteById = deleteById;
