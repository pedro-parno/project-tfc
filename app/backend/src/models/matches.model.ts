import SequelizeMatches from '../database/models/MatchesModel';
import { IMatches } from '../Interfaces/IMatches';
import { IMatchesModel } from '../Interfaces/IMatchesModel';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

  async findAll(): Promise<IMatches[]> {
    const dbData = await this.model.findAll();

    return dbData;
  }

  async findByPk(id: number): Promise<IMatches | null> {
    const dbData = await this.model.findByPk(id);

    return dbData;
  }
}
