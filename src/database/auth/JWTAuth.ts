import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import UserModel from '../models/User';
import { User } from '../interfaces/User';

const userModel = new UserModel();

const secret = process.env.JWT_SECRET || '';

interface TokenPayload {
  data: {
    name: string;
    username: string;
    email: string;
  };
}

interface CustomRequest extends Request {
  user?: User;
}

export default async (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret) as TokenPayload;

    const user = await userModel.readByEmail(decoded.data.email);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
