import { Router } from 'express';
import * as User from '../controllers/user';
import { auth } from '../middlewares/jwtValidate';

const userRoutes = Router();
userRoutes.get('/', auth, User.getAll);
userRoutes.get('/email/:email', auth, User.getByEmail);
userRoutes.post('/', User.upsert);
userRoutes.delete('/id/:id', auth, User.deleteById);
userRoutes.post('/login', User.login);


export default userRoutes;