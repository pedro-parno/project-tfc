import { Request, Response } from 'express';
import HomeLeaderboardService from '../services/homeLeaderboard.sevice';
import AwayLeaderboardService from '../services/awayLeaderboard.sevice';
import GeneralLeaderboardService from '../services/generalLeaderboard.sevice';
import mapStatusHTTP from '../utils/mapStatus';

export default class LeaderboardController {
  constructor(
    private homeLeaderboardService = new HomeLeaderboardService(),
    private awayLeaderboardService = new AwayLeaderboardService(),
    private generalLeaderboardService = new GeneralLeaderboardService(),
  ) { }

  public async getHomeLeaderboard(req: Request, res: Response) {
    const serviceResponse = await this.homeLeaderboardService.getLeaderboard();

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getAwayLeaderboard(req: Request, res: Response) {
    const serviceResponse = await this.awayLeaderboardService.getLeaderboard();

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getGeneralLeaderboard(req: Request, res: Response) {
    const serviceResponse = await this.generalLeaderboardService.getLeaderboard();

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
