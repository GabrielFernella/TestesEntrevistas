import { Router } from 'express';
import doctorRoutes from './doctor.routes';
import specialtyRoutes from './specialty.routes';

const routes = Router();

routes.use('/doctor', doctorRoutes);
routes.use('/specialty', specialtyRoutes);

export default routes;
