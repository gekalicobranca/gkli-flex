create table if not exists gkli_flex.relatorio_definicoes (
  id uuid primary key default gen_random_uuid(),
  codigo text not null unique,
  titulo text not null,
  descricao text not null default '',
  formatos text[] not null default array['csv', 'xlsx'],
  status text not null default 'disponivel' check (status in ('disponivel', 'planejado')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists gkli_flex.relatorio_execucoes (
  id uuid primary key default gen_random_uuid(),
  definicao_id uuid not null references gkli_flex.relatorio_definicoes(id),
  competencia_id uuid references gkli_flex.competencias(id),
  formato text not null check (formato in ('csv', 'xlsx', 'pdf')),
  status text not null default 'solicitado'
    check (status in ('solicitado', 'processando', 'concluido', 'erro')),
  solicitado_por uuid references gkli_flex.colaboradores(id),
  arquivo_url text,
  erro text,
  parametros jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists gkli_flex.gestao_indicadores (
  id uuid primary key default gen_random_uuid(),
  competencia_id uuid not null references gkli_flex.competencias(id),
  chave text not null,
  titulo text not null,
  valor numeric(14, 2) not null default 0,
  comparativo text not null default '',
  payload jsonb not null default '{}'::jsonb,
  generated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (competencia_id, chave)
);

drop trigger if exists set_relatorio_definicoes_updated_at on gkli_flex.relatorio_definicoes;
create trigger set_relatorio_definicoes_updated_at
before update on gkli_flex.relatorio_definicoes
for each row execute function gkli_flex.set_updated_at();

drop trigger if exists set_relatorio_execucoes_updated_at on gkli_flex.relatorio_execucoes;
create trigger set_relatorio_execucoes_updated_at
before update on gkli_flex.relatorio_execucoes
for each row execute function gkli_flex.set_updated_at();

create index if not exists idx_gkli_flex_relatorio_execucoes_definicao
  on gkli_flex.relatorio_execucoes(definicao_id, created_at desc);

create index if not exists idx_gkli_flex_gestao_indicadores_competencia
  on gkli_flex.gestao_indicadores(competencia_id, chave);

alter table gkli_flex.relatorio_definicoes enable row level security;
alter table gkli_flex.relatorio_execucoes enable row level security;
alter table gkli_flex.gestao_indicadores enable row level security;
