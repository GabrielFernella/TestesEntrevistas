import { Router } from 'express';
import * as Yup from 'yup';

import CreateSpecialtyService from '../services/CreateSpecialtyService';

const specialtyRoutes = Router();

specialtyRoutes.post('/', async (request, response) => {
  const createUser = new CreateSpecialtyService();

  const schema = Yup.object().shape({
    name: Yup.string().required(),
  });
  if (!(await schema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const user = request.body;

  const specialty = await createUser.execute(user);

  return response.json(specialty);
});

export default specialtyRoutes;
