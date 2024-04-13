import { Request, Response, Router } from 'express';
import LoginController from '../controllers/login.controller';
import loginValidation from '../middlewares/login.middleware';
import tokenValidation from '../middlewares/token.middleware';

const loginController = new LoginController();

const router = Router();

router.post('/', loginValidation, (req: Request, res: Response) => loginController.login(req, res));
router.get('/role', tokenValidation, (req: Request, res: Response) =>
  loginController.getRole(req, res));

export default router;
