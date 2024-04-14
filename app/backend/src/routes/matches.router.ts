import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.findAll(req, res));
router.get('/:id', (req: Request, res: Response) => matchesController.findByPk(req, res));

export default router;
