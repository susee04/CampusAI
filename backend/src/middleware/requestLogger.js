/**
 * Lightweight request logger — method, path, status, and latency.
 * Mounted globally before the routes.
 *
 * @type {import('express').RequestHandler}
 */
export function requestLogger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const elapsed = Date.now() - start;
    const level = res.statusCode >= 400 ? 'warn' : 'info';
    console[level](
      `[${req.method}] ${req.originalUrl} → ${res.statusCode} (${elapsed}ms)`
    );
  });
  next();
}
