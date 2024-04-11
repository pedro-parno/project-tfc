import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';
import mapStatusHTTP from '../utils/mapStatus';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) { }

  public async findAll(req: Request, res: Response) {
    const serviceResponse = await this.teamsService.findAll();

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async findByPk(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.teamsService.findByPk(Number(id));

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
