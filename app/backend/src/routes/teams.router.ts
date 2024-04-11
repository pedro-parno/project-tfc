import { Request, Response, Router } from 'express';
import TeamsController from '../controllers/teams.controller';

const teamsController = new TeamsController();

const router = Router();

router.get('/', (req: Request, res: Response) => teamsController.findAll(req, res));

export default router;
