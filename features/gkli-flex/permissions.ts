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
    module: "Administração",
    description: "Acesso total ao app, incluindo colaboradores, permissões e reaberturas."
  },
  {
    permission: "gkli_flex.importacoes.read",
    label: "Ver importacoes",
    module: "Importacoes",
    description: "Consulta histórico, validações e inconsistências de arquivos."
  },
  {
    permission: "gkli_flex.importacoes.write",
    label: "Operar importacoes",
    module: "Importacoes",
    description: "Envia arquivos, confirma importações e registra inconsistências."
  },
  {
    permission: "gkli_flex.financeiro.read",
    label: "Ver financeiro",
    module: "Financeiro",
    description: "Consulta receitas, despesas, extratos, categorias e orçamento."
  },
  {
    permission: "gkli_flex.financeiro.write",
    label: "Operar financeiro",
    module: "Financeiro",
    description: "Classifica lançamentos, ajusta categorias, regras e orçamentos."
  },
  {
    permission: "gkli_flex.comissoes.read",
    label: "Ver comissoes",
    module: "Comissoes",
    description: "Consulta cálculos, conferências e histórico de comissões."
  },
  {
    permission: "gkli_flex.comissoes.write",
    label: "Operar comissoes",
    module: "Comissoes",
    description: "Calcula, ajusta, confere, rejeita e retorna comissões."
  },
  {
    permission: "gkli_flex.comissoes.approve",
    label: "Aprovar comissoes",
    module: "Comissoes",
    description: "Aprova comissões individualmente, em lote ou por competência."
  },
  {
    permission: "gkli_flex.pagamentos.read",
    label: "Ver pagamentos",
    module: "Pagamentos",
    description: "Consulta agenda, recorrências e confirmações de pagamento."
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
    description: "Executa fechamento mensal quando não houver bloqueios."
  },
  {
    permission: "gkli_flex.fechamentos.reopen",
    label: "Reabrir competencia",
    module: "Fechamentos",
    description: "Reabre competência fechada com motivo obrigatório e auditoria."
  },
  {
    permission: "gkli_flex.gestao.read",
    label: "Ver gestao",
    module: "Gestao",
    description: "Consulta dashboard gerencial, indicadores e relatórios."
  },
  {
    permission: "gkli_flex.acessos.write",
    label: "Gerir acessos",
    module: "Administração",
    description: "Cria colaboradores, times, perfis e vínculos de permissões."
  }
];

export const baseRoles: FlexRole[] = [
  {
    id: "role-admin",
    nome: "Administrador",
    descricao: "Gestão completa do GKLI Flex.",
    permissions: ["gkli_flex.admin"],
    status: "ativo",
    createdAt: "2026-06-01T09:00:00.000Z",
    updatedAt: "2026-06-01T09:00:00.000Z"
  },
  {
    id: "role-financeiro",
    nome: "Operacao financeira",
    descricao: "Rotina diária de importações, financeiro e pagamentos.",
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
    descricao: "Acesso gerencial a indicadores, comissões e fechamentos.",
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
