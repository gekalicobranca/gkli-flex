export const currentCompetence = {
  label: "Junho/2026",
  status: "Aberta",
  progress: "62%",
  owner: "Financeiro Gekali"
};

export const cockpitTasks = [
  {
    title: "Validar importacao Banco Inter",
    meta: "CSV de 03/06 aguardando classificacao",
    status: "Prioritario",
    tone: "yellow"
  },
  {
    title: "Conferir comissoes calculadas",
    meta: "8 registros pendentes de conferencia",
    status: "Pendente",
    tone: "blue"
  },
  {
    title: "Resolver despesas sem categoria",
    meta: "12 lancamentos bloqueiam fechamento",
    status: "Bloqueio",
    tone: "red"
  }
];

export const recentActivities = [
  "Receitas Omie importadas para Junho/2026",
  "Regra 'Tarifa bancaria' aplicada em 6 lancamentos",
  "Pagamento recorrente de pro-labore gerado",
  "Orcamento de despesas administrativas ajustado"
];

export const imports = [
  {
    origem: "Omie",
    formato: "XLSX",
    finalidade: "Receitas e comissoes",
    status: "Pronto para pre-validar"
  },
  {
    origem: "Banco Inter",
    formato: "CSV",
    finalidade: "Extratos e despesas",
    status: "Pronto para validar"
  }
];

export const financeRows = [
  {
    tipo: "Receita",
    categoria: "Honorarios",
    previsto: "R$ 148.000,00",
    realizado: "R$ 132.450,00",
    status: "Abaixo"
  },
  {
    tipo: "Despesa",
    categoria: "Operacional",
    previsto: "R$ 42.000,00",
    realizado: "R$ 39.880,00",
    status: "Dentro"
  },
  {
    tipo: "Despesa",
    categoria: "Servicos recorrentes",
    previsto: "R$ 18.500,00",
    realizado: "R$ 22.130,00",
    status: "Acima"
  }
];

export const commissionRows = [
  {
    colaborador: "Ana Costa",
    base: "R$ 28.400,00",
    percentual: "4%",
    valor: "R$ 1.136,00",
    status: "Conferida"
  },
  {
    colaborador: "Bruno Lima",
    base: "R$ 19.200,00",
    percentual: "3%",
    valor: "R$ 576,00",
    status: "Calculada"
  }
];

export const paymentRows = [
  {
    tipo: "Comissao",
    favorecido: "Ana Costa",
    vencimento: "10/06/2026",
    valor: "R$ 1.136,00",
    status: "Agendado"
  },
  {
    tipo: "Pro-labore",
    favorecido: "Diretoria",
    vencimento: "05/06/2026",
    valor: "R$ 18.000,00",
    status: "Previsto"
  }
];

export const closingChecklist = [
  { title: "Importacoes concluidas", done: true },
  { title: "Despesas classificadas", done: false },
  { title: "Comissoes aprovadas", done: false },
  { title: "Pagamentos conferidos", done: true },
  { title: "Sem divergencias criticas", done: false }
];

export const collaborators = [
  {
    nome: "Marina Gekali",
    time: "Gestao",
    perfil: "gkli_flex.admin",
    status: "Ativo"
  },
  {
    nome: "Operador Financeiro",
    time: "Financeiro",
    perfil: "gkli_flex.financeiro.*",
    status: "Ativo"
  }
];
