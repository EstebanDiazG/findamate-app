import { Router } from "express";
import * as Profile from "../controllers/profile";
import auth from "../middlewares/auth";

const profileRoutes = Router();
profileRoutes.get("/", auth, Profile.getAll);
profileRoutes.get("/id/:id", auth, Profile.getById);
profileRoutes.get("/id_person/:id_person", auth, Profile.getByIdPerson);
profileRoutes.delete("/id/:id", auth, Profile.deleteById);
profileRoutes.put("/id/:id", auth, Profile.update);

export default profileRoutes;
