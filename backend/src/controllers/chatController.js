import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { validateBody } from '../utils/validate.js';

/**
 * POST /api/chat
 * Placeholder — returns a canned response until Gemini is integrated.
 */
export const chat = asyncHandler(async (req, res) => {
  if (!validateBody(req, res, ['message'])) return;

  const { message } = req.body;

  // Placeholder response — will be replaced with Gemini AI integration
  sendSuccess(res, {
    reply: `This is a placeholder response. You asked: "${message}". Gemini AI integration is coming soon.`,
    conversationId: `conv-${Date.now()}`,
    sources: [],
    model: 'placeholder',
  }, 'Chat response generated');
});
