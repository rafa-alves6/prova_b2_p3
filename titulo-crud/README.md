# CRUD de Títulos com Next.js

Aplicação em TypeScript com Next.js e TailwindCSS para gerenciar a tabela `titulo` no PostgreSQL.

## Funcionalidades

- Listagem com estado de carregamento "Carregando..."
- Criação de novos títulos
- Edição de títulos com exibição de erro na tela se a API falhar
- Exclusão com confirmação do usuário antes da operação
- API REST no próprio app com os endpoints:
  - `GET /titulo`
  - `GET /titulo/{id}`
  - `POST /titulo`
  - `PUT /titulo/{id}`
  - `DELETE /titulo/{id}`

## Como executar

1. Copie `.env.example` para `.env`.
2. Ajuste `DATABASE_URL` para o seu PostgreSQL.
3. Execute `npm install` dentro desta pasta.
4. Rode `npm run dev`.

## Seed

O arquivo `sql/02-seed.sql` limpa a tabela `titulo` e insere apenas estes registros:

- Mestre
- Doutor
- Pós-Doutor
- Especialista
- Graduado

## Páginas

- `/` lista os títulos.
- `/novo` cria um novo título.
- `/editar/[id]` edita um título existente.
