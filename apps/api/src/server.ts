import { authHandler } from '@starter/auth/server';
import { config } from '@starter/config';
import { AppError } from '@starter/validator';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { type Request, type Response, type NextFunction } from 'express';
import helmet from 'helmet';

import { healthRouter } from './routes/health';
import { userRouter } from './routes/user';

const app = express();

// Security middleware
app.use(helmet());

// CORS
app.use(
  cors({
    origin: config.frontend.url,
    credentials: true,
  })
);

// Better Auth handler (MUST be before body parser)
// https://www.better-auth.com/docs/integrations/express
app.all('/api/auth/*', authHandler);

// Body parsing (mount after Better Auth handler)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/health', healthRouter);
app.use('/api/user', userRouter);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      status: err.statusCode,
    });
  }

  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    status: 500,
  });
});

export { app as server };
