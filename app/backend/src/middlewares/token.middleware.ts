import { NextFunction, Request, Response } from 'express';
import jwtUtils from '../utils/jwt';

function tokenValidation(req: Request, res: Response, next: NextFunction) {
  function extractToken(bearerToken: string) {
    const [, token] = bearerToken.split(' ');
    return token;
  }
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = extractToken(bearerToken);

  if (!token) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  const validToken = jwtUtils.verify(token);

  if (!validToken) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  // console.log('middleware', validToken);
  // Thanks to Ronald and Elielton, know i've understand watch you were trying to show me.
  // https://stackoverflow.com/questions/71243903/accessing-middleware-injected-data-in-typescript
  // https://stackoverflow.com/questions/68704447/nest-js-pass-variable-from-middleware-to-controller
  req.body.user = validToken;

  next();
}

export default tokenValidation;
