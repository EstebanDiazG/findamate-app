import { Router } from "express";
import * as StudyGroup from "../controllers/studyGroup";
import auth from "../middlewares/auth";

const studyGroupRoutes = Router();

studyGroupRoutes.get("/", auth, StudyGroup.getAll);
studyGroupRoutes.get("/id/:id", auth, StudyGroup.getById);
studyGroupRoutes.post("/", auth, StudyGroup.upsert);
studyGroupRoutes.delete("/id/:id", auth, StudyGroup.deleteById);

export default studyGroupRoutes;
