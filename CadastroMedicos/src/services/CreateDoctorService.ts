import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import QueryCep from './QueryCep';
import ValidateSpecialty from './ValidateSpecialty';

import Doctors from '../models/Doctors';

interface IDoctor {
  name: string;
  crm: string;
  telefonefixo: string;
  telefonecell: string;
  cep: string;
  endereco: string[];
  especialidade: string[];
}

class CreateDoctorService {
  public async execute({
    name,
    crm,
    telefonefixo,
    telefonecell,
    cep,
    especialidade,
  }: IDoctor): Promise<Doctors> {
    const usersRepository = getRepository(Doctors);

    const checkUserExists = await usersRepository.findOne({
      where: { crm },
    });
    if (checkUserExists) {
      throw new AppError('CRM já cadastrado', 400);
    }

    // validate cep
    const queryCep = new QueryCep();
    const adress = await queryCep.execute(cep);
    if (adress.erro === true) {
      throw new AppError('CEP not found', 400);
    }

    // validate specialty
    const existsSpecialty = new ValidateSpecialty();
    const specialtysValid = await existsSpecialty.execute(especialidade);

    if (specialtysValid === false) {
      throw new AppError('Alguma das especialidades está inválida', 400);
    }

    const user = usersRepository.create({
      name,
      crm,
      telefonefixo,
      telefonecell,
      cep,
      endereco: adress,
      especialidade,
    });

    await usersRepository.save(user);
    return user;
  }
}

export default CreateDoctorService;
