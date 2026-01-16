import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from '../backend/src/routes/auth.routes';
import userRoutes from '../backend/src/routes/user.routes';
import gameRoutes from '../backend/src/routes/game.routes';
import riddleRoutes from '../backend/src/routes/riddle.routes';
import participationRoutes from '../backend/src/routes/participation.routes';

dotenv.config();

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/riddles', riddleRoutes);
app.use('/api/participations', participationRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

export default app;
