# GKLI Flex - Sprint 3 Financeiro Light

## Objetivo

Criar o miolo operacional financeiro apos as importacoes: receitas, extratos, lancamentos, categorias, regras de classificacao e orcamento por competencia.

## Escopo

- Receitas
- Extratos
- Lancamentos de extrato
- Categorias financeiras
- Regras de classificacao automatica
- Reclassificacao manual futura
- Orcamento por competencia
- Validacao previsto x realizado

## Entregue

- Dominio financeiro em `features/gkli-flex/financeiro/domain.ts`
- Motor simples de classificacao em `classification.ts`
- Bootstrap local com receitas, extrato, lancamentos, categorias, regras e orcamento
- Repository financeiro em `repository.ts`
- Tela Financeiro com resumo operacional, receitas, extratos, lancamentos, categorias/regras e orcamento
- Migration `202606040003_gkli_flex_sprint_3_financeiro.sql`
- Seed `gkli_flex_sprint_3_financeiro_seed.sql`

## Status Operacionais

Lancamentos de extrato:

- `nao_classificado`
- `classificado`
- `conciliado`
- `ignorado`
- `divergente`

Orcamento:

- `dentro`
- `acima`
- `abaixo`

## Decisoes

- Despesas nascem como lancamentos de extrato classificaveis.
- Receitas e extratos ficam separados.
- Regras de classificacao usam texto, palavra-chave e prioridade.
- Conciliação bancaria avancada continua fora do escopo inicial.

## Proximo Passo

Sprint 4: Comissoes, usando receitas e categorias ja estruturadas como base de calculo, conferencia e aprovacao.
