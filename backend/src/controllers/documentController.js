import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import * as documentService from '../services/documentService.js';

/**
 * GET /api/documents
 * Retrieves all documents from Supabase.
 */
export const listDocuments = asyncHandler(async (_req, res) => {
  const rawDocs = await documentService.listDocuments();
  
  // Format to match frontend structure (snake_case from DB -> camelCase for UI)
  const documents = rawDocs.map(doc => ({
    id: doc.id,
    filename: doc.filename,
    originalName: doc.original_name,
    size: doc.size,
    mimeType: doc.mime_type,
    status: doc.status,
    createdAt: doc.created_at,
  }));

  sendSuccess(res, { documents }, 'Documents retrieved');
});

/**
 * DELETE /api/documents/:id
 * Deletes a document from Supabase (cascades to chunks).
 */
export const deleteDocument = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await documentService.deleteDocument(id);

  sendSuccess(res, {
    id,
    deleted: true,
  }, `Document ${id} deleted`);
});
