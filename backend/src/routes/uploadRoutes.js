import { Router } from 'express';
import { uploadDocument } from '../controllers/uploadController.js';
import { upload, handleUploadError } from '../middleware/upload.js';

const router = Router();

/**
 * POST /api/upload
 * Accepts a file upload (field name: "file") and returns document metadata.
 */
router.post('/', upload.single('file'), uploadDocument, handleUploadError);

export default router;
