import { getClosingDashboard } from "../fechamentos/repository";
import type { ManagementDashboard, ReportDefinition } from "./domain";

const reportDefinitions: ReportDefinition[] = [
  {
    id: "report-receitas",
    type: "receitas",
    title: "Receitas",
    description: "Receitas por competencia, origem, cliente e categoria.",
    formats: ["csv", "xlsx"],
    status: "disponivel"
  },
  {
    id: "report-despesas",
    type: "despesas",
    title: "Despesas",
    description: "Lancamentos por categoria, status e extrato de origem.",
    formats: ["csv", "xlsx"],
    status: "disponivel"
  },
  {
    id: "report-comissoes",
    type: "comissoes",
    title: "Comissoes",
    description: "Comissoes por colaborador, receita, status e aprovacao.",
    formats: ["csv", "xlsx"],
    status: "disponivel"
  },
  {
    id: "report-pagamentos",
    type: "pagamentos",
    title: "Pagamentos",
    description: "Agenda de pagamentos por tipo, favorecido, vencimento e status.",
    formats: ["csv", "xlsx"],
    status: "disponivel"
  },
  {
    id: "report-fechamentos",
    type: "fechamentos",
    title: "Fechamentos",
    description: "Historico de competencias, snapshots e reaberturas.",
    formats: ["csv", "xlsx", "pdf"],
    status: "planejado"
  }
];

export async function getManagementDashboard(): Promise<ManagementDashboard> {
  const closingDashboard = await getClosingDashboard();
  const snapshot = closingDashboard.snapshot;

  const receitas = snapshot?.receitas ?? 0;
  const despesas = snapshot?.despesas ?? 0;
  const resultado = snapshot?.resultadoOperacional ?? receitas - despesas;
  const comissoes = snapshot?.comissoes ?? 0;
  const pagamentosPrevistos = snapshot?.pagamentosPrevistos ?? 0;
  const pagamentosRealizados = snapshot?.pagamentosRealizados ?? 0;

  return {
    indicators: [
      {
        key: "receitas",
        label: "Receitas",
        value: receitas,
        comparisonLabel: "Realizado da competencia",
        tone: "blue"
      },
      {
        key: "despesas",
        label: "Despesas",
        value: despesas,
        comparisonLabel: "Lancamentos classificados e pendentes",
        tone: "yellow"
      },
      {
        key: "resultado_operacional",
        label: "Resultado operacional",
        value: resultado,
        comparisonLabel: "Previa antes do fechamento",
        tone: resultado >= 0 ? "green" : "red"
      },
      {
        key: "comissoes",
        label: "Comissoes",
        value: comissoes,
        comparisonLabel: "Calculadas na competencia",
        tone: "blue"
      },
      {
        key: "pagamentos_previstos",
        label: "Pagamentos previstos",
        value: pagamentosPrevistos,
        comparisonLabel: "Agenda total da competencia",
        tone: "yellow"
      },
      {
        key: "pagamentos_realizados",
        label: "Pagamentos realizados",
        value: pagamentosRealizados,
        comparisonLabel: "Confirmados pela operacao",
        tone: "green"
      }
    ],
    reports: reportDefinitions,
    timeline: [
      {
        id: closingDashboard.closing.id,
        title: `Competencia ${closingDashboard.closing.referencia}`,
        description: `${closingDashboard.overview.blockersOpen} bloqueio(s), ${closingDashboard.overview.warningsOpen} aviso(s)`,
        reference: closingDashboard.closing.referencia,
        status:
          closingDashboard.closing.status === "fechado"
            ? "fechado"
            : closingDashboard.overview.blockersOpen > 0
              ? "bloqueado"
              : "aberto"
      }
    ]
  };
}
