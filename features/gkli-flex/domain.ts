export type FlexStatus = "ativo" | "inativo";

export type CompetenceStatus = "aberta" | "em_fechamento" | "fechada" | "reaberta";

export type PermissionScope =
  | "admin"
  | "importacoes"
  | "financeiro"
  | "comissoes"
  | "pagamentos"
  | "fechamentos"
  | "gestao"
  | "acessos";

export type PermissionAction = "read" | "write" | "approve" | "close" | "reopen" | "*";

export type FlexPermission = `gkli_flex.${PermissionScope}.${PermissionAction}` | "gkli_flex.admin";

export type FlexTeam = {
  id: string;
  nome: string;
  descricao: string;
  status: FlexStatus;
  createdAt: string;
  updatedAt: string;
};

export type FlexRole = {
  id: string;
  nome: string;
  descricao: string;
  permissions: FlexPermission[];
  status: FlexStatus;
  createdAt: string;
  updatedAt: string;
};

export type FlexCollaborator = {
  id: string;
  nome: string;
  email: string;
  teamId: string;
  roleId: string;
  status: FlexStatus;
  createdAt: string;
  updatedAt: string;
};

export type FlexCompetence = {
  id: string;
  referencia: string;
  inicio: string;
  fim: string;
  status: CompetenceStatus;
  openedAt: string;
  closedAt: string | null;
  openedBy: string;
  closedBy: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AuditEvent = {
  id: string;
  actorId: string;
  action: string;
  entitySchema: "gkli_flex";
  entityTable: string;
  entityId: string;
  previousValue: Record<string, unknown> | null;
  nextValue: Record<string, unknown> | null;
  reason: string | null;
  createdAt: string;
};

export type SprintOneBootstrap = {
  activeCompetence: FlexCompetence;
  teams: FlexTeam[];
  roles: FlexRole[];
  collaborators: FlexCollaborator[];
  auditEvents: AuditEvent[];
};
