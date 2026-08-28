import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { validateBody } from '../utils/validate.js';
import * as chatService from '../services/chatService.js';

export const ask = asyncHandler(async (req, res) => {
  if (!validateBody(req, res, ['question'])) return;
  const { question, conversationId, history } = req.body;
  const result = await chatService.askQuestion({
    question,
    conversationId,
    history,
  });
  sendSuccess(res, result, 'Answer generated');
});

export const getConversations = asyncHandler(async (_req, res) => {
  // TODO: fetch conversation history from Supabase once configured
  sendSuccess(res, { conversations: [] }, 'Conversations retrieved');
});
