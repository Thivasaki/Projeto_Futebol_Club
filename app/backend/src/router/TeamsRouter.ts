import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const router = Router();

const teamsController = new TeamsController();

router.get('/', teamsController.getAll);
router.get('/:id', teamsController.getById);

export default router;
