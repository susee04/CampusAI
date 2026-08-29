/**
 * Chat service — placeholder for RAG-powered question answering.
 *
 * The full pipeline (embed query → vector search → context assembly → LLM
 * generation → source citations) will be wired in once Gemini and Supabase
 * are configured. For now the service returns a structured placeholder.
 */

export async function generateResponse(message) {
  // TODO: integrate Gemini AI for real responses
  return {
    reply: `This is a placeholder response. You asked: "${message}". Gemini AI integration is coming soon.`,
    sources: [],
    model: 'placeholder',
  };
}
