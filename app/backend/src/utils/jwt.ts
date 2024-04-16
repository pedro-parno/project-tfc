import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

type TokenPayload = {
  email: string,
  password: string,
  role?: string,
};

function sign(payload: TokenPayload): string {
  const token = jwt.sign(payload, secret);
  return token;
}

function verify(token: string): TokenPayload | null {
  try {
    const data = jwt.verify(token, secret) as TokenPayload;
    return data;
  } catch (error) {
    return null;
  }
}

export default {
  sign,
  verify,
};
