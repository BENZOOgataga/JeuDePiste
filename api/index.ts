import type { VercelRequest, VercelResponse } from '@vercel/node';
import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from '../backend/src/routes/auth.routes';
import userRoutes from '../backend/src/routes/user.routes';
import gameRoutes from '../backend/src/routes/game.routes';
import riddleRoutes from '../backend/src/routes/riddle.routes';
import participationRoutes from '../backend/src/routes/participation.routes';

dotenv.config();

const app: Express = express();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Routes sans préfixe /api car Vercel gère déjà /api/*
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/games', gameRoutes);
app.use('/riddles', riddleRoutes);
app.use('/participations', participationRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

// Vercel serverless handler
export default (req: VercelRequest, res: VercelResponse) => {
  return app(req as any, res as any);
};
