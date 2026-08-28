import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import * as documentService from '../services/documentService.js';

export const listDocuments = asyncHandler(async (_req, res) => {
  const documents = await documentService.listDocuments();
  sendSuccess(res, { documents }, 'Documents retrieved');
});

export const getDocument = asyncHandler(async (req, res) => {
  const document = await documentService.getDocument(req.params.id);
  sendSuccess(res, { document }, 'Document retrieved');
});

export const uploadDocument = asyncHandler(async (req, res) => {
  if (!req.file) {
    return sendSuccess(res, { document: null }, 'No file provided', 400);
  }
  const document = await documentService.saveDocument(req.file);
  sendSuccess(res, { document }, 'Document uploaded', 201);
});

export const deleteDocument = asyncHandler(async (req, res) => {
  await documentService.deleteDocument(req.params.id);
  sendSuccess(res, null, 'Document deleted');
});
