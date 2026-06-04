# GKLI Flex - Deploy GitHub/Vercel

## Objetivo

O GKLI Flex deve operar direto em ambiente cloud:

1. GitHub como repositorio.
2. Vercel como deploy do Next.js.
3. Supabase cloud como banco/auth.

Nao vamos depender de uma versao local para uso operacional.

## GitHub

Criar um repositorio para o app, por exemplo:

`gkli-flex`

Subir o projeto completo, mantendo fora do GitHub:

- `.env`
- `.env.local`
- chaves Supabase
- service role key

## Vercel

Criar projeto na Vercel conectado ao repositorio GitHub.

Configuracao:

- Framework: Next.js
- Build command: `npm run build`
- Install command: `npm install`
- Output: `.next`

## Variaveis De Ambiente

Configurar na Vercel:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GKLI_FLEX_SCHEMA=gkli_flex
```

Observacao:

- `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` podem ser publicas.
- `SUPABASE_SERVICE_ROLE_KEY` nunca deve ser exposta no client.
- Actions server-side devem usar service role apenas quando realmente necessario.

## Supabase

No projeto Supabase cloud:

1. Aplicar as migrations em `supabase/migrations`.
2. Aplicar os seeds em `supabase/seed`.
3. Confirmar schema `gkli_flex`.
4. Revisar RLS.
5. Criar policies finais depois que o auth/permissoes estiver conectado.

## Ordem Recomendada

1. Criar repositorio GitHub.
2. Subir app.
3. Criar projeto Vercel.
4. Configurar variaveis.
5. Criar/conectar Supabase.
6. Aplicar migrations.
7. Aplicar seeds.
8. Fazer primeiro deploy.
9. Trocar repositories locais por queries Supabase.

## Estado Atual

O app esta pronto para deploy estrutural, mas ainda usa repositories locais com bootstrap data.

O proximo passo tecnico e conectar Supabase real e substituir os repositories modulo por modulo.
