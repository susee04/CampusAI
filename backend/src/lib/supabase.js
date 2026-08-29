/**
 * Supabase client — placeholder module.
 *
 * Will be wired to @supabase/supabase-js once Supabase is fully integrated.
 * For now, all functions return safe defaults so the rest of the app works
 * without valid Supabase credentials.
 */

export function getSupabaseClient() {
  // TODO: create and return a real Supabase client
  return null;
}

export function getServiceClient() {
  // TODO: create and return a service-role Supabase client
  return null;
}

export function isSupabaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY);
}

export async function checkDatabaseConnection() {
  // TODO: ping the database with a lightweight query
  return false;
}
