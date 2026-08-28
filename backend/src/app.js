import express from 'express';
import cors from 'cors';
import config from './config/index.js';
import corsOptions from './middleware/cors.js';
import { requestLogger } from './middleware/requestLogger.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

import healthRoutes from './routes/healthRoutes.js';
import authRoutes from './routes/authRoutes.js';
import documentRoutes from './routes/documentRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

const app = express();

// --- Global middleware ---
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// --- Routes ---
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/chat', chatRoutes);

// --- Fallback & error handling ---
app.use(notFound);
app.use(errorHandler);

export default app;
