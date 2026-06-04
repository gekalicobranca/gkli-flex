export type ManagementIndicatorKey =
  | "receitas"
  | "despesas"
  | "resultado_operacional"
  | "comissoes"
  | "pagamentos_previstos"
  | "pagamentos_realizados";

export type ReportType = "receitas" | "despesas" | "comissoes" | "pagamentos" | "fechamentos";

export type ExportFormat = "csv" | "xlsx" | "pdf";

export type ManagementIndicator = {
  key: ManagementIndicatorKey;
  label: string;
  value: number;
  comparisonLabel: string;
  tone: "blue" | "green" | "yellow" | "red";
};

export type ReportDefinition = {
  id: string;
  type: ReportType;
  title: string;
  description: string;
  formats: ExportFormat[];
  status: "disponivel" | "planejado";
};

export type ManagementTimelineItem = {
  id: string;
  title: string;
  description: string;
  reference: string;
  status: "aberto" | "bloqueado" | "fechado";
};

export type ManagementDashboard = {
  indicators: ManagementIndicator[];
  reports: ReportDefinition[];
  timeline: ManagementTimelineItem[];
};
