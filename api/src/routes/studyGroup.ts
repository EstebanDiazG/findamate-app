import { Router } from "express";
import * as StudyGroup from "../controllers/studyGroup";

const studyGroupRoutes = Router();

studyGroupRoutes.get("/", StudyGroup.getAll);
studyGroupRoutes.get("/id/:id", StudyGroup.getById);
studyGroupRoutes.post("/", StudyGroup.upsert);
studyGroupRoutes.delete("/id/:id", StudyGroup.deleteById);

export default studyGroupRoutes;
