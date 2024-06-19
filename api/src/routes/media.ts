import { Router } from "express";
import multer from "multer";
import * as Media from "../controllers/media";
import auth from "../middlewares/auth";

// Configuración de Multer
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000, // 10MB
  },
});

const mediaRoutes = Router();

mediaRoutes.delete("/id/:id", auth, Media.deleteMediaById);
mediaRoutes.get("/id/:id", auth, Media.getMediaById);
mediaRoutes.post("/", upload.single("file"), auth, Media.uploadMedia);
mediaRoutes.get("/search", auth, Media.searchMedia);

export default mediaRoutes;