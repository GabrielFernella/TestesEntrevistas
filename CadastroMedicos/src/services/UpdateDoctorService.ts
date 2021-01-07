import { getRepository } from 'typeorm';

import { Request, Response } from 'express';
import AppError from '../errors/AppError';

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

class UpdateDoctorService {
  public async execute(user: IDoctor, id: string): Promise<Doctors> {
    const usersRepository = getRepository(Doctors);
    console.log(user);

    const checkUserExits = await usersRepository.findOne({
      where: {
        id,
      },
    });
    if (!checkUserExits) {
      throw new AppError('User not found', 400);
    }

    await usersRepository.update(id, user);
    const userUpdate = await usersRepository.findOne({
      where: {
        id,
      },
    });
    if (userUpdate === undefined) {
      throw new AppError('User not found', 400);
    }

    return userUpdate;
  }
}

export default UpdateDoctorService;
