export type ImportSource = "omie" | "banco_inter";

export type ImportFormat = "xlsx" | "csv";

export type ImportStatus =
  | "rascunho"
  | "pre_validando"
  | "com_inconsistencias"
  | "pronto_para_confirmar"
  | "confirmado"
  | "erro";

export type ImportErrorSeverity = "aviso" | "bloqueio";

export type ImportBatch = {
  id: string;
  competenciaId: string;
  origem: ImportSource;
  formato: ImportFormat;
  arquivoNome: string;
  status: ImportStatus;
  totalLinhas: number;
  linhasValidas: number;
  linhasComAviso: number;
  linhasBloqueadas: number;
  createdAt: string;
  updatedAt: string;
};

export type ImportIssue = {
  id: string;
  importacaoId: string;
  linha: number | null;
  campo: string | null;
  severidade: ImportErrorSeverity;
  mensagem: string;
  sugestao: string | null;
};

export type ImportPreviewRow = {
  id: string;
  importacaoId: string;
  linha: number;
  tipo: "receita" | "extrato_lancamento";
  data: string;
  descricao: string;
  categoriaSugerida: string | null;
  valor: number;
  status: "valida" | "aviso" | "bloqueada";
};

export type ImportFlowStep = {
  label: string;
  description: string;
  status: "done" | "current" | "pending" | "blocked";
};

export type ImportSourceDefinition = {
  origem: ImportSource;
  nome: string;
  formato: ImportFormat;
  objetivo: string;
  cria: string[];
  fluxo: string[];
};
