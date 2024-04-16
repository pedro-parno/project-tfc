import SequelizeTeams from '../database/models/TeamsModel';
import SequelizeMatches from '../database/models/MatchesModel';
import { IMatches } from '../Interfaces/IMatches';
import { IMatchesModel } from '../Interfaces/IMatchesModel';

type partialMatch = Partial<IMatches>;
// type matchInput = Omit<IMatches, 'id'>;

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

  async findAll(inProgress?: IMatches['inProgress']): Promise<IMatches[]> {
    const where = inProgress !== undefined ? { where: { inProgress } } : {};

    const dbData = await this.model.findAll({
      ...where,
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return dbData;
  }

  async findByPk(id: number): Promise<IMatches | null> {
    const dbData = await this.model.findByPk(id, {
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return dbData;
  }

  async updateMatch(id: number): Promise<null | { message: 'Finished' }> {
    const [affectedCount] = await this.model.update({ inProgress: false }, { where: { id } });

    if (affectedCount === 0) return null;
    return { message: 'Finished' };
  }

  async updateGoals(id: number, goalsData: {
    homeTeamGoals: number;
    awayTeamGoals: number;
  }): Promise<IMatches | null> {
    const { homeTeamGoals, awayTeamGoals } = goalsData;
    const [affectedRow] = await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );

    if (affectedRow === 0) return null;

    const updateGoals = await this.findByPk(id);
    return updateGoals;
  }

  async create(createMatch: partialMatch): Promise<IMatches> {
  // async create(createMach: matchInput): Promise<IMatches> {
    const newData = await this.model.create({ ...createMatch, inProgress: true });

    return newData;
  }
}
