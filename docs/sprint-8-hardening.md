# GKLI Flex - Sprint 8 Hardening

## Objetivo

Revisar a base criada nas sprints anteriores, reduzir riscos visuais e preparar o app para validação, testes e futura ligação com Supabase/auth real.

## Entregue

- Ajuste global de tipografia para pesos mais leves.
- Redução de tamanhos de títulos e métricas.
- Componentes reutilizáveis de estado vazio e aviso inline.
- Checklist técnico de hardening em `features/gkli-flex/hardening/checklist.ts`.
- Diretrizes visuais em `docs/ui-guidelines.md`.

## Diretriz Importante

O app não deve usar fontes com muito negrito nem tamanhos grandes. A interface precisa continuar discreta, operacional e limpa.

## Checklist

- Build local
- Revisão de TypeScript
- Revisão de responsividade
- Revisão visual contra o padrão COB
- Estados vazios por modulo
- Tratamento de erros por modulo
- Preparação de repositories para Supabase
- Preparação de actions reais
- Revisão de migrations e seeds

## Proximo Passo

Rodar build local, corrigir eventuais erros e depois iniciar a integração real com Supabase/auth.
