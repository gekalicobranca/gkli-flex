import { sprintOneBootstrap } from "./bootstrap-data";

export async function getFlexBootstrap() {
  return sprintOneBootstrap;
}

export async function getActiveCompetence() {
  return sprintOneBootstrap.activeCompetence;
}

export async function getCollaboratorDirectory() {
  return sprintOneBootstrap.collaborators.map((collaborator) => {
    const team = sprintOneBootstrap.teams.find((item) => item.id === collaborator.teamId);
    const role = sprintOneBootstrap.roles.find((item) => item.id === collaborator.roleId);

    return {
      ...collaborator,
      teamName: team?.nome ?? "Sem time",
      roleName: role?.nome ?? "Sem perfil",
      rolePermissions: role?.permissions ?? []
    };
  });
}

export async function getAccessMatrix() {
  return sprintOneBootstrap.roles.map((role) => ({
    ...role,
    permissionCount: role.permissions.length
  }));
}

export async function getRecentAuditEvents() {
  return sprintOneBootstrap.auditEvents;
}
