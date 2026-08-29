import { Router } from 'express';
import {
  listDocuments,
  deleteDocument,
} from '../controllers/documentController.js';

const router = Router();

/**
 * GET  /api/documents      — list all documents
 * DELETE /api/documents/:id — delete a document by id
 */
router.get('/', listDocuments);
router.delete('/:id', deleteDocument);

export default router;
