import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Specialty from '../models/Specialty';

class ValidateSpecialty {
  public async execute(especialidade: string[]): Promise<boolean> {
    const specialtyRepository = getRepository(Specialty);

    const getSpecialtys = await specialtyRepository.find();

    if (!getSpecialtys) {
      throw new AppError('Especialidade inválida', 400);
    }

    /* const value = 0;
    getSpecialtys.forEach(element => {
      const math = especialidade.includes(element.name);
      if (math === true) {
        return true;
      }
    });

    console.log(value);
    if (value !== especialidade.length) {
      return false;
    } */

    return true;
  }
}

export default ValidateSpecialty;
