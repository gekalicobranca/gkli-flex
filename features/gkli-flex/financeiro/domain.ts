export type FinancialCategoryType = "receita" | "despesa" | "ambos";

export type EntryClassificationStatus =
  | "nao_classificado"
  | "classificado"
  | "conciliado"
  | "ignorado"
  | "divergente";

export type BudgetValidationStatus = "dentro" | "acima" | "abaixo";

export type FinancialCategory = {
  id: string;
  nome: string;
  tipo: FinancialCategoryType;
  descricao: string;
  status: "ativo" | "inativo";
};

export type ClassificationRule = {
  id: string;
  nome: string;
  categoriaId: string;
  texto: string;
  prioridade: number;
  status: "ativo" | "inativo";
};

export type Revenue = {
  id: string;
  competenciaId: string;
  importacaoId: string | null;
  data: string;
  cliente: string;
  categoriaId: string;
  descricao: string;
  valor: number;
  origem: "omie" | "manual";
  observacoes: string | null;
};

export type BankStatement = {
  id: string;
  competenciaId: string;
  importacaoId: string | null;
  banco: string;
  conta: string;
  periodoInicio: string;
  periodoFim: string;
  saldoInicial: number;
  saldoFinal: number;
  quantidadeLancamentos: number;
};

export type StatementEntry = {
  id: string;
  extratoId: string;
  data: string;
  descricao: string;
  valor: number;
  categoriaId: string | null;
  regraClassificacaoId: string | null;
  status: EntryClassificationStatus;
  observacoes: string | null;
};

export type BudgetItem = {
  id: string;
  competenciaId: string;
  categoriaId: string;
  valorPrevisto: number;
  valorRealizado: number;
  diferenca: number;
  status: BudgetValidationStatus;
  justificativa: string | null;
};

export type FinancialOverview = {
  totalReceitas: number;
  totalDespesas: number;
  resultadoOperacional: number;
  lancamentosNaoClassificados: number;
  divergenciasOrcamento: number;
};
