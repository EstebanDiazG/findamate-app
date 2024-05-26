import { Router } from 'express';
import * as MessageTopic from '../controllers/messageTopic';

const messageTopicRoutes = Router();
messageTopicRoutes.get('/', MessageTopic.getAll);
messageTopicRoutes.get('/id/:id', MessageTopic.getById);
messageTopicRoutes.get('/idPerson/:id_person', MessageTopic.getByIdPerson);
messageTopicRoutes.get('/idTopic/:id_topic', MessageTopic.getByIdTopic);
messageTopicRoutes.post("/", MessageTopic.createMessage);
messageTopicRoutes.put('/id/:id', MessageTopic.update);
messageTopicRoutes.delete('/id/:id',MessageTopic.deleteById);

export default messageTopicRoutes;