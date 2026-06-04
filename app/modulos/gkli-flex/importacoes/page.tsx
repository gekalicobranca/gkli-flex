import { UploadCloud } from "lucide-react";
import { formatCurrency, formatImportSource } from "@/features/gkli-flex/importacoes/formatters";
import { getImportDashboard } from "@/features/gkli-flex/importacoes/repository";
import { getImportFlowSteps, summarizeIssues } from "@/features/gkli-flex/importacoes/validation";
import { FlexShell, PageHeader, Panel, StatusBadge } from "@/features/gkli-flex/ui";

export default async function ImportacoesPage() {
  const dashboard = await getImportDashboard();

  return (
    <FlexShell
      activeHref="/modulos/gkli-flex/importacoes"
      title="Importacoes"
      description="Entrada controlada de Omie XLSX e Banco Inter CSV."
    >
      <PageHeader
        title="Importar, validar e persistir"
        description="Cada arquivo passa por pre-validacao, exibicao de inconsistencias e confirmacao antes de gravar dados no schema do Flex."
        actions={
          <button className="button">
            <UploadCloud size={16} />
            Nova importacao
          </button>
        }
      />

      <div className="grid cols-2">
        {dashboard.sources.map((item) => (
          <Panel key={item.origem} title={item.nome} note={item.formato.toUpperCase()}>
            <div className="list">
              <div className="list-item">
                <div>
                  <div className="item-title">{item.objetivo}</div>
                  <div className="item-meta">{item.cria.join(" · ")}</div>
                </div>
                <StatusBadge>{item.fluxo.length} etapas</StatusBadge>
              </div>
            </div>
          </Panel>
        ))}
      </div>

      <div className="grid stack-lg">
        <Panel title="Lotes em processamento" note="Competencia aberta">
          <table className="table">
            <thead>
              <tr>
                <th>Origem</th>
                <th>Arquivo</th>
                <th>Linhas</th>
                <th>Avisos</th>
                <th>Bloqueios</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.batches.map((batch) => {
                const issueSummary = summarizeIssues(batch.issues);
                const statusTone = batch.linhasBloqueadas > 0 ? "red" : "green";

                return (
                  <tr key={batch.id}>
                    <td>{formatImportSource(batch.origem)}</td>
                    <td>{batch.arquivoNome}</td>
                    <td>
                      {batch.linhasValidas}/{batch.totalLinhas}
                    </td>
                    <td>{issueSummary.warnings}</td>
                    <td>{issueSummary.blockers}</td>
                    <td>
                      <StatusBadge tone={statusTone}>{batch.status}</StatusBadge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Panel>
      </div>

      <div className="grid cols-2 stack-lg">
        {dashboard.batches.map((batch) => {
          const steps = getImportFlowSteps(batch);

          return (
            <Panel
              key={`${batch.id}-detail`}
              title={`${formatImportSource(batch.origem)} · ${batch.arquivoNome}`}
              note={batch.formato.toUpperCase()}
            >
              <div className="list">
                {steps.map((step) => (
                  <div className="list-item" key={step.label}>
                    <div>
                      <div className="item-title">{step.label}</div>
                      <div className="item-meta">{step.description}</div>
                    </div>
                    <StatusBadge
                      tone={
                        step.status === "blocked"
                          ? "red"
                          : step.status === "done"
                            ? "green"
                            : "blue"
                      }
                    >
                      {step.status}
                    </StatusBadge>
                  </div>
                ))}
              </div>
            </Panel>
          );
        })}
      </div>

      <div className="grid cols-2 stack-lg">
        <Panel title="Inconsistencias" note="Revisao antes de confirmar">
          <div className="list">
            {dashboard.batches.flatMap((batch) =>
              batch.issues.map((issue) => (
                <div className="list-item" key={issue.id}>
                  <div>
                    <div className="item-title">
                      {formatImportSource(batch.origem)}
                      {issue.linha ? ` · linha ${issue.linha}` : ""}
                    </div>
                    <div className="item-meta">{issue.mensagem}</div>
                  </div>
                  <StatusBadge tone={issue.severidade === "bloqueio" ? "red" : "yellow"}>
                    {issue.severidade}
                  </StatusBadge>
                </div>
              ))
            )}
          </div>
        </Panel>

        <Panel title="Previa normalizada" note="Amostra do que sera persistido">
          <table className="table">
            <thead>
              <tr>
                <th>Linha</th>
                <th>Tipo</th>
                <th>Descricao</th>
                <th>Valor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.batches.flatMap((batch) =>
                batch.previewRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.linha}</td>
                    <td>{row.tipo}</td>
                    <td>{row.descricao}</td>
                    <td>{formatCurrency(row.valor)}</td>
                    <td>
                      <StatusBadge
                        tone={
                          row.status === "bloqueada"
                            ? "red"
                            : row.status === "aviso"
                              ? "yellow"
                              : "green"
                        }
                      >
                        {row.status}
                      </StatusBadge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Panel>
      </div>
    </FlexShell>
  );
}
