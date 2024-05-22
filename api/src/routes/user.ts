import { Router } from 'express';
import * as User from "../controllers/user";

const userRoutes = Router();
userRoutes.get("/", User.getAll);
userRoutes.get("/id/:id", User.getById);
userRoutes.get("/rut/:rut", User.getByRut);
userRoutes.post("/", User.upsert);
userRoutes.delete("/id/:id", User.deleteById);
userRoutes.put("/update", User.updatePass);
userRoutes.post("/validate", User.validate);
userRoutes.put("/rol/:userId", User.assignRol);
userRoutes.delete("/rol/:userId", User.removeRol);


export default userRoutes;