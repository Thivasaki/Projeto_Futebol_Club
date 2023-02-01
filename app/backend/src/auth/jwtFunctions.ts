import { sign } from 'jsonwebtoken';

const secret: string = process.env.JWT_SECRET || 'suaSenha';

const createToken = (user: string): string => {
  const token = sign({ data: user }, secret, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });
  return token;
};

export default createToken;
