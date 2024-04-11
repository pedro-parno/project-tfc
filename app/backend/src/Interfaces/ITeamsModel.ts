import { ITeams } from './ITeams';

export interface ITeamsModel {
  findAll(): Promise<ITeams[]>,
  findByPk(id: ITeams['id']): Promise<ITeams | null >,
}
