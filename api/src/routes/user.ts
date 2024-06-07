import { Router } from "express";
import * as User from "../controllers/user";
import auth from "../middlewares/auth";

const userRoutes = Router();
userRoutes.get("/", auth, User.getAll);
userRoutes.get("/id/:id", auth, User.getById);
userRoutes.get("/rut/:rut", auth, User.getByRut);
userRoutes.post("/", auth, User.upsert);
userRoutes.delete("/id/:id", auth, User.deleteById);
userRoutes.put("/update", auth, User.updatePass);
userRoutes.post("/validate", auth, User.validate);
userRoutes.put("/rol/:userId", auth, User.assignRol);
userRoutes.delete("/rol/:userId", auth, User.removeRol);

export default userRoutes;
