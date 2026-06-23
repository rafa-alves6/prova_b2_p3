import { Pool } from 'pg';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5432/prova_b2';

export const pool = new Pool({
  connectionString,
});
