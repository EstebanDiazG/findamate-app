"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const config_1 = require("../functions/config");
const pool = new pg_1.Pool({
    host: config_1.dbHost,
    user: config_1.dbUser,
    password: config_1.dbPassword,
    database: config_1.dbName,
    port: config_1.dbPort,
});
exports.default = pool;
