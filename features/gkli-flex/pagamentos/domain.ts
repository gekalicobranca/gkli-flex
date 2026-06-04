export type PaymentType =
  | "comissao"
  | "salario"
  | "pro_labore"
  | "fornecedor"
  | "reembolso"
  | "outro";

export type PaymentStatus = "previsto" | "agendado" | "pago" | "cancelado";

export type RecurrenceFrequency = "mensal" | "quinzenal" | "semanal";

export type Payment = {
  id: string;
  competenciaId: string;
  tipo: PaymentType;
  favorecido: string;
  colaboradorId: string | null;
  comissaoId: string | null;
  descricao: string;
  vencimento: string;
  valor: number;
  status: PaymentStatus;
  recorrenteId: string | null;
  paidAt: string | null;
  canceledAt: string | null;
  observacoes: string | null;
};

export type RecurringPayment = {
  id: string;
  tipo: Exclude<PaymentType, "comissao">;
  favorecido: string;
  colaboradorId: string | null;
  descricao: string;
  valor: number;
  frequencia: RecurrenceFrequency;
  diaVencimento: number;
  status: "ativo" | "inativo";
};

export type PaymentEventAction =
  | "previsto"
  | "agendado"
  | "confirmado"
  | "cancelado"
  | "gerado_recorrencia"
  | "gerado_comissao";

export type PaymentEvent = {
  id: string;
  pagamentoId: string;
  actorId: string;
  action: PaymentEventAction;
  previousStatus: PaymentStatus | null;
  nextStatus: PaymentStatus;
  motivo: string | null;
  createdAt: string;
};

export type PaymentOverview = {
  totalPrevisto: number;
  totalAgendado: number;
  totalPago: number;
  totalCancelado: number;
  pendentes: number;
};
