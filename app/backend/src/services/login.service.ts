import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUsersModel } from '../Interfaces/IUsersModel';
import LoginModel from '../models/login.model';
import { ILogin } from '../Interfaces/ILogin';
import { IRole } from '../Interfaces/IRole';

export default class LoginService {
  constructor(
    private loginModel: IUsersModel = new LoginModel(),
    private secret: string = process.env.JWT_SECRET || 'secret',
  ) { }

  public async login(email: string, password: string): Promise<ServiceResponse<ILogin>> {
    const findUser = await this.loginModel.login(email, password);

    if (!findUser || !bcrypt.compareSync(password, findUser.password)) {
      return {
        status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' },
      };
    }

    const token = jwt.sign({ email, password }, this.secret);
    return { status: 'OK', data: { token } };
  }

  public async getUserRole(email: string, password: string): Promise<ServiceResponse<IRole>> {
    const user = await this.loginModel.login(email, password);

    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };

    return { status: 'OK', data: { role: user.role } };
  }
}
