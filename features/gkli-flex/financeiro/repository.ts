import {
  bankStatements,
  budgetItems,
  classificationRules,
  financialCategories,
  revenues,
  statementEntries
} from "./bootstrap-data";
import type { FinancialOverview } from "./domain";

export async function getFinancialDashboard() {
  const totalReceitas = revenues.reduce((total, revenue) => total + revenue.valor, 0);
  const totalDespesas = statementEntries
    .filter((entry) => entry.valor < 0 && entry.status !== "ignorado")
    .reduce((total, entry) => total + Math.abs(entry.valor), 0);

  const overview: FinancialOverview = {
    totalReceitas,
    totalDespesas,
    resultadoOperacional: totalReceitas - totalDespesas,
    lancamentosNaoClassificados: statementEntries.filter(
      (entry) => entry.status === "nao_classificado"
    ).length,
    divergenciasOrcamento: budgetItems.filter((item) => item.status !== "dentro").length
  };

  return {
    overview,
    categories: financialCategories,
    rules: classificationRules,
    revenues,
    statements: bankStatements,
    entries: statementEntries.map((entry) => ({
      ...entry,
      category: financialCategories.find((category) => category.id === entry.categoriaId) ?? null,
      rule:
        classificationRules.find((rule) => rule.id === entry.regraClassificacaoId) ?? null
    })),
    budgetItems: budgetItems.map((item) => ({
      ...item,
      category: financialCategories.find((category) => category.id === item.categoriaId) ?? null
    }))
  };
}
