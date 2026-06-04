# GKLI Flex - Sprint 1 Foundation

## Objetivo

Criar a base real do app para evoluir de prototipo navegavel para produto financeiro operacional com schema, permissao, competencia, colaboradores e auditoria.

## Entregue

- Contrato de dominio em `features/gkli-flex/domain.ts`
- Catalogo de permissoes e perfis base em `features/gkli-flex/permissions.ts`
- Bootstrap local da Sprint 1 em `features/gkli-flex/bootstrap-data.ts`
- Repository local preparado para futura troca por Supabase em `features/gkli-flex/repository.ts`
- Migration inicial em `supabase/migrations/202606040001_gkli_flex_sprint_1_foundation.sql`
- Seed inicial em `supabase/seed/gkli_flex_sprint_1_seed.sql`
- Cockpit usando competencia ativa e auditoria base
- Colaboradores usando times e perfis
- Acessos usando matriz de perfis e catalogo de permissoes

## Schema Inicial

- `gkli_flex.competencias`
- `gkli_flex.times`
- `gkli_flex.perfis`
- `gkli_flex.permissoes`
- `gkli_flex.perfil_permissoes`
- `gkli_flex.colaboradores`
- `gkli_flex.auditoria_eventos`

## Decisoes

- Namespace do produto: `gkli_flex`
- RLS ja fica ativado na migration inicial
- Policies finais ficam para a etapa de integracao com o padrao de auth do COB
- UI continua server-side e pronta para trocar bootstrap local por consultas Supabase
- Auditoria registra entidade, usuario, acao, valores anterior/novo e motivo

## Proximo Passo

Conectar Supabase real e implementar o contexto de sessao/permissao seguindo o padrao do `gkli-cob`.
