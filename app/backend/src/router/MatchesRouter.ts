import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const router = Router();

const matchesController = new MatchesController();

router.get('/', matchesController.getAll);
router.post('/', matchesController.addMatch);

export default router;
