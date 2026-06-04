insert into gkli_flex.pagamentos_recorrentes (
  id,
  tipo,
  favorecido,
  colaborador_id,
  descricao,
  valor,
  frequencia,
  dia_vencimento,
  status
)
select
  '00000000-0000-0000-0000-000000001401',
  'pro_labore',
  'Diretoria',
  col.id,
  'Pro-labore mensal',
  18000,
  'mensal',
  5,
  'ativo'
from gkli_flex.colaboradores col
where col.email = 'marina@gekali.com.br'
on conflict (id) do nothing;

insert into gkli_flex.pagamentos_recorrentes (
  id,
  tipo,
  favorecido,
  descricao,
  valor,
  frequencia,
  dia_vencimento,
  status
)
values (
  '00000000-0000-0000-0000-000000001402',
  'fornecedor',
  'Assessoria contabil',
  'Contrato recorrente de assessoria',
  2400,
  'mensal',
  10,
  'ativo'
)
on conflict (id) do nothing;

insert into gkli_flex.pagamentos (
  id,
  competencia_id,
  tipo,
  favorecido,
  colaborador_id,
  comissao_id,
  descricao,
  vencimento,
  valor,
  status
)
select
  '00000000-0000-0000-0000-000000001501',
  comp.id,
  'comissao',
  col.nome,
  col.id,
  com.id,
  'Comissao aprovada sobre honorarios',
  '2026-06-10',
  com.valor,
  'agendado'
from gkli_flex.competencias comp
join gkli_flex.comissoes com on com.id = '00000000-0000-0000-0000-000000001301'
join gkli_flex.colaboradores col on col.id = com.colaborador_id
where comp.referencia = '2026-06'
on conflict (id) do nothing;

insert into gkli_flex.pagamentos (
  id,
  competencia_id,
  tipo,
  favorecido,
  colaborador_id,
  recorrente_id,
  descricao,
  vencimento,
  valor,
  status
)
select
  '00000000-0000-0000-0000-000000001502',
  comp.id,
  rec.tipo,
  rec.favorecido,
  rec.colaborador_id,
  rec.id,
  rec.descricao,
  '2026-06-05',
  rec.valor,
  'previsto'
from gkli_flex.competencias comp
join gkli_flex.pagamentos_recorrentes rec on rec.id = '00000000-0000-0000-0000-000000001401'
where comp.referencia = '2026-06'
on conflict (id) do nothing;

insert into gkli_flex.pagamento_eventos (
  pagamento_id,
  actor_id,
  acao,
  status_anterior,
  status_novo,
  motivo
)
select
  pag.id,
  col.id,
  'agendado',
  'previsto',
  'agendado',
  'Agendado para pagamento em 10/06.'
from gkli_flex.pagamentos pag
join gkli_flex.colaboradores col on col.email = 'marina@gekali.com.br'
where pag.id = '00000000-0000-0000-0000-000000001501'
on conflict do nothing;
