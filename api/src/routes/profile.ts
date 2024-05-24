import { Router } from 'express';
import * as Profile from '../controllers/profile';

const profileRoutes = Router();
profileRoutes.get('/', Profile.getAll);
profileRoutes.get('/id/:id', Profile.getById);
profileRoutes.get('/id_person/:id_person', Profile.getByIdPerson);
profileRoutes.delete('/id/:id',Profile.deleteById);
profileRoutes.put('/id/:id', Profile.update);


export default profileRoutes;