import { Lock, RotateCcw } from "lucide-react";
import { formatCurrency } from "@/features/gkli-flex/fechamentos/formatters";
import { getClosingDashboard } from "@/features/gkli-flex/fechamentos/repository";
import {
  getBlockerTone,
  getChecklistTone,
  getClosingStatusTone
} from "@/features/gkli-flex/fechamentos/rules";
import { FlexShell, PageHeader, Panel, StatusBadge } from "@/features/gkli-flex/ui";

export default async function FechamentosPage() {
  const dashboard = await getClosingDashboard();

  return (
    <FlexShell
      activeHref="/modulos/gkli-flex/fechamentos"
      title="Fechamentos"
      description="Checklist, bloqueios, snapshot financeiro e reabertura auditada."
    >
      <PageHeader
        title="Fechamento da competencia"
        description="A competencia so fecha quando importacoes, classificacoes, comissoes, pagamentos e divergencias estiverem resolvidos."
        actions={
          <>
            <button className="button secondary">
              <RotateCcw size={16} />
              Reabrir
            </button>
            <button className="button">
              <Lock size={16} />
              Fechar
            </button>
          </>
        }
      />

      <div className="grid cols-3">
        <Panel title="Status" note={dashboard.closing.referencia}>
          <div className="metric">{dashboard.closing.status}</div>
          <p className="item-meta">
            Checklist {dashboard.overview.checklistDone}/{dashboard.overview.checklistTotal}
          </p>
        </Panel>
        <Panel title="Bloqueios" note="Impedem fechamento">
          <div className="metric">{dashboard.overview.blockersOpen}</div>
          <p className="item-meta">{dashboard.overview.warningsOpen} aviso(s) em aberto.</p>
        </Panel>
        <Panel title="Pode fechar" note="Validacao">
          <div className="metric">{dashboard.overview.canClose ? "Sim" : "Nao"}</div>
          <p className="item-meta">
            <StatusBadge tone={getClosingStatusTone(dashboard.closing.status)}>
              {dashboard.closing.status}
            </StatusBadge>
          </p>
        </Panel>
      </div>

      <div className="grid cols-2">
        <Panel title="Checklist obrigatorio" note="Junho/2026">
          <div className="list">
            {dashboard.checklist.map((item) => (
              <div className="list-item" key={item.title}>
                <div>
                  <div className="item-title">{item.title}</div>
                  <div className="item-meta">{item.detail}</div>
                </div>
                <StatusBadge tone={getChecklistTone(item.done)}>
                  {item.done ? "OK" : "Pendente"}
                </StatusBadge>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Bloqueios" note="Resolver antes de fechar">
          <div className="list">
            {dashboard.blockers.map((blocker) => (
              <div className="list-item" key={blocker.id}>
                <div>
                  <div className="item-title">{blocker.title}</div>
                  <div className="item-meta">{blocker.detail}</div>
                </div>
                <StatusBadge tone={getBlockerTone(blocker.severity, blocker.resolved)}>
                  {blocker.resolved ? "Resolvido" : blocker.severity}
                </StatusBadge>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid cols-2 stack-lg">
        <Panel title="Snapshot financeiro" note="Previa historica">
          {dashboard.snapshot ? (
            <table className="table">
              <tbody>
                <tr>
                  <th>Receitas</th>
                  <td>{formatCurrency(dashboard.snapshot.receitas)}</td>
                </tr>
                <tr>
                  <th>Despesas</th>
                  <td>{formatCurrency(dashboard.snapshot.despesas)}</td>
                </tr>
                <tr>
                  <th>Comissoes</th>
                  <td>{formatCurrency(dashboard.snapshot.comissoes)}</td>
                </tr>
                <tr>
                  <th>Pagamentos previstos</th>
                  <td>{formatCurrency(dashboard.snapshot.pagamentosPrevistos)}</td>
                </tr>
                <tr>
                  <th>Pagamentos realizados</th>
                  <td>{formatCurrency(dashboard.snapshot.pagamentosRealizados)}</td>
                </tr>
                <tr>
                  <th>Resultado operacional</th>
                  <td>{formatCurrency(dashboard.snapshot.resultadoOperacional)}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              O snapshot sera gerado no fechamento e preservara valores historicos.
            </div>
          )}
        </Panel>

        <Panel title="Reabertura" note="Motivo obrigatorio">
          <div className="empty-state">
            Competencias fechadas so podem ser reabertas com usuario responsavel,
            motivo obrigatorio e registro de auditoria.
          </div>
        </Panel>
      </div>
    </FlexShell>
  );
}
