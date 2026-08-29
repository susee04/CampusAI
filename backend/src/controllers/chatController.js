import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { validateBody } from '../utils/validate.js';
import * as chatService from '../services/chatService.js';

/**
 * POST /api/chat
 * Placeholder — returns a canned response until Gemini is integrated.
 */
export const chat = asyncHandler(async (req, res) => {
  if (!validateBody(req, res, ['message'])) return;

  const { message, conversationId } = req.body;

  const result = await chatService.generateResponse(message, conversationId);

  sendSuccess(res, {
    reply: result.reply,
    conversationId: result.conversationId,
    sources: result.sources || [],
    model: result.model || 'gemini',
  }, 'Chat response generated');
});
