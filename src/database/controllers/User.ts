import { Request, Response } from 'express';
import md5 from 'md5';
import { User } from '../interfaces/User';
import UserService from '../services/User';
import 'dotenv/config';
import signToken from '../auth/JWTSign';

const secret = process.env.JWT_SECRET || '';

export default class UserController {
  private _route:string;

  constructor(protected service = new UserService(), route = '/users') {
    this._route = route;
  }

  get route() {
    return this._route;
  }

  create = async (req: Request, res: Response) => {
    try {
      const user: User = req.body;

      const userAlreadyExists = await this.service.readByEmail(user.email);

      if (userAlreadyExists) {
        return res.status(409).json({ message: 'This email is unavailable' });
      }

      const response = await this.service.create({ ...user, password: md5(user.password) });
      const token = signToken(user.email, secret);

      if (!response) {
        return res.status(500).json({ message: 'Internal server error' });
      }

      if ('error' in response) {
        return res.status(400).json(response);
      }

      return res.status(201).json({ user: response, token });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const response = await this.service.readByEmail(email);
      const token = signToken(email, secret);

      if (!response) {
        return res.status(404).json({ message: 'Theres no user with this email' });
      }

      if ('error' in response) {
        return res.status(400).json(response);
      }

      if (response.password !== md5(password)) {
        return res.status(400).json({ message: 'Wrong password' });
      }

      return res.status(200).json({ user: response, token });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  readAll = async (req: Request, res: Response) => {
    try {
      const response = await this.service.read();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  readById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const response = await this.service.readOne(id);

      if (!response) {
        return res.status(404).json({ message: 'not found' });
      }

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  readByEmail = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      const response = await this.service.readByEmail(email);

      if (!response) {
        return res.status(404).json({ message: 'not found' });
      }
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
