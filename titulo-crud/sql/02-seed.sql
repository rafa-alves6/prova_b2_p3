BEGIN;

TRUNCATE TABLE leciona, professor, titulo RESTART IDENTITY CASCADE;

INSERT INTO titulo (tx_descricao) VALUES
  ('Mestre'),
  ('Doutor'),
  ('Pós-Doutor'),
  ('Especialista'),
  ('Graduado');

COMMIT;
