import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get('/', (req: Request, res: Response) =>
  leaderboardController.getGeneralLeaderboard(req, res));
router.get('/home', (req: Request, res: Response) =>
  leaderboardController.getHomeLeaderboard(req, res));
router.get('/away', (req: Request, res: Response) =>
  leaderboardController.getAwayLeaderboard(req, res));

export default router;
