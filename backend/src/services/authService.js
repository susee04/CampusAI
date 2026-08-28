import { isSupabaseConfigured, getSupabaseClient, getServiceClient } from '../lib/supabase.js';

/**
 * Auth service — delegates to Supabase Auth for email/password flows.
 *
 * Throws a clear 503 when Supabase is not configured so the caller returns
 * a structured "not configured" response rather than silently succeeding.
 */

export async function signUp({ email, password, fullName }) {
  if (!isSupabaseConfigured()) {
    throw notConfigured();
  }
  const client = getSupabaseClient();
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });
  if (error) throw httpError(error.message, 400);
  return data;
}

export async function signIn({ email, password }) {
  if (!isSupabaseConfigured()) {
    throw notConfigured();
  }
  const client = getSupabaseClient();
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw httpError(error.message, 401);
  return data;
}

export async function signOut(accessToken) {
  if (!isSupabaseConfigured()) {
    throw notConfigured();
  }
  const client = getServiceClient() || getSupabaseClient();
  const { error } = await client.auth.signOut(accessToken);
  if (error) throw httpError(error.message, 400);
  return true;
}

export async function getSession(accessToken) {
  if (!isSupabaseConfigured()) {
    throw notConfigured();
  }
  const client = getServiceClient() || getSupabaseClient();
  const { data, error } = await client.auth.getUser(accessToken);
  if (error) throw httpError(error.message, 401);
  return data.user;
}

function notConfigured() {
  return httpError('Supabase is not configured. Set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY.', 503);
}

function httpError(message, statusCode) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}
