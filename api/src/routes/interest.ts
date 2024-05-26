import { Router } from 'express';
import * as Interest from '../controllers/interest';

const interestRoutes = Router();
interestRoutes.get('/', Interest.getAll);
interestRoutes.get('/id/:id', Interest.getById);
interestRoutes.delete("/id/:id", Interest.deleteById);

export default interestRoutes;

