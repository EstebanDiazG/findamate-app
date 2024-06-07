import { Router } from "express";
import * as Topic from "../controllers/topic";
import auth from "../middlewares/auth";

const topicRoutes = Router();
topicRoutes.get("/", auth, Topic.getAll);
topicRoutes.get("/id/:id", auth, Topic.getById);
topicRoutes.get("/idPerson/:id_person", auth, Topic.getByIdPerson);
topicRoutes.post("/", auth, Topic.upsert);
topicRoutes.put("/id/:id", auth, Topic.update);
topicRoutes.delete("/id/:id", auth, Topic.deleteById);

export default topicRoutes;
