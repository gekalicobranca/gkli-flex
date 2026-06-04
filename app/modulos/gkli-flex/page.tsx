import { CalendarDays, CheckCircle2, CircleAlert, Clock3 } from "lucide-react";
import {
  cockpitTasks,
  recentActivities
} from "@/features/gkli-flex/mock-data";
import { formatCompetenceLabel } from "@/features/gkli-flex/formatters";
import { getActiveCompetence, getRecentAuditEvents } from "@/features/gkli-flex/repository";
import { FlexShell, PageHeader, Panel, StatusBadge } from "@/features/gkli-flex/ui";

export default async function CockpitPage() {
  const activeCompetence = await getActiveCompetence();
  const auditEvents = await getRecentAuditEvents();
  const competenceLabel = formatCompetenceLabel(activeCompetence.referencia);

  return (
    <FlexShell
      activeHref="/modulos/gkli-flex"
      title="Cockpit operacional"
      description="Mesa diaria para resolver pendencias da competencia aberta."
    >
      <PageHeader
        title="O que precisa ser resolvido agora"
        description="Visao operacional da competencia, sem graficos gerenciais pesados. O foco aqui e pendencia, bloqueio e andamento."
      />

      <div className="grid cols-3">
        <Panel title="Competencia aberta" note={activeCompetence.status}>
          <div className="metric">{competenceLabel}</div>
          <p className="item-meta">Aberta em {activeCompetence.inicio}</p>
        </Panel>
        <Panel title="Andamento do periodo" note="Operacao">
          <div className="metric">62%</div>
          <p className="item-meta">Baseado em importacoes, classificacoes e pagamentos.</p>
        </Panel>
        <Panel title="Bloqueios" note="Fechamento">
          <div className="metric">3</div>
          <p className="item-meta">Itens impedem snapshot financeiro.</p>
        </Panel>
      </div>

      <div className="grid cols-2 stack-lg">
        <Panel title="Tarefas prioritarias" note="Hoje">
          <div className="list">
            {cockpitTasks.map((task) => (
              <div className="list-item" key={task.title}>
                <div>
                  <div className="item-title">{task.title}</div>
                  <div className="item-meta">{task.meta}</div>
                </div>
                <StatusBadge tone={task.tone as "blue" | "yellow" | "red"}>
                  {task.status}
                </StatusBadge>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Atividades recentes" note="Auditoria operacional">
          <div className="list">
            {[...recentActivities, ...auditEvents.map((event) => event.action)].map((activity, index) => {
              const icons = [CheckCircle2, CircleAlert, Clock3, CalendarDays];
              const Icon = icons[index] ?? CheckCircle2;

              return (
                <div className="list-item" key={activity}>
                  <div style={{ alignItems: "center", display: "flex", gap: 10 }}>
                    <Icon color="#0f4c81" size={17} />
                    <span>{activity}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </FlexShell>
  );
}
