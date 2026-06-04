import type { ClassificationRule, StatementEntry } from "./domain";

export function classifyEntry(entry: StatementEntry, rules: ClassificationRule[]) {
  const normalizedDescription = entry.descricao.toLowerCase();
  const activeRules = rules
    .filter((rule) => rule.status === "ativo")
    .sort((a, b) => b.prioridade - a.prioridade);

  return activeRules.find((rule) => normalizedDescription.includes(rule.texto.toLowerCase())) ?? null;
}

export function getEntryStatusLabel(status: StatementEntry["status"]) {
  const labels: Record<StatementEntry["status"], string> = {
    nao_classificado: "Não classificado",
    classificado: "Classificado",
    conciliado: "Conciliado",
    ignorado: "Ignorado",
    divergente: "Divergente"
  };

  return labels[status];
}
