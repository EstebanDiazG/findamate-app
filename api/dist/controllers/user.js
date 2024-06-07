"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeRol = exports.assignRol = exports.validate = exports.deleteById = exports.updatePass = exports.upsert = exports.getByRut = exports.getById = exports.getAll = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const sendResponse_1 = __importDefault(require("../utils/functions/sendResponse"));
const userSchema_1 = require("../schemas/userSchema");
const User_1 = __importDefault(require("../models/User"));
const UserRol_1 = __importDefault(require("../models/UserRol"));
const Person_1 = __importDefault(require("../models/Person"));
const getAll = async (req, res, next) => {
    try {
        const response = await User_1.default.getAll();
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
        const schemaValidate = userSchema_1.idUserSchema.validate(params);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { id } = schemaValidate.value;
        const response = await User_1.default.getById(id);
        (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.getById = getById;
const getByRut = async (req, res, next) => {
    try {
        const { params } = req;
        const schemaValidate = userSchema_1.rutPersonSchema.validate(params);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { rut } = schemaValidate.value;
        const response = await User_1.default.getByRut(rut);
        (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.getByRut = getByRut;
const upsert = async (req, res, next) => {
    try {
        const { body } = req;
        const schemaValidate = userSchema_1.upsertUserSchema.validate(body);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { rut, name, paternalLastName, maternalLastName, email, password } = schemaValidate.value;
        const response = await User_1.default.upsert(rut, name, paternalLastName, maternalLastName, email, password);
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
        const schemaValidate = userSchema_1.idUserSchema.validate(params);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { id } = schemaValidate.value;
        const userResponse = await User_1.default.deleteById(id);
        const personResponse = await Person_1.default.deleteById(id);
        (0, sendResponse_1.default)(req, res, { user: userResponse, person: personResponse });
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.deleteById = deleteById;
const updatePass = async (req, res, next) => {
    try {
        const { body } = req;
        const schemaValidate = userSchema_1.updatePassword.validate(body);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { personId, password } = schemaValidate.value;
        const response = await User_1.default.updatePassword(personId, password);
        return (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.updatePass = updatePass;
const validate = async (req, res, next) => {
    try {
        const { body } = req;
        const schemaValidate = userSchema_1.validateUserSchema.validate(body);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { email, password } = schemaValidate.value;
        const resultUser = await User_1.default.validate(email);
        if (!resultUser) {
            return next(boom_1.default.badImplementation("Usuario no encontrado"));
        }
        const hashPassword = resultUser.hash;
        const isValid = await bcrypt_1.default.compare(password, hashPassword);
        const response = isValid
            ? { ...resultUser, password: undefined }
            : { error: "Usuario no valido" };
        return (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        next(boom_1.default.badImplementation(err));
    }
};
exports.validate = validate;
const assignRol = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { rolId } = req.body;
        const schemaValidate = userSchema_1.userIdSchema.validate({ userId });
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const schemaValidateRol = userSchema_1.idRolSchema.validate({ rolId });
        if (schemaValidateRol.error) {
            return next(boom_1.default.badRequest(schemaValidateRol.error));
        }
        const response = await UserRol_1.default.assignRol(userId, rolId);
        return (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.assignRol = assignRol;
const removeRol = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { rolId } = req.body;
        const schemaValidate = userSchema_1.userIdSchema.validate({ userId });
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const schemaValidateRol = userSchema_1.idRolSchema.validate({ rolId });
        if (schemaValidateRol.error) {
            return next(boom_1.default.badRequest(schemaValidateRol.error));
        }
        const response = await UserRol_1.default.removeRol(userId, rolId);
        return (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.removeRol = removeRol;
