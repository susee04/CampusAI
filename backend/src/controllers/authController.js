import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { validateBody } from '../utils/validate.js';
import * as authService from '../services/authService.js';

export const signUp = asyncHandler(async (req, res) => {
  if (!validateBody(req, res, ['email', 'password'])) return;
  const { email, password, fullName } = req.body;
  const data = await authService.signUp({ email, password, fullName });
  sendSuccess(res, { user: data.user }, 'Account created', 201);
});

export const signIn = asyncHandler(async (req, res) => {
  if (!validateBody(req, res, ['email', 'password'])) return;
  const { email, password } = req.body;
  const data = await authService.signIn({ email, password });
  sendSuccess(res, { session: data.session, user: data.user }, 'Signed in');
});

export const signOut = asyncHandler(async (req, res) => {
  const accessToken = req.headers.authorization?.replace('Bearer ', '');
  await authService.signOut(accessToken);
  sendSuccess(res, null, 'Signed out');
});

export const me = asyncHandler(async (req, res) => {
  const accessToken = req.headers.authorization?.replace('Bearer ', '');
  if (!accessToken) return sendSuccess(res, { user: null }, 'Not authenticated', 200);
  const user = await authService.getSession(accessToken);
  sendSuccess(res, { user }, 'Authenticated');
});
