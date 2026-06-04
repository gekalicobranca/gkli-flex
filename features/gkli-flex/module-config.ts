import {
  BadgeDollarSign,
  Banknote,
  BarChart3,
  ClipboardCheck,
  FileSpreadsheet,
  LayoutDashboard,
  LockKeyhole,
  ReceiptText,
  Users
} from "lucide-react";

export const flexSchemaName = "gkli_flex";

export const flexPermissions = [
  "gkli_flex.admin",
  "gkli_flex.importacoes.read",
  "gkli_flex.importacoes.write",
  "gkli_flex.financeiro.read",
  "gkli_flex.financeiro.write",
  "gkli_flex.comissoes.read",
  "gkli_flex.comissoes.write",
  "gkli_flex.pagamentos.read",
  "gkli_flex.pagamentos.write",
  "gkli_flex.fechamentos.read",
  "gkli_flex.fechamentos.write",
  "gkli_flex.gestao.read",
  "gkli_flex.acessos.write"
] as const;

export const flexModules = [
  {
    title: "Cockpit",
    href: "/modulos/gkli-flex",
    icon: LayoutDashboard,
    permission: "gkli_flex.financeiro.read",
    group: "Operacao"
  },
  {
    title: "Importacoes",
    href: "/modulos/gkli-flex/importacoes",
    icon: FileSpreadsheet,
    permission: "gkli_flex.importacoes.read",
    group: "Operacao"
  },
  {
    title: "Financeiro",
    href: "/modulos/gkli-flex/financeiro",
    icon: ReceiptText,
    permission: "gkli_flex.financeiro.read",
    group: "Operacao"
  },
  {
    title: "Comissoes",
    href: "/modulos/gkli-flex/comissoes",
    icon: BadgeDollarSign,
    permission: "gkli_flex.comissoes.read",
    group: "Operacao"
  },
  {
    title: "Pagamentos",
    href: "/modulos/gkli-flex/pagamentos",
    icon: Banknote,
    permission: "gkli_flex.pagamentos.read",
    group: "Operacao"
  },
  {
    title: "Fechamentos",
    href: "/modulos/gkli-flex/fechamentos",
    icon: ClipboardCheck,
    permission: "gkli_flex.fechamentos.read",
    group: "Controle"
  },
  {
    title: "Gestao",
    href: "/modulos/gkli-flex/gestao",
    icon: BarChart3,
    permission: "gkli_flex.gestao.read",
    group: "Controle"
  },
  {
    title: "Colaboradores",
    href: "/modulos/gkli-flex/colaboradores",
    icon: Users,
    permission: "gkli_flex.acessos.write",
    group: "Administracao"
  },
  {
    title: "Acessos",
    href: "/modulos/gkli-flex/acessos",
    icon: LockKeyhole,
    permission: "gkli_flex.acessos.write",
    group: "Administracao"
  }
];

export type FlexModule = (typeof flexModules)[number];
