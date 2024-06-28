"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMedia = exports.searchMedia = exports.getMediaById = exports.deleteMediaById = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const boom_1 = __importDefault(require("@hapi/boom"));
const sharp_1 = __importDefault(require("sharp"));
const Media_1 = __importDefault(require("../models/Media"));
const config_1 = require("../utils/functions/config");
const sendResponse_1 = __importDefault(require("../utils/functions/sendResponse"));
const mediaSchema_1 = require("../schemas/mediaSchema");
const deleteMediaById = async (req, res, next) => {
    const { params } = req;
    const { error, value } = mediaSchema_1.mediaIdParams.validate(params);
    if (error)
        return next(boom_1.default.badRequest(error));
    const { id } = value;
    try {
        const deletedId = await Media_1.default.deleteById(id);
        if (!deletedId)
            return next(boom_1.default.notFound("Failed to delete media"));
        (0, sendResponse_1.default)(req, res, { success: true });
    }
    catch (err) {
        next(boom_1.default.badImplementation(err));
    }
};
exports.deleteMediaById = deleteMediaById;
const getMediaById = async (req, res, next) => {
    const { params } = req;
    const { error, value } = mediaSchema_1.mediaIdParams.validate(params);
    if (error)
        return next(boom_1.default.badRequest(error));
    const { id } = value;
    try {
        const media = await Media_1.default.getById(id);
        if (!media)
            return next(boom_1.default.notFound("Media not found"));
        (0, sendResponse_1.default)(req, res, media);
    }
    catch (err) {
        next(boom_1.default.badImplementation(err));
    }
};
exports.getMediaById = getMediaById;
const searchMedia = async (req, res, next) => {
    const { query } = req;
    const { error, value } = mediaSchema_1.searchMediaSchema.validate(query);
    if (error)
        return next(boom_1.default.badRequest(error));
    const { page, statusCode } = value;
    try {
        const media = await Media_1.default.search({ page, statusCode, limit: config_1.limit });
        (0, sendResponse_1.default)(req, res, media);
    }
    catch (err) {
        next(boom_1.default.badImplementation(err));
    }
};
exports.searchMedia = searchMedia;
const uploadMedia = async (req, res, next) => {
    if (!req.file)
        return next(boom_1.default.badRequest("No file uploaded"));
    try {
        const internalName = `${Date.now()}-${req.file.originalname}`;
        const filePath = path_1.default.join(config_1.mediaUploadDir, internalName);
        fs_1.default.mkdirSync(path_1.default.dirname(filePath), { recursive: true });
        let media;
        if (req.file.mimetype.startsWith("image/")) {
            const buffer = req.file.buffer;
            await (0, sharp_1.default)(buffer)
                .resize(1000, null, { withoutEnlargement: true })
                .flatten({ background: { r: 255, g: 255, b: 255 } })
                .jpeg({ mozjpeg: true })
                .rotate()
                .toFile(filePath);
            const metadata = await (0, sharp_1.default)(filePath).metadata();
            media = {
                mimetype: req.file.mimetype,
                filename: internalName,
                url: filePath,
                width: metadata.width,
                height: metadata.height,
            };
        }
        else {
            fs_1.default.writeFileSync(filePath, req.file.buffer);
            media = {
                mimetype: req.file.mimetype,
                filename: internalName,
                url: filePath,
            };
        }
        const mediaId = await Media_1.default.create({
            type: req.file.mimetype.split("/")[0],
            original_name: req.file.originalname,
            internal_name: internalName,
            mimetype: req.file.mimetype,
            format: req.file.mimetype.split("/")[1],
            encoding: req.file.encoding,
            path: filePath,
            size: req.file.size,
            width: media.width,
            height: media.height,
        });
        const mediaUrl = `${config_1.mediaUploadUrl}/${internalName}`;
        res.status(200).send({
            message: "Media processed successfully",
            id: mediaId,
            url: mediaUrl,
        });
    }
    catch (err) {
        next(boom_1.default.internal("Unexpected error"));
    }
};
exports.uploadMedia = uploadMedia;
