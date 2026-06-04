import type { Payment, PaymentStatus, PaymentType } from "./domain";

export function canSchedulePayment(payment: Payment) {
  return payment.status === "previsto";
}

export function canConfirmPayment(payment: Payment) {
  return payment.status === "previsto" || payment.status === "agendado";
}

export function canCancelPayment(payment: Payment) {
  return payment.status === "previsto" || payment.status === "agendado";
}

export function getPaymentStatusTone(status: PaymentStatus) {
  const tones: Record<PaymentStatus, "blue" | "green" | "yellow" | "red"> = {
    previsto: "blue",
    agendado: "yellow",
    pago: "green",
    cancelado: "red"
  };

  return tones[status];
}

export function getPaymentTypeLabel(type: PaymentType) {
  const labels: Record<PaymentType, string> = {
    comissao: "Comissao",
    salario: "Salario",
    pro_labore: "Pro-labore",
    fornecedor: "Fornecedor",
    reembolso: "Reembolso",
    outro: "Outro"
  };

  return labels[type];
}
