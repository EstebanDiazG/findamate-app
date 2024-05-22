import { Router } from "express";
import multer from "multer";
import * as Image from "../controllers/image";
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000,
  },
});

const imageRoutes = Router();
imageRoutes.delete("/id/:id", Image.deleteImageById);
imageRoutes.get("/search", Image.searchImages);
imageRoutes.get("/id/:id", Image.getImageById);
imageRoutes.post("/", upload.single("file"), Image.uploadImage);

export default imageRoutes;
