# GKLI Flex - Importação de Recibos de Pagamento

## Objetivo

Permitir que o Flex importe recibos de pagamento de empregados em PDF e gere pagamentos de salário na agenda de pagamentos.

## Origem

- Origem: `recibos_pagamento`
- Formato: `pdf`
- Tipo de saída: `pagamento_salario`

## Fluxo

1. Selecionar PDF de recibos.
2. Extrair recibos do arquivo.
3. Identificar empregado, competência e valor líquido.
4. Sugerir vencimento do pagamento.
5. Exibir prévia para conferência.
6. Confirmar importação.
7. Gerar pagamentos previstos na agenda.

## Regra de Vencimento

Para recibos de folha mensal, o vencimento sugerido é o dia 5 do mês seguinte à competência.

Exemplo:

- Competência: Abril/2026
- Vencimento sugerido: 05/05/2026

## Dados Extraídos

- Nome do empregado
- Competência
- Cargo, quando identificado
- Valor líquido
- Vencimento sugerido

## Banco

A migration `202606040008_gkli_flex_recibos_pagamento.sql` adiciona:

- Origem `recibos_pagamento`
- Formato `pdf`
- Tipo de prévia `pagamento_salario`
- Vínculo `pagamentos.importacao_id`
- Tabela `recibo_pagamento_itens`
- Evento `gerado_recibo_pagamento`

## Observação

O parser inicial foi modelado a partir do arquivo `Recibo de Pagamento_Empregados.pdf`.
Antes do uso produtivo, novos modelos de recibo devem passar por validação com prévia e inconsistências.
