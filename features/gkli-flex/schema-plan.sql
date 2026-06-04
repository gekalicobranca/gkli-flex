create schema if not exists gkli_flex;

-- Base inicial proposta para evoluirmos com Supabase migrations.
-- Todas as tabelas finais devem manter id uuid, created_at e updated_at.

create table if not exists gkli_flex.competencias (
  id uuid primary key,
  referencia text not null,
  status text not null,
  opened_at timestamptz,
  closed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists gkli_flex.importacoes (
  id uuid primary key,
  competencia_id uuid references gkli_flex.competencias(id),
  origem text not null,
  formato text not null,
  status text not null,
  arquivo_nome text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists gkli_flex.colaboradores (
  id uuid primary key,
  nome text not null,
  email text,
  time text,
  status text not null default 'ativo',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
