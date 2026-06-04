import type { FlexPermission, FlexRole } from "./domain";

export const flexPermissionCatalog: {
  permission: FlexPermission;
  label: string;
  module: string;
  description: string;
}[] = [
  {
    permission: "gkli_flex.admin",
    label: "Administrador Flex",
    module: "Administracao",
    description: "Acesso total ao app, incluindo colaboradores, permissoes e reaberturas."
  },
  {
    permission: "gkli_flex.importacoes.read",
    label: "Ver importacoes",
    module: "Importacoes",
    description: "Consulta historico, validacoes e inconsistencias de arquivos."
  },
  {
    permission: "gkli_flex.importacoes.write",
    label: "Operar importacoes",
    module: "Importacoes",
    description: "Envia arquivos, confirma importacoes e registra inconsistencias."
  },
  {
    permission: "gkli_flex.financeiro.read",
    label: "Ver financeiro",
    module: "Financeiro",
    description: "Consulta receitas, despesas, extratos, categorias e orcamento."
  },
  {
    permission: "gkli_flex.financeiro.write",
    label: "Operar financeiro",
    module: "Financeiro",
    description: "Classifica lancamentos, ajusta categorias, regras e orcamentos."
  },
  {
    permission: "gkli_flex.comissoes.read",
    label: "Ver comissoes",
    module: "Comissoes",
    description: "Consulta calculos, conferencias e historico de comissoes."
  },
  {
    permission: "gkli_flex.comissoes.write",
    label: "Operar comissoes",
    module: "Comissoes",
    description: "Calcula, ajusta, confere, rejeita e retorna comissoes."
  },
  {
    permission: "gkli_flex.comissoes.approve",
    label: "Aprovar comissoes",
    module: "Comissoes",
    description: "Aprova comissoes individualmente, em lote ou por competencia."
  },
  {
    permission: "gkli_flex.pagamentos.read",
    label: "Ver pagamentos",
    module: "Pagamentos",
    description: "Consulta agenda, recorrencias e confirmacoes de pagamento."
  },
  {
    permission: "gkli_flex.pagamentos.write",
    label: "Operar pagamentos",
    module: "Pagamentos",
    description: "Cria, agenda, confirma e cancela pagamentos."
  },
  {
    permission: "gkli_flex.fechamentos.read",
    label: "Ver fechamentos",
    module: "Fechamentos",
    description: "Consulta checklist, bloqueios e snapshots financeiros."
  },
  {
    permission: "gkli_flex.fechamentos.close",
    label: "Fechar competencia",
    module: "Fechamentos",
    description: "Executa fechamento mensal quando nao houver bloqueios."
  },
  {
    permission: "gkli_flex.fechamentos.reopen",
    label: "Reabrir competencia",
    module: "Fechamentos",
    description: "Reabre competencia fechada com motivo obrigatorio e auditoria."
  },
  {
    permission: "gkli_flex.gestao.read",
    label: "Ver gestao",
    module: "Gestao",
    description: "Consulta dashboard gerencial, indicadores e relatorios."
  },
  {
    permission: "gkli_flex.acessos.write",
    label: "Gerir acessos",
    module: "Administracao",
    description: "Cria colaboradores, times, perfis e vinculos de permissoes."
  }
];

export const baseRoles: FlexRole[] = [
  {
    id: "role-admin",
    nome: "Administrador",
    descricao: "Gestao completa do GKLI Flex.",
    permissions: ["gkli_flex.admin"],
    status: "ativo",
    createdAt: "2026-06-01T09:00:00.000Z",
    updatedAt: "2026-06-01T09:00:00.000Z"
  },
  {
    id: "role-financeiro",
    nome: "Operacao financeira",
    descricao: "Rotina diaria de importacoes, financeiro e pagamentos.",
    permissions: [
      "gkli_flex.importacoes.read",
      "gkli_flex.importacoes.write",
      "gkli_flex.financeiro.read",
      "gkli_flex.financeiro.write",
      "gkli_flex.pagamentos.read",
      "gkli_flex.pagamentos.write",
      "gkli_flex.fechamentos.read"
    ],
    status: "ativo",
    createdAt: "2026-06-01T09:00:00.000Z",
    updatedAt: "2026-06-01T09:00:00.000Z"
  },
  {
    id: "role-gestao",
    nome: "Gestao",
    descricao: "Acesso gerencial a indicadores, comissoes e fechamentos.",
    permissions: [
      "gkli_flex.financeiro.read",
      "gkli_flex.comissoes.read",
      "gkli_flex.comissoes.approve",
      "gkli_flex.pagamentos.read",
      "gkli_flex.fechamentos.read",
      "gkli_flex.fechamentos.close",
      "gkli_flex.gestao.read"
    ],
    status: "ativo",
    createdAt: "2026-06-01T09:00:00.000Z",
    updatedAt: "2026-06-01T09:00:00.000Z"
  }
];

export function hasPermission(role: FlexRole, permission: FlexPermission) {
  return role.permissions.includes("gkli_flex.admin") || role.permissions.includes(permission);
}
