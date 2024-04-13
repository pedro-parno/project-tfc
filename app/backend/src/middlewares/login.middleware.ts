import { NextFunction, Request, Response } from 'express';

function loginValidation(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (!emailRegex.test(email) || password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
}

export default loginValidation;
