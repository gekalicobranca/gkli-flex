create schema if not exists gkli_flex;

create extension if not exists pgcrypto;

create table if not exists gkli_flex.competencias (
  id uuid primary key default gen_random_uuid(),
  referencia text not null unique,
  inicio date not null,
  fim date not null,
  status text not null default 'aberta'
    check (status in ('aberta', 'em_fechamento', 'fechada', 'reaberta')),
  opened_at timestamptz not null default now(),
  closed_at timestamptz,
  opened_by uuid,
  closed_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (inicio <= fim)
);

create table if not exists gkli_flex.times (
  id uuid primary key default gen_random_uuid(),
  nome text not null unique,
  descricao text not null default '',
  status text not null default 'ativo'
    check (status in ('ativo', 'inativo')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists gkli_flex.perfis (
  id uuid primary key default gen_random_uuid(),
  nome text not null unique,
  descricao text not null default '',
  status text not null default 'ativo'
    check (status in ('ativo', 'inativo')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists gkli_flex.permissoes (
  id uuid primary key default gen_random_uuid(),
  codigo text not null unique,
  modulo text not null,
  acao text not null,
  descricao text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (codigo like 'gkli_flex.%')
);

create table if not exists gkli_flex.perfil_permissoes (
  perfil_id uuid not null references gkli_flex.perfis(id) on delete cascade,
  permissao_id uuid not null references gkli_flex.permissoes(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (perfil_id, permissao_id)
);

create table if not exists gkli_flex.colaboradores (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null unique,
  time_id uuid references gkli_flex.times(id),
  perfil_id uuid references gkli_flex.perfis(id),
  auth_user_id uuid,
  status text not null default 'ativo'
    check (status in ('ativo', 'inativo')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table gkli_flex.competencias
  add constraint competencias_opened_by_fk
  foreign key (opened_by) references gkli_flex.colaboradores(id);

alter table gkli_flex.competencias
  add constraint competencias_closed_by_fk
  foreign key (closed_by) references gkli_flex.colaboradores(id);

create table if not exists gkli_flex.auditoria_eventos (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references gkli_flex.colaboradores(id),
  acao text not null,
  entidade_schema text not null default 'gkli_flex',
  entidade_tabela text not null,
  entidade_id uuid,
  valor_anterior jsonb,
  valor_novo jsonb,
  motivo text,
  created_at timestamptz not null default now(),
  check (entidade_schema = 'gkli_flex')
);

create or replace function gkli_flex.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_competencias_updated_at on gkli_flex.competencias;
create trigger set_competencias_updated_at
before update on gkli_flex.competencias
for each row execute function gkli_flex.set_updated_at();

drop trigger if exists set_times_updated_at on gkli_flex.times;
create trigger set_times_updated_at
before update on gkli_flex.times
for each row execute function gkli_flex.set_updated_at();

drop trigger if exists set_perfis_updated_at on gkli_flex.perfis;
create trigger set_perfis_updated_at
before update on gkli_flex.perfis
for each row execute function gkli_flex.set_updated_at();

drop trigger if exists set_permissoes_updated_at on gkli_flex.permissoes;
create trigger set_permissoes_updated_at
before update on gkli_flex.permissoes
for each row execute function gkli_flex.set_updated_at();

drop trigger if exists set_colaboradores_updated_at on gkli_flex.colaboradores;
create trigger set_colaboradores_updated_at
before update on gkli_flex.colaboradores
for each row execute function gkli_flex.set_updated_at();

create index if not exists idx_gkli_flex_colaboradores_auth_user_id
  on gkli_flex.colaboradores(auth_user_id);

create index if not exists idx_gkli_flex_auditoria_entidade
  on gkli_flex.auditoria_eventos(entidade_tabela, entidade_id, created_at desc);

alter table gkli_flex.competencias enable row level security;
alter table gkli_flex.times enable row level security;
alter table gkli_flex.perfis enable row level security;
alter table gkli_flex.permissoes enable row level security;
alter table gkli_flex.perfil_permissoes enable row level security;
alter table gkli_flex.colaboradores enable row level security;
alter table gkli_flex.auditoria_eventos enable row level security;

-- As policies finais dependem do padrao de auth do COB que vamos espelhar na proxima etapa.
-- Por enquanto, a Sprint 1 deixa RLS ativo e o contrato de permissoes isolado em gkli_flex.
