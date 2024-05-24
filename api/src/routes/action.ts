import { Router } from "express";
import * as Action from "../controllers/action";

const actionRoutes = Router();
actionRoutes.get("/", Action.getAll);
actionRoutes.get("/id/:id", Action.getById);
actionRoutes.get("/code/:code", Action.getByCode);
actionRoutes.post("/", Action.upsert);
actionRoutes.delete("/id/:id", Action.deleteById);

export default actionRoutes;
