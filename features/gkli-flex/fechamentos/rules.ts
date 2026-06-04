import type { ClosingBlocker, ClosingChecklistItem, ClosingStatus } from "./domain";

export function canCloseCompetence(checklist: ClosingChecklistItem[], blockers: ClosingBlocker[]) {
  return checklist.every((item) => item.done) && blockers.every((blocker) => blocker.resolved);
}

export function getClosingStatusTone(status: ClosingStatus) {
  const tones: Record<ClosingStatus, "blue" | "green" | "yellow" | "red"> = {
    aberto: "blue",
    bloqueado: "red",
    pronto: "green",
    fechado: "green",
    reaberto: "yellow"
  };

  return tones[status];
}

export function getChecklistTone(done: boolean) {
  return done ? "green" : "red";
}

export function getBlockerTone(severity: ClosingBlocker["severity"], resolved: boolean) {
  if (resolved) {
    return "green";
  }

  return severity === "bloqueio" ? "red" : "yellow";
}
