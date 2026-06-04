import type { ImportSourceDefinition } from "./domain";

export const importSourceDefinitions: ImportSourceDefinition[] = [
  {
    origem: "omie",
    nome: "Omie",
    formato: "xlsx",
    objetivo: "Importar receitas, alimentar comissoes e criar categorias quando necessario.",
    cria: ["Receitas", "Base de comissoes", "Categorias financeiras"],
    fluxo: ["Selecionar arquivo", "Pre-validar", "Exibir inconsistencias", "Confirmar", "Persistir"]
  },
  {
    origem: "banco_inter",
    nome: "Banco Inter",
    formato: "csv",
    objetivo: "Importar extratos, criar lancamentos e executar classificacao automatica.",
    cria: ["Extratos", "Lancamentos", "Classificacao automatica"],
    fluxo: ["Selecionar arquivo", "Validar", "Classificar", "Confirmar", "Persistir"]
  }
];
