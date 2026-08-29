import { Router } from 'express';

const router = Router();

/**
 * GET /api/health
 * Returns server health status — no database dependency.
 */
router.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    },
  });
});

export default router;
