export type ClosingStatus = "aberto" | "bloqueado" | "pronto" | "fechado" | "reaberto";

export type ClosingChecklistKey =
  | "importacoes_concluidas"
  | "despesas_classificadas"
  | "comissoes_aprovadas"
  | "pagamentos_conferidos"
  | "sem_divergencias_criticas";

export type ClosingBlockerType =
  | "importacao_erro"
  | "despesa_nao_classificada"
  | "comissao_pendente"
  | "pagamento_pendente"
  | "competencia_inconsistente"
  | "divergencia_critica";

export type ClosingChecklistItem = {
  id: string;
  fechamentoId: string;
  key: ClosingChecklistKey;
  title: string;
  done: boolean;
  detail: string;
};

export type ClosingBlocker = {
  id: string;
  fechamentoId: string;
  type: ClosingBlockerType;
  title: string;
  detail: string;
  severity: "bloqueio" | "aviso";
  resolved: boolean;
};

export type ClosingSnapshot = {
  id: string;
  fechamentoId: string;
  receitas: number;
  despesas: number;
  comissoes: number;
  pagamentosPrevistos: number;
  pagamentosRealizados: number;
  resultadoOperacional: number;
  generatedAt: string;
};

export type ClosingReopenRequest = {
  id: string;
  fechamentoId: string;
  requestedBy: string;
  reason: string;
  createdAt: string;
};

export type Closing = {
  id: string;
  competenciaId: string;
  referencia: string;
  status: ClosingStatus;
  closedAt: string | null;
  closedBy: string | null;
  reopenedAt: string | null;
  reopenedBy: string | null;
  reopenReason: string | null;
};

export type ClosingOverview = {
  checklistDone: number;
  checklistTotal: number;
  blockersOpen: number;
  warningsOpen: number;
  canClose: boolean;
};
