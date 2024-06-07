import pg from "pg";
import path from "path";
import fs from "fs";

import config from "../functions/config";
import createLogger from "../functions/logger";

const { Pool } = pg;
const { dbHost, dbUser, dbPassword, dbName, dbPort } = config;

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
    createLogger.error({
      util: "database",
      error: err,
    });
    return;
  }

  createLogger.info({
    util: "database",
    message: "Database connected",
  });
});

export default pool;
