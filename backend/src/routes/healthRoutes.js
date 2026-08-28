import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { checkDatabaseConnection, isSupabaseConfigured } from '../lib/supabase.js';

const router = Router();

router.get('/', asyncHandler(async (_req, res) => {
  if (!isSupabaseConfigured()) {
    return sendError(res, 'Supabase is not configured', 503, {
      database: 'disconnected',
    });
  }

  const connected = await checkDatabaseConnection();

  if (!connected) {
    return sendError(res, 'Database connection failed', 503, {
      database: 'disconnected',
    });
  }

  return res.status(200).json({
    status: 'ok',
    database: 'connected',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
}));

export default router;
