# Prova B2 - REST API com PostgreSQL e TypeScript

Projeto em TypeScript com ExpressJS e PostgreSQL para reproduzir o DER informado, executar o DDL, popular as tabelas e expor CRUDs via API REST.

## Estrutura

- `sql/01-schema.sql`: cria o schema do banco.
- `sql/02-seed.sql`: insere pelo menos 10 registros em cada tabela.
- `src/`: API REST em ExpressJS com TypeScript.

## Como executar

1. Copie `.env.example` para `.env` e ajuste a `DATABASE_URL` se necessário.
2. Instale as dependências com `npm install`.
3. Crie o banco `prova_b2` no PostgreSQL.
4. Execute o schema e depois o seed.
5. Inicie a API com `npm run dev`.

## Endpoints

- `GET /health`
- `GET/POST/PUT/DELETE /api/instituicoes`
- `GET/POST/PUT/DELETE /api/tipos-curso`
- `GET/POST/PUT/DELETE /api/titulos`
- `GET/POST/PUT/DELETE /api/professores`
- `GET/POST/PUT/DELETE /api/cursos`
- `GET/POST/PUT/DELETE /api/tipos-disciplina`
- `GET/POST/PUT/DELETE /api/disciplinas`
- `GET/POST/PUT/DELETE /api/alunos`
- `GET/POST/DELETE /api/leciona`
- `GET/POST/PUT/DELETE /api/cursa`

## Observação sobre chaves compostas

- `leciona`: `id_professor` + `id_disciplina`
- `cursa`: `id_aluno` + `id_disciplina` + `in_ano` + `in_semestre`

## Exemplo de inicialização

```bash
npm run build
npm run start
```
