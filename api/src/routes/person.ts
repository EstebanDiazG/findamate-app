import { Router } from "express";
import * as Person from "../controllers/person";
import auth from "../middlewares/auth";

const personRoutes = Router();
personRoutes.get("/", auth, Person.getAll);
personRoutes.get("/id/:id", auth, Person.getById);
personRoutes.get("/rut/:rut", auth, Person.getByRut);
personRoutes.post("/", auth, Person.upsert);
personRoutes.delete("/id/:id", auth, Person.deleteById);
personRoutes.put("/personId/:personId", auth, Person.assignPerson);
personRoutes.delete("/personId/:personId", auth, Person.removePerson);
personRoutes.put("/personId/interest/:id_person", auth, Person.assignInterest);
personRoutes.delete(
  "/personId/removeInterest/:id_person",
  auth,
  Person.removeInterest
);
personRoutes.get(
  "/personId/getPerson/:id_person",
  auth,
  Person.getInterestsByPersonId
);

export default personRoutes;
