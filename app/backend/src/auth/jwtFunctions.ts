import { sign } from 'jsonwebtoken';
import { IUserLogin } from '../interfaces';

const secret: string = process.env.JWT_SECRET || 'suaSenha';

const createToken = (user: IUserLogin): string => {
  const token = sign({ data: user }, secret, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });
  return token;
};

export default createToken;
