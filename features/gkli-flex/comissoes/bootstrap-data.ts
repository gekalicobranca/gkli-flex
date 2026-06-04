import type { Commission, CommissionEvent, CommissionType } from "./domain";

export const commissionTypes: CommissionType[] = [
  {
    id: "commission-type-honorarios-4",
    nome: "Honorarios comerciais",
    descricao: "Comissao padrao sobre receitas de honorarios.",
    percentual: 4,
    categoriaId: "cat-honorarios",
    status: "ativo"
  },
  {
    id: "commission-type-honorarios-3",
    nome: "Honorarios apoio",
    descricao: "Comissao de apoio operacional sobre honorarios.",
    percentual: 3,
    categoriaId: "cat-honorarios",
    status: "ativo"
  }
];

export const commissions: Commission[] = [
  {
    id: "commission-001",
    competenciaId: "competence-2026-06",
    receitaId: "rev-001",
    colaboradorId: "collab-marina",
    tipoComissaoId: "commission-type-honorarios-4",
    baseCalculo: 18400,
    percentual: 4,
    valor: 736,
    status: "conferida",
    observacoes: null,
    calculatedAt: "2026-06-03T14:10:00.000Z",
    checkedAt: "2026-06-03T15:02:00.000Z",
    approvedAt: null,
    paidAt: null
  },
  {
    id: "commission-002",
    competenciaId: "competence-2026-06",
    receitaId: "rev-002",
    colaboradorId: "collab-operador-financeiro",
    tipoComissaoId: "commission-type-honorarios-3",
    baseCalculo: 24600,
    percentual: 3,
    valor: 738,
    status: "calculada",
    observacoes: "Aguardando conferencia da origem da receita.",
    calculatedAt: "2026-06-03T14:12:00.000Z",
    checkedAt: null,
    approvedAt: null,
    paidAt: null
  },
  {
    id: "commission-003",
    competenciaId: "competence-2026-06",
    receitaId: "rev-001",
    colaboradorId: "collab-marina",
    tipoComissaoId: "commission-type-honorarios-3",
    baseCalculo: 18400,
    percentual: 3,
    valor: 552,
    status: "aprovada",
    observacoes: null,
    calculatedAt: "2026-06-03T14:11:00.000Z",
    checkedAt: "2026-06-03T15:10:00.000Z",
    approvedAt: "2026-06-03T15:30:00.000Z",
    paidAt: null
  }
];

export const commissionEvents: CommissionEvent[] = [
  {
    id: "commission-event-001",
    comissaoId: "commission-001",
    actorId: "collab-marina",
    action: "calculada",
    motivo: "Receita Omie confirmada.",
    previousStatus: null,
    nextStatus: "calculada",
    createdAt: "2026-06-03T14:10:00.000Z"
  },
  {
    id: "commission-event-002",
    comissaoId: "commission-001",
    actorId: "collab-marina",
    action: "conferida",
    motivo: "Base de calculo validada.",
    previousStatus: "calculada",
    nextStatus: "conferida",
    createdAt: "2026-06-03T15:02:00.000Z"
  },
  {
    id: "commission-event-003",
    comissaoId: "commission-003",
    actorId: "collab-marina",
    action: "aprovada",
    motivo: "Aprovacao da competencia Junho/2026.",
    previousStatus: "conferida",
    nextStatus: "aprovada",
    createdAt: "2026-06-03T15:30:00.000Z"
  }
];
