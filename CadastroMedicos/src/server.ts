import 'reflect-metadata'; // precisa desse recurso do TypeORM para entender algumas sintaxe

import express, { Request, Response, NextFunction } from 'express'; // Utilizando no middleware de erros
import 'express-async-errors'; // para que nosso middleware de erros entenda métodos async
import cors from 'cors';

import AppError from './errors/AppError';
import routes from './routes';

import './database';

const app = express();

app.use(cors()); // permite a conexão autorizada entre nosso frontend
app.use(express.json());
app.use(routes);

// As tratativas de erros devem ser declaradas depois das rotas
// Middleware de tratativas de erros
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  // se o erro veio da tratativa de erros da minha aplicação
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  // erro interno (erro não reconhecido)
  return response.status(500).json({
    status: 'error',
    message: `Internal server Error: ${err.message}`,
  });
});

app.listen(3333, () => {
  console.log('\x1b[32m', 'Server started on http://localhost:3333 ✔');
});
