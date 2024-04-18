import { Request, Response } from 'express';
import HomeLeaderboardService from '../services/homeLeaderboard.sevice';
import AwayLeaderboardService from '../services/awayLeaderboard.sevice';
import mapStatusHTTP from '../utils/mapStatus';

export default class LeaderboardController {
  constructor(
    private homeleaderboardService = new HomeLeaderboardService(),
    private awayleaderboardService = new AwayLeaderboardService(),
  ) { }

  public async getHomeLeaderboard(req: Request, res: Response) {
    const serviceResponse = await this.homeleaderboardService.getLeaderboard();

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getAwayLeaderboard(req: Request, res: Response) {
    const serviceResponse = await this.awayleaderboardService.getLeaderboard();

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
