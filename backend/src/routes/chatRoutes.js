import { Router } from 'express';
import { chat } from '../controllers/chatController.js';

const router = Router();

/**
 * POST /api/chat
 * Accepts a message and returns an AI response (placeholder for now).
 */
router.post('/', chat);

export default router;
