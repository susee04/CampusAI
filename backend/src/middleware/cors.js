import config from '../config/index.js';

/**
 * CORS middleware — allows the configured frontend origin and the most common
 * methods/headers. In production the origin allowlist should be tightened.
 */
const corsOptions = {
  origin(origin, callback) {
    // Allow requests with no origin (curl, Postman, server-to-server)
    if (!origin) return callback(null, true);

    const allowed = [config.clientUrl];
    if (!config.isProd) {
      // In dev, also allow localhost on any port (Vite uses 5173, etc.)
      allowed.push(/^http:\/\/localhost:\d+$/);
    }

    const isAllowed = allowed.some((entry) =>
      entry instanceof RegExp ? entry.test(origin) : entry === origin
    );

    if (isAllowed) return callback(null, true);
    callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Client-Info', 'X-Request-ID'],
  exposedHeaders: ['X-Request-ID'],
};

export default corsOptions;
