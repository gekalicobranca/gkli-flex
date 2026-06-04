# GKLI Flex - Sprint 7 Gestao e Relatorios

## Objetivo

Criar a visao gerencial separada do cockpit operacional, com indicadores consolidados, catalogo de relatorios e base para exportacoes.

## Escopo

- Indicadores gerenciais
- Receitas
- Despesas
- Resultado operacional
- Comissoes
- Pagamentos previstos
- Pagamentos realizados
- Catalogo de relatorios
- Historico gerencial de competencias
- Base de execucoes/exportacoes

## Entregue

- Dominio de gestao em `features/gkli-flex/gestao/domain.ts`
- Repository gerencial em `features/gkli-flex/gestao/repository.ts`
- Tela Gestao consumindo indicadores, relatorios e competencias
- Migration `202606040007_gkli_flex_sprint_7_gestao_relatorios.sql`
- Seed `gkli_flex_sprint_7_gestao_relatorios_seed.sql`

## Relatorios

- Receitas
- Despesas
- Comissoes
- Pagamentos
- Fechamentos

## Formatos

- CSV
- XLSX
- PDF planejado para fechamentos

## Decisoes

- Gestao fica separada do Cockpit.
- Cockpit responde pendencias operacionais.
- Gestao mostra indicadores consolidados e historico.
- Exportacao real sera implementada sobre `relatorio_execucoes`.
- Indicadores podem ser recalculados por competencia e preservados em `gestao_indicadores`.

## Proximo Passo

Sprint 8: Hardening, testes, revisao visual contra o COB, estados vazios, erros, responsividade e preparacao para ligar Supabase/auth real.
