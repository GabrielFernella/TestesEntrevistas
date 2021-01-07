import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Doctors from '../models/Doctors';

class SelectDoctorService {
  public async execute(find: string): Promise<Doctors> {
    const usersRepository = getRepository(Doctors);

    const user = await usersRepository.findOne({
      where: [
        { crm: find },
        { name: find },
        { telefonefixo: find },
        { telefonecell: find },
        { cep: find },
        { endereco: find },
        { especialidade: find },
      ],
    });
    if (!user) {
      throw new AppError('User not found', 400);
    }

    return user;
  }
}

export default SelectDoctorService;
