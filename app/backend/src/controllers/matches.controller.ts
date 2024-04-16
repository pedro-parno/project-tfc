import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';
import mapStatusHTTP from '../utils/mapStatus';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    let serviceResponse;
    if (!inProgress) {
      serviceResponse = await this.matchesService.findAll();
    } else {
      serviceResponse = await this.matchesService.findAll(inProgress === 'true');
    }
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async findByPk(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchesService.findByPk(Number(id));

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchesService.updateMatch(Number(id));

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async updateGoals(req: Request, res: Response) {
    const { id } = req.params;
    const goalsData = req.body;

    const serviceResponse = await this.matchesService.updateGoals(Number(id), goalsData);

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async create(req: Request, res: Response) {
    const createMatch = req.body;

    const serviceResponse = await this.matchesService.create(createMatch);

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
