import 'dotenv/config';
import { app } from './app';
import { pool } from './database';

const port = Number(process.env.PORT ?? 3000);

async function main() {
  await pool.query('SELECT 1');

  app.listen(port, () => {
    console.log(`API REST executando em http://localhost:${port}`);
  });
}

main().catch((error) => {
  console.error('Falha ao iniciar a aplicação:', error);
  process.exit(1);
});
