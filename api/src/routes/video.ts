import { Router } from "express";
import * as Video from "../controllers/video";

const videoRoutes = Router();
videoRoutes.get("/", Video.getAll);
videoRoutes.get("/id/:id", Video.getById);
videoRoutes.get("/personId/:idPerson", Video.getByPerson);
videoRoutes.post("/", Video.upsert);
videoRoutes.delete("/id/:id", Video.deleteById);
videoRoutes.put("/like/:idPerson", Video.likeVideo);
videoRoutes.delete("/dislike/:idPerson", Video.removeLike);
videoRoutes.put("/comment/:idPerson", Video.giveComment);
videoRoutes.delete("/comment/:idPerson", Video.removeComment);

export default videoRoutes;
