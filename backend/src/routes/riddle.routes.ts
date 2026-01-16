import { Router } from 'express';
import { body } from 'express-validator';
import * as riddleController from '../controllers/riddle.controller';
import { authenticate, isAdmin } from '../middleware/auth.middleware';

const router = Router();

router.get('/game/:gameId', riddleController.getRiddlesByGame);
router.get('/:id', riddleController.getRiddleById);

router.post(
  '/',
  authenticate,
  isAdmin,
  [
    body('gameId').notEmpty().withMessage('L\'ID du jeu est requis'),
    body('title').notEmpty().withMessage('Le titre est requis'),
    body('question').notEmpty().withMessage('La question est requise'),
    body('answer').notEmpty().withMessage('La réponse est requise'),
    body('latitude').isFloat().withMessage('Latitude invalide'),
    body('longitude').isFloat().withMessage('Longitude invalide'),
    body('order').isInt().withMessage('L\'ordre doit être un nombre')
  ],
  riddleController.createRiddle
);

router.put('/:id', authenticate, isAdmin, riddleController.updateRiddle);
router.delete('/:id', authenticate, isAdmin, riddleController.deleteRiddle);
router.post('/:id/validate', authenticate, riddleController.validateAnswer);

export default router;
