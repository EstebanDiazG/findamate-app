import { Router } from 'express';
import * as Person from '../controllers/person';

const personRoutes = Router();
personRoutes.get('/', Person.getAll);
personRoutes.get('/id/:id', Person.getById);

export default personRoutes;
