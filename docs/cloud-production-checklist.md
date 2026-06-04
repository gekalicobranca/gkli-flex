# GKLI Flex - Checklist Cloud

## GitHub

- Criar repositorio `gkli-flex`.
- Subir o codigo sem `.env` ou `.env.local`.
- Confirmar que `.gitignore` esta ativo.
- Proteger branch principal quando iniciar uso real.

## Vercel

- Criar projeto conectado ao GitHub.
- Framework: Next.js.
- Instalar com `npm install`.
- Build com `npm run build`.
- Configurar variaveis de ambiente.
- Fazer deploy de preview.
- Promover para production apenas depois do build limpo.

## Supabase

- Usar banco cloud.
- Criar ou escolher projeto Supabase.
- Aplicar migrations em ordem.
- Aplicar seeds em ordem.
- Confirmar schema `gkli_flex`.
- Revisar RLS.
- Criar policies reais quando auth estiver conectado.

## Variaveis Vercel

Obrigatorias:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GKLI_FLEX_SCHEMA`

## Antes De Uso Real

- Remover ou isolar dados bootstrap.
- Conectar repositories ao Supabase.
- Validar controle de acesso.
- Validar auditoria.
- Validar responsividade.
- Rodar build no ambiente Vercel.
- Conferir visual: sem fontes grandes, sem negrito forte, sem dashboard pesado.

## Ordem Das Proximas Tarefas

1. Criar repo GitHub.
2. Conectar Vercel.
3. Configurar variaveis.
4. Aplicar migrations/seeds no Supabase.
5. Criar client Supabase no app.
6. Trocar repository por repository real, modulo por modulo.
7. Ligar auth/permissoes.
8. Validar deploy production.
