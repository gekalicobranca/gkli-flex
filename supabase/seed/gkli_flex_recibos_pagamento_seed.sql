insert into gkli_flex.competencias (
  id,
  referencia,
  inicio,
  fim,
  status,
  opened_by
)
select
  '00000000-0000-0000-0000-000000000402',
  '2026-04',
  '2026-04-01',
  '2026-04-30',
  'aberta',
  c.id
from gkli_flex.colaboradores c
where c.email = 'marina@gekali.com.br'
on conflict (referencia) do update
set status = excluded.status,
    opened_by = excluded.opened_by;

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
  '00000000-0000-0000-0000-000000000503',
  comp.id,
  'recibos_pagamento',
  'pdf',
  'Recibo de Pagamento_Empregados.pdf',
  'pronto_para_confirmar',
  4,
  4,
  0,
  0,
  col.id
from gkli_flex.competencias comp
cross join gkli_flex.colaboradores col
where comp.referencia = '2026-04'
  and col.email = 'marina@gekali.com.br'
on conflict (id) do nothing;

insert into gkli_flex.recibo_pagamento_itens (
  id,
  importacao_id,
  empregado_nome,
  competencia,
  cargo,
  valor_liquido,
  vencimento_sugerido,
  status
)
values
  ('00000000-0000-0000-0000-000000001901', '00000000-0000-0000-0000-000000000503', 'CAMILA MOTA PAGANINI', '2026-04', 'ASSISTENTE ADMINISTRATIVO', 1558.00, '2026-05-05', 'gerado'),
  ('00000000-0000-0000-0000-000000001902', '00000000-0000-0000-0000-000000000503', 'EDIVANIA NEVES SOUZA', '2026-04', 'GERENTE DE COBRANCA', 2047.00, '2026-05-05', 'gerado'),
  ('00000000-0000-0000-0000-000000001903', '00000000-0000-0000-0000-000000000503', 'ESTEFANIA MOTA PAGANINI', '2026-04', 'AUXILIAR ADMINISTRATIVO', 1979.00, '2026-05-05', 'gerado'),
  ('00000000-0000-0000-0000-000000001904', '00000000-0000-0000-0000-000000000503', 'MARIA DANIELLE SOUSA LIMA', '2026-04', 'ANALISTA DE COBRANCA', 1625.00, '2026-05-05', 'gerado')
on conflict (id) do update
set valor_liquido = excluded.valor_liquido,
    vencimento_sugerido = excluded.vencimento_sugerido,
    status = excluded.status;

insert into gkli_flex.pagamentos (
  id,
  competencia_id,
  tipo,
  favorecido,
  importacao_id,
  descricao,
  vencimento,
  valor,
  status,
  observacoes
)
select
  item.id,
  comp.id,
  'salario',
  item.empregado_nome,
  item.importacao_id,
  'Salario liquido Abril/2026 importado de recibo',
  item.vencimento_sugerido,
  item.valor_liquido,
  'previsto',
  'Gerado a partir do PDF Recibo de Pagamento_Empregados.pdf'
from gkli_flex.recibo_pagamento_itens item
join gkli_flex.competencias comp on comp.referencia = item.competencia
where item.importacao_id = '00000000-0000-0000-0000-000000000503'
on conflict (id) do nothing;

update gkli_flex.recibo_pagamento_itens item
set pagamento_id = pag.id
from gkli_flex.pagamentos pag
where pag.id = item.id
  and item.importacao_id = '00000000-0000-0000-0000-000000000503';

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
  'gerado_recibo_pagamento',
  null,
  'previsto',
  'Pagamento gerado pela importacao de recibos em PDF.'
from gkli_flex.pagamentos pag
join gkli_flex.colaboradores col on col.email = 'marina@gekali.com.br'
where pag.importacao_id = '00000000-0000-0000-0000-000000000503'
on conflict do nothing;
