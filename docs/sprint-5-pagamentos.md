# GKLI Flex - Sprint 5 Pagamentos

## Objetivo

Criar a agenda operacional de pagamentos da competencia, incluindo pagamentos previstos, agendados, pagos, cancelados, recorrencias e vinculo com comissoes aprovadas.

## Escopo

- Pagamentos de comissao
- Salario
- Pro-labore
- Fornecedor
- Reembolso
- Outros pagamentos
- Pagamentos recorrentes
- Eventos de pagamento
- Confirmacao e cancelamento futuros

## Entregue

- Dominio de pagamentos em `features/gkli-flex/pagamentos/domain.ts`
- Regras de status em `rules.ts`
- Bootstrap local de pagamentos, recorrencias e eventos
- Repository de pagamentos cruzando colaboradores, comissoes e recorrencias
- Tela Pagamentos com resumo, agenda, recorrencias e eventos
- Migration `202606040005_gkli_flex_sprint_5_pagamentos.sql`
- Seed `gkli_flex_sprint_5_pagamentos_seed.sql`

## Status

- `previsto`
- `agendado`
- `pago`
- `cancelado`

## Fluxo

1. Pagamento previsto nasce manualmente, por recorrencia ou por comissao aprovada.
2. Operacao agenda o pagamento.
3. Operacao confirma pagamento ou cancela com motivo.
4. Evento registra usuario, status anterior, status novo e motivo.

## Decisoes

- Pagamento tem vinculo opcional com comissao.
- Pagamento tem vinculo opcional com recorrencia.
- Pagamento pode ou nao ter colaborador vinculado, para cobrir fornecedores.
- Confirmacao bancaria avancada segue fora do escopo inicial.

## Proximo Passo

Sprint 6: Fechamento mensal, usando importacoes, classificacoes, comissoes e pagamentos como bloqueios/checklist antes do snapshot.
