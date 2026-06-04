create table if not exists gkli_flex.pagamentos_recorrentes (
  id uuid primary key default gen_random_uuid(),
  tipo text not null
    check (tipo in ('salario', 'pro_labore', 'fornecedor', 'reembolso', 'outro')),
  favorecido text not null,
  colaborador_id uuid references gkli_flex.colaboradores(id),
  descricao text not null,
  valor numeric(14, 2) not null check (valor >= 0),
  frequencia text not null default 'mensal'
    check (frequencia in ('mensal', 'quinzenal', 'semanal')),
  dia_vencimento integer not null check (dia_vencimento between 1 and 31),
  status text not null default 'ativo' check (status in ('ativo', 'inativo')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists gkli_flex.pagamentos (
  id uuid primary key default gen_random_uuid(),
  competencia_id uuid not null references gkli_flex.competencias(id),
  tipo text not null
    check (tipo in ('comissao', 'salario', 'pro_labore', 'fornecedor', 'reembolso', 'outro')),
  favorecido text not null,
  colaborador_id uuid references gkli_flex.colaboradores(id),
  comissao_id uuid references gkli_flex.comissoes(id),
  recorrente_id uuid references gkli_flex.pagamentos_recorrentes(id),
  descricao text not null,
  vencimento date not null,
  valor numeric(14, 2) not null check (valor >= 0),
  status text not null default 'previsto'
    check (status in ('previsto', 'agendado', 'pago', 'cancelado')),
  paid_at timestamptz,
  canceled_at timestamptz,
  observacoes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    (status = 'pago' and paid_at is not null)
    or (status <> 'pago')
  ),
  check (
    (status = 'cancelado' and canceled_at is not null)
    or (status <> 'cancelado')
  )
);

create table if not exists gkli_flex.pagamento_eventos (
  id uuid primary key default gen_random_uuid(),
  pagamento_id uuid not null references gkli_flex.pagamentos(id) on delete cascade,
  actor_id uuid references gkli_flex.colaboradores(id),
  acao text not null
    check (
      acao in (
        'previsto',
        'agendado',
        'confirmado',
        'cancelado',
        'gerado_recorrencia',
        'gerado_comissao'
      )
    ),
  status_anterior text check (
    status_anterior is null
    or status_anterior in ('previsto', 'agendado', 'pago', 'cancelado')
  ),
  status_novo text not null check (status_novo in ('previsto', 'agendado', 'pago', 'cancelado')),
  motivo text,
  created_at timestamptz not null default now()
);

drop trigger if exists set_pagamentos_recorrentes_updated_at on gkli_flex.pagamentos_recorrentes;
create trigger set_pagamentos_recorrentes_updated_at
before update on gkli_flex.pagamentos_recorrentes
for each row execute function gkli_flex.set_updated_at();

drop trigger if exists set_pagamentos_updated_at on gkli_flex.pagamentos;
create trigger set_pagamentos_updated_at
before update on gkli_flex.pagamentos
for each row execute function gkli_flex.set_updated_at();

create index if not exists idx_gkli_flex_pagamentos_competencia
  on gkli_flex.pagamentos(competencia_id, vencimento, status);

create index if not exists idx_gkli_flex_pagamentos_comissao
  on gkli_flex.pagamentos(comissao_id)
  where comissao_id is not null;

create index if not exists idx_gkli_flex_pagamento_eventos_pagamento
  on gkli_flex.pagamento_eventos(pagamento_id, created_at desc);

alter table gkli_flex.pagamentos_recorrentes enable row level security;
alter table gkli_flex.pagamentos enable row level security;
alter table gkli_flex.pagamento_eventos enable row level security;
