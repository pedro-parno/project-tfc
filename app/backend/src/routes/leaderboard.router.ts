import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get('/home', (req: Request, res: Response) =>
  leaderboardController.getLeaderboard(req, res));

export default router;
