import { Router } from "express";
import * as Action from "../controllers/action";
import auth from "../middlewares/auth";

const actionRoutes = Router();
actionRoutes.get("/", auth, Action.getAll);
actionRoutes.get("/id/:id", auth, Action.getById);
actionRoutes.get("/code/:code", auth, Action.getByCode);
actionRoutes.post("/", auth, Action.upsert);
actionRoutes.delete("/id/:id", auth, Action.deleteById);

export default actionRoutes;
