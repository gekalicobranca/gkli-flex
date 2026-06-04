import { importSourceDefinitions } from "./catalog";
import { importBatches, importIssues, importPreviewRows } from "./bootstrap-data";

export async function getImportSources() {
  return importSourceDefinitions;
}

export async function getImportBatches() {
  return importBatches;
}

export async function getImportBatchDetails(importacaoId: string) {
  const batch = importBatches.find((item) => item.id === importacaoId) ?? null;

  return {
    batch,
    issues: importIssues.filter((issue) => issue.importacaoId === importacaoId),
    previewRows: importPreviewRows.filter((row) => row.importacaoId === importacaoId)
  };
}

export async function getImportDashboard() {
  return {
    sources: importSourceDefinitions,
    batches: importBatches.map((batch) => ({
      ...batch,
      issues: importIssues.filter((issue) => issue.importacaoId === batch.id),
      previewRows: importPreviewRows.filter((row) => row.importacaoId === batch.id)
    }))
  };
}
