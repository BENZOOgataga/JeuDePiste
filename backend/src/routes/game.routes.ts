import { Router } from 'express';
import { body } from 'express-validator';
import * as gameController from '../controllers/game.controller';
import { authenticate, isAdmin } from '../middleware/auth.middleware';

const router = Router();

router.get('/', gameController.getAllGames);
router.get('/:id', gameController.getGameById);

router.post(
  '/',
  authenticate,
  isAdmin,
  [
    body('title').notEmpty().withMessage('Le titre est requis'),
    body('description').optional()
  ],
  gameController.createGame
);

router.put('/:id', authenticate, isAdmin, gameController.updateGame);
router.delete('/:id', authenticate, isAdmin, gameController.deleteGame);

export default router;
