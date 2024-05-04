import { Router } from 'express';
import * as User from '../controllers/user';
import { upsert } from '../controllers/person';

const userRoutes = Router();
userRoutes.get('/', User.getAll);
userRoutes.get('/email/:email', User.getByEmail);
userRoutes.post('/', User.upsert);
userRoutes.delete("/id/:id", User.deleteById);

export default userRoutes;