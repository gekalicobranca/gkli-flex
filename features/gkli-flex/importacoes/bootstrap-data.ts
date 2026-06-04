import type { ImportBatch, ImportIssue, ImportPreviewRow } from "./domain";

export const importBatches: ImportBatch[] = [
  {
    id: "import-omie-2026-06-01",
    competenciaId: "competence-2026-06",
    origem: "omie",
    formato: "xlsx",
    arquivoNome: "omie_receitas_junho_2026.xlsx",
    status: "pronto_para_confirmar",
    totalLinhas: 184,
    linhasValidas: 181,
    linhasComAviso: 3,
    linhasBloqueadas: 0,
    createdAt: "2026-06-03T13:40:00.000Z",
    updatedAt: "2026-06-03T13:45:00.000Z"
  },
  {
    id: "import-inter-2026-06-03",
    competenciaId: "competence-2026-06",
    origem: "banco_inter",
    formato: "csv",
    arquivoNome: "inter_extrato_03062026.csv",
    status: "com_inconsistencias",
    totalLinhas: 96,
    linhasValidas: 84,
    linhasComAviso: 7,
    linhasBloqueadas: 5,
    createdAt: "2026-06-03T16:12:00.000Z",
    updatedAt: "2026-06-03T16:18:00.000Z"
  }
];

export const importIssues: ImportIssue[] = [
  {
    id: "issue-omie-1",
    importacaoId: "import-omie-2026-06-01",
    linha: 44,
    campo: "categoria",
    severidade: "aviso",
    mensagem: "Categoria nao encontrada no Flex.",
    sugestao: "Criar categoria financeira automaticamente ao confirmar."
  },
  {
    id: "issue-inter-1",
    importacaoId: "import-inter-2026-06-03",
    linha: 12,
    campo: "valor",
    severidade: "bloqueio",
    mensagem: "Valor vazio em lancamento bancario.",
    sugestao: "Corrigir arquivo CSV ou ignorar a linha antes de persistir."
  },
  {
    id: "issue-inter-2",
    importacaoId: "import-inter-2026-06-03",
    linha: 19,
    campo: "data",
    severidade: "bloqueio",
    mensagem: "Data fora da competencia aberta.",
    sugestao: "Confirmar se o extrato pertence a Junho/2026."
  },
  {
    id: "issue-inter-3",
    importacaoId: "import-inter-2026-06-03",
    linha: null,
    campo: "saldo_final",
    severidade: "aviso",
    mensagem: "Saldo final informado difere do total calculado.",
    sugestao: "Conferir arredondamentos antes da confirmacao."
  }
];

export const importPreviewRows: ImportPreviewRow[] = [
  {
    id: "preview-omie-1",
    importacaoId: "import-omie-2026-06-01",
    linha: 2,
    tipo: "receita",
    data: "2026-06-02",
    descricao: "Honorarios contrato mensal",
    categoriaSugerida: "Honorarios",
    valor: 18400,
    status: "valida"
  },
  {
    id: "preview-omie-2",
    importacaoId: "import-omie-2026-06-01",
    linha: 44,
    tipo: "receita",
    data: "2026-06-02",
    descricao: "Receita sem categoria mapeada",
    categoriaSugerida: null,
    valor: 3200,
    status: "aviso"
  },
  {
    id: "preview-inter-1",
    importacaoId: "import-inter-2026-06-03",
    linha: 5,
    tipo: "extrato_lancamento",
    data: "2026-06-03",
    descricao: "Tarifa bancaria",
    categoriaSugerida: "Tarifas bancarias",
    valor: -29.9,
    status: "valida"
  },
  {
    id: "preview-inter-2",
    importacaoId: "import-inter-2026-06-03",
    linha: 12,
    tipo: "extrato_lancamento",
    data: "2026-06-03",
    descricao: "Lancamento sem valor",
    categoriaSugerida: null,
    valor: 0,
    status: "bloqueada"
  }
];
