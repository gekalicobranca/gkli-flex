create table if not exists gkli_flex.tipos_comissao (
  id uuid primary key default gen_random_uuid(),
  nome text not null unique,
  descricao text not null default '',
  percentual numeric(8, 4) not null check (percentual >= 0),
  categoria_id uuid not null references gkli_flex.categorias_financeiras(id),
  status text not null default 'ativo' check (status in ('ativo', 'inativo')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists gkli_flex.comissoes (
  id uuid primary key default gen_random_uuid(),
  competencia_id uuid not null references gkli_flex.competencias(id),
  receita_id uuid not null references gkli_flex.receitas(id),
  colaborador_id uuid not null references gkli_flex.colaboradores(id),
  tipo_comissao_id uuid not null references gkli_flex.tipos_comissao(id),
  base_calculo numeric(14, 2) not null check (base_calculo >= 0),
  percentual numeric(8, 4) not null check (percentual >= 0),
  valor numeric(14, 2) not null check (valor >= 0),
  status text not null default 'calculada'
    check (status in ('calculada', 'conferida', 'aprovada', 'rejeitada', 'paga')),
  observacoes text,
  calculated_at timestamptz not null default now(),
  checked_at timestamptz,
  approved_at timestamptz,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (receita_id, colaborador_id, tipo_comissao_id)
);

create table if not exists gkli_flex.comissao_eventos (
  id uuid primary key default gen_random_uuid(),
  comissao_id uuid not null references gkli_flex.comissoes(id) on delete cascade,
  actor_id uuid references gkli_flex.colaboradores(id),
  acao text not null
    check (
      acao in (
        'calculada',
        'conferida',
        'aprovada',
        'rejeitada',
        'retornada_para_ajuste',
        'paga'
      )
    ),
  motivo text,
  status_anterior text check (
    status_anterior is null
    or status_anterior in ('calculada', 'conferida', 'aprovada', 'rejeitada', 'paga')
  ),
  status_novo text not null check (status_novo in ('calculada', 'conferida', 'aprovada', 'rejeitada', 'paga')),
  created_at timestamptz not null default now()
);

drop trigger if exists set_tipos_comissao_updated_at on gkli_flex.tipos_comissao;
create trigger set_tipos_comissao_updated_at
before update on gkli_flex.tipos_comissao
for each row execute function gkli_flex.set_updated_at();

drop trigger if exists set_comissoes_updated_at on gkli_flex.comissoes;
create trigger set_comissoes_updated_at
before update on gkli_flex.comissoes
for each row execute function gkli_flex.set_updated_at();

create index if not exists idx_gkli_flex_comissoes_competencia
  on gkli_flex.comissoes(competencia_id, status);

create index if not exists idx_gkli_flex_comissoes_colaborador
  on gkli_flex.comissoes(colaborador_id, competencia_id);

create index if not exists idx_gkli_flex_comissao_eventos_comissao
  on gkli_flex.comissao_eventos(comissao_id, created_at desc);

alter table gkli_flex.tipos_comissao enable row level security;
alter table gkli_flex.comissoes enable row level security;
alter table gkli_flex.comissao_eventos enable row level security;
