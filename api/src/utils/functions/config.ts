import cnf from "dotenv";

cnf.config();

import path from "path";

const pathENV = path.join(__dirname, "..", ".env");
require("dotenv").config({ path: pathENV });

const apiPort = parseInt(process.env.API_PORT || "3000");

const dbHost = process.env.DB_HOST || "localhost";
const dbUser = process.env.DB_USER || "postgres";
const dbPassword = process.env.DB_PASSWORD || "postgres";
const dbName = process.env.DB_NAME || "postgres";
const dbPort = parseInt(process.env.DB_PORT || "5432");
const imagesUploadDir =
  process.env.IMAGES_UPLOADS_DIR || "public/uploads/images";
const imagesUploadUrl = process.env.IMAGES_UPLOADS_URL || "uploads/images";
const filesUploadDir = process.env.FILES_UPLOAD_DIR || "public/uploads/files";
const filesUploadUrl = process.env.FILES_UPLOAD_URL || "uploads/files";
const limit = Number(process.env.LIMIT || 20);

export {
  apiPort,
  dbHost,
  dbUser,
  dbPassword,
  dbName,
  dbPort,
  imagesUploadDir,
  imagesUploadUrl,
  limit,
  filesUploadDir,
  filesUploadUrl,
};
