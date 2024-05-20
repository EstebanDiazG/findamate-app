import { Router } from "express";
import * as Rol from "../controllers/rol";

const rolRoutes = Router();
rolRoutes.get("/", Rol.getAll);
rolRoutes.get("/id/:id", Rol.getById);
rolRoutes.post("/", Rol.upsert);
rolRoutes.delete("/id/:id", Rol.deleteById);
rolRoutes.put("/action/:id", Rol.assignAction);
rolRoutes.delete("/action/remove/:id", Rol.removeAction);

export default rolRoutes;
