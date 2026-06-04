create table if not exists gkli_flex.importacoes (
  id uuid primary key default gen_random_uuid(),
  competencia_id uuid not null references gkli_flex.competencias(id),
  origem text not null check (origem in ('omie', 'banco_inter')),
  formato text not null check (formato in ('xlsx', 'csv')),
  arquivo_nome text not null,
  arquivo_hash text,
  status text not null default 'rascunho'
    check (
      status in (
        'rascunho',
        'pre_validando',
        'com_inconsistencias',
        'pronto_para_confirmar',
        'confirmado',
        'erro'
      )
    ),
  total_linhas integer not null default 0,
  linhas_validas integer not null default 0,
  linhas_com_aviso integer not null default 0,
  linhas_bloqueadas integer not null default 0,
  confirmado_por uuid references gkli_flex.colaboradores(id),
  confirmado_em timestamptz,
  created_by uuid references gkli_flex.colaboradores(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (total_linhas >= 0),
  check (linhas_validas >= 0),
  check (linhas_com_aviso >= 0),
  check (linhas_bloqueadas >= 0)
);

create table if not exists gkli_flex.importacao_inconsistencias (
  id uuid primary key default gen_random_uuid(),
  importacao_id uuid not null references gkli_flex.importacoes(id) on delete cascade,
  linha integer,
  campo text,
  severidade text not null check (severidade in ('aviso', 'bloqueio')),
  mensagem text not null,
  sugestao text,
  resolvida_em timestamptz,
  resolvida_por uuid references gkli_flex.colaboradores(id),
  created_at timestamptz not null default now()
);

create table if not exists gkli_flex.importacao_preview_linhas (
  id uuid primary key default gen_random_uuid(),
  importacao_id uuid not null references gkli_flex.importacoes(id) on delete cascade,
  linha integer not null,
  tipo text not null check (tipo in ('receita', 'extrato_lancamento')),
  data_movimento date,
  descricao text not null,
  categoria_sugerida text,
  valor numeric(14, 2) not null default 0,
  status text not null check (status in ('valida', 'aviso', 'bloqueada')),
  payload_original jsonb not null default '{}'::jsonb,
  payload_normalizado jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists gkli_flex.importacao_eventos (
  id uuid primary key default gen_random_uuid(),
  importacao_id uuid not null references gkli_flex.importacoes(id) on delete cascade,
  actor_id uuid references gkli_flex.colaboradores(id),
  acao text not null,
  detalhe jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

drop trigger if exists set_importacoes_updated_at on gkli_flex.importacoes;
create trigger set_importacoes_updated_at
before update on gkli_flex.importacoes
for each row execute function gkli_flex.set_updated_at();

create unique index if not exists idx_gkli_flex_importacoes_arquivo_hash
  on gkli_flex.importacoes(competencia_id, origem, arquivo_hash)
  where arquivo_hash is not null;

create index if not exists idx_gkli_flex_importacoes_competencia
  on gkli_flex.importacoes(competencia_id, created_at desc);

create index if not exists idx_gkli_flex_importacao_inconsistencias_importacao
  on gkli_flex.importacao_inconsistencias(importacao_id, severidade);

create index if not exists idx_gkli_flex_importacao_preview_importacao
  on gkli_flex.importacao_preview_linhas(importacao_id, linha);

alter table gkli_flex.importacoes enable row level security;
alter table gkli_flex.importacao_inconsistencias enable row level security;
alter table gkli_flex.importacao_preview_linhas enable row level security;
alter table gkli_flex.importacao_eventos enable row level security;

-- Policies finais entram quando o contexto de permissao gkli_flex.* estiver ligado ao auth do COB.
