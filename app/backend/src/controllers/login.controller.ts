import { Request, Response } from 'express';
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
}
