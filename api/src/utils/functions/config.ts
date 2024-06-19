import cnf from "dotenv";
import path from "path";
import process from "process";

cnf.config();

const pathENV = path.join(__dirname, "..", ".env");
require("dotenv").config({ path: pathENV });
const config = {
  apiPort: parseInt(process.env.API_PORT || "3000"),
  dbHost: process.env.DB_HOST || "localhost",
  dbUser: process.env.DB_USER || "postgres",
  dbPassword: process.env.DB_PASSWORD || "postgres",
  dbName: process.env.DB_NAME || "postgres",
  dbPort: parseInt(process.env.DB_PORT || "5432"),
  apiKey: process.env.API_KEY || "1234",
};

export const imagesUploadDir =
  process.env.IMAGES_UPLOADS_DIR || "public/uploads/images";
export const imagesUploadUrl =
  process.env.IMAGES_UPLOADS_URL || "uploads/images";
export const filesUploadDir =
  process.env.FILES_UPLOAD_DIR || "public/uploads/files";
export const filesUploadUrl = process.env.FILES_UPLOAD_URL || "uploads/files";
export const limit = Number(process.env.LIMIT || 20);


export const mediaUploadDir =
  process.env.MEDIA_UPLOAD_DIR || "public/uploads/media";
export const mediaUploadUrl = process.env.MEDIA_UPLOAD_URL || "uploads/media";


export default config;
