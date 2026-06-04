alter table gkli_flex.importacoes
  drop constraint if exists importacoes_origem_check;

alter table gkli_flex.importacoes
  add constraint importacoes_origem_check
  check (origem in ('omie', 'banco_inter', 'recibos_pagamento'));

alter table gkli_flex.importacoes
  drop constraint if exists importacoes_formato_check;

alter table gkli_flex.importacoes
  add constraint importacoes_formato_check
  check (formato in ('xlsx', 'csv', 'pdf'));

alter table gkli_flex.importacao_preview_linhas
  drop constraint if exists importacao_preview_linhas_tipo_check;

alter table gkli_flex.importacao_preview_linhas
  add constraint importacao_preview_linhas_tipo_check
  check (tipo in ('receita', 'extrato_lancamento', 'pagamento_salario'));

alter table gkli_flex.pagamentos
  add column if not exists importacao_id uuid references gkli_flex.importacoes(id);

alter table gkli_flex.pagamento_eventos
  drop constraint if exists pagamento_eventos_acao_check;

alter table gkli_flex.pagamento_eventos
  add constraint pagamento_eventos_acao_check
  check (
    acao in (
      'previsto',
      'agendado',
      'confirmado',
      'cancelado',
      'gerado_recorrencia',
      'gerado_comissao',
      'gerado_recibo_pagamento'
    )
  );

create table if not exists gkli_flex.recibo_pagamento_itens (
  id uuid primary key default gen_random_uuid(),
  importacao_id uuid not null references gkli_flex.importacoes(id) on delete cascade,
  pagamento_id uuid references gkli_flex.pagamentos(id),
  empregado_nome text not null,
  competencia text not null,
  cargo text,
  valor_liquido numeric(14, 2) not null check (valor_liquido >= 0),
  vencimento_sugerido date not null,
  status text not null default 'pronto'
    check (status in ('pronto', 'gerado', 'ignorado', 'bloqueado')),
  payload_original jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_recibo_pagamento_itens_updated_at on gkli_flex.recibo_pagamento_itens;
create trigger set_recibo_pagamento_itens_updated_at
before update on gkli_flex.recibo_pagamento_itens
for each row execute function gkli_flex.set_updated_at();

create index if not exists idx_gkli_flex_pagamentos_importacao
  on gkli_flex.pagamentos(importacao_id)
  where importacao_id is not null;

create index if not exists idx_gkli_flex_recibo_pagamento_itens_importacao
  on gkli_flex.recibo_pagamento_itens(importacao_id, status);

alter table gkli_flex.recibo_pagamento_itens enable row level security;
