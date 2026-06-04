insert into gkli_flex.importacoes (
  id,
  competencia_id,
  origem,
  formato,
  arquivo_nome,
  status,
  total_linhas,
  linhas_validas,
  linhas_com_aviso,
  linhas_bloqueadas,
  created_by
)
select
  '00000000-0000-0000-0000-000000000501',
  comp.id,
  'omie',
  'xlsx',
  'omie_receitas_junho_2026.xlsx',
  'pronto_para_confirmar',
  184,
  181,
  3,
  0,
  col.id
from gkli_flex.competencias comp
cross join gkli_flex.colaboradores col
where comp.referencia = '2026-06'
  and col.email = 'marina@gekali.com.br'
on conflict (id) do nothing;

insert into gkli_flex.importacoes (
  id,
  competencia_id,
  origem,
  formato,
  arquivo_nome,
  status,
  total_linhas,
  linhas_validas,
  linhas_com_aviso,
  linhas_bloqueadas,
  created_by
)
select
  '00000000-0000-0000-0000-000000000502',
  comp.id,
  'banco_inter',
  'csv',
  'inter_extrato_03062026.csv',
  'com_inconsistencias',
  96,
  84,
  7,
  5,
  col.id
from gkli_flex.competencias comp
cross join gkli_flex.colaboradores col
where comp.referencia = '2026-06'
  and col.email = 'marina@gekali.com.br'
on conflict (id) do nothing;

insert into gkli_flex.importacao_inconsistencias (
  importacao_id,
  linha,
  campo,
  severidade,
  mensagem,
  sugestao
)
values
  (
    '00000000-0000-0000-0000-000000000501',
    44,
    'categoria',
    'aviso',
    'Categoria nao encontrada no Flex.',
    'Criar categoria financeira automaticamente ao confirmar.'
  ),
  (
    '00000000-0000-0000-0000-000000000502',
    12,
    'valor',
    'bloqueio',
    'Valor vazio em lancamento bancario.',
    'Corrigir arquivo CSV ou ignorar a linha antes de persistir.'
  )
on conflict do nothing;

insert into gkli_flex.importacao_preview_linhas (
  importacao_id,
  linha,
  tipo,
  data_movimento,
  descricao,
  categoria_sugerida,
  valor,
  status
)
values
  (
    '00000000-0000-0000-0000-000000000501',
    2,
    'receita',
    '2026-06-02',
    'Honorarios contrato mensal',
    'Honorarios',
    18400,
    'valida'
  ),
  (
    '00000000-0000-0000-0000-000000000502',
    5,
    'extrato_lancamento',
    '2026-06-03',
    'Tarifa bancaria',
    'Tarifas bancarias',
    -29.9,
    'valida'
  )
on conflict do nothing;
