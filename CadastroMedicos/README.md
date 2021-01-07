# Teste - Crud com algumas funcionalidades

### Motivo

Teste para estágio.

### Executando Projeto

1. Rode o comando "yarn" ou "npm" para instalar as dependências
2. O arquivo ormconfig.json possui as informações do banco de dados (utilizei o postgres rodando em um container Docker)
3. Utilize o insomnia para fazer as requisições

# Rotas

## Find Doctor

Route => <http://localhost:3333/doctor/:string>

## Create Doctor

Route => <http://localhost:3333/doctor>
Body => {
"name":"teste",
"crm":"52.555.46",
"telefonefixo":"999999999",
"telefonecell":"888888888",
"cep":"05184-700",
"especialidade":["Neuro", "Rino"]
}

## Create Especialty

Route => <http://localhost:3333/specialty>
Body => {
"name":"ALERGOLOGIA"
}

## Update Doctor

Route => <http://localhost:3333/doctor/:id>
Body => {
"name":"Exemplo",
"crm":"52.555.28",
"cep":"05184-450",
"especialidade":["ALERGOLOGIA", "ANGIOLOGIA"]
}

## Delete Doctor

Route => <http://localhost:3333/doctor/:id>
