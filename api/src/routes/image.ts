import { Router } from "express";
import multer from "multer";
import * as Image from "../controllers/image";
import auth from "../middlewares/auth";
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000,
  },
});

const imageRoutes = Router();
imageRoutes.delete("/id/:id", auth, Image.deleteImageById);
imageRoutes.get("/search", auth, Image.searchImages);
imageRoutes.get("/id/:id", auth, Image.getImageById);
imageRoutes.post("/", upload.single("file"), auth, Image.uploadImage);

export default imageRoutes;
