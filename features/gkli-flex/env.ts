export const flexEnv = {
  schema: process.env.GKLI_FLEX_SCHEMA ?? "gkli_flex",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  hasServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)
};

export function isSupabaseConfigured() {
  return Boolean(flexEnv.supabaseUrl && flexEnv.supabaseAnonKey);
}
