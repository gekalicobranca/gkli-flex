import type { Commission, CommissionStatus } from "./domain";

export function calculateCommission(baseCalculo: number, percentual: number) {
  return Number(((baseCalculo * percentual) / 100).toFixed(2));
}

export function canApproveCommission(commission: Commission) {
  return commission.status === "conferida";
}

export function canRejectCommission(commission: Commission) {
  return commission.status === "calculada" || commission.status === "conferida";
}

export function getCommissionStatusTone(status: CommissionStatus) {
  const tones: Record<CommissionStatus, "blue" | "green" | "yellow" | "red"> = {
    calculada: "blue",
    conferida: "yellow",
    aprovada: "green",
    rejeitada: "red",
    paga: "green"
  };

  return tones[status];
}

export function getCommissionStatusLabel(status: CommissionStatus) {
  const labels: Record<CommissionStatus, string> = {
    calculada: "Calculada",
    conferida: "Conferida",
    aprovada: "Aprovada",
    rejeitada: "Rejeitada",
    paga: "Paga"
  };

  return labels[status];
}
