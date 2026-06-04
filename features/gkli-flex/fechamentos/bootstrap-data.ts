import type {
  Closing,
  ClosingBlocker,
  ClosingChecklistItem,
  ClosingReopenRequest,
  ClosingSnapshot
} from "./domain";

export const closings: Closing[] = [
  {
    id: "closing-2026-06",
    competenciaId: "competence-2026-06",
    referencia: "2026-06",
    status: "bloqueado",
    closedAt: null,
    closedBy: null,
    reopenedAt: null,
    reopenedBy: null,
    reopenReason: null
  }
];

export const closingChecklist: ClosingChecklistItem[] = [
  {
    id: "check-imports",
    fechamentoId: "closing-2026-06",
    key: "importacoes_concluidas",
    title: "Importacoes concluidas",
    done: true,
    detail: "Omie pronto para confirmar; Banco Inter ainda tem bloqueios em revisao."
  },
  {
    id: "check-expenses",
    fechamentoId: "closing-2026-06",
    key: "despesas_classificadas",
    title: "Despesas classificadas",
    done: false,
    detail: "Existe lancamento sem categoria no extrato Banco Inter."
  },
  {
    id: "check-commissions",
    fechamentoId: "closing-2026-06",
    key: "comissoes_aprovadas",
    title: "Comissoes aprovadas",
    done: false,
    detail: "Ainda ha comissao calculada e conferida aguardando decisao."
  },
  {
    id: "check-payments",
    fechamentoId: "closing-2026-06",
    key: "pagamentos_conferidos",
    title: "Pagamentos conferidos",
    done: false,
    detail: "Ha pagamentos previstos/agendados sem quitacao."
  },
  {
    id: "check-critical",
    fechamentoId: "closing-2026-06",
    key: "sem_divergencias_criticas",
    title: "Sem divergencias criticas",
    done: false,
    detail: "Orcamento possui categoria acima do previsto com justificativa pendente."
  }
];

export const closingBlockers: ClosingBlocker[] = [
  {
    id: "block-unclassified-entry",
    fechamentoId: "closing-2026-06",
    type: "despesa_nao_classificada",
    title: "Despesa nao classificada",
    detail: "Transferencia sem identificacao no extrato Banco Inter.",
    severity: "bloqueio",
    resolved: false
  },
  {
    id: "block-pending-commission",
    fechamentoId: "closing-2026-06",
    type: "comissao_pendente",
    title: "Comissao pendente",
    detail: "Comissao calculada precisa ser conferida ou rejeitada.",
    severity: "bloqueio",
    resolved: false
  },
  {
    id: "block-pending-payment",
    fechamentoId: "closing-2026-06",
    type: "pagamento_pendente",
    title: "Pagamento pendente",
    detail: "Pro-labore previsto ainda nao foi confirmado.",
    severity: "bloqueio",
    resolved: false
  },
  {
    id: "warn-budget",
    fechamentoId: "closing-2026-06",
    type: "divergencia_critica",
    title: "Divergencia de orcamento",
    detail: "Servicos recorrentes acima do previsto.",
    severity: "aviso",
    resolved: false
  }
];

export const closingSnapshots: ClosingSnapshot[] = [
  {
    id: "snapshot-preview-2026-06",
    fechamentoId: "closing-2026-06",
    receitas: 43000,
    despesas: 4059.9,
    comissoes: 2026,
    pagamentosPrevistos: 20952,
    pagamentosRealizados: 5200,
    resultadoOperacional: 38940.1,
    generatedAt: "2026-06-04T10:00:00.000Z"
  }
];

export const reopenRequests: ClosingReopenRequest[] = [];
