import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import LoginService from '../services/login.service';
import mapStatusHTTP from '../utils/mapStatus';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) { }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const serviceResponse = await this.loginService.login(email, password);

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getRole(req: Request, res: Response) {
    const token: string | undefined = req.headers.authorization;
    if (!token || typeof token !== 'string') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decodedToken = jwt.decode(token) as jwt.JwtPayload;
    if (!decodedToken || !decodedToken.email) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { email } = decodedToken;
    const role = decodedToken?.role || '';
    const serviceResponse = await this.loginService.getRole(email, role);

    if (serviceResponse.status === 'OK' && 'role' in serviceResponse.data) {
      const roleResponse = { role: serviceResponse.data.role };
      return res.status(200).json(roleResponse);
    }
    return res.status(401).json(serviceResponse.data);
  }
}
