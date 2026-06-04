import { Download } from "lucide-react";
import { formatCurrency } from "@/features/gkli-flex/gestao/formatters";
import { getManagementDashboard } from "@/features/gkli-flex/gestao/repository";
import { FlexShell, PageHeader, Panel, StatusBadge } from "@/features/gkli-flex/ui";

export default async function GestaoPage() {
  const dashboard = await getManagementDashboard();

  return (
    <FlexShell
      activeHref="/modulos/gkli-flex/gestao"
      title="Gestão"
      description="Indicadores consolidados separados do cockpit operacional."
    >
      <PageHeader
        eyebrow="Gestão"
        title="Dashboard gerencial"
        description="Visão de gestão para receitas, despesas, resultado operacional, comissões e pagamentos."
        actions={
          <button className="button secondary">
            <Download size={16} />
            Exportar
          </button>
        }
      />

      <div className="grid cols-3">
        {dashboard.indicators.map((indicator) => (
          <Panel key={indicator.key} title={indicator.label} note="Junho/2026">
            <div className="metric">{formatCurrency(indicator.value)}</div>
            <p className="item-meta">{indicator.comparisonLabel}</p>
          </Panel>
        ))}
      </div>

      <div className="grid cols-2" style={{ marginTop: 16 }}>
        <Panel title="Relatórios" note="Exportações">
          <div className="list">
            {dashboard.reports.map((report) => (
              <div className="list-item" key={report.id}>
                <div>
                  <div className="item-title">{report.title}</div>
                  <div className="item-meta">{report.description}</div>
                </div>
                <StatusBadge tone={report.status === "disponivel" ? "green" : "yellow"}>
                  {report.formats.join(" ").toUpperCase()}
                </StatusBadge>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Competências" note="Histórico gerencial">
          <div className="list">
            {dashboard.timeline.map((item) => (
              <div className="list-item" key={item.id}>
                <div>
                  <div className="item-title">{item.title}</div>
                  <div className="item-meta">{item.description}</div>
                </div>
                <StatusBadge
                  tone={
                    item.status === "fechado"
                      ? "green"
                      : item.status === "bloqueado"
                        ? "red"
                        : "blue"
                  }
                >
                  {item.status}
                </StatusBadge>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </FlexShell>
  );
}
