import { IMatches } from './IMatches';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>,
  findByPk(id: IMatches['id']): Promise<IMatches | null>,
}
