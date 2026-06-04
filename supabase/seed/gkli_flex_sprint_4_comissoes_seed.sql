insert into gkli_flex.tipos_comissao (id, nome, descricao, percentual, categoria_id, status)
values
  (
    '00000000-0000-0000-0000-000000001201',
    'Honorarios comerciais',
    'Comissao padrao sobre receitas de honorarios.',
    4,
    '00000000-0000-0000-0000-000000000601',
    'ativo'
  ),
  (
    '00000000-0000-0000-0000-000000001202',
    'Honorarios apoio',
    'Comissao de apoio operacional sobre honorarios.',
    3,
    '00000000-0000-0000-0000-000000000601',
    'ativo'
  )
on conflict (nome) do update
set descricao = excluded.descricao,
    percentual = excluded.percentual,
    categoria_id = excluded.categoria_id,
    status = excluded.status;

insert into gkli_flex.comissoes (
  id,
  competencia_id,
  receita_id,
  colaborador_id,
  tipo_comissao_id,
  base_calculo,
  percentual,
  valor,
  status,
  checked_at
)
select
  '00000000-0000-0000-0000-000000001301',
  comp.id,
  rec.id,
  col.id,
  tipo.id,
  rec.valor,
  tipo.percentual,
  round((rec.valor * tipo.percentual) / 100, 2),
  'conferida',
  now()
from gkli_flex.competencias comp
join gkli_flex.receitas rec on rec.id = '00000000-0000-0000-0000-000000000801'
join gkli_flex.colaboradores col on col.email = 'marina@gekali.com.br'
join gkli_flex.tipos_comissao tipo on tipo.nome = 'Honorarios comerciais'
where comp.referencia = '2026-06'
on conflict (receita_id, colaborador_id, tipo_comissao_id) do update
set base_calculo = excluded.base_calculo,
    percentual = excluded.percentual,
    valor = excluded.valor,
    status = excluded.status,
    checked_at = excluded.checked_at;

insert into gkli_flex.comissao_eventos (
  comissao_id,
  actor_id,
  acao,
  motivo,
  status_anterior,
  status_novo
)
select
  com.id,
  col.id,
  'conferida',
  'Base de calculo validada na Sprint 4.',
  'calculada',
  'conferida'
from gkli_flex.comissoes com
join gkli_flex.colaboradores col on col.email = 'marina@gekali.com.br'
where com.id = '00000000-0000-0000-0000-000000001301'
on conflict do nothing;
