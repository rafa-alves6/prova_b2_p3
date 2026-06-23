import { Router, type Request, type Response } from 'express';
import { pool } from './database';
import type { EntityDefinition } from './entities';

function buildWhereClause(columns: readonly string[], startIndex = 1) {
  return columns.map((column, index) => `${column} = $${startIndex + index}`).join(' AND ');
}

function getPrimaryKeyValues(definition: EntityDefinition, params: Request['params']) {
  return definition.primaryKey.map((column) => params[column]);
}

export function buildCrudRouter(definition: EntityDefinition) {
  const router = Router();
  const keyPath = definition.primaryKey.map((column) => `:${column}`).join('/');

  router.get('/', async (_request, response, next) => {
    try {
      const result = await pool.query(`SELECT * FROM ${definition.table} ORDER BY ${definition.primaryKey.join(', ')}`);
      response.json(result.rows);
    } catch (error) {
      next(error);
    }
  });

  router.get(`/${keyPath}`, async (request, response, next) => {
    try {
      const values = getPrimaryKeyValues(definition, request.params);
      const result = await pool.query(
        `SELECT * FROM ${definition.table} WHERE ${buildWhereClause(definition.primaryKey)} LIMIT 1`,
        values,
      );

      if (result.rowCount === 0) {
        response.status(404).json({ message: 'Registro não encontrado' });
        return;
      }

      response.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (request, response, next) => {
    try {
      const columns = definition.insertColumns.filter((column) => request.body[column] !== undefined);

      if (columns.length === 0) {
        response.status(400).json({ message: 'Nenhum campo válido foi informado' });
        return;
      }

      const values = columns.map((column) => request.body[column]);
      const placeholders = columns.map((_column, index) => `$${index + 1}`).join(', ');
      const result = await pool.query(
        `INSERT INTO ${definition.table} (${columns.join(', ')}) VALUES (${placeholders}) RETURNING *`,
        values,
      );

      response.status(201).json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  });

  if (definition.updateColumns.length > 0) {
    router.put(`/${keyPath}`, async (request, response, next) => {
      try {
        const columns = definition.updateColumns.filter((column) => request.body[column] !== undefined);

        if (columns.length === 0) {
          response.status(400).json({ message: 'Nenhum campo atualizável foi informado' });
          return;
        }

        const values = columns.map((column) => request.body[column]);
        const primaryKeyValues = getPrimaryKeyValues(definition, request.params);
        const result = await pool.query(
          `UPDATE ${definition.table} SET ${columns.map((column, index) => `${column} = $${index + 1}`).join(', ')} WHERE ${buildWhereClause(definition.primaryKey, columns.length + 1)} RETURNING *`,
          [...values, ...primaryKeyValues],
        );

        if (result.rowCount === 0) {
          response.status(404).json({ message: 'Registro não encontrado' });
          return;
        }

        response.json(result.rows[0]);
      } catch (error) {
        next(error);
      }
    });
  }

  router.delete(`/${keyPath}`, async (request, response, next) => {
    try {
      const values = getPrimaryKeyValues(definition, request.params);
      const result = await pool.query(
        `DELETE FROM ${definition.table} WHERE ${buildWhereClause(definition.primaryKey)} RETURNING *`,
        values,
      );

      if (result.rowCount === 0) {
        response.status(404).json({ message: 'Registro não encontrado' });
        return;
      }

      response.status(204).send();
    } catch (error) {
      next(error);
    }
  });

  return router;
}
