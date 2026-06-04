# GKLI Flex - Sprint 6 Fechamentos

## Objetivo

Consolidar a competencia financeira com checklist obrigatorio, bloqueios, snapshot permanente e reabertura auditada.

## Escopo

- Fechamento por competencia
- Checklist obrigatorio
- Bloqueios de fechamento
- Avisos de fechamento
- Snapshot financeiro
- Reabertura com motivo obrigatorio
- Historico de reaberturas

## Entregue

- Dominio de fechamentos em `features/gkli-flex/fechamentos/domain.ts`
- Regras de fechamento em `rules.ts`
- Bootstrap local com fechamento bloqueado, checklist, bloqueios e snapshot
- Repository de fechamento
- Tela Fechamentos com status, checklist, bloqueios, snapshot e reabertura
- Migration `202606040006_gkli_flex_sprint_6_fechamentos.sql`
- Seed `gkli_flex_sprint_6_fechamentos_seed.sql`

## Checklist

- Importacoes concluidas
- Despesas classificadas
- Comissoes aprovadas
- Pagamentos conferidos
- Sem divergencias criticas

## Bloqueios

- Importacoes com erro
- Despesas nao classificadas
- Comissoes pendentes
- Pagamentos pendentes
- Competencia inconsistente
- Divergencias criticas

## Decisoes

- O fechamento so pode ocorrer se todo checklist estiver concluido.
- Bloqueios em aberto impedem fechamento.
- Avisos ficam visiveis e podem exigir justificativa operacional.
- Snapshot preserva valores historicos da competencia.
- Reabertura exige motivo com no minimo 10 caracteres e usuario responsavel.

## Proximo Passo

Sprint 7: Gestao e Relatorios, usando snapshots, pagamentos, receitas, despesas e comissoes para indicadores gerenciais.
