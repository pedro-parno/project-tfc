import { IMatches } from '../Interfaces/IMatches';
import { IMatchesModel } from '../Interfaces/IMatchesModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../models/matches.model';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) { }

  public async findAll(inProgress?: boolean): Promise<ServiceResponse<IMatches[]>> {
    const dbData = await this.matchesModel.findAll(inProgress);

    return { status: 'OK', data: dbData };
  }

  public async findByPk(id: number): Promise<ServiceResponse<IMatches>> {
    const dbData = await this.matchesModel.findByPk(id);

    if (!dbData) return { status: 'NOT_FOUND', data: { message: 'Partida não encontrada' } };

    return { status: 'OK', data: dbData };
  }

  public async updateMatch(id: number): Promise<ServiceResponse<{ message: string }>> {
    const dbData = await this.matchesModel.updateMatch(id);

    if (!dbData) {
      return { status: 'NOT_FOUND', data: { message: 'Partida não encontrada ou finalizada' } };
    }

    return { status: 'OK', data: dbData };
  }

  public async updateGoals(id: number, goalsData: { homeTeamGoals: number;
    awayTeamGoals: number }): Promise<ServiceResponse<IMatches>> {
    const dbData = await this.matchesModel.updateGoals(id, goalsData);

    if (!dbData) {
      return { status: 'NOT_FOUND', data: { message: 'Partida não encontrada ou finalizada' } };
    }

    return { status: 'OK', data: dbData };
  }
}
