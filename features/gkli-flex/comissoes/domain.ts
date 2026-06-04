export type CommissionStatus =
  | "calculada"
  | "conferida"
  | "aprovada"
  | "rejeitada"
  | "paga";

export type CommissionEventAction =
  | "calculada"
  | "conferida"
  | "aprovada"
  | "rejeitada"
  | "retornada_para_ajuste"
  | "paga";

export type CommissionType = {
  id: string;
  nome: string;
  descricao: string;
  percentual: number;
  categoriaId: string;
  status: "ativo" | "inativo";
};

export type Commission = {
  id: string;
  competenciaId: string;
  receitaId: string;
  colaboradorId: string;
  tipoComissaoId: string;
  baseCalculo: number;
  percentual: number;
  valor: number;
  status: CommissionStatus;
  observacoes: string | null;
  calculatedAt: string;
  checkedAt: string | null;
  approvedAt: string | null;
  paidAt: string | null;
};

export type CommissionEvent = {
  id: string;
  comissaoId: string;
  actorId: string;
  action: CommissionEventAction;
  motivo: string | null;
  previousStatus: CommissionStatus | null;
  nextStatus: CommissionStatus;
  createdAt: string;
};

export type CommissionOverview = {
  totalCalculado: number;
  totalAprovado: number;
  totalPendente: number;
  pendentesConferencia: number;
  pendentesAprovacao: number;
};
