import { Router } from 'express';
import { validateToken } from '../auth/jwtFunctions';
import MatchesController from '../controllers/MatchesController';

const router = Router();

const matchesController = new MatchesController();

router.get('/', matchesController.getAll);
router.post('/', validateToken, matchesController.addMatch);
router.patch('/:id/finish', matchesController.patchMatch);

export default router;
