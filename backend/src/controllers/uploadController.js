import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { saveDocument } from '../services/documentService.js';

/**
 * POST /api/upload
 * Accepts a file via Multer, extracts text, generates embeddings, and saves to Supabase.
 */
export const uploadDocument = asyncHandler(async (req, res) => {
  if (!req.file) {
    return sendSuccess(res, { document: null }, 'No file provided', 400);
  }

  const document = await saveDocument(req.file);

  sendSuccess(res, { document }, 'Document uploaded and indexed successfully', 201);
});
