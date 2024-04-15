import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import tokenValidation from '../middlewares/token.middleware';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.findAll(req, res));
router.get('/:id', tokenValidation, (req: Request, res: Response) =>
  matchesController.findByPk(req, res));
router.patch('/:id/finish', tokenValidation, (req: Request, res: Response) =>
  matchesController.update(req, res));

export default router;
