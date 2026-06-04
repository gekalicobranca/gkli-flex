import type {
  BankStatement,
  BudgetItem,
  ClassificationRule,
  FinancialCategory,
  Revenue,
  StatementEntry
} from "./domain";

export const financialCategories: FinancialCategory[] = [
  {
    id: "cat-honorarios",
    nome: "Honorarios",
    tipo: "receita",
    descricao: "Receitas de honorarios e contratos mensais.",
    status: "ativo"
  },
  {
    id: "cat-tarifas",
    nome: "Tarifas bancarias",
    tipo: "despesa",
    descricao: "Tarifas, taxas e custos bancarios.",
    status: "ativo"
  },
  {
    id: "cat-servicos",
    nome: "Servicos recorrentes",
    tipo: "despesa",
    descricao: "Contratos e ferramentas recorrentes.",
    status: "ativo"
  },
  {
    id: "cat-operacional",
    nome: "Operacional",
    tipo: "despesa",
    descricao: "Despesas operacionais gerais.",
    status: "ativo"
  }
];

export const classificationRules: ClassificationRule[] = [
  {
    id: "rule-tarifa",
    nome: "Tarifa bancaria",
    categoriaId: "cat-tarifas",
    texto: "tarifa",
    prioridade: 90,
    status: "ativo"
  },
  {
    id: "rule-saas",
    nome: "Ferramentas SaaS",
    categoriaId: "cat-servicos",
    texto: "software",
    prioridade: 70,
    status: "ativo"
  },
  {
    id: "rule-operacional",
    nome: "Despesa operacional",
    categoriaId: "cat-operacional",
    texto: "operacional",
    prioridade: 50,
    status: "ativo"
  }
];

export const revenues: Revenue[] = [
  {
    id: "rev-001",
    competenciaId: "competence-2026-06",
    importacaoId: "import-omie-2026-06-01",
    data: "2026-06-02",
    cliente: "Cliente A",
    categoriaId: "cat-honorarios",
    descricao: "Honorarios contrato mensal",
    valor: 18400,
    origem: "omie",
    observacoes: null
  },
  {
    id: "rev-002",
    competenciaId: "competence-2026-06",
    importacaoId: "import-omie-2026-06-01",
    data: "2026-06-03",
    cliente: "Cliente B",
    categoriaId: "cat-honorarios",
    descricao: "Honorarios projeto avulso",
    valor: 24600,
    origem: "omie",
    observacoes: null
  }
];

export const bankStatements: BankStatement[] = [
  {
    id: "stmt-inter-2026-06",
    competenciaId: "competence-2026-06",
    importacaoId: "import-inter-2026-06-03",
    banco: "Banco Inter",
    conta: "Conta principal",
    periodoInicio: "2026-06-01",
    periodoFim: "2026-06-03",
    saldoInicial: 92000,
    saldoFinal: 108870.1,
    quantidadeLancamentos: 96
  }
];

export const statementEntries: StatementEntry[] = [
  {
    id: "entry-001",
    extratoId: "stmt-inter-2026-06",
    data: "2026-06-03",
    descricao: "Tarifa bancaria pacote mensal",
    valor: -29.9,
    categoriaId: "cat-tarifas",
    regraClassificacaoId: "rule-tarifa",
    status: "classificado",
    observacoes: null
  },
  {
    id: "entry-002",
    extratoId: "stmt-inter-2026-06",
    data: "2026-06-03",
    descricao: "Pagamento software financeiro",
    valor: -890,
    categoriaId: "cat-servicos",
    regraClassificacaoId: "rule-saas",
    status: "classificado",
    observacoes: null
  },
  {
    id: "entry-003",
    extratoId: "stmt-inter-2026-06",
    data: "2026-06-03",
    descricao: "Transferencia sem identificacao",
    valor: -2500,
    categoriaId: null,
    regraClassificacaoId: null,
    status: "nao_classificado",
    observacoes: "Aguardando identificacao."
  },
  {
    id: "entry-004",
    extratoId: "stmt-inter-2026-06",
    data: "2026-06-03",
    descricao: "Despesa operacional escritorio",
    valor: -640,
    categoriaId: "cat-operacional",
    regraClassificacaoId: "rule-operacional",
    status: "divergente",
    observacoes: "Valor acima do padrao mensal."
  }
];

export const budgetItems: BudgetItem[] = [
  {
    id: "budget-honorarios",
    competenciaId: "competence-2026-06",
    categoriaId: "cat-honorarios",
    valorPrevisto: 148000,
    valorRealizado: 43000,
    diferenca: -105000,
    status: "abaixo",
    justificativa: null
  },
  {
    id: "budget-tarifas",
    competenciaId: "competence-2026-06",
    categoriaId: "cat-tarifas",
    valorPrevisto: 350,
    valorRealizado: 29.9,
    diferenca: -320.1,
    status: "dentro",
    justificativa: null
  },
  {
    id: "budget-servicos",
    competenciaId: "competence-2026-06",
    categoriaId: "cat-servicos",
    valorPrevisto: 750,
    valorRealizado: 890,
    diferenca: 140,
    status: "acima",
    justificativa: "Assinatura anual renovada."
  }
];
