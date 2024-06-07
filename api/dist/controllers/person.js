"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInterestsByPersonId = exports.removeInterest = exports.assignInterest = exports.removePerson = exports.assignPerson = exports.deleteById = exports.upsert = exports.getByRut = exports.getById = exports.getAll = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const sendResponse_1 = __importDefault(require("../utils/functions/sendResponse"));
const personSchema_1 = require("../schemas/personSchema");
const Person_1 = __importDefault(require("../models/Person"));
const studyGroupPerson_1 = __importDefault(require("../models/studyGroupPerson"));
const InterestGroup_1 = __importDefault(require("../models/InterestGroup"));
const getAll = async (req, res, next) => {
    try {
        const response = await Person_1.default.getAll();
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
        const schemaValidate = personSchema_1.idPersonSchema.validate(params);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { id } = schemaValidate.value;
        const response = await Person_1.default.getById(id);
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
        const schemaValidate = personSchema_1.rutPersonSchema.validate(params);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { rut } = schemaValidate.value;
        const response = await Person_1.default.getByRut(rut);
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
        const schemaValidate = personSchema_1.upsertPersonSchema.validate(body);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { rut, name, paternalLastName, maternalLastName, email } = schemaValidate.value;
        const response = await Person_1.default.upsert(rut, name, paternalLastName, maternalLastName, email);
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
        const schemaValidate = personSchema_1.idPersonSchema.validate(params);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { id } = schemaValidate.value;
        const response = await Person_1.default.deleteById(id);
        (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.deleteById = deleteById;
const assignPerson = async (req, res, next) => {
    try {
        const { personId } = req.params;
        const { groupId } = req.body;
        const schemaValidate = personSchema_1.idPersonGroupSchema.validate({ personId });
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const schemaValidate2 = personSchema_1.idStudyGroupSchema.validate({ groupId });
        if (schemaValidate2.error) {
            return next(boom_1.default.badRequest(schemaValidate2.error));
        }
        const response = await studyGroupPerson_1.default.assignPerson(personId, groupId);
        return (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.assignPerson = assignPerson;
const removePerson = async (req, res, next) => {
    try {
        const { personId } = req.params;
        const { groupId } = req.body;
        const schemaValidate = personSchema_1.idPersonGroupSchema.validate({ personId });
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const schemaValidate2 = personSchema_1.idStudyGroupSchema.validate({ groupId });
        if (schemaValidate2.error) {
            return next(boom_1.default.badRequest(schemaValidate2.error));
        }
        const response = await studyGroupPerson_1.default.removePerson(personId, groupId);
        return (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.removePerson = removePerson;
const getInterestsByPersonId = async (req, res, next) => {
    try {
        const { params } = req;
        const schemaValidate = personSchema_1.idPersonInterestGroupSchema.validate(params);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { id_person } = schemaValidate.value;
        const response = await InterestGroup_1.default.getInterestsByPersonId(id_person);
        (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.getInterestsByPersonId = getInterestsByPersonId;
const assignInterest = async (req, res, next) => {
    try {
        const { id_person } = req.params;
        const { id_interest } = req.body;
        const schemaValidate = personSchema_1.idPersonInterestGroupSchema.validate({ id_person });
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const schemaValidate2 = personSchema_1.idInterestGroupSchema.validate({ id_interest });
        if (schemaValidate2.error) {
            return next(boom_1.default.badRequest(schemaValidate2.error));
        }
        const response = await InterestGroup_1.default.assignInterest(id_person, id_interest);
        return (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.assignInterest = assignInterest;
const removeInterest = async (req, res, next) => {
    try {
        const { id_person } = req.params;
        const { id_interest } = req.body;
        const schemaValidate = personSchema_1.idPersonInterestGroupSchema.validate({ id_person });
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const schemaValidate2 = personSchema_1.idInterestGroupSchema.validate({ id_interest });
        if (schemaValidate2.error) {
            return next(boom_1.default.badRequest(schemaValidate2.error));
        }
        const response = await InterestGroup_1.default.removeInterest(id_person, id_interest);
        return (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.removeInterest = removeInterest;
