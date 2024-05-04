import { Router } from 'express';
import * as User from '../controllers/user';

const userRoutes = Router();
userRoutes.get('/', User.getAll);
userRoutes.get('/rut/:rut', User.getByRut);
userRoutes.delete("/id/:id", User.deleteById);

export default userRoutes;