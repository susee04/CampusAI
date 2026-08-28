import { sendError } from '../utils/apiResponse.js';

/**
 * Validate that the request body contains the given required keys.
 * Returns a 422 response listing missing fields if validation fails.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {string[]} fields
 * @returns {boolean} true if valid, false if response already sent
 */
export function validateBody(req, res, fields) {
  const missing = fields.filter((f) => {
    const value = req.body?.[f];
    return value === undefined || value === null || value === '';
  });

  if (missing.length) {
    sendError(res, 'Missing required fields', 422, { missing });
    return false;
  }

  return true;
}
