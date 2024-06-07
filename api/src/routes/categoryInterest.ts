import { Router } from "express";
import * as categoryInterest from "../controllers/categoryInterest";
import auth from "../middlewares/auth";

const categoryInterestRoutes = Router();

categoryInterestRoutes.get("/", auth, categoryInterest.getAll);
categoryInterestRoutes.get("/id/:id", auth, categoryInterest.getById);
categoryInterestRoutes.delete("/id/:id", auth, categoryInterest.deleteById);

export default categoryInterestRoutes;
