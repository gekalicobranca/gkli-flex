insert into gkli_flex.times (id, nome, descricao, status)
values
  ('00000000-0000-0000-0000-000000000101', 'Gestao', 'Diretoria, indicadores e fechamento mensal.', 'ativo'),
  ('00000000-0000-0000-0000-000000000102', 'Financeiro', 'Operacao diaria de importacoes, classificacoes e pagamentos.', 'ativo')
on conflict (nome) do update
set descricao = excluded.descricao,
    status = excluded.status;

insert into gkli_flex.perfis (id, nome, descricao, status)
values
  ('00000000-0000-0000-0000-000000000201', 'Administrador', 'Gestao completa do GKLI Flex.', 'ativo'),
  ('00000000-0000-0000-0000-000000000202', 'Operacao financeira', 'Rotina diaria de importacoes, financeiro e pagamentos.', 'ativo'),
  ('00000000-0000-0000-0000-000000000203', 'Gestao', 'Acesso gerencial a indicadores, comissoes e fechamentos.', 'ativo')
on conflict (nome) do update
set descricao = excluded.descricao,
    status = excluded.status;

insert into gkli_flex.permissoes (codigo, modulo, acao, descricao)
values
  ('gkli_flex.admin', 'Administracao', '*', 'Acesso total ao app.'),
  ('gkli_flex.importacoes.read', 'Importacoes', 'read', 'Consulta importacoes.'),
  ('gkli_flex.importacoes.write', 'Importacoes', 'write', 'Opera importacoes.'),
  ('gkli_flex.financeiro.read', 'Financeiro', 'read', 'Consulta financeiro.'),
  ('gkli_flex.financeiro.write', 'Financeiro', 'write', 'Opera financeiro.'),
  ('gkli_flex.comissoes.read', 'Comissoes', 'read', 'Consulta comissoes.'),
  ('gkli_flex.comissoes.write', 'Comissoes', 'write', 'Opera comissoes.'),
  ('gkli_flex.comissoes.approve', 'Comissoes', 'approve', 'Aprova comissoes.'),
  ('gkli_flex.pagamentos.read', 'Pagamentos', 'read', 'Consulta pagamentos.'),
  ('gkli_flex.pagamentos.write', 'Pagamentos', 'write', 'Opera pagamentos.'),
  ('gkli_flex.fechamentos.read', 'Fechamentos', 'read', 'Consulta fechamentos.'),
  ('gkli_flex.fechamentos.close', 'Fechamentos', 'close', 'Fecha competencia.'),
  ('gkli_flex.fechamentos.reopen', 'Fechamentos', 'reopen', 'Reabre competencia.'),
  ('gkli_flex.gestao.read', 'Gestao', 'read', 'Consulta gestao.'),
  ('gkli_flex.acessos.write', 'Administracao', 'write', 'Gere colaboradores e acessos.')
on conflict (codigo) do update
set modulo = excluded.modulo,
    acao = excluded.acao,
    descricao = excluded.descricao;

insert into gkli_flex.perfil_permissoes (perfil_id, permissao_id)
select p.id, pm.id
from gkli_flex.perfis p
join gkli_flex.permissoes pm on pm.codigo = 'gkli_flex.admin'
where p.nome = 'Administrador'
on conflict do nothing;

insert into gkli_flex.perfil_permissoes (perfil_id, permissao_id)
select p.id, pm.id
from gkli_flex.perfis p
join gkli_flex.permissoes pm on pm.codigo in (
  'gkli_flex.importacoes.read',
  'gkli_flex.importacoes.write',
  'gkli_flex.financeiro.read',
  'gkli_flex.financeiro.write',
  'gkli_flex.pagamentos.read',
  'gkli_flex.pagamentos.write',
  'gkli_flex.fechamentos.read'
)
where p.nome = 'Operacao financeira'
on conflict do nothing;

insert into gkli_flex.perfil_permissoes (perfil_id, permissao_id)
select p.id, pm.id
from gkli_flex.perfis p
join gkli_flex.permissoes pm on pm.codigo in (
  'gkli_flex.financeiro.read',
  'gkli_flex.comissoes.read',
  'gkli_flex.comissoes.approve',
  'gkli_flex.pagamentos.read',
  'gkli_flex.fechamentos.read',
  'gkli_flex.fechamentos.close',
  'gkli_flex.gestao.read'
)
where p.nome = 'Gestao'
on conflict do nothing;

insert into gkli_flex.colaboradores (id, nome, email, time_id, perfil_id, status)
select
  '00000000-0000-0000-0000-000000000301',
  'Marina Gekali',
  'marina@gekali.com.br',
  t.id,
  p.id,
  'ativo'
from gkli_flex.times t
join gkli_flex.perfis p on p.nome = 'Administrador'
where t.nome = 'Gestao'
on conflict (email) do update
set nome = excluded.nome,
    time_id = excluded.time_id,
    perfil_id = excluded.perfil_id,
    status = excluded.status;

insert into gkli_flex.competencias (id, referencia, inicio, fim, status, opened_by)
select
  '00000000-0000-0000-0000-000000000401',
  '2026-06',
  '2026-06-01',
  '2026-06-30',
  'aberta',
  c.id
from gkli_flex.colaboradores c
where c.email = 'marina@gekali.com.br'
on conflict (referencia) do update
set status = excluded.status,
    opened_by = excluded.opened_by;
