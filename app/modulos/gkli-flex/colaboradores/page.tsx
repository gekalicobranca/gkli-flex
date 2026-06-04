import { UserPlus } from "lucide-react";
import { getCollaboratorDirectory } from "@/features/gkli-flex/repository";
import { FlexShell, PageHeader, Panel, StatusBadge } from "@/features/gkli-flex/ui";

export default async function ColaboradoresPage() {
  const collaborators = await getCollaboratorDirectory();

  return (
    <FlexShell
      activeHref="/modulos/gkli-flex/colaboradores"
      title="Colaboradores"
      description="Cadastro próprio do Flex para times, operação e permissões."
    >
      <PageHeader
        eyebrow="Administração"
        title="Cadastro de colaboradores"
        description="O Flex terá colaboradores criados dentro do próprio app, sem depender do cadastro do COB ou do Genske."
        actions={
          <button className="button">
            <UserPlus size={16} />
            Novo colaborador
          </button>
        }
      />

      <Panel title="Colaboradores ativos" note="Base inicial">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Time</th>
              <th>Perfil</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {collaborators.map((row) => (
              <tr key={row.nome}>
                <td>{row.nome}</td>
                <td>{row.teamName}</td>
                <td>{row.roleName}</td>
                <td>
                  <StatusBadge tone="green">{row.status}</StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </FlexShell>
  );
}
