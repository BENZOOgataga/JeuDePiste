import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Import routes dynamically to avoid cold start issues
const app: Express = express();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Simple health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'API is running' });
});

// Import and use routes
import('../backend/src/routes/auth.routes').then(module => {
  app.use('/auth', module.default);
});
import('../backend/src/routes/user.routes').then(module => {
  app.use('/users', module.default);
});
import('../backend/src/routes/game.routes').then(module => {
  app.use('/games', module.default);
});
import('../backend/src/routes/riddle.routes').then(module => {
  app.use('/riddles', module.default);
});
import('../backend/src/routes/participation.routes').then(module => {
  app.use('/participations', module.default);
});

// Error handler
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('API Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

export default app;
