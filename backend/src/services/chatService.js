import { isSupabaseConfigured, getServiceClient, getSupabaseClient } from '../lib/supabase.js';

/**
 * Chat service — placeholder for RAG-powered question answering.
 *
 * The full pipeline (embed query → vector search → context assembly → LLM
 * generation → source citations) will be wired in once the embedding model
 * and LLM providers are configured. For now the service validates input and
 * returns a structured "not yet integrated" response so the API contract is
 * stable for the frontend.
 */

export async function askQuestion({ question, conversationId, history = [] }) {
  if (!question || question.trim().length === 0) {
    throw httpError('Question is required', 422);
  }

  // Future: retrieve relevant document chunks via Supabase vector search
  const sources = await retrieveSources(question);

  // Future: assemble prompt with retrieved context and call the LLM
  const answer = await generateAnswer(question, sources, history);

  // Future: persist the conversation turn to Supabase
  const turn = await persistTurn({ conversationId, question, answer, sources });

  return { answer, sources, conversationId: turn.conversationId };
}

async function retrieveSources(_question) {
  if (isSupabaseConfigured()) {
    const client = getServiceClient() || getSupabaseClient();
    if (client) {
      // TODO: vector similarity search against a `document_chunks` table
      // using pgvector. For now return an empty set.
      return [];
    }
  }
  return [];
}

async function generateAnswer(question, _sources, _history) {
  // TODO: call the configured LLM with retrieved context.
  // Until then, return a transparent placeholder so the frontend can
  // distinguish "backend not integrated" from a real error.
  return `The RAG pipeline is not yet connected. Once a language model and vector store are configured, your question — "${question}" — will be answered using cited passages from uploaded documents.`;
}

async function persistTurn({ conversationId, question, answer, sources }) {
  if (isSupabaseConfigured()) {
    const client = getServiceClient() || getSupabaseClient();
    if (client) {
      // TODO: insert into `chat_messages` and return the conversation id
      const { data, error } = await client
        .from('chat_messages')
        .insert({ conversation_id: conversationId, question, answer, sources })
        .select()
        .single();
      if (error) throw httpError(error.message, 500);
      return data;
    }
  }
  return { conversationId: conversationId || `conv-${Date.now()}` };
}

function httpError(message, statusCode) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}
