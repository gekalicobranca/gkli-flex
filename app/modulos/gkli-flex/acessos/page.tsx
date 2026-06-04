import { flexPermissionCatalog } from "@/features/gkli-flex/permissions";
import { getAccessMatrix } from "@/features/gkli-flex/repository";
import { FlexShell, PageHeader, Panel, StatusBadge } from "@/features/gkli-flex/ui";

export default async function AcessosPage() {
  const roles = await getAccessMatrix();

  return (
    <FlexShell
      activeHref="/modulos/gkli-flex/acessos"
      title="Acessos"
      description="Controle por modulo, acao e permissao."
    >
      <PageHeader
        title="Permissoes do Flex"
        description="Modelo granular semelhante ao COB, mas isolado no namespace gkli_flex."
      />

      <div className="grid cols-2">
        <Panel title="Perfis iniciais" note="Sprint 1">
          <div className="list">
            {roles.map((role) => (
              <div className="list-item" key={role.id}>
                <div>
                  <div className="item-title">{role.nome}</div>
                  <div className="item-meta">{role.descricao}</div>
                </div>
                <StatusBadge>{role.permissionCount} permissoes</StatusBadge>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Catalogo de permissoes" note="Namespace gkli_flex">
          <div className="list">
            {flexPermissionCatalog.map((item) => (
              <div className="list-item" key={item.permission}>
                <div>
                  <div className="item-title">{item.permission}</div>
                  <div className="item-meta">{item.description}</div>
                </div>
                <StatusBadge>{item.module}</StatusBadge>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </FlexShell>
  );
}
