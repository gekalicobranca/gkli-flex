create table if not exists gkli_flex.categorias_financeiras (
  id uuid primary key default gen_random_uuid(),
  nome text not null unique,
  tipo text not null check (tipo in ('receita', 'despesa', 'ambos')),
  descricao text not null default '',
  status text not null default 'ativo' check (status in ('ativo', 'inativo')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists gkli_flex.regras_classificacao (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  categoria_id uuid not null references gkli_flex.categorias_financeiras(id),
  texto text not null,
  prioridade integer not null default 0,
  status text not null default 'ativo' check (status in ('ativo', 'inativo')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (texto, categoria_id)
);

create table if not exists gkli_flex.receitas (
  id uuid primary key default gen_random_uuid(),
  competencia_id uuid not null references gkli_flex.competencias(id),
  importacao_id uuid references gkli_flex.importacoes(id),
  data_receita date not null,
  cliente text not null,
  categoria_id uuid not null references gkli_flex.categorias_financeiras(id),
  descricao text not null,
  valor numeric(14, 2) not null check (valor >= 0),
  origem text not null default 'manual' check (origem in ('omie', 'manual')),
  observacoes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists gkli_flex.extratos (
  id uuid primary key default gen_random_uuid(),
  competencia_id uuid not null references gkli_flex.competencias(id),
  importacao_id uuid references gkli_flex.importacoes(id),
  banco text not null,
  conta text not null,
  periodo_inicio date not null,
  periodo_fim date not null,
  saldo_inicial numeric(14, 2) not null default 0,
  saldo_final numeric(14, 2) not null default 0,
  quantidade_lancamentos integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (periodo_inicio <= periodo_fim),
  check (quantidade_lancamentos >= 0)
);

create table if not exists gkli_flex.extrato_lancamentos (
  id uuid primary key default gen_random_uuid(),
  extrato_id uuid not null references gkli_flex.extratos(id) on delete cascade,
  data_lancamento date not null,
  descricao text not null,
  valor numeric(14, 2) not null,
  categoria_id uuid references gkli_flex.categorias_financeiras(id),
  regra_classificacao_id uuid references gkli_flex.regras_classificacao(id),
  status text not null default 'nao_classificado'
    check (
      status in (
        'nao_classificado',
        'classificado',
        'conciliado',
        'ignorado',
        'divergente'
      )
    ),
  observacoes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists gkli_flex.orcamentos (
  id uuid primary key default gen_random_uuid(),
  competencia_id uuid not null references gkli_flex.competencias(id),
  status text not null default 'rascunho'
    check (status in ('rascunho', 'ativo', 'revisado', 'fechado')),
  created_by uuid references gkli_flex.colaboradores(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (competencia_id)
);

create table if not exists gkli_flex.orcamento_itens (
  id uuid primary key default gen_random_uuid(),
  orcamento_id uuid not null references gkli_flex.orcamentos(id) on delete cascade,
  categoria_id uuid not null references gkli_flex.categorias_financeiras(id),
  valor_previsto numeric(14, 2) not null default 0,
  valor_realizado numeric(14, 2) not null default 0,
  diferenca numeric(14, 2) generated always as (valor_realizado - valor_previsto) stored,
  status text not null default 'dentro' check (status in ('dentro', 'acima', 'abaixo')),
  justificativa text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (orcamento_id, categoria_id)
);

create table if not exists gkli_flex.extrato_lancamento_eventos (
  id uuid primary key default gen_random_uuid(),
  lancamento_id uuid not null references gkli_flex.extrato_lancamentos(id) on delete cascade,
  actor_id uuid references gkli_flex.colaboradores(id),
  acao text not null,
  valor_anterior jsonb,
  valor_novo jsonb,
  motivo text,
  created_at timestamptz not null default now()
);

drop trigger if exists set_categorias_financeiras_updated_at on gkli_flex.categorias_financeiras;
create trigger set_categorias_financeiras_updated_at
before update on gkli_flex.categorias_financeiras
for each row execute function gkli_flex.set_updated_at();

drop trigger if exists set_regras_classificacao_updated_at on gkli_flex.regras_classificacao;
create trigger set_regras_classificacao_updated_at
before update on gkli_flex.regras_classificacao
for each row execute function gkli_flex.set_updated_at();

drop trigger if exists set_receitas_updated_at on gkli_flex.receitas;
create trigger set_receitas_updated_at
before update on gkli_flex.receitas
for each row execute function gkli_flex.set_updated_at();

drop trigger if exists set_extratos_updated_at on gkli_flex.extratos;
create trigger set_extratos_updated_at
before update on gkli_flex.extratos
for each row execute function gkli_flex.set_updated_at();

drop trigger if exists set_extrato_lancamentos_updated_at on gkli_flex.extrato_lancamentos;
create trigger set_extrato_lancamentos_updated_at
before update on gkli_flex.extrato_lancamentos
for each row execute function gkli_flex.set_updated_at();

drop trigger if exists set_orcamentos_updated_at on gkli_flex.orcamentos;
create trigger set_orcamentos_updated_at
before update on gkli_flex.orcamentos
for each row execute function gkli_flex.set_updated_at();

drop trigger if exists set_orcamento_itens_updated_at on gkli_flex.orcamento_itens;
create trigger set_orcamento_itens_updated_at
before update on gkli_flex.orcamento_itens
for each row execute function gkli_flex.set_updated_at();

create index if not exists idx_gkli_flex_receitas_competencia
  on gkli_flex.receitas(competencia_id, data_receita desc);

create index if not exists idx_gkli_flex_extratos_competencia
  on gkli_flex.extratos(competencia_id, periodo_inicio desc);

create index if not exists idx_gkli_flex_lancamentos_extrato
  on gkli_flex.extrato_lancamentos(extrato_id, data_lancamento desc);

create index if not exists idx_gkli_flex_lancamentos_status
  on gkli_flex.extrato_lancamentos(status);

alter table gkli_flex.categorias_financeiras enable row level security;
alter table gkli_flex.regras_classificacao enable row level security;
alter table gkli_flex.receitas enable row level security;
alter table gkli_flex.extratos enable row level security;
alter table gkli_flex.extrato_lancamentos enable row level security;
alter table gkli_flex.orcamentos enable row level security;
alter table gkli_flex.orcamento_itens enable row level security;
alter table gkli_flex.extrato_lancamento_eventos enable row level security;
