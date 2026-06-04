import { SlidersHorizontal } from "lucide-react";
import { getEntryStatusLabel } from "@/features/gkli-flex/financeiro/classification";
import {
  formatCategoryType,
  formatCurrency,
  getBudgetTone
} from "@/features/gkli-flex/financeiro/formatters";
import { getFinancialDashboard } from "@/features/gkli-flex/financeiro/repository";
import { FlexShell, PageHeader, Panel, StatusBadge } from "@/features/gkli-flex/ui";

export default async function FinanceiroPage() {
  const dashboard = await getFinancialDashboard();

  return (
    <FlexShell
      activeHref="/modulos/gkli-flex/financeiro"
      title="Financeiro"
      description="Receitas, despesas, extratos, categorias, regras e orçamento."
    >
      <PageHeader
        eyebrow="Operação"
        title="Controle financeiro light"
        description="Acompanhe previsto x realizado por competência, sem contas a receber detalhado e sem conciliação bancária avançada."
        actions={
          <button className="button secondary">
            <SlidersHorizontal size={16} />
            Regras
          </button>
        }
      />

      <div className="grid cols-3">
        <Panel title="Receitas" note="Realizado">
          <div className="metric">{formatCurrency(dashboard.overview.totalReceitas)}</div>
          <p className="item-meta">Receitas confirmadas na competência.</p>
        </Panel>
        <Panel title="Despesas" note="Classificadas e pendentes">
          <div className="metric">{formatCurrency(dashboard.overview.totalDespesas)}</div>
          <p className="item-meta">
            {dashboard.overview.lancamentosNaoClassificados} lançamento sem classificação.
          </p>
        </Panel>
        <Panel title="Resultado operacional" note="Previo">
          <div className="metric">{formatCurrency(dashboard.overview.resultadoOperacional)}</div>
          <p className="item-meta">
            {dashboard.overview.divergenciasOrcamento} divergências no orçamento.
          </p>
        </Panel>
      </div>

      <div className="grid cols-2 stack-lg">
        <Panel title="Receitas" note="Origem Omie/manual">
          <table className="table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Cliente</th>
                <th>Descricao</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.revenues.map((row) => (
                <tr key={row.id}>
                  <td>{row.data}</td>
                  <td>{row.cliente}</td>
                  <td>{row.descricao}</td>
                  <td>{formatCurrency(row.valor)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel title="Extratos" note="Banco Inter">
          <table className="table">
            <thead>
              <tr>
                <th>Banco</th>
                <th>Conta</th>
                <th>Periodo</th>
                <th>Saldo final</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.statements.map((row) => (
                <tr key={row.id}>
                  <td>{row.banco}</td>
                  <td>{row.conta}</td>
                  <td>
                    {row.periodoInicio} a {row.periodoFim}
                  </td>
                  <td>{formatCurrency(row.saldoFinal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>

      <div className="grid stack-lg">
        <Panel title="Lançamentos de extrato" note="Classificação operacional">
          <table className="table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Regra</th>
                <th>Valor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.entries.map((row) => (
                <tr key={row.id}>
                  <td>{row.data}</td>
                  <td>{row.descricao}</td>
                  <td>{row.category?.nome ?? "Sem categoria"}</td>
                  <td>{row.rule?.nome ?? "Manual"}</td>
                  <td>{formatCurrency(row.valor)}</td>
                  <td>
                    <StatusBadge
                      tone={
                        row.status === "nao_classificado" || row.status === "divergente"
                          ? "red"
                          : "green"
                      }
                    >
                      {getEntryStatusLabel(row.status)}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>

      <div className="grid cols-2 stack-lg">
        <Panel title="Categorias e regras" note="Classificação automática">
          <div className="list">
            {dashboard.categories.map((category) => {
              const categoryRules = dashboard.rules.filter(
                (rule) => rule.categoriaId === category.id
              );

              return (
                <div className="list-item" key={category.id}>
                  <div>
                    <div className="item-title">{category.nome}</div>
                    <div className="item-meta">
                      {formatCategoryType(category.tipo)} · {categoryRules.length} regra(s)
                    </div>
                  </div>
                  <StatusBadge>{category.status}</StatusBadge>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel title="Orçamento da competência" note="Previsto x realizado">
          <table className="table">
            <thead>
              <tr>
                <th>Categoria</th>
                <th>Previsto</th>
                <th>Realizado</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.budgetItems.map((row) => (
                <tr key={row.id}>
                  <td>{row.category?.nome ?? "Categoria"}</td>
                  <td>{formatCurrency(row.valorPrevisto)}</td>
                  <td>{formatCurrency(row.valorRealizado)}</td>
                  <td>
                    <StatusBadge tone={getBudgetTone(row.status)}>{row.status}</StatusBadge>
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
