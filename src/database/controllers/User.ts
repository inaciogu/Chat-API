import { Request, Response } from 'express';
import UserService from '../services/User';

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
      const user = req.body;

      const response = await this.service.create(user);

      if (!response) {
        return res.status(500).json({ message: 'Internal server error' });
      }

      if ('error' in response) {
        return res.status(400).json(response);
      }

      return res.status(201).json(response);
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
}
