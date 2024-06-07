import { Router } from "express";
import * as Interest from "../controllers/interest";
import auth from "../middlewares/auth";

const interestRoutes = Router();
interestRoutes.get("/", auth, Interest.getAll);
interestRoutes.get("/id/:id", auth, Interest.getById);
interestRoutes.delete("/id/:id", auth, Interest.deleteById);

export default interestRoutes;
