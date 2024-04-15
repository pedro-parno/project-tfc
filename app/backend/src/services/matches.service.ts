import { IMatches } from '../Interfaces/IMatches';
import { IMatchesModel } from '../Interfaces/IMatchesModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../models/matches.model';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) { }

  public async findAll(inProgress: boolean): Promise<ServiceResponse<IMatches[]>> {
    const dbData = await this.matchesModel.findAll(inProgress);

    return { status: 'OK', data: dbData };
  }

  public async findByPk(id: number): Promise<ServiceResponse<IMatches>> {
    const dbData = await this.matchesModel.findByPk(id);

    if (!dbData) return { status: 'NOT_FOUND', data: { message: 'Partida não encontrada' } };

    return { status: 'OK', data: dbData };
  }
}
