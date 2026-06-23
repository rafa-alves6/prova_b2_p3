export type EntityDefinition = {
  route: string;
  table: string;
  primaryKey: readonly string[];
  insertColumns: readonly string[];
  updateColumns: readonly string[];
};

export const entities: EntityDefinition[] = [
  {
    route: '/api/instituicoes',
    table: 'instituicao',
    primaryKey: ['id_instituicao'],
    insertColumns: ['tx_sigla', 'tx_descricao'],
    updateColumns: ['tx_sigla', 'tx_descricao'],
  },
  {
    route: '/api/tipos-curso',
    table: 'tipo_curso',
    primaryKey: ['id_tipo_curso'],
    insertColumns: ['tx_descricao'],
    updateColumns: ['tx_descricao'],
  },
  {
    route: '/api/titulos',
    table: 'titulo',
    primaryKey: ['id_titulo'],
    insertColumns: ['tx_descricao'],
    updateColumns: ['tx_descricao'],
  },
  {
    route: '/api/professores',
    table: 'professor',
    primaryKey: ['id_professor'],
    insertColumns: ['id_titulo', 'tx_nome', 'tx_sexo', 'tx_estado_civil', 'dt_nascimento', 'tx_telefone'],
    updateColumns: ['id_titulo', 'tx_nome', 'tx_sexo', 'tx_estado_civil', 'dt_nascimento', 'tx_telefone'],
  },
  {
    route: '/api/cursos',
    table: 'curso',
    primaryKey: ['id_curso'],
    insertColumns: ['id_instituicao', 'id_tipo_curso', 'tx_descricao'],
    updateColumns: ['id_instituicao', 'id_tipo_curso', 'tx_descricao'],
  },
  {
    route: '/api/tipos-disciplina',
    table: 'tipo_disciplina',
    primaryKey: ['id_tipo_disciplina'],
    insertColumns: ['tx_descricao'],
    updateColumns: ['tx_descricao'],
  },
  {
    route: '/api/disciplinas',
    table: 'disciplina',
    primaryKey: ['id_disciplina'],
    insertColumns: ['id_curso', 'id_tipo_disciplina', 'tx_sigla', 'tx_descricao', 'in_periodo', 'in_carga_horaria'],
    updateColumns: ['id_curso', 'id_tipo_disciplina', 'tx_sigla', 'tx_descricao', 'in_periodo', 'in_carga_horaria'],
  },
  {
    route: '/api/alunos',
    table: 'aluno',
    primaryKey: ['id_aluno'],
    insertColumns: ['tx_nome', 'tx_sexo', 'dt_nascimento'],
    updateColumns: ['tx_nome', 'tx_sexo', 'dt_nascimento'],
  },
  {
    route: '/api/leciona',
    table: 'leciona',
    primaryKey: ['id_professor', 'id_disciplina'],
    insertColumns: ['id_professor', 'id_disciplina'],
    updateColumns: [],
  },
  {
    route: '/api/cursa',
    table: 'cursa',
    primaryKey: ['id_aluno', 'id_disciplina', 'in_ano', 'in_semestre'],
    insertColumns: ['id_aluno', 'id_disciplina', 'in_ano', 'in_semestre', 'in_faltas', 'nm_nota1', 'nm_nota2', 'nm_nota3', 'bl_aprovado'],
    updateColumns: ['in_faltas', 'nm_nota1', 'nm_nota2', 'nm_nota3', 'bl_aprovado'],
  },
];
