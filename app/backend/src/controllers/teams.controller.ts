import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';
import mapStatusHTTP from '../utils/mapStatus';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) {}

  public async findAll(req: Request, res: Response) {
    const serviceResponse = await this.teamsService.findAll();
    res.status(mapStatusHTTP('OK')).json(serviceResponse.data);
  }
}
