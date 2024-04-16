import { IMatches } from './IMatches';

type matchInput = Omit<IMatches, 'id'>;

export interface IMatchesModel {
  findAll(inProgress?: IMatches['inProgress']): Promise<IMatches[]>,
  findByPk(id: IMatches['id']): Promise<IMatches | null>,
  updateMatch(id: IMatches['id']): Promise<null | { message: string }>,
  updateGoals(id: IMatches['id'], goalsData: { homeTeamGoals: IMatches['homeTeamGoals'],
    awayTeamGoals: IMatches['awayTeamGoals'] }): Promise<IMatches | null >,
  create(createMach: matchInput): Promise<IMatches>,
}
