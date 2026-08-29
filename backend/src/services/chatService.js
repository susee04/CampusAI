import { GoogleGenerativeAI } from '@google/generative-ai';
import { getSupabaseClient } from '../lib/supabase.js';
import config from '../config/index.js';

const genAI = new GoogleGenerativeAI(config.geminiApiKey || '');
const activeSessions = new Map();

/**
 * Retrieve similar chunks from Supabase using pgvector cosine distance
 */
async function retrieveContext(query, matchCount = 4) {
  const supabase = getSupabaseClient();
  if (!supabase) return { contextText: '', sources: [] };

  try {
    // 1. Generate embedding for query
    const embedModel = genAI.getGenerativeModel({ model: 'text-embedding-004' });
    const embedResult = await embedModel.embedContent(query);
    const queryEmbedding = embedResult.embedding.values;

    // 2. Query Supabase vector match RPC function
    const { data: matches, error } = await supabase.rpc('match_documents', {
      query_embedding: queryEmbedding,
      match_threshold: 0.2, // Low threshold to allow matching
      match_count: matchCount,
    });

    if (error) {
      console.error('Vector search failed:', error.message);
      return { contextText: '', sources: [] };
    }

    if (!matches || matches.length === 0) {
      return { contextText: '', sources: [] };
    }

    // 3. Resolve document names for citations
    const docIds = [...new Set(matches.map(m => m.document_id))];
    const { data: docs, error: docError } = await supabase
      .from('documents')
      .select('id, original_name, filename')
      .in('id', docIds);

    if (docError) {
      console.error('Failed to resolve document titles:', docError.message);
    }

    const docMap = new Map((docs || []).map(d => [d.id, d]));

    const sources = matches.map((match, index) => {
      const doc = docMap.get(match.document_id);
      const originalName = doc ? doc.original_name : 'Unknown Document';
      const filename = doc ? doc.filename : 'unknown.pdf';
      
      return {
        title: originalName.replace(/\.[^/.]+$/, ""), // Remove file extension for display title
        doc: filename,
        page: 1, // Page number placeholder or extracted if structured
        excerpt: match.content,
      };
    });

    // Assemble context block
    const contextText = matches
      .map((m, i) => `[Source ${i + 1}]:\n${m.content}`)
      .join('\n\n');

    return { contextText, sources };
  } catch (err) {
    console.error('Retrieval error:', err);
    return { contextText: '', sources: [] };
  }
}

/**
 * Chat service — RAG-powered response generation.
 */
export async function generateResponse(message, conversationId) {
  if (!config.geminiApiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const id = conversationId || `conv-${Date.now()}`;

  // 1. Retrieve relevant contexts and metadata
  const { contextText, sources } = await retrieveContext(message);

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    let chatSession;
    if (activeSessions.has(id)) {
      chatSession = activeSessions.get(id);
    } else {
      chatSession = model.startChat({
        history: [],
      });
      activeSessions.set(id, chatSession);
    }

    // 2. Construct system instructions context
    let prompt = message;
    if (contextText) {
      prompt = `You are a helpful student assistant. Use the following document extracts to answer the question. If the answer cannot be found in the context, you may use your knowledge but state that you didn't find it in the uploaded documents.
      
Context:
${contextText}

Question:
${message}`;
    }

    // 3. Generate response
    const result = await chatSession.sendMessage(prompt);
    const reply = result.response.text();

    return {
      reply,
      conversationId: id,
      sources,
      model: 'gemini-1.5-flash',
    };
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to generate AI response');
  }
}
