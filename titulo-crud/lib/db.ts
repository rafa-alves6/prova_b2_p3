import { Pool } from 'pg';

declare global {
  // eslint-disable-next-line no-var
  var __pgPool: Pool | undefined;
}

const connectionString = process.env.DATABASE_URL ?? 'postgresql:///prova_b2';

export const pool = globalThis.__pgPool ?? new Pool({ connectionString });

if (process.env.NODE_ENV !== 'production') {
  globalThis.__pgPool = pool;
}
