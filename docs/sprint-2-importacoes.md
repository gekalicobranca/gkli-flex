# GKLI Flex - Sprint 2 Importacoes

## Objetivo

Criar a base operacional para importar arquivos financeiros com validacao, revisao de inconsistencias e confirmacao antes da persistencia definitiva.

## Escopo

- Omie em XLSX
- Banco Inter em CSV
- Recibos de pagamento em PDF
- Historico de lotes
- Pre-validacao
- Inconsistencias com aviso ou bloqueio
- Previa normalizada das linhas
- Eventos de importacao
- Geracao de pagamentos de salario a partir de recibos

## Entregue

- Dominio de importacoes em `features/gkli-flex/importacoes/domain.ts`
- Catalogo de fontes em `features/gkli-flex/importacoes/catalog.ts`
- Bootstrap local de lotes, inconsistencias e previa
- Repository local de importacoes
- Regras de fluxo e confirmacao em `validation.ts`
- Tela de importacoes com lotes, etapas, inconsistencias e previa
- Migration `202606040002_gkli_flex_sprint_2_importacoes.sql`
- Seed `gkli_flex_sprint_2_importacoes_seed.sql`

## Fluxo

1. Selecionar arquivo
2. Pre-validar ou validar
3. Exibir inconsistencias
4. Confirmar quando nao houver bloqueios
5. Persistir dados financeiros

## Decisoes

- A Sprint 2 normaliza dados em preview antes de criar receitas ou extratos definitivos.
- Bloqueios impedem confirmacao.
- Avisos permitem confirmacao, desde que a regra de negocio aceite a sugestao.
- Persistencia final em `receitas`, `extratos` e `extrato_lancamentos` fica para a Sprint 3.

## Proximo Passo

Implementar parsers reais para XLSX/CSV e actions de upload/validacao assim que fecharmos o formato exato dos arquivos Omie e Banco Inter.
