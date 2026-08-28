import { Router } from 'express';
import { ask, getConversations } from '../controllers/chatController.js';

const router = Router();

router.post('/ask', ask);
router.get('/conversations', getConversations);

export default router;
