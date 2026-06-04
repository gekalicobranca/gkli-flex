import { CalendarPlus } from "lucide-react";
import { formatCurrency } from "@/features/gkli-flex/pagamentos/formatters";
import { getPaymentDashboard } from "@/features/gkli-flex/pagamentos/repository";
import {
  getPaymentStatusTone,
  getPaymentTypeLabel
} from "@/features/gkli-flex/pagamentos/rules";
import { FlexShell, PageHeader, Panel, StatusBadge } from "@/features/gkli-flex/ui";

export default async function PagamentosPage() {
  const dashboard = await getPaymentDashboard();

  return (
    <FlexShell
      activeHref="/modulos/gkli-flex/pagamentos"
      title="Pagamentos"
      description="Comissões, salários, pró-labore, fornecedores, reembolsos e recorrências."
    >
      <PageHeader
        eyebrow="Operação"
        title="Agenda de pagamentos"
        description="Controle de previstos, agendados, pagos e cancelados, incluindo geração automática de recorrentes."
        actions={
          <button className="button">
            <CalendarPlus size={16} />
            Novo pagamento
          </button>
        }
      />

      <div className="grid cols-3">
        <Panel title="Previsto" note="Aguardando agenda">
          <div className="metric">{formatCurrency(dashboard.overview.totalPrevisto)}</div>
          <p className="item-meta">{dashboard.overview.pendentes} pagamento(s) pendente(s).</p>
        </Panel>
        <Panel title="Agendado" note="Fila de pagamento">
          <div className="metric">{formatCurrency(dashboard.overview.totalAgendado)}</div>
          <p className="item-meta">Valores ainda nao confirmados.</p>
        </Panel>
        <Panel title="Pago" note="Confirmado">
          <div className="metric">{formatCurrency(dashboard.overview.totalPago)}</div>
          <p className="item-meta">Pagamentos quitados na competencia.</p>
        </Panel>
      </div>

      <div className="grid stack-lg">
        <Panel title="Pagamentos da competencia" note="Junho/2026">
          <table className="table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Favorecido</th>
                <th>Origem</th>
                <th>Vencimento</th>
                <th>Valor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.payments.map((row) => (
                <tr key={row.id}>
                  <td>{getPaymentTypeLabel(row.tipo)}</td>
                  <td>{row.favorecido}</td>
                  <td>
                    {row.commission
                      ? "Comissão aprovada"
                      : row.importBatch
                        ? "Importação de recibos"
                      : row.recurring
                        ? "Recorrente"
                        : "Manual"}
                  </td>
                  <td>{row.vencimento}</td>
                  <td>{formatCurrency(row.valor)}</td>
                  <td>
                    <StatusBadge tone={getPaymentStatusTone(row.status)}>{row.status}</StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>

      <div className="grid cols-2 stack-lg">
        <Panel title="Recorrências ativas" note="Geração automática futura">
          <div className="list">
            {dashboard.recurringPayments.map((row) => (
              <div className="list-item" key={row.id}>
                <div>
                  <div className="item-title">{row.favorecido}</div>
                  <div className="item-meta">
                    {getPaymentTypeLabel(row.tipo)} · dia {row.diaVencimento} · {row.frequencia}
                  </div>
                </div>
                <StatusBadge>{formatCurrency(row.valor)}</StatusBadge>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Eventos recentes" note="Auditoria de pagamentos">
          <div className="list">
            {dashboard.events.map((event) => (
              <div className="list-item" key={event.id}>
                <div>
                  <div className="item-title">{event.action}</div>
                  <div className="item-meta">
                    {event.actor?.nome ?? "Usuario"} · {event.motivo ?? "Sem motivo"}
                  </div>
                </div>
                <StatusBadge tone={getPaymentStatusTone(event.nextStatus)}>
                  {event.nextStatus}
                </StatusBadge>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </FlexShell>
  );
}
