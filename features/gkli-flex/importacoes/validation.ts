import type { ImportBatch, ImportFlowStep, ImportIssue } from "./domain";

export function getImportFlowSteps(importBatch: ImportBatch): ImportFlowStep[] {
  const hasBlockers = importBatch.linhasBloqueadas > 0;
  const confirmed = importBatch.status === "confirmado";

  return [
    {
      label: "Selecionar",
      description: importBatch.arquivoNome,
      status: "done"
    },
    {
      label: "Validar",
      description: `${importBatch.totalLinhas} linhas analisadas`,
      status: confirmed || importBatch.status !== "rascunho" ? "done" : "current"
    },
    {
      label: "Revisar",
      description: hasBlockers ? "Existem bloqueios" : "Sem bloqueios criticos",
      status: hasBlockers ? "blocked" : confirmed ? "done" : "current"
    },
    {
      label: "Confirmar",
      description: "Persistir dados financeiros",
      status: confirmed ? "done" : hasBlockers ? "pending" : "current"
    }
  ];
}

export function canConfirmImport(importBatch: ImportBatch, issues: ImportIssue[]) {
  return (
    importBatch.status === "pronto_para_confirmar" &&
    issues.every((issue) => issue.severidade !== "bloqueio")
  );
}

export function summarizeIssues(issues: ImportIssue[]) {
  return {
    warnings: issues.filter((issue) => issue.severidade === "aviso").length,
    blockers: issues.filter((issue) => issue.severidade === "bloqueio").length
  };
}
