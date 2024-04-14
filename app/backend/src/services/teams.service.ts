import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamsModel } from '../Interfaces/ITeamsModel';
import TeamsModel from '../models/teams.model';
import { ITeams } from '../Interfaces/ITeams';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) { }

  public async findAll(): Promise<ServiceResponse<ITeams[]>> {
    const dbData = await this.teamsModel.findAll();

    return { status: 'OK', data: dbData };
  }

  public async findByPk(id: number): Promise<ServiceResponse<ITeams>> {
    const dbData = await this.teamsModel.findByPk(id);

    if (!dbData) return { status: 'NOT_FOUND', data: { message: 'Time não encontrado' } };

    return { status: 'OK', data: dbData };
  }
}
