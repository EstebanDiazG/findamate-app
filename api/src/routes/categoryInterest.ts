import { Router } from 'express';
import * as categoryInterest from '../controllers/categoryInterest';

const categoryInterestRoutes = Router();

categoryInterestRoutes.get('/', categoryInterest.getAll);
categoryInterestRoutes.get('/id/:id', categoryInterest.getById);
categoryInterestRoutes.delete("/id/:id", categoryInterest.deleteById);

export default categoryInterestRoutes;