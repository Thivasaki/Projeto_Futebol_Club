import { sign, verify, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUserLogin } from '../interfaces';

const secret: string = process.env.JWT_SECRET || 'suaSenha';

export interface CustomRequest extends Request {
  payload: string | JwtPayload;
}

export const createToken = (user: IUserLogin, role: string): string => {
  const data = {
    email: user.email,
    role,
  };
  const token = sign({ data }, secret, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });
  return token;
};

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = await verify(token, secret);
    (req as CustomRequest).payload = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};
