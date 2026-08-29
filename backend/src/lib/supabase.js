import { createClient } from '@supabase/supabase-js';
import config from '../config/index.js';

let clientInstance = null;

export function getSupabaseClient() {
  if (!clientInstance && config.supabase.url && config.supabase.anonKey) {
    clientInstance = createClient(config.supabase.url, config.supabase.anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return clientInstance;
}

export function isSupabaseConfigured() {
  return Boolean(config.supabase.url && config.supabase.anonKey);
}

export async function checkDatabaseConnection() {
  const supabase = getSupabaseClient();
  if (!supabase) return false;
  try {
    const { error } = await supabase.from('documents').select('id').limit(1);
    return !error;
  } catch (err) {
    return false;
  }
}
