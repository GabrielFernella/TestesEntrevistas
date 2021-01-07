import axios from 'axios';
import AppError from '../errors/AppError';

class QueryCep {
  public async execute(cep: string): Promise<any> {
    const findCep = (await axios.get(`https://viacep.com.br/ws/${cep}/json/`))
      .data;

    if (!findCep) {
      throw new AppError('CEP não encontrado', 400);
    }

    return findCep;
  }
}

export default QueryCep;
