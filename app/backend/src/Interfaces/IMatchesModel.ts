import { IMatches } from './IMatches';

export interface IMatchesModel {
  findAll(inProgress?: IMatches['inProgress']): Promise<IMatches[]>,
  findByPk(id: IMatches['id']): Promise<IMatches | null>,
  update(id: IMatches['id']): Promise<null | { message: string }>,
}
