import { Router } from 'express';
import * as Topic from '../controllers/topic';

const topicRoutes = Router();
topicRoutes.get('/', Topic.getAll);
topicRoutes.get('/id/:id', Topic.getById);
topicRoutes.get('/idPerson/:id_person', Topic.getByIdPerson);
topicRoutes.post("/", Topic.upsert);
topicRoutes.put('/id/:id', Topic.update);
topicRoutes.delete('/id/:id',Topic.deleteById);



export default topicRoutes;