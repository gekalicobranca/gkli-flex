insert into gkli_flex.relatorio_definicoes (codigo, titulo, descricao, formatos, status)
values
  ('receitas', 'Receitas', 'Receitas por competencia, origem, cliente e categoria.', array['csv', 'xlsx'], 'disponivel'),
  ('despesas', 'Despesas', 'Lancamentos por categoria, status e extrato de origem.', array['csv', 'xlsx'], 'disponivel'),
  ('comissoes', 'Comissoes', 'Comissoes por colaborador, receita, status e aprovacao.', array['csv', 'xlsx'], 'disponivel'),
  ('pagamentos', 'Pagamentos', 'Agenda de pagamentos por tipo, favorecido, vencimento e status.', array['csv', 'xlsx'], 'disponivel'),
  ('fechamentos', 'Fechamentos', 'Historico de competencias, snapshots e reaberturas.', array['csv', 'xlsx', 'pdf'], 'planejado')
on conflict (codigo) do update
set titulo = excluded.titulo,
    descricao = excluded.descricao,
    formatos = excluded.formatos,
    status = excluded.status;

insert into gkli_flex.gestao_indicadores (
  competencia_id,
  chave,
  titulo,
  valor,
  comparativo,
  payload
)
select
  comp.id,
  indicator.chave,
  indicator.titulo,
  indicator.valor,
  indicator.comparativo,
  indicator.payload::jsonb
from gkli_flex.competencias comp
cross join (
  values
    ('receitas', 'Receitas', 43000::numeric, 'Realizado da competencia', '{"tone":"blue"}'),
    ('despesas', 'Despesas', 4059.90::numeric, 'Lancamentos classificados e pendentes', '{"tone":"yellow"}'),
    ('resultado_operacional', 'Resultado operacional', 38940.10::numeric, 'Previa antes do fechamento', '{"tone":"green"}'),
    ('comissoes', 'Comissoes', 2026::numeric, 'Calculadas na competencia', '{"tone":"blue"}'),
    ('pagamentos_previstos', 'Pagamentos previstos', 20952::numeric, 'Agenda total da competencia', '{"tone":"yellow"}'),
    ('pagamentos_realizados', 'Pagamentos realizados', 5200::numeric, 'Confirmados pela operacao', '{"tone":"green"}')
) as indicator(chave, titulo, valor, comparativo, payload)
where comp.referencia = '2026-06'
on conflict (competencia_id, chave) do update
set titulo = excluded.titulo,
    valor = excluded.valor,
    comparativo = excluded.comparativo,
    payload = excluded.payload,
    generated_at = now();
