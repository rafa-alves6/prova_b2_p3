BEGIN;

TRUNCATE TABLE cursa, leciona, disciplina, curso, aluno, professor, tipo_disciplina, titulo, tipo_curso, instituicao RESTART IDENTITY CASCADE;

INSERT INTO tipo_curso (tx_descricao) VALUES
  ('Tecnico'),
  ('Tecnologia'),
  ('Bacharelado'),
  ('Licenciatura'),
  ('Especializacao'),
  ('Mestrado'),
  ('Doutorado'),
  ('Integrado'),
  ('Subsequente'),
  ('Extensao');

INSERT INTO tipo_disciplina (tx_descricao) VALUES
  ('Fundamentos'),
  ('Matematica'),
  ('Programacao'),
  ('Banco de Dados'),
  ('Redes'),
  ('Sistemas Operacionais'),
  ('Engenharia de Software'),
  ('Estatistica'),
  ('Pesquisa'),
  ('Projeto Integrador');

INSERT INTO titulo (tx_descricao) VALUES
  ('Graduado'),
  ('Especialista'),
  ('Mestre'),
  ('Doutor'),
  ('Pós-Doutor'),
  ('Licenciado'),
  ('Tecnologo'),
  ('Bacharel'),
  ('Professor Associado'),
  ('Professor Titular');

INSERT INTO instituicao (tx_sigla, tx_descricao) VALUES
  ('IFSP', 'Instituto Federal de Sao Paulo'),
  ('IFRJ', 'Instituto Federal do Rio de Janeiro'),
  ('IFMG', 'Instituto Federal de Minas Gerais'),
  ('IFRN', 'Instituto Federal do Rio Grande do Norte'),
  ('IFBA', 'Instituto Federal da Bahia'),
  ('IFCE', 'Instituto Federal do Ceara'),
  ('IFSul', 'Instituto Federal Sul-rio-grandense'),
  ('IFSC', 'Instituto Federal de Santa Catarina'),
  ('IFPR', 'Instituto Federal do Parana'),
  ('IFGoiano', 'Instituto Federal Goiano');

INSERT INTO aluno (tx_nome, tx_sexo, dt_nascimento) VALUES
  ('Ana Silva', 'f', '2003-01-12'),
  ('Bruno Souza', 'm', '2002-05-22'),
  ('Carla Lima', 'f', '2001-09-14'),
  ('Diego Alves', 'm', '2004-03-30'),
  ('Elaine Costa', 'f', '2002-11-08'),
  ('Fabio Rocha', 'm', '2003-06-19'),
  ('Gabriela Nunes', 'f', '2001-12-01'),
  ('Henrique Martins', 'm', '2002-07-27'),
  ('Isabela Fernandes', 'f', '2004-02-09'),
  ('Joao Pereira', 'm', '2003-10-16');

INSERT INTO professor (id_titulo, tx_nome, tx_sexo, tx_estado_civil, dt_nascimento, tx_telefone)
SELECT t.id_titulo, v.tx_nome, v.tx_sexo, v.tx_estado_civil, v.dt_nascimento, v.tx_telefone
FROM (
  VALUES
    ('Doutor', 'Marcos Vieira', 'm', 'c', '1978-02-14'::date, '11990000001'),
    ('Mestre', 'Patricia Gomes', 'f', 's', '1980-04-08'::date, '11990000002'),
    ('Especialista', 'Ricardo Mendes', 'm', 'c', '1976-08-25'::date, '11990000003'),
    ('Graduado', 'Fernanda Alves', 'f', 'd', '1985-01-30'::date, '11990000004'),
    ('Professor Titular', 'Carlos Eduardo', 'm', 'c', '1972-11-11'::date, '11990000005'),
    ('Professor Associado', 'Juliana Freitas', 'f', 's', '1983-09-17'::date, '11990000006'),
    ('Licenciado', 'Rafael Costa', 'm', 'c', '1979-12-02'::date, '11990000007'),
    ('Tecnologo', 'Sonia Ribeiro', 'f', 'c', '1981-06-21'::date, '11990000008'),
    ('Bacharel', 'Thiago Almeida', 'm', 's', '1977-03-05'::date, '11990000009'),
    ('Pós-Doutor', 'Leticia Barbosa', 'f', 'c', '1975-10-19'::date, '11990000010')
) AS v(tx_titulo, tx_nome, tx_sexo, tx_estado_civil, dt_nascimento, tx_telefone)
JOIN titulo t ON t.tx_descricao = v.tx_titulo;

