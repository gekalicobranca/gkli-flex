import { CheckCheck } from "lucide-react";
import {
  formatCurrency,
  formatPercent
} from "@/features/gkli-flex/comissoes/formatters";
import { getCommissionDashboard } from "@/features/gkli-flex/comissoes/repository";
import {
  getCommissionStatusLabel,
  getCommissionStatusTone
} from "@/features/gkli-flex/comissoes/rules";
import { FlexShell, PageHeader, Panel, StatusBadge } from "@/features/gkli-flex/ui";

export default async function ComissoesPage() {
  const dashboard = await getCommissionDashboard();

  return (
    <FlexShell
      activeHref="/modulos/gkli-flex/comissoes"
      title="Comissoes"
      description="Calculo, conferencia, aprovacao, pagamento e quitacao."
    >
      <PageHeader
        title="Comissoes por competencia"
        description="Fluxo formal a partir das receitas importadas, com conferencia e aprovacao individual, em lote ou por competencia."
        actions={
          <button className="button">
            <CheckCheck size={16} />
            Aprovar lote
          </button>
        }
      />

      <div className="grid cols-3">
        <Panel title="Total calculado" note="Competencia">
          <div className="metric">{formatCurrency(dashboard.overview.totalCalculado)}</div>
          <p className="item-meta">Comissoes geradas a partir das receitas.</p>
        </Panel>
        <Panel title="Total aprovado" note="Liberado">
          <div className="metric">{formatCurrency(dashboard.overview.totalAprovado)}</div>
          <p className="item-meta">Pronto para entrar em pagamentos.</p>
        </Panel>
        <Panel title="Pendencias" note="Conferencia/aprovacao">
          <div className="metric">{dashboard.overview.pendentesConferencia + dashboard.overview.pendentesAprovacao}</div>
          <p className="item-meta">
            {dashboard.overview.pendentesConferencia} para conferir ·{" "}
            {dashboard.overview.pendentesAprovacao} para aprovar
          </p>
        </Panel>
      </div>

      <div className="grid cols-2 stack-lg">
        <Panel title="Tipos de comissao" note="Regras ativas">
          <div className="list">
            {dashboard.types.map((type) => (
              <div className="list-item" key={type.id}>
                <div>
                  <div className="item-title">{type.nome}</div>
                  <div className="item-meta">{type.descricao}</div>
                </div>
                <StatusBadge>{formatPercent(type.percentual)}</StatusBadge>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Eventos recentes" note="Auditoria de comissoes">
          <div className="list">
            {dashboard.events.map((event) => (
              <div className="list-item" key={event.id}>
                <div>
                  <div className="item-title">{event.action}</div>
                  <div className="item-meta">
                    {event.actor?.nome ?? "Usuario"} · {event.motivo ?? "Sem motivo"}
                  </div>
                </div>
                <StatusBadge tone={getCommissionStatusTone(event.nextStatus)}>
                  {getCommissionStatusLabel(event.nextStatus)}
                </StatusBadge>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid stack-lg">
        <Panel title="Conferencia" note="Pendencias atuais">
          <table className="table">
            <thead>
              <tr>
                <th>Colaborador</th>
                <th>Receita</th>
                <th>Tipo</th>
                <th>Base</th>
                <th>Percentual</th>
                <th>Valor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.commissions.map((row) => (
                <tr key={row.id}>
                  <td>{row.collaborator?.nome ?? "Colaborador"}</td>
                  <td>{row.revenue?.descricao ?? row.receitaId}</td>
                  <td>{row.type?.nome ?? "Tipo"}</td>
                  <td>{formatCurrency(row.baseCalculo)}</td>
                  <td>{formatPercent(row.percentual)}</td>
                  <td>{formatCurrency(row.valor)}</td>
                  <td>
                    <StatusBadge tone={getCommissionStatusTone(row.status)}>
                      {getCommissionStatusLabel(row.status)}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>
    </FlexShell>
  );
}
