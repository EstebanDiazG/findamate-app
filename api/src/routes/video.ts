import { Router } from "express";
import * as Video from "../controllers/video";
import auth from "../middlewares/auth";

const videoRoutes = Router();
videoRoutes.get("/", auth, Video.getAll);
videoRoutes.get("/id/:id", auth, Video.getById);
videoRoutes.get("/personId/:idPerson", auth, Video.getByPerson);
videoRoutes.post("/", auth, Video.upsert);
videoRoutes.delete("/id/:id", auth, Video.deleteById);
videoRoutes.put("/like/:idPerson", auth, Video.likeVideo);
videoRoutes.delete("/dislike/:idPerson", auth, Video.removeLike);
videoRoutes.put("/comment/:idPerson", auth, Video.giveComment);
videoRoutes.delete("/comment/:idPerson", auth, Video.removeComment);

export default videoRoutes;
