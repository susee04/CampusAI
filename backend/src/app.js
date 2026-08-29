import express from 'express';
import cors from 'cors';
import config from './config/index.js';
import corsOptions from './middleware/cors.js';
import { requestLogger } from './middleware/requestLogger.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

import healthRoutes from './routes/healthRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import documentRoutes from './routes/documentRoutes.js';

const app = express();

// --- Global middleware ---
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// --- API Routes ---
app.use('/api/health', healthRoutes);       // GET  /api/health
app.use('/api/chat', chatRoutes);           // POST /api/chat
app.use('/api/upload', uploadRoutes);       // POST /api/upload
app.use('/api/documents', documentRoutes);  // GET  /api/documents, DELETE /api/documents/:id

// --- Fallback & error handling ---
app.use(notFound);
app.use(errorHandler);

export default app;
