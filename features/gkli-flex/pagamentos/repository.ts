import { sprintOneBootstrap } from "../bootstrap-data";
import { commissions } from "../comissoes/bootstrap-data";
import { paymentEvents, payments, recurringPayments } from "./bootstrap-data";
import type { PaymentOverview } from "./domain";

export async function getPaymentDashboard() {
  const overview: PaymentOverview = {
    totalPrevisto: payments
      .filter((payment) => payment.status === "previsto")
      .reduce((total, payment) => total + payment.valor, 0),
    totalAgendado: payments
      .filter((payment) => payment.status === "agendado")
      .reduce((total, payment) => total + payment.valor, 0),
    totalPago: payments
      .filter((payment) => payment.status === "pago")
      .reduce((total, payment) => total + payment.valor, 0),
    totalCancelado: payments
      .filter((payment) => payment.status === "cancelado")
      .reduce((total, payment) => total + payment.valor, 0),
    pendentes: payments.filter(
      (payment) => payment.status === "previsto" || payment.status === "agendado"
    ).length
  };

  return {
    overview,
    payments: payments.map((payment) => ({
      ...payment,
      collaborator:
        sprintOneBootstrap.collaborators.find((item) => item.id === payment.colaboradorId) ??
        null,
      commission: commissions.find((item) => item.id === payment.comissaoId) ?? null,
      recurring:
        recurringPayments.find((item) => item.id === payment.recorrenteId) ?? null
    })),
    recurringPayments,
    events: paymentEvents.map((event) => ({
      ...event,
      payment: payments.find((item) => item.id === event.pagamentoId) ?? null,
      actor: sprintOneBootstrap.collaborators.find((item) => item.id === event.actorId) ?? null
    }))
  };
}
