import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import UserModel from '../models/User';

const userModel = new UserModel();

const secret = process.env.JWT_SECRET || '';

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const user = UserModel.
  } catch (error) {
    return res.status(500).json({ message: 'Invalid or expired token' });
  }
};
