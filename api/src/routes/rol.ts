import { Router } from "express";
import * as Rol from "../controllers/rol";
import auth from "../middlewares/auth";

const rolRoutes = Router();
rolRoutes.get("/", auth, Rol.getAll);
rolRoutes.get("/id/:id", auth, Rol.getById);
rolRoutes.post("/", auth, Rol.upsert);
rolRoutes.delete("/id/:id", auth, Rol.deleteById);
rolRoutes.put("/action/:id", auth, Rol.assignAction);
rolRoutes.delete("/action/remove/:id", auth, Rol.removeAction);

export default rolRoutes;
