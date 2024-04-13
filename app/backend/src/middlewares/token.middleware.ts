import { NextFunction, Request, Response } from 'express';
import jwtUtils from '../utils/jwt';

function tokenValidation(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const validToken = jwtUtils.verify(token);

  if (!validToken) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  next();
}

export default tokenValidation;
