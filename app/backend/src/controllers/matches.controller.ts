import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';
import mapStatusHTTP from '../utils/mapStatus';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async findAll(req: Request, res: Response) {
    const serviceResponse = await this.matchesService.findAll();

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async findByPk(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchesService.findByPk(Number(id));

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
