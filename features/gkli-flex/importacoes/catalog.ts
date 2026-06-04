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
  }
];
