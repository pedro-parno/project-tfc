import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamsModel } from '../Interfaces/ITeamsModel';
import TeamsModel from '../models/teams.model';
import { ITeams } from '../Interfaces/ITeams';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) { }

  public async findAll(): Promise<ServiceResponse<ITeams[]>> {
    const teamsList = await this.teamsModel.findAll();
    return { status: 'OK', data: teamsList };
  }
}
