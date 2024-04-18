import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.sevice';
import mapStatusHTTP from '../utils/mapStatus';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getLeaderboard(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getLeaderboard();

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
