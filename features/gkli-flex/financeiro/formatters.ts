import type { BudgetValidationStatus, FinancialCategoryType } from "./domain";

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}

export function formatCategoryType(type: FinancialCategoryType) {
  const labels: Record<FinancialCategoryType, string> = {
    receita: "Receita",
    despesa: "Despesa",
    ambos: "Ambos"
  };

  return labels[type];
}

export function getBudgetTone(status: BudgetValidationStatus) {
  const tones: Record<BudgetValidationStatus, "green" | "yellow" | "red"> = {
    dentro: "green",
    acima: "yellow",
    abaixo: "red"
  };

  return tones[status];
}
