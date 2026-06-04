import type { SprintOneBootstrap } from "./domain";
import { baseRoles } from "./permissions";

export const sprintOneBootstrap: SprintOneBootstrap = {
  activeCompetence: {
    id: "competence-2026-06",
    referencia: "2026-06",
    inicio: "2026-06-01",
    fim: "2026-06-30",
    status: "aberta",
    openedAt: "2026-06-01T09:00:00.000Z",
    closedAt: null,
    openedBy: "collab-marina",
    closedBy: null,
    createdAt: "2026-06-01T09:00:00.000Z",
    updatedAt: "2026-06-01T09:00:00.000Z"
  },
  teams: [
    {
      id: "team-gestao",
      nome: "Gestao",
      descricao: "Diretoria, indicadores e fechamento mensal.",
      status: "ativo",
      createdAt: "2026-06-01T09:00:00.000Z",
      updatedAt: "2026-06-01T09:00:00.000Z"
    },
    {
      id: "team-financeiro",
      nome: "Financeiro",
      descricao: "Operacao diaria de importacoes, classificacoes e pagamentos.",
      status: "ativo",
      createdAt: "2026-06-01T09:00:00.000Z",
      updatedAt: "2026-06-01T09:00:00.000Z"
    }
  ],
  roles: baseRoles,
  collaborators: [
    {
      id: "collab-marina",
      nome: "Marina Gekali",
      email: "marina@gekali.com.br",
      teamId: "team-gestao",
      roleId: "role-admin",
      status: "ativo",
      createdAt: "2026-06-01T09:00:00.000Z",
      updatedAt: "2026-06-01T09:00:00.000Z"
    },
    {
      id: "collab-operador-financeiro",
      nome: "Operador Financeiro",
      email: "financeiro@gekali.com.br",
      teamId: "team-financeiro",
      roleId: "role-financeiro",
      status: "ativo",
      createdAt: "2026-06-01T09:00:00.000Z",
      updatedAt: "2026-06-01T09:00:00.000Z"
    }
  ],
  auditEvents: [
    {
      id: "audit-competence-opened",
      actorId: "collab-marina",
      action: "competencia.aberta",
      entitySchema: "gkli_flex",
      entityTable: "competencias",
      entityId: "competence-2026-06",
      previousValue: null,
      nextValue: { referencia: "2026-06", status: "aberta" },
      reason: "Competencia inicial do GKLI Flex",
      createdAt: "2026-06-01T09:00:00.000Z"
    },
    {
      id: "audit-collaborator-created",
      actorId: "collab-marina",
      action: "colaborador.criado",
      entitySchema: "gkli_flex",
      entityTable: "colaboradores",
      entityId: "collab-operador-financeiro",
      previousValue: null,
      nextValue: { email: "financeiro@gekali.com.br", perfil: "Operacao financeira" },
      reason: "Usuario operacional inicial",
      createdAt: "2026-06-01T09:05:00.000Z"
    }
  ]
};
