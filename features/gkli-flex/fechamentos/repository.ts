import {
  closingBlockers,
  closingChecklist,
  closingSnapshots,
  closings,
  reopenRequests
} from "./bootstrap-data";
import type { ClosingOverview } from "./domain";
import { canCloseCompetence } from "./rules";

export async function getClosingDashboard() {
  const closing = closings[0];
  const checklist = closingChecklist.filter((item) => item.fechamentoId === closing.id);
  const blockers = closingBlockers.filter((item) => item.fechamentoId === closing.id);
  const snapshots = closingSnapshots.filter((item) => item.fechamentoId === closing.id);
  const reopenHistory = reopenRequests.filter((item) => item.fechamentoId === closing.id);

  const overview: ClosingOverview = {
    checklistDone: checklist.filter((item) => item.done).length,
    checklistTotal: checklist.length,
    blockersOpen: blockers.filter((item) => item.severity === "bloqueio" && !item.resolved).length,
    warningsOpen: blockers.filter((item) => item.severity === "aviso" && !item.resolved).length,
    canClose: canCloseCompetence(checklist, blockers)
  };

  return {
    closing,
    overview,
    checklist,
    blockers,
    snapshot: snapshots[0] ?? null,
    reopenHistory
  };
}
