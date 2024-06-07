import { Router } from "express";
import * as File from "../controllers/file";
import upload from "../middlewares/handlerUpload";
import auth from "../middlewares/auth";

const fileRoutes = Router();
fileRoutes.delete("/id/:id", auth, File.deleteFileById);
fileRoutes.get("/id/:id", auth, File.getFileById);
fileRoutes.post("/", upload.single("file"), auth, File.uploadFile);
fileRoutes.get("/search", auth, File.searchFiles);

export default fileRoutes;
