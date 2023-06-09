import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/', leaderboardController.leaderboardAll);
router.get('/home', leaderboardController.leaderboardHome);
router.get('/away', leaderboardController.leaderboardAway);

export default router;
