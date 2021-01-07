/* eslint-disable prettier/prettier */
import { Router } from 'express';
import * as Yup from 'yup';

import CreateDoctorService from '../services/CreateDoctorService';
import SelectDoctorService from '../services/SelectDoctorService';
import UpdateDoctorService from '../services/UpdateDoctorService';
import DeleteDoctorService from '../services/DeleteDoctorService';

const doctorRoutes = Router();

doctorRoutes.get('/:find', async (request, response) => {
  const { find } = request.params;

  const selectUser = new SelectDoctorService();
  const user = await selectUser.execute(find);

  return response.json(user);
});

doctorRoutes.post('/', async (request, response) => {
  const regexCRM = new RegExp('[0-9]{2}[.][0-9]{3}[.][0-9]{2}');
  const regexCEP = new RegExp('[0-9]{5}[-][0-9]{3}');

  const createUser = new CreateDoctorService();

  const schema = Yup.object().shape({
    name: Yup.string().required().max(122),
    crm: Yup.string().required().matches(regexCRM, 'CRM inválido'),
    telefonefixo: Yup.string().required(),
    telefonecell: Yup.string().required(),
    cep: Yup.string().required().matches(regexCEP, 'CEP inválido'),
    especialidade: Yup.array().required().min(2),
  });
  if (!(await schema.isValid(request.body))) {
    return response.status(400).json({ error: `Validation fails` });
  }

  const user = request.body;

  const doctor = await createUser.execute(user);

  return response.json(doctor);
});

doctorRoutes.put('/:id', async (request, response) => {
  const { id } = request.params;
  const doctor = request.body;

  const updateUser = new UpdateDoctorService();
  const user = await updateUser.execute(doctor, id);

  return response.json(user);
});

doctorRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteUser = new DeleteDoctorService();
  const user = await deleteUser.execute(id);

  return response.json(user);
});

export default doctorRoutes;
