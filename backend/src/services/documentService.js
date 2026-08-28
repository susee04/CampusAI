import { isSupabaseConfigured, getServiceClient, getSupabaseClient } from '../lib/supabase.js';

/**
 * Document service — persists document metadata to the Supabase `documents`
 * table. Files are stored on disk via Multer; metadata is synced to Supabase
 * for querying and display. Falls back to local-disk scanning when Supabase
 * is not configured.
 */

export async function listDocuments() {
  if (isSupabaseConfigured()) {
    const client = getServiceClient() || getSupabaseClient();
    if (client) {
      const { data, error } = await client
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw httpError(error.message, 500);
      return data;
    }
  }

  // Fallback: return empty array when Supabase is not available
  return [];
}

export async function getDocument(id) {
  if (isSupabaseConfigured()) {
    const client = getServiceClient() || getSupabaseClient();
    if (client) {
      const { data, error } = await client
        .from('documents')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw httpError(error.message, 404);
      return data;
    }
  }
  throw httpError('Document not found', 404);
}

export async function saveDocument(file) {
  const meta = {
    filename: file.filename,
    original_name: file.originalname,
    size: file.size,
    mime_type: file.mimetype,
    path: file.path,
    status: 'indexed',
  };

  if (isSupabaseConfigured()) {
    const client = getServiceClient() || getSupabaseClient();
    if (client) {
      const { data, error } = await client
        .from('documents')
        .insert(meta)
        .select()
        .single();
      if (error) throw httpError(error.message, 500);
      return data;
    }
  }

  // Fallback: return metadata from the saved file on disk
  return meta;
}

export async function deleteDocument(id) {
  if (isSupabaseConfigured()) {
    const client = getServiceClient() || getSupabaseClient();
    if (client) {
      const { error } = await client.from('documents').delete().eq('id', id);
      if (error) throw httpError(error.message, 500);
    }
  }
  return true;
}

function httpError(message, statusCode) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}
