import { getSupabaseClient } from '../lib/supabase.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import config from '../config/index.js';
import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');

const genAI = new GoogleGenerativeAI(config.geminiApiKey || '');

/**
 * Split text into chunks of 500-800 characters.
 */
function chunkText(text, maxChars = 800) {
  const paragraphs = text.split(/\n\s*\n/);
  const chunks = [];
  let currentChunk = '';

  for (const para of paragraphs) {
    if (currentChunk.length + para.length > maxChars) {
      if (currentChunk.trim()) chunks.push(currentChunk.trim());
      currentChunk = para;
    } else {
      currentChunk += '\n\n' + para;
    }
  }
  if (currentChunk.trim()) chunks.push(currentChunk.trim());
  return chunks;
}

/**
 * Generate embedding for a single text chunk.
 */
async function generateEmbedding(text) {
  if (!config.geminiApiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }
  const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });
  const result = await model.embedContent(text);
  return result.embedding.values;
}

export async function listDocuments() {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to list documents:', error.message);
    return [];
  }
  return data;
}

export async function deleteDocument(id) {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  const { error } = await supabase
    .from('documents')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Failed to delete document ${id}:`, error.message);
    throw new Error(error.message);
  }
  return true;
}

export async function saveDocument(file) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }

  // 1. Parse PDF and extract pages & text
  const dataBuffer = fs.readFileSync(file.path);
  const p = new PDFParse({ data: dataBuffer });
  const parsed = await p.getText();
  const pages = parsed.total || 1;
  const text = parsed.text || '';

  // 2. Insert document metadata to public.documents
  const { data: document, error: docError } = await supabase
    .from('documents')
    .insert({
      filename: file.filename,
      original_name: file.originalname,
      size: file.size,
      mime_type: file.mimetype,
      path: file.path,
      status: 'indexed',
    })
    .select()
    .single();

  if (docError) {
    throw new Error(`Failed to create document: ${docError.message}`);
  }

  // 3. Chunk text and generate embeddings
  const chunks = chunkText(text);
  if (chunks.length > 0) {
    const chunkInserts = [];
    
    for (const chunk of chunks) {
      try {
        const embedding = await generateEmbedding(chunk);
        chunkInserts.push({
          document_id: document.id,
          content: chunk,
          embedding,
        });
      } catch (embErr) {
        console.error('Embedding generation failed for chunk:', embErr.message);
      }
    }

    if (chunkInserts.length > 0) {
      const { error: chunkError } = await supabase
        .from('document_chunks')
        .insert(chunkInserts);

      if (chunkError) {
        console.error('Failed to save document chunks:', chunkError.message);
      }
    }
  }

  return {
    id: document.id,
    filename: document.filename,
    originalName: document.original_name,
    size: document.size,
    mimeType: document.mime_type,
    path: document.path,
    status: document.status,
    pages,
    createdAt: document.created_at,
  };
}
