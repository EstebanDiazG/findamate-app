import { Router } from "express";
import * as File from "../controllers/file";
import upload from "../middlewares/handlerUpload";

const fileRoutes = Router();
fileRoutes.delete("/id/:id", File.deleteFileById);
fileRoutes.get("/id/:id", File.getFileById);
fileRoutes.post("/", upload.single("file"), File.uploadFile);
fileRoutes.get("/search", File.searchFiles);

export default fileRoutes;
