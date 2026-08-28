import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client — reads SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY from the
 * environment. The publishable (anon) key is safe for server-side read access
 * through RLS policies. A service-role client is also created when available
 * for privileged operations.
 */

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

let anonClient = null;
let serviceClient = null;

function buildClients() {
  if (!supabaseUrl || !supabasePublishableKey) return;

  anonClient = createClient(supabaseUrl, supabasePublishableKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  if (supabaseServiceRoleKey) {
    serviceClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
}

buildClients();

export function getSupabaseClient() {
  if (!anonClient) buildClients();
  return anonClient;
}

export function getServiceClient() {
  if (!serviceClient) buildClients();
  return serviceClient;
}

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabasePublishableKey);
}

/**
 * Ping the database by running a lightweight query against the documents
 * table. Returns true if the connection is healthy.
 */
export async function checkDatabaseConnection() {
  const client = getSupabaseClient();
  if (!client) return false;

  const { error } = await client
    .from('documents')
    .select('id')
    .limit(1);

  return !error;
}
