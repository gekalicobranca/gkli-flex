export type PayrollReceiptImportItem = {
  empregado: string;
  competencia: string;
  cargo: string | null;
  valorLiquido: number;
  vencimentoSugerido: string;
};

const monthMap: Record<string, string> = {
  janeiro: "01",
  fevereiro: "02",
  marco: "03",
  março: "03",
  abril: "04",
  maio: "05",
  junho: "06",
  julho: "07",
  agosto: "08",
  setembro: "09",
  outubro: "10",
  novembro: "11",
  dezembro: "12"
};

export function parseBrazilianCurrency(value: string) {
  return Number(value.replace(/\./g, "").replace(",", "."));
}

export function getPayrollDueDate(competencia: string) {
  const [year, month] = competencia.split("-").map(Number);
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  return `${nextYear}-${String(nextMonth).padStart(2, "0")}-05`;
}

export function parsePayrollReceiptsText(text: string): PayrollReceiptImportItem[] {
  const normalized = text.replace(/\s+/g, " ").trim();
  const receiptBlocks = normalized
    .split("GEKALI COBRANCA LTDA")
    .map((block) => block.trim())
    .filter((block) => block.includes("Nome do Funcion") && block.includes("Valor L"));

  return receiptBlocks
    .map((block) => {
      const nameMatch = block.match(/Código\s+([A-ZÀ-Ú\s]+?)\s+Nome do Funcion/i);
      const competenceMatch = block.match(/Folha Mensal\s+([A-Za-zçÇãÃéÉíÍóÓúÚ]+)\s+de\s+(\d{4})/i);
      const liquidMatch = block.match(
        /Declaro[^.]+\.\s*([\d.]+,\d{2})\s+([\d.]+,\d{2})\s+([\d.]+,\d{2})/i
      );
      const cargoMatch = block.match(/Admiss\S+:\s*\d{2}\/\d{2}\/\d{4}\s*([A-ZÀ-Ú\s]+?)\s+1\s+[\d.]+,\d{2}/i);

      if (!nameMatch || !competenceMatch || !liquidMatch) {
        return null;
      }

      const monthName = competenceMatch[1].toLowerCase();
      const month = monthMap[monthName];

      if (!month) {
        return null;
      }

      const competencia = `${competenceMatch[2]}-${month}`;

      return {
        empregado: nameMatch[1].trim(),
        competencia,
        cargo: cargoMatch?.[1]?.trim() ?? null,
        valorLiquido: parseBrazilianCurrency(liquidMatch[3]),
        vencimentoSugerido: getPayrollDueDate(competencia)
      };
    })
    .filter((item): item is PayrollReceiptImportItem => Boolean(item))
    .filter(
      (item, index, items) =>
        items.findIndex(
          (candidate) =>
            candidate.empregado === item.empregado && candidate.competencia === item.competencia
        ) === index
    );
}
