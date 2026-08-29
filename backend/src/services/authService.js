/**
 * Auth service — placeholder for Supabase Auth integration.
 *
 * Will delegate to Supabase Auth for email/password flows once configured.
 * Currently returns placeholder responses.
 */

export async function signUp({ email, password, fullName }) {
  // TODO: integrate Supabase Auth
  return {
    user: { id: `user-${Date.now()}`, email, fullName },
    session: null,
  };
}

export async function signIn({ email, password }) {
  // TODO: integrate Supabase Auth
  return {
    user: { id: `user-${Date.now()}`, email },
    session: { accessToken: 'placeholder-token' },
  };
}

export async function signOut(_accessToken) {
  // TODO: integrate Supabase Auth
  return true;
}

export async function getSession(_accessToken) {
  // TODO: integrate Supabase Auth
  return null;
}
