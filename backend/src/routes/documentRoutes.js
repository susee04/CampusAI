import { Router } from 'express';
import {
  listDocuments,
  getDocument,
  uploadDocument,
  deleteDocument,
} from '../controllers/documentController.js';
import { upload, handleUploadError } from '../middleware/upload.js';

const router = Router();

router.get('/', listDocuments);
router.get('/:id', getDocument);
router.post('/upload', upload.single('file'), uploadDocument, handleUploadError);
router.delete('/:id', deleteDocument);

export default router;
