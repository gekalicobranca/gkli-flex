import type { ImportSourceDefinition } from "./domain";

export const importSourceDefinitions: ImportSourceDefinition[] = [
  {
    origem: "omie",
    nome: "Omie",
    formato: "xlsx",
    objetivo: "Importar receitas, alimentar comissões e criar categorias quando necessário.",
    cria: ["Receitas", "Base de comissões", "Categorias financeiras"],
    fluxo: ["Selecionar arquivo", "Pré-validar", "Exibir inconsistências", "Confirmar", "Persistir"]
  },
  {
    origem: "banco_inter",
    nome: "Banco Inter",
    formato: "csv",
    objetivo: "Importar extratos, criar lançamentos e executar classificação automática.",
    cria: ["Extratos", "Lançamentos", "Classificação automática"],
    fluxo: ["Selecionar arquivo", "Validar", "Classificar", "Confirmar", "Persistir"]
  },
  {
    origem: "recibos_pagamento",
    nome: "Recibos de pagamento",
    formato: "pdf",
    objetivo: "Importar recibos de empregados e gerar salários na agenda de pagamentos.",
    cria: ["Pagamentos de salário", "Histórico da folha", "Pendências de conferência"],
    fluxo: ["Selecionar PDF", "Extrair recibos", "Revisar valores líquidos", "Confirmar", "Gerar pagamentos"]
  }
];
