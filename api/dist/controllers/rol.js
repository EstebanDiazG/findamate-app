"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAction = exports.assignAction = exports.deleteById = exports.upsert = exports.getById = exports.getAll = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const sendResponse_1 = __importDefault(require("../utils/functions/sendResponse"));
const rolSchema_1 = require("../schemas/rolSchema");
const Rol_1 = __importDefault(require("../models/Rol"));
const RolAction_1 = __importDefault(require("../models/RolAction"));
const getAll = async (req, res, next) => {
    try {
        const response = await Rol_1.default.getAll();
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
        const schemaValidate = rolSchema_1.idRolSchema.validate(params);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { id } = schemaValidate.value;
        const response = await Rol_1.default.getById(id);
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
        const schemaValidate = rolSchema_1.upsertRolSchema.validate(body);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { code, name } = schemaValidate.value;
        const response = await Rol_1.default.upsert(code, name);
        return (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.upsert = upsert;
const deleteById = async (req, res, next) => {
    try {
        const { params } = req;
        const schemaValidate = rolSchema_1.idRolSchema.validate(params);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { id } = schemaValidate.value;
        const response = await Rol_1.default.deleteById(id);
        return (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.deleteById = deleteById;
const assignAction = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { actionId } = req.body;
        const schemaValidate = rolSchema_1.idRolSchema.validate({ id });
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const schemaValidateRol = rolSchema_1.ActionRolSchema.validate({ actionId });
        if (schemaValidateRol.error) {
            return next(boom_1.default.badRequest(schemaValidateRol.error));
        }
        const response = await RolAction_1.default.assignAction(id, actionId);
        return (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.assignAction = assignAction;
const removeAction = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { actionId } = req.body;
        const schemaValidate = rolSchema_1.idRolSchema.validate({ id });
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const schemaValidateRol = rolSchema_1.ActionRolSchema.validate({ actionId });
        if (schemaValidateRol.error) {
            return next(boom_1.default.badRequest(schemaValidateRol.error));
        }
        const response = await RolAction_1.default.removeAction(id, actionId);
        return (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.removeAction = removeAction;
