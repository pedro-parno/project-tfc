import SequelizeTeams from '../database/models/TeamsModel';
import { ITeams } from '../Interfaces/ITeams';
import { ITeamsModel } from '../Interfaces/ITeamsModel';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();

    return dbData;
  }

  async findByPk(id: number): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(id);
    // if (dbData === null) {
    //   return null;
    // }

    return dbData;
  }
}
