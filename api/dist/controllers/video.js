"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeComment = exports.giveComment = exports.removeLike = exports.likeVideo = exports.deleteById = exports.upsert = exports.getByPerson = exports.getById = exports.getAll = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const sendResponse_1 = __importDefault(require("../utils/functions/sendResponse"));
const videoSchema_1 = require("../schemas/videoSchema");
const Video_1 = __importDefault(require("../models/Video"));
const LikeVideo_1 = __importDefault(require("../models/LikeVideo"));
const CommentVideo_1 = __importDefault(require("../models/CommentVideo"));
const getAll = async (req, res, next) => {
    try {
        const response = await Video_1.default.getAll();
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
        const schemaValidate = videoSchema_1.idVideoSchema.validate(params);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { id } = schemaValidate.value;
        const response = await Video_1.default.getById(id);
        (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.getById = getById;
const getByPerson = async (req, res, next) => {
    try {
        const { params } = req;
        const schemaValidate = videoSchema_1.personVideoSchema.validate(params);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { idPerson } = schemaValidate.value;
        const response = await Video_1.default.getByPerson(idPerson);
        (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.getByPerson = getByPerson;
const upsert = async (req, res, next) => {
    try {
        const { body } = req;
        const schemaValidate = videoSchema_1.upsertVideoSchema.validate(body);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { idPerson, url, title } = schemaValidate.value;
        const response = await Video_1.default.upsert(idPerson, url, title);
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
        const schemaValidate = videoSchema_1.idVideoSchema.validate(params);
        if (schemaValidate.error) {
            return next(boom_1.default.badRequest(schemaValidate.error));
        }
        const { id } = schemaValidate.value;
        const response = await Video_1.default.deleteById(id);
        (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.deleteById = deleteById;
const likeVideo = async (req, res, next) => {
    try {
        const { idVideo } = req.body;
        const { idPerson } = req.params;
        const schemaValidateBody = videoSchema_1.videoLikeVideoSchema.validate({ idVideo });
        if (schemaValidateBody.error) {
            return next(boom_1.default.badRequest(schemaValidateBody.error));
        }
        const schemaValidateParams = videoSchema_1.personLikeVideoSchema.validate({ idPerson });
        if (schemaValidateParams.error) {
            return next(boom_1.default.badRequest(schemaValidateParams.error));
        }
        const response = await LikeVideo_1.default.giveLike(idPerson, idVideo);
        (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.likeVideo = likeVideo;
const removeLike = async (req, res, next) => {
    try {
        const { idVideo } = req.body;
        const { idPerson } = req.params;
        const schemaValidateBody = videoSchema_1.videoLikeVideoSchema.validate({ idVideo });
        if (schemaValidateBody.error) {
            return next(boom_1.default.badRequest(schemaValidateBody.error));
        }
        const schemaValidateParams = videoSchema_1.personLikeVideoSchema.validate({ idPerson });
        if (schemaValidateParams.error) {
            return next(boom_1.default.badRequest(schemaValidateParams.error));
        }
        const response = await LikeVideo_1.default.removeLike(idPerson, idVideo);
        (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.removeLike = removeLike;
const giveComment = async (req, res, next) => {
    try {
        const { idVideo, content } = req.body;
        const { idPerson } = req.params;
        const schemaValidateBody = videoSchema_1.videoLikeVideoSchema.validate({ idVideo });
        if (schemaValidateBody.error) {
            return next(boom_1.default.badRequest(schemaValidateBody.error));
        }
        const schemaValidateParams = videoSchema_1.personLikeVideoSchema.validate({ idPerson });
        if (schemaValidateParams.error) {
            return next(boom_1.default.badRequest(schemaValidateParams.error));
        }
        const response = await CommentVideo_1.default.giveComment(idPerson, idVideo, content);
        (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.giveComment = giveComment;
const removeComment = async (req, res, next) => {
    try {
        const { idVideo, content } = req.body;
        const { idPerson } = req.params;
        const schemaValidateBody = videoSchema_1.videoLikeVideoSchema.validate({ idVideo });
        if (schemaValidateBody.error) {
            return next(boom_1.default.badRequest(schemaValidateBody.error));
        }
        const schemaValidateParams = videoSchema_1.personLikeVideoSchema.validate({ idPerson });
        if (schemaValidateParams.error) {
            return next(boom_1.default.badRequest(schemaValidateParams.error));
        }
        const response = await CommentVideo_1.default.removeComment(idPerson, idVideo, content);
        (0, sendResponse_1.default)(req, res, response);
    }
    catch (err) {
        return next(boom_1.default.badImplementation(err));
    }
};
exports.removeComment = removeComment;
