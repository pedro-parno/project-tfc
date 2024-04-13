import SequelizeUsers from '../database/models/UsersModel';
import { IUsers } from '../Interfaces/IUsers';
import { IUsersModel } from '../Interfaces/IUsersModel';

export default class LoginModel implements IUsersModel {
  private model = SequelizeUsers;

  async login(email: IUsers['email']): Promise<IUsers | null> {
    const login = await this.model.findOne({ where: { email } });

    return login;
  }

  async getRole(email: IUsers['email']): Promise<IUsers | null> {
    const getRole = await this.model.findOne({ where: { email } });

    return getRole;
  }
}
