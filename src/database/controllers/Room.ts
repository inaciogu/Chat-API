import { Request, Response } from 'express';
import RoomService from '../services/Room';

export default class RoomController {
  private _route:string;

  constructor(protected service = new RoomService(), route = '/rooms') {
    this._route = route;
  }

  get route() {
    return this._route;
  }

  getRooms = async (_req: Request, res: Response) => {
    try {
      const response = await this.service.read();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  getOneRoom = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const response = await this.service.readOne(id);

      return response ? res.status(200).json(response) : res.status(404).json({
        message: 'Room not found',
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
