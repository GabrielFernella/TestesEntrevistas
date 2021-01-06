import { Router } from 'express';
import * as Yup from 'yup';

import CreateDoctorService from '../services/CreateDoctorService';

const routes = Router();

routes.post('/create', async (request, response) => {
  const createUser = new CreateDoctorService();

  const schema = Yup.object().shape({
    name: Yup.string().required().max(122),
    crm: Yup.string().required(),
    telefonefixo: Yup.string().required(),
    telefonecell: Yup.string().required(),
    cep: Yup.string().required(),
    especialidade: Yup.array().required().min(2),
  });
  if (!(await schema.isValid(request.body))) {
    return response.status(400).json({ error: 'Validation fails' });
  }

  const user = request.body;

  const doctor = await createUser.execute(user);

  return response.json(doctor);
});

export default routes;

/*
Desenvolver um sistema que faça a gestão de cadastros de médicos. O Sistema deve suportar as seguintes operações:
• Insert
• Update
• Select
• Soft Delete

No cadastro do médico devem ser cadastrados os seguintes itens abaixo:
• Nome do Médico com no máximo 120 caracteres
• CRM somente Números e no formato (00.000.00)
• Telefone Fixo
• Telefone Celular
• CEP Formatado (00000-000)
    Ao cadastrar o Cep deve ser feita uma requisição via XHR para a api dos correios e retornar todos os dados de endereço do cliente.
• Especialidade médica (ao mínimo duas especialidades)

Itens importantes:
• Poder realizar pesquisas por todos os campos do cadastro do médico inclusive endereço.
• Estar em no padrão REST
• Utilizar alguma ferramenta de validação (exemplo YUP)
• Funções Especialistas (Realizam somente uma operação)
• Utilizar o Postman ou Insomina (documentação e requisição)
• GIT

{
	"name":"fulano",
	"crm":"654321",
	"telefonefixo":"999999999",
	"telefonecell":"888888888",
	"cep":"0511-988",
	"especialidade":["neuro", "Rino"]
}
*/
