import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Doctors from '../models/Doctors';

class DeleteDoctorService {
  public async execute(id: string): Promise<any> {
    const usersRepository = getRepository(Doctors);

    const checkUserExits = await usersRepository.findOne({
      where: {
        id,
      },
    });
    if (!checkUserExits) {
      throw new AppError('User not found', 400);
    }

    await usersRepository.delete(id);
  }
}

export default DeleteDoctorService;
