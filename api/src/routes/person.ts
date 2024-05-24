import { Router } from "express";
import * as Person from "../controllers/person";

const personRoutes = Router();
personRoutes.get("/", Person.getAll);
personRoutes.get("/id/:id", Person.getById);
personRoutes.get("/rut/:rut", Person.getByRut);
personRoutes.post("/", Person.upsert);
personRoutes.delete("/id/:id", Person.deleteById);
personRoutes.put("/personId/:personId", Person.assignPerson);
personRoutes.delete("/personId/:personId", Person.removePerson);

export default personRoutes;
