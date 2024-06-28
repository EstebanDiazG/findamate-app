"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.limit = exports.mediaUploadUrl = exports.mediaUploadDir = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const process_1 = __importDefault(require("process"));
dotenv_1.default.config();
const pathENV = path_1.default.join(__dirname, "..", ".env");
require("dotenv").config({ path: pathENV });
const config = {
    apiPort: parseInt(process_1.default.env.API_PORT || "3000"),
    dbHost: process_1.default.env.DB_HOST || "localhost",
    dbUser: process_1.default.env.DB_USER || "postgres",
    dbPassword: process_1.default.env.DB_PASSWORD || "postgres",
    dbName: process_1.default.env.DB_NAME || "postgres",
    dbPort: parseInt(process_1.default.env.DB_PORT || "5432"),
    apiKey: process_1.default.env.API_KEY || "1234",
};
exports.mediaUploadDir = process_1.default.env.MEDIA_UPLOAD_DIR || "public/uploads/media";
exports.mediaUploadUrl = process_1.default.env.MEDIA_UPLOAD_URL || "uploads/media";
exports.limit = Number(process_1.default.env.LIMIT);
exports.default = config;
