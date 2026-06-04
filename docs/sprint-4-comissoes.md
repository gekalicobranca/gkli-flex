# GKLI Flex - Sprint 4 Comissoes

## Objetivo

Criar o fluxo operacional de comissoes a partir das receitas da competencia, com calculo, conferencia, aprovacao, rejeicao e eventos auditaveis.

## Escopo

- Tipos de comissao
- Percentual por tipo
- Categoria financeira vinculada
- Comissao calculada por receita
- Conferencia
- Aprovacao individual ou futura em lote
- Rejeicao e retorno para ajuste
- Eventos de auditoria por comissao

## Entregue

- Dominio de comissoes em `features/gkli-flex/comissoes/domain.ts`
- Regras de calculo/status em `rules.ts`
- Bootstrap local de tipos, comissoes e eventos
- Repository de comissoes cruzando receitas e colaboradores
- Tela Comissoes com resumo, tipos, eventos e tabela de conferencia
- Migration `202606040004_gkli_flex_sprint_4_comissoes.sql`
- Seed `gkli_flex_sprint_4_comissoes_seed.sql`

## Fluxo

1. Receita confirmada
2. Tipo de comissao selecionado pela categoria
3. Calculo da comissao
4. Conferencia
5. Aprovacao ou rejeicao
6. Pagamento na Sprint 5

## Status

- `calculada`
- `conferida`
- `aprovada`
- `rejeitada`
- `paga`

## Decisoes

- Comissoes dependem de receitas ja estruturadas.
- Pagamento da comissao fica para a Sprint 5.
- Toda mudanca relevante de status tem evento proprio.
- Aprovacao em lote sera implementada sobre o mesmo modelo de eventos.

## Proximo Passo

Sprint 5: Pagamentos, incluindo agenda, recorrencias, confirmacao, cancelamento e integracao com comissoes aprovadas.
