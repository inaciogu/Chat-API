import { sign } from 'jsonwebtoken';

export default function SignToken(payload: string, secret: string) {
  const token = sign({ data: payload }, secret, { expiresIn: '1h' });
  return token;
}
