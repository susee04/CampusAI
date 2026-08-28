import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import config from '../config/index.js';
import { sendError } from '../utils/apiResponse.js';

const uploadDir = path.resolve(config.upload.dir);

// Ensure the upload directory exists on boot
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')}`);
  },
});

const fileFilter = (_req, file, cb) => {
  const isPdf =
    file.mimetype === 'application/pdf' ||
    path.extname(file.originalname).toLowerCase() === '.pdf';

  if (!isPdf) {
    return cb(new Error('Only PDF files are allowed'));
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: config.upload.maxFileSize },
});

/**
 * Multer-specific error handler — converts Multer errors into structured
 * API responses. Mount this after any route that uses the upload middleware.
 *
 * @type {import('express').ErrorRequestHandler}
 */
export function handleUploadError(err, _req, res, _next) {
  if (err instanceof multer.MulterError) {
    const message =
      err.code === 'LIMIT_FILE_SIZE'
        ? `File exceeds the ${Math.round(config.upload.maxFileSize / 1048576)} MB limit`
        : err.message;
    return sendError(res, message, 400);
  }
  if (err?.message === 'Only PDF files are allowed') {
    return sendError(res, err.message, 422);
  }
  return sendError(res, 'File upload failed', 400);
}
