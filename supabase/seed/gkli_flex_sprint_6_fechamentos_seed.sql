insert into gkli_flex.fechamentos (id, competencia_id, status)
select
  '00000000-0000-0000-0000-000000001601',
  comp.id,
  'bloqueado'
from gkli_flex.competencias comp
where comp.referencia = '2026-06'
on conflict (competencia_id) do update
set status = excluded.status;

insert into gkli_flex.fechamento_checklist (
  fechamento_id,
  chave,
  titulo,
  concluido,
  detalhe
)
values
  ('00000000-0000-0000-0000-000000001601', 'importacoes_concluidas', 'Importacoes concluidas', true, 'Arquivos principais importados e revisados.'),
  ('00000000-0000-0000-0000-000000001601', 'despesas_classificadas', 'Despesas classificadas', false, 'Existe lancamento sem categoria.'),
  ('00000000-0000-0000-0000-000000001601', 'comissoes_aprovadas', 'Comissoes aprovadas', false, 'Ainda ha comissoes pendentes.'),
  ('00000000-0000-0000-0000-000000001601', 'pagamentos_conferidos', 'Pagamentos conferidos', false, 'Ha pagamentos previstos/agendados.'),
  ('00000000-0000-0000-0000-000000001601', 'sem_divergencias_criticas', 'Sem divergencias criticas', false, 'Orcamento possui divergencia.')
on conflict (fechamento_id, chave) do update
set titulo = excluded.titulo,
    concluido = excluded.concluido,
    detalhe = excluded.detalhe;

insert into gkli_flex.fechamento_bloqueios (
  id,
  fechamento_id,
  tipo,
  titulo,
  detalhe,
  severidade,
  resolvido
)
values
  (
    '00000000-0000-0000-0000-000000001701',
    '00000000-0000-0000-0000-000000001601',
    'despesa_nao_classificada',
    'Despesa nao classificada',
    'Transferencia sem identificacao no extrato Banco Inter.',
    'bloqueio',
    false
  ),
  (
    '00000000-0000-0000-0000-000000001702',
    '00000000-0000-0000-0000-000000001601',
    'comissao_pendente',
    'Comissao pendente',
    'Comissao calculada precisa ser conferida ou rejeitada.',
    'bloqueio',
    false
  ),
  (
    '00000000-0000-0000-0000-000000001703',
    '00000000-0000-0000-0000-000000001601',
    'pagamento_pendente',
    'Pagamento pendente',
    'Pro-labore previsto ainda nao foi confirmado.',
    'bloqueio',
    false
  )
on conflict (id) do update
set detalhe = excluded.detalhe,
    severidade = excluded.severidade,
    resolvido = excluded.resolvido;

insert into gkli_flex.fechamento_snapshots (
  id,
  fechamento_id,
  receitas,
  despesas,
  comissoes,
  pagamentos_previstos,
  pagamentos_realizados,
  resultado_operacional,
  payload
)
values (
  '00000000-0000-0000-0000-000000001801',
  '00000000-0000-0000-0000-000000001601',
  43000,
  4059.90,
  2026,
  20952,
  5200,
  38940.10,
  '{"source":"sprint_6_seed","status":"preview"}'::jsonb
)
on conflict (fechamento_id) do update
set receitas = excluded.receitas,
    despesas = excluded.despesas,
    comissoes = excluded.comissoes,
    pagamentos_previstos = excluded.pagamentos_previstos,
    pagamentos_realizados = excluded.pagamentos_realizados,
    resultado_operacional = excluded.resultado_operacional,
    payload = excluded.payload;
