import express from 'express';
import { buildCrudRouter } from './crud-router';
import { entities } from './entities';

export const app = express();

app.use(express.json());

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' });
});

for (const entity of entities) {
  app.use(entity.route, buildCrudRouter(entity));
}

app.use((_request, response) => {
  response.status(404).json({ message: 'Rota não encontrada' });
});

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  if (error instanceof Error && 'code' in error) {
    response.status(400).json({ message: error.message });
    return;
  }

  console.error(error);
  response.status(500).json({ message: 'Erro interno do servidor' });
});
