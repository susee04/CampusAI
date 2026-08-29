import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';

/**
 * POST /api/upload
 * Placeholder — accepts a file via Multer and returns its metadata.
 */
export const uploadDocument = asyncHandler(async (req, res) => {
  if (!req.file) {
    return sendSuccess(res, { document: null }, 'No file provided', 400);
  }

  const document = {
    id: `doc-${Date.now()}`,
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    mimeType: req.file.mimetype,
    path: req.file.path,
    status: 'uploaded',
    createdAt: new Date().toISOString(),
  };

  sendSuccess(res, { document }, 'Document uploaded', 201);
});