INSERT INTO curso (id_instituicao, id_tipo_curso, tx_descricao)
SELECT i.id_instituicao, tc.id_tipo_curso, v.tx_descricao
FROM (
  VALUES
    ('IFSP', 'Tecnico', 'Tecnico em Informatica'),
    ('IFRJ', 'Tecnologia', 'Tecnologia em Analise e Desenvolvimento de Sistemas'),
    ('IFMG', 'Bacharelado', 'Bacharelado em Sistemas de Informacao'),
    ('IFRN', 'Licenciatura', 'Licenciatura em Computacao'),
    ('IFBA', 'Especializacao', 'Especializacao em Desenvolvimento Web'),
    ('IFCE', 'Mestrado', 'Mestrado em Informatica'),
    ('IFSul', 'Doutorado', 'Doutorado em Ciencia da Computacao'),
    ('IFSC', 'Integrado', 'Ensino Medio Integrado em Informatica'),
    ('IFPR', 'Subsequente', 'Tecnico Subsequente em Redes'),
    ('IFGoiano', 'Extensao', 'Extensao em Programacao')
) AS v(tx_sigla, tx_tipo_curso, tx_descricao)
JOIN instituicao i ON i.tx_sigla = v.tx_sigla
JOIN tipo_curso tc ON tc.tx_descricao = v.tx_tipo_curso;

INSERT INTO disciplina (id_curso, id_tipo_disciplina, tx_sigla, tx_descricao, in_periodo, in_carga_horaria)
SELECT c.id_curso, td.id_tipo_disciplina, v.tx_sigla, v.tx_descricao, v.in_periodo, v.in_carga_horaria
FROM (
  VALUES
    ('Tecnico em Informatica', 'Fundamentos', 'INF01', 'Introducao a Computacao', 1, 80),
    ('Tecnologia em Analise e Desenvolvimento de Sistemas', 'Matematica', 'MAT02', 'Matematica Discreta', 2, 80),
    ('Bacharelado em Sistemas de Informacao', 'Programacao', 'PRG03', 'Programacao I', 3, 120),
    ('Licenciatura em Computacao', 'Banco de Dados', 'BDD04', 'Banco de Dados I', 4, 80),
    ('Especializacao em Desenvolvimento Web', 'Redes', 'RED05', 'Redes de Computadores', 5, 80),
    ('Mestrado em Informatica', 'Sistemas Operacionais', 'SOP06', 'Sistemas Operacionais Avancados', 6, 60),
    ('Doutorado em Ciencia da Computacao', 'Engenharia de Software', 'ESW07', 'Engenharia de Software', 7, 80),
    ('Ensino Medio Integrado em Informatica', 'Estatistica', 'EST08', 'Estatistica Aplicada', 8, 60),
    ('Tecnico Subsequente em Redes', 'Pesquisa', 'PES09', 'Metodologia de Pesquisa', 9, 40),
    ('Extensao em Programacao', 'Projeto Integrador', 'PIN10', 'Projeto Integrador', 10, 100)
) AS v(tx_curso, tx_tipo_disciplina, tx_sigla, tx_descricao, in_periodo, in_carga_horaria)
JOIN curso c ON c.tx_descricao = v.tx_curso
JOIN tipo_disciplina td ON td.tx_descricao = v.tx_tipo_disciplina;

INSERT INTO leciona (id_professor, id_disciplina)
SELECT p.id_professor, d.id_disciplina
FROM (
  SELECT id_professor, row_number() OVER (ORDER BY id_professor) AS rn
  FROM professor
) AS p
JOIN (
  SELECT id_disciplina, row_number() OVER (ORDER BY id_disciplina) AS rn
  FROM disciplina
) AS d USING (rn)
ORDER BY p.rn;

INSERT INTO cursa (id_aluno, id_disciplina, in_ano, in_semestre, in_faltas, nm_nota1, nm_nota2, nm_nota3, bl_aprovado)
SELECT a.id_aluno,
       d.id_disciplina,
       2025,
       CASE WHEN a.rn <= 5 THEN 1 ELSE 2 END,
       a.rn - 1,
       (7.0 + (a.rn * 0.1))::numeric(4,2),
       (7.5 + (a.rn * 0.1))::numeric(4,2),
       (8.0 + (a.rn * 0.1))::numeric(4,2),
       TRUE
FROM (
  SELECT id_aluno, row_number() OVER (ORDER BY id_aluno) AS rn
  FROM aluno
) AS a
JOIN (
  SELECT id_disciplina, row_number() OVER (ORDER BY id_disciplina) AS rn
  FROM disciplina
) AS d USING (rn)
ORDER BY a.rn;

COMMIT;
