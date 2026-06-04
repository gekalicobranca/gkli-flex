import { sprintOneBootstrap } from "../bootstrap-data";
import { revenues } from "../financeiro/bootstrap-data";
import { commissionEvents, commissions, commissionTypes } from "./bootstrap-data";
import type { CommissionOverview } from "./domain";

export async function getCommissionDashboard() {
  const totalCalculado = commissions.reduce((total, commission) => total + commission.valor, 0);
  const totalAprovado = commissions
    .filter((commission) => commission.status === "aprovada" || commission.status === "paga")
    .reduce((total, commission) => total + commission.valor, 0);
  const totalPendente = totalCalculado - totalAprovado;

  const overview: CommissionOverview = {
    totalCalculado,
    totalAprovado,
    totalPendente,
    pendentesConferencia: commissions.filter((commission) => commission.status === "calculada")
      .length,
    pendentesAprovacao: commissions.filter((commission) => commission.status === "conferida").length
  };

  return {
    overview,
    types: commissionTypes,
    commissions: commissions.map((commission) => ({
      ...commission,
      collaborator:
        sprintOneBootstrap.collaborators.find((item) => item.id === commission.colaboradorId) ??
        null,
      type: commissionTypes.find((item) => item.id === commission.tipoComissaoId) ?? null,
      revenue: revenues.find((item) => item.id === commission.receitaId) ?? null
    })),
    events: commissionEvents.map((event) => ({
      ...event,
      commission: commissions.find((item) => item.id === event.comissaoId) ?? null,
      actor: sprintOneBootstrap.collaborators.find((item) => item.id === event.actorId) ?? null
    }))
  };
}
