import type { Payment, PaymentEvent, RecurringPayment } from "./domain";

export const recurringPayments: RecurringPayment[] = [
  {
    id: "recurring-prolabore",
    tipo: "pro_labore",
    favorecido: "Diretoria",
    colaboradorId: "collab-marina",
    descricao: "Pro-labore mensal",
    valor: 18000,
    frequencia: "mensal",
    diaVencimento: 5,
    status: "ativo"
  },
  {
    id: "recurring-salary-finance",
    tipo: "salario",
    favorecido: "Operador Financeiro",
    colaboradorId: "collab-operador-financeiro",
    descricao: "Salario mensal",
    valor: 5200,
    frequencia: "mensal",
    diaVencimento: 5,
    status: "ativo"
  },
  {
    id: "recurring-service-accounting",
    tipo: "fornecedor",
    favorecido: "Assessoria contabil",
    colaboradorId: null,
    descricao: "Contrato recorrente de assessoria",
    valor: 2400,
    frequencia: "mensal",
    diaVencimento: 10,
    status: "ativo"
  }
];

export const payments: Payment[] = [
  {
    id: "payment-commission-003",
    competenciaId: "competence-2026-06",
    tipo: "comissao",
    favorecido: "Marina Gekali",
    colaboradorId: "collab-marina",
    comissaoId: "commission-003",
    descricao: "Comissao aprovada sobre honorarios",
    vencimento: "2026-06-10",
    valor: 552,
    status: "agendado",
    recorrenteId: null,
    paidAt: null,
    canceledAt: null,
    observacoes: null
  },
  {
    id: "payment-prolabore-june",
    competenciaId: "competence-2026-06",
    tipo: "pro_labore",
    favorecido: "Diretoria",
    colaboradorId: "collab-marina",
    comissaoId: null,
    descricao: "Pro-labore mensal",
    vencimento: "2026-06-05",
    valor: 18000,
    status: "previsto",
    recorrenteId: "recurring-prolabore",
    paidAt: null,
    canceledAt: null,
    observacoes: null
  },
  {
    id: "payment-salary-finance-june",
    competenciaId: "competence-2026-06",
    tipo: "salario",
    favorecido: "Operador Financeiro",
    colaboradorId: "collab-operador-financeiro",
    comissaoId: null,
    descricao: "Salario mensal",
    vencimento: "2026-06-05",
    valor: 5200,
    status: "pago",
    recorrenteId: "recurring-salary-finance",
    paidAt: "2026-06-05T13:20:00.000Z",
    canceledAt: null,
    observacoes: "Confirmado pela operacao financeira."
  },
  {
    id: "payment-accounting-june",
    competenciaId: "competence-2026-06",
    tipo: "fornecedor",
    favorecido: "Assessoria contabil",
    colaboradorId: null,
    comissaoId: null,
    descricao: "Contrato recorrente de assessoria",
    vencimento: "2026-06-10",
    valor: 2400,
    status: "agendado",
    recorrenteId: "recurring-service-accounting",
    paidAt: null,
    canceledAt: null,
    observacoes: null
  }
];

export const paymentEvents: PaymentEvent[] = [
  {
    id: "payment-event-001",
    pagamentoId: "payment-commission-003",
    actorId: "collab-marina",
    action: "gerado_comissao",
    previousStatus: null,
    nextStatus: "previsto",
    motivo: "Comissao aprovada na Sprint 4.",
    createdAt: "2026-06-03T15:31:00.000Z"
  },
  {
    id: "payment-event-002",
    pagamentoId: "payment-commission-003",
    actorId: "collab-marina",
    action: "agendado",
    previousStatus: "previsto",
    nextStatus: "agendado",
    motivo: "Agendado para pagamento em 10/06.",
    createdAt: "2026-06-03T15:40:00.000Z"
  },
  {
    id: "payment-event-003",
    pagamentoId: "payment-salary-finance-june",
    actorId: "collab-marina",
    action: "confirmado",
    previousStatus: "agendado",
    nextStatus: "pago",
    motivo: "Pagamento confirmado.",
    createdAt: "2026-06-05T13:20:00.000Z"
  }
];
