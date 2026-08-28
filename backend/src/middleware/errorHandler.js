import { sendError } from '../utils/apiResponse.js';

/**
 * Central error handler — mounted as the final middleware.
 * Converts known errors into structured responses and logs the rest.
 *
 * @type {import('express').ErrorRequestHandler}
 */
export function errorHandler(err, _req, res, _next) {
  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : 'Internal server error';

  if (statusCode >= 500) {
    console.error('[error]', err.stack || err.message);
  }

  sendError(res, message, statusCode, err.details || null);
}

/**
 * 404 handler for unmatched routes.
 *
 * @type {import('express').RequestHandler}
 */
export function notFound(req, res) {
  sendError(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);
}
