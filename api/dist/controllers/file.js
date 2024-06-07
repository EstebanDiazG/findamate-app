"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = exports.searchFiles = exports.getFileById = exports.deleteFileById = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const boom_1 = __importDefault(require("@hapi/boom"));
const config_1 = require("../utils/functions/config");
const File_1 = __importDefault(require("../models/File"));
const config_2 = require("../utils/functions/config");
const sendResponse_1 = __importDefault(require("../utils/functions/sendResponse"));
const fileSchema_1 = require("../schemas/fileSchema");
const deleteFileById = async (req, res, next) => {
    const { params } = req;
    const validateSchemaParams = fileSchema_1.fileIdParams.validate(params);
    if (validateSchemaParams.error)
        return next(boom_1.default.badImplementation(validateSchemaParams.error));
    const { id } = validateSchemaParams.value;
    File_1.default.getById(id)
        .then((response) => {
        const filePath = `${config_1.filesUploadDir}/${response.internal_name}`;
        fs_1.default.unlink(filePath, (e) => {
            if (e)
                return next(boom_1.default.badImplementation(e));
            File_1.default.deleteById(id)
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
exports.deleteFileById = deleteFileById;
const getFileById = (req, res, next) => {
    const { params } = req;
    const validateSchemaParams = fileSchema_1.fileIdParams.validate(params);
    if (validateSchemaParams.error)
        return next(boom_1.default.badImplementation(validateSchemaParams.error));
    const { id } = validateSchemaParams.value;
    File_1.default.getById(id)
        .then((response) => {
        if (response)
            return (0, sendResponse_1.default)(req, res, response);
        next();
    })
        .catch((e) => next(boom_1.default.badImplementation(e)));
};
exports.getFileById = getFileById;
const searchFiles = (req, res, next) => {
    const validateSchemaQuery = fileSchema_1.searchFilesSchema.validate(req.query);
    if (validateSchemaQuery.error)
        return next(boom_1.default.badImplementation(validateSchemaQuery.error));
    const { page, limit: queryLimit, statusCode } = validateSchemaQuery.value;
    File_1.default.search({ page, statusCode, limit: queryLimit || config_2.limit })
        .then((files) => {
        const total = files.length ? Number(files[0].total) : 0;
        (0, sendResponse_1.default)(req, res, {
            results: files,
            total,
            limit: queryLimit || config_2.limit,
            pages: Math.ceil(total / (queryLimit || config_2.limit)),
        });
    })
        .catch((e) => next(boom_1.default.badImplementation(e)));
};
exports.searchFiles = searchFiles;
const uploadFile = async (req, res, next) => {
    if (!req.file) {
        return next(boom_1.default.badRequest("No file uploaded"));
    }
    try {
        if (req.file.mimetype !== "application/pdf") {
            return next(boom_1.default.badRequest("Unsupported file type. Only PDF files are supported."));
        }
        const internalname = `${Date.now()}-${req.file.originalname}`;
        const filepath = path_1.default.join(config_1.filesUploadDir, internalname);
        fs_1.default.mkdirSync(path_1.default.dirname(filepath), { recursive: true });
        try {
            fs_1.default.writeFileSync(filepath, req.file.buffer);
        }
        catch (err) {
            console.error("Error writing file:", err);
            return next(boom_1.default.internal("Error writing file"));
        }
        const file = {
            originalname: req.file.originalname,
            internalname: internalname,
            mimetype: req.file.mimetype,
            format: "pdf",
            size: req.file.size,
            path: filepath,
            encoding: req.file.encoding,
        };
        let fileId;
        try {
            fileId = await File_1.default.create(file);
        }
        catch (err) {
            console.error("Error creating file record:", err);
            return next(boom_1.default.internal("Error creating file record"));
        }
        const fileUrl = `${config_1.filesUploadUrl}/${internalname}`;
        res.status(200).send({
            message: "File processed successfully",
            id: fileId,
            url: fileUrl,
        });
    }
    catch (err) {
        console.error("Unexpected error:", err);
        next(boom_1.default.internal("Unexpected error"));
    }
};
exports.uploadFile = uploadFile;
