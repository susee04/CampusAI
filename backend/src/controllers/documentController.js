import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';

/**
 * GET /api/documents
 * Placeholder — returns a sample documents array.
 */
export const listDocuments = asyncHandler(async (_req, res) => {
  const documents = [
    {
      id: '1',
      filename: 'syllabus-cs101.pdf',
      originalName: 'CS 101 Syllabus.pdf',
      size: 245760,
      mimeType: 'application/pdf',
      status: 'indexed',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      filename: 'lecture-notes-week1.pdf',
      originalName: 'Lecture Notes — Week 1.pdf',
      size: 512000,
      mimeType: 'application/pdf',
      status: 'indexed',
      createdAt: new Date().toISOString(),
    },
  ];

  sendSuccess(res, { documents }, 'Documents retrieved');
});

/**
 * DELETE /api/documents/:id
 * Placeholder — acknowledges the deletion without touching a database.
 */
export const deleteDocument = asyncHandler(async (req, res) => {
  const { id } = req.params;

  sendSuccess(res, {
    id,
    deleted: true,
  }, `Document ${id} deleted`);
});
