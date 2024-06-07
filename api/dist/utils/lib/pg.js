"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const config_1 = __importDefault(require("../functions/config"));
const logger_1 = __importDefault(require("../functions/logger"));
const { Pool } = pg_1.default;
const { dbHost, dbUser, dbPassword, dbName, dbPort } = config_1.default;
const pool = new Pool({
    user: dbUser,
    host: dbHost,
    database: dbName,
    password: dbPassword,
    port: dbPort,
    keepAlive: true,
    max: 20,
});
pool.connect(function (err) {
    if (err) {
        logger_1.default.error({
            util: "database",
            error: err,
        });
        return;
    }
    logger_1.default.info({
        util: "database",
        message: "Database connected",
    });
});
exports.default = pool;
