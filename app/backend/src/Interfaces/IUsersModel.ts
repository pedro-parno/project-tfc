import { IUsers } from './IUsers';

export interface IUsersModel {
  login(email: IUsers['email'], password: IUsers['password']): Promise<IUsers | null>,
}
