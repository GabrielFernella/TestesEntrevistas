import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Doctor from '../models/Doctor';

interface IDoctor {
  name: string;
  crm: string;
  telefonefixo: string;
  telefonecell: string;
  cep: string;
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
  }: IDoctor): Promise<Doctor> {
    const usersRepository = getRepository(Doctor);

    const checkUserExists = await usersRepository.findOne({
      where: { crm },
    });
    if (checkUserExists) {
      throw new AppError('CRM já cadastrado', 400);
    }

    // Cria o usuário na memoria
    const user = usersRepository.create({
      name,
      crm,
      telefonefixo,
      telefonecell,
      cep,
      especialidade,
    });

    // Salva o usuário no banco
    await usersRepository.save(user);
    return user;
  }
}

export default CreateDoctorService;
