import type { ImportSource } from "./domain";

export function formatImportSource(source: ImportSource) {
  const names: Record<ImportSource, string> = {
    omie: "Omie",
    banco_inter: "Banco Inter"
  };

  return names[source];
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}
