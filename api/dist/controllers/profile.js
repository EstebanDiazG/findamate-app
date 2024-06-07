"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.deleteById = exports.getByIdPerson = exports.getById = exports.getAll = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const sendResponse_1 = __importDefault(require("../utils/functions/sendResponse"));
const profileSchema_1 = require("../schemas/profileSchema");
const Profile_1 = __importDefault(require("../models/Profile"));
const getAll = async (req, res, next) => {
    try {
        const response = await Profile_1.default.getAll();
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
        const schemaValidate = profileSchema_1.idProfileSchema.validate(params);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { id } = schemaValidate.value;
        const response = await Profile_1.default.getById(id);
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
        const schemaValidate = profileSchema_1.id_personProfileSchema.validate(params);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { id_person } = schemaValidate.value;
        const response = await Profile_1.default.getByIdPerson(id_person);
        (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.getByIdPerson = getByIdPerson;
const deleteById = async (req, res, next) => {
    try {
        const { params } = req;
        const schemaValidate = profileSchema_1.idProfileSchema.validate(params);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { id } = schemaValidate.value;
        const response = await Profile_1.default.deleteById(id);
        (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.deleteById = deleteById;
const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { description, name, paternalLastName, maternalLastName } = req.body;
        const schemaValidate = profileSchema_1.idProfileSchema.validate({ id });
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const schemaValidate2 = profileSchema_1.updateProfileSchema.validate({
            description,
            name,
            paternalLastName,
            maternalLastName,
        });
        if (schemaValidate2.error) {
            return next(boom_1.default.badRequest(schemaValidate2.error));
        }
        const response = await Profile_1.default.update(id, description, name, paternalLastName, maternalLastName);
        return (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.update = update;
