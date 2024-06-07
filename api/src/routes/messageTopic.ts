import { Router } from "express";
import * as MessageTopic from "../controllers/messageTopic";
import auth from "../middlewares/auth";

const messageTopicRoutes = Router();
messageTopicRoutes.get("/", auth, MessageTopic.getAll);
messageTopicRoutes.get("/id/:id", auth, MessageTopic.getById);
messageTopicRoutes.get(
  "/idPerson/:id_person",
  auth,
  MessageTopic.getByIdPerson
);
messageTopicRoutes.get("/idTopic/:id_topic", auth, MessageTopic.getByIdTopic);
messageTopicRoutes.post("/", auth, MessageTopic.createMessage);
messageTopicRoutes.put("/id/:id", auth, MessageTopic.update);
messageTopicRoutes.delete("/id/:id", auth, MessageTopic.deleteById);

export default messageTopicRoutes;
