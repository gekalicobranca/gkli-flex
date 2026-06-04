insert into gkli_flex.categorias_financeiras (id, nome, tipo, descricao, status)
values
  ('00000000-0000-0000-0000-000000000601', 'Honorarios', 'receita', 'Receitas de honorarios e contratos mensais.', 'ativo'),
  ('00000000-0000-0000-0000-000000000602', 'Tarifas bancarias', 'despesa', 'Tarifas, taxas e custos bancarios.', 'ativo'),
  ('00000000-0000-0000-0000-000000000603', 'Servicos recorrentes', 'despesa', 'Contratos e ferramentas recorrentes.', 'ativo'),
  ('00000000-0000-0000-0000-000000000604', 'Operacional', 'despesa', 'Despesas operacionais gerais.', 'ativo')
on conflict (nome) do update
set tipo = excluded.tipo,
    descricao = excluded.descricao,
    status = excluded.status;

insert into gkli_flex.regras_classificacao (id, nome, categoria_id, texto, prioridade, status)
values
  ('00000000-0000-0000-0000-000000000701', 'Tarifa bancaria', '00000000-0000-0000-0000-000000000602', 'tarifa', 90, 'ativo'),
  ('00000000-0000-0000-0000-000000000702', 'Ferramentas SaaS', '00000000-0000-0000-0000-000000000603', 'software', 70, 'ativo'),
  ('00000000-0000-0000-0000-000000000703', 'Despesa operacional', '00000000-0000-0000-0000-000000000604', 'operacional', 50, 'ativo')
on conflict (texto, categoria_id) do update
set nome = excluded.nome,
    prioridade = excluded.prioridade,
    status = excluded.status;

insert into gkli_flex.receitas (
  id,
  competencia_id,
  importacao_id,
  data_receita,
  cliente,
  categoria_id,
  descricao,
  valor,
  origem
)
select
  '00000000-0000-0000-0000-000000000801',
  comp.id,
  imp.id,
  '2026-06-02',
  'Cliente A',
  '00000000-0000-0000-0000-000000000601',
  'Honorarios contrato mensal',
  18400,
  'omie'
from gkli_flex.competencias comp
left join gkli_flex.importacoes imp on imp.id = '00000000-0000-0000-0000-000000000501'
where comp.referencia = '2026-06'
on conflict (id) do nothing;

insert into gkli_flex.extratos (
  id,
  competencia_id,
  importacao_id,
  banco,
  conta,
  periodo_inicio,
  periodo_fim,
  saldo_inicial,
  saldo_final,
  quantidade_lancamentos
)
select
  '00000000-0000-0000-0000-000000000901',
  comp.id,
  imp.id,
  'Banco Inter',
  'Conta principal',
  '2026-06-01',
  '2026-06-03',
  92000,
  108870.10,
  96
from gkli_flex.competencias comp
left join gkli_flex.importacoes imp on imp.id = '00000000-0000-0000-0000-000000000502'
where comp.referencia = '2026-06'
on conflict (id) do nothing;

insert into gkli_flex.extrato_lancamentos (
  id,
  extrato_id,
  data_lancamento,
  descricao,
  valor,
  categoria_id,
  regra_classificacao_id,
  status,
  observacoes
)
values
  (
    '00000000-0000-0000-0000-000000001001',
    '00000000-0000-0000-0000-000000000901',
    '2026-06-03',
    'Tarifa bancaria pacote mensal',
    -29.90,
    '00000000-0000-0000-0000-000000000602',
    '00000000-0000-0000-0000-000000000701',
    'classificado',
    null
  ),
  (
    '00000000-0000-0000-0000-000000001002',
    '00000000-0000-0000-0000-000000000901',
    '2026-06-03',
    'Transferencia sem identificacao',
    -2500.00,
    null,
    null,
    'nao_classificado',
    'Aguardando identificacao.'
  )
on conflict (id) do nothing;

insert into gkli_flex.orcamentos (id, competencia_id, status)
select
  '00000000-0000-0000-0000-000000001101',
  comp.id,
  'ativo'
from gkli_flex.competencias comp
where comp.referencia = '2026-06'
on conflict (competencia_id) do update
set status = excluded.status;

insert into gkli_flex.orcamento_itens (
  orcamento_id,
  categoria_id,
  valor_previsto,
  valor_realizado,
  status,
  justificativa
)
values
  ('00000000-0000-0000-0000-000000001101', '00000000-0000-0000-0000-000000000601', 148000, 18400, 'abaixo', null),
  ('00000000-0000-0000-0000-000000001101', '00000000-0000-0000-0000-000000000602', 350, 29.90, 'dentro', null),
  ('00000000-0000-0000-0000-000000001101', '00000000-0000-0000-0000-000000000603', 750, 890, 'acima', 'Assinatura anual renovada.')
on conflict (orcamento_id, categoria_id) do update
set valor_previsto = excluded.valor_previsto,
    valor_realizado = excluded.valor_realizado,
    status = excluded.status,
    justificativa = excluded.justificativa;
