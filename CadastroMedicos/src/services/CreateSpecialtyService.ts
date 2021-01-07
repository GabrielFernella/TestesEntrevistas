import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Specialty from '../models/Specialty';

interface ISpecialty {
  name: string;
}

class CreateSpecialtyService {
  public async execute({ name }: ISpecialty): Promise<Specialty> {
    const specialtyRepository = getRepository(Specialty);

    const checkUserExists = await specialtyRepository.findOne({
      where: { name },
    });
    if (checkUserExists) {
      throw new AppError('Especialidade já cadastrada', 400);
    }

    const specialtys = specialtyRepository.create({
      name,
    });

    await specialtyRepository.save(specialtys);
    return specialtys;
  }
}

export default CreateSpecialtyService;
