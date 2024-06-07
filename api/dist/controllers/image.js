"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.searchImages = exports.getImageById = exports.deleteImageById = void 0;
const fs_1 = __importDefault(require("fs"));
const boom_1 = __importDefault(require("@hapi/boom"));
const sharp_1 = __importDefault(require("sharp"));
const Image_1 = __importDefault(require("../models/Image"));
const config_1 = require("../utils/functions/config");
const sendResponse_1 = __importDefault(require("../utils/functions/sendResponse"));
const imageSchema_1 = require("../schemas/imageSchema");
const deleteImageById = async (req, res, next) => {
    const { params } = req;
    const validateSchemaParams = imageSchema_1.imageIdParams.validate(params);
    if (validateSchemaParams.error)
        return next(boom_1.default.badImplementation(validateSchemaParams.error));
    const { id } = validateSchemaParams.value;
    Image_1.default.getById(id)
        .then((response) => {
        const imagePath = `${config_1.imagesUploadDir}/${response.id}.jpg`;
        console.log(imagePath);
        fs_1.default.unlink(imagePath, (e) => {
            if (e)
                return next(boom_1.default.badImplementation(e));
            Image_1.default.deleteById(id)
                .then((id) => {
                if (!id)
                    return next();
                return (0, sendResponse_1.default)(req, res, { success: true });
            })
                .catch((e) => next(boom_1.default.badImplementation(e)));
        });
    })
        .catch((e) => next(boom_1.default.badImplementation(e)));
};
exports.deleteImageById = deleteImageById;
const getImageById = (req, res, next) => {
    const { params } = req;
    const validateSchemaParams = imageSchema_1.imageIdParams.validate(params);
    if (validateSchemaParams.error)
        return next(boom_1.default.badImplementation(validateSchemaParams.error));
    const { id } = validateSchemaParams.value;
    Image_1.default.getById(id)
        .then((response) => {
        if (response)
            return (0, sendResponse_1.default)(req, res, response);
        next();
    })
        .catch((e) => next(boom_1.default.badImplementation(e)));
};
exports.getImageById = getImageById;
const searchImages = (req, res, next) => {
    const { query } = req;
    const validateSchema = imageSchema_1.searchImagesSchema.validate(query);
    if (validateSchema.error) {
        return next(boom_1.default.badImplementation(validateSchema.error));
    }
    const { page, statusCode } = validateSchema.value;
    Image_1.default.search({
        page,
        statusCode,
        limit: config_1.limit,
    })
        .then((images) => {
        const total = images.length ? Number(images[0].total) : 0;
        (0, sendResponse_1.default)(req, res, {
            results: images,
            total,
            limit: config_1.limit,
            pages: Math.ceil(total / config_1.limit),
        });
    })
        .catch((e) => next(boom_1.default.badImplementation(e)));
};
exports.searchImages = searchImages;
const uploadImage = (req, res, next) => {
    if (!req.file) {
        return next(boom_1.default.badRequest("File is missing"));
    }
    const file = req.file;
    const buffer = file.buffer;
    Image_1.default.create({
        fieldname: file.fieldname,
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
    })
        .then((imageId) => {
        console.log(config_1.imagesUploadDir);
        (0, sharp_1.default)(buffer)
            .resize(1000, null, {
            withoutEnlargement: true,
        })
            .flatten({ background: { r: 255, g: 255, b: 255 } })
            .jpeg({ mozjpeg: true })
            .rotate()
            .toFile(`${config_1.imagesUploadDir}/${imageId}.jpg`, (err, info) => {
            if (err) {
                return next(boom_1.default.unsupportedMediaType(err));
            }
            Image_1.default.updateById(imageId, {
                format: info.format,
                width: info.width,
                height: info.height,
                size: info.size,
            })
                .then(() => (0, sendResponse_1.default)(req, res, {
                id: imageId,
                url: `${config_1.imagesUploadUrl}/${imageId}.jpg`,
            }))
                .catch((e) => (0, sendResponse_1.default)(req, res, {
                message: "Successfully uploaded file",
                error: "Could not determine file size",
            }));
        });
    })
        .catch((e) => next(boom_1.default.badImplementation(e)));
};
exports.uploadImage = uploadImage;
