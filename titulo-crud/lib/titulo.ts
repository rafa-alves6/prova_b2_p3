import { pool } from '@/lib/db';

export type Titulo = {
  id_titulo: number;
  tx_descricao: string;
};

function normalizeDescricao(descricao: string) {
  return descricao.trim();
}

export async function listTitulos() {
  const result = await pool.query<Titulo>('SELECT id_titulo, tx_descricao FROM titulo ORDER BY id_titulo');
  return result.rows;
}

export async function getTituloById(id: number) {
  const result = await pool.query<Titulo>('SELECT id_titulo, tx_descricao FROM titulo WHERE id_titulo = $1 LIMIT 1', [id]);
  return result.rows[0] ?? null;
}

export async function createTitulo(descricao: string) {
  const txDescricao = normalizeDescricao(descricao);

  if (!txDescricao) {
    throw new Error('A descrição do título é obrigatória.');
  }

  const result = await pool.query<Titulo>('INSERT INTO titulo (tx_descricao) VALUES ($1) RETURNING id_titulo, tx_descricao', [txDescricao]);
  return result.rows[0];
}

export async function updateTitulo(id: number, descricao: string) {
  const txDescricao = normalizeDescricao(descricao);

  if (!txDescricao) {
    throw new Error('A descrição do título é obrigatória.');
  }

  const result = await pool.query<Titulo>(
    'UPDATE titulo SET tx_descricao = $1 WHERE id_titulo = $2 RETURNING id_titulo, tx_descricao',
    [txDescricao, id],
  );

  return result.rows[0] ?? null;
}

export async function deleteTitulo(id: number) {
  const result = await pool.query<Titulo>('DELETE FROM titulo WHERE id_titulo = $1 RETURNING id_titulo, tx_descricao', [id]);
  return result.rows[0] ?? null;
}
