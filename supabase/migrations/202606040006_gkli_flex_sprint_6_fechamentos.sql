create table if not exists gkli_flex.fechamentos (
  id uuid primary key default gen_random_uuid(),
  competencia_id uuid not null unique references gkli_flex.competencias(id),
  status text not null default 'aberto'
    check (status in ('aberto', 'bloqueado', 'pronto', 'fechado', 'reaberto')),
  closed_at timestamptz,
  closed_by uuid references gkli_flex.colaboradores(id),
  reopened_at timestamptz,
  reopened_by uuid references gkli_flex.colaboradores(id),
  reopen_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    (status = 'fechado' and closed_at is not null and closed_by is not null)
    or status <> 'fechado'
  ),
  check (
    (status = 'reaberto' and reopened_at is not null and reopened_by is not null and reopen_reason is not null)
    or status <> 'reaberto'
  )
);

create table if not exists gkli_flex.fechamento_checklist (
  id uuid primary key default gen_random_uuid(),
  fechamento_id uuid not null references gkli_flex.fechamentos(id) on delete cascade,
  chave text not null
    check (
      chave in (
        'importacoes_concluidas',
        'despesas_classificadas',
        'comissoes_aprovadas',
        'pagamentos_conferidos',
        'sem_divergencias_criticas'
      )
    ),
  titulo text not null,
  concluido boolean not null default false,
  detalhe text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (fechamento_id, chave)
);

create table if not exists gkli_flex.fechamento_bloqueios (
  id uuid primary key default gen_random_uuid(),
  fechamento_id uuid not null references gkli_flex.fechamentos(id) on delete cascade,
  tipo text not null
    check (
      tipo in (
        'importacao_erro',
        'despesa_nao_classificada',
        'comissao_pendente',
        'pagamento_pendente',
        'competencia_inconsistente',
        'divergencia_critica'
      )
    ),
  titulo text not null,
  detalhe text not null default '',
  severidade text not null default 'bloqueio' check (severidade in ('bloqueio', 'aviso')),
  resolvido boolean not null default false,
  resolved_at timestamptz,
  resolved_by uuid references gkli_flex.colaboradores(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists gkli_flex.fechamento_snapshots (
  id uuid primary key default gen_random_uuid(),
  fechamento_id uuid not null references gkli_flex.fechamentos(id) on delete cascade,
  receitas numeric(14, 2) not null default 0,
  despesas numeric(14, 2) not null default 0,
  comissoes numeric(14, 2) not null default 0,
  pagamentos_previstos numeric(14, 2) not null default 0,
  pagamentos_realizados numeric(14, 2) not null default 0,
  resultado_operacional numeric(14, 2) not null default 0,
  payload jsonb not null default '{}'::jsonb,
  generated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (fechamento_id)
);

create table if not exists gkli_flex.fechamento_reaberturas (
  id uuid primary key default gen_random_uuid(),
  fechamento_id uuid not null references gkli_flex.fechamentos(id) on delete cascade,
  requested_by uuid not null references gkli_flex.colaboradores(id),
  motivo text not null,
  created_at timestamptz not null default now(),
  check (length(trim(motivo)) >= 10)
);

drop trigger if exists set_fechamentos_updated_at on gkli_flex.fechamentos;
create trigger set_fechamentos_updated_at
before update on gkli_flex.fechamentos
for each row execute function gkli_flex.set_updated_at();

drop trigger if exists set_fechamento_checklist_updated_at on gkli_flex.fechamento_checklist;
create trigger set_fechamento_checklist_updated_at
before update on gkli_flex.fechamento_checklist
for each row execute function gkli_flex.set_updated_at();

drop trigger if exists set_fechamento_bloqueios_updated_at on gkli_flex.fechamento_bloqueios;
create trigger set_fechamento_bloqueios_updated_at
before update on gkli_flex.fechamento_bloqueios
for each row execute function gkli_flex.set_updated_at();

create index if not exists idx_gkli_flex_fechamento_bloqueios_status
  on gkli_flex.fechamento_bloqueios(fechamento_id, severidade, resolvido);

create index if not exists idx_gkli_flex_fechamento_reaberturas
  on gkli_flex.fechamento_reaberturas(fechamento_id, created_at desc);

alter table gkli_flex.fechamentos enable row level security;
alter table gkli_flex.fechamento_checklist enable row level security;
alter table gkli_flex.fechamento_bloqueios enable row level security;
alter table gkli_flex.fechamento_snapshots enable row level security;
alter table gkli_flex.fechamento_reaberturas enable row level security;
