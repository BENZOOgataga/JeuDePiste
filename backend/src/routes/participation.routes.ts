import { Router } from 'express';
import * as participationController from '../controllers/participation.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/user/:userId', authenticate, participationController.getUserParticipations);
router.get('/game/:gameId', authenticate, participationController.getGameParticipations);
router.get('/:id', authenticate, participationController.getParticipationById);
router.post('/', authenticate, participationController.startParticipation);
router.put('/:id/complete', authenticate, participationController.completeParticipation);

export default router;
