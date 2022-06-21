import { Request, Response } from "express";
import MessageService from "../services/Message";

export default class MessageController {
  constructor(protected service = new MessageService()) { }

  roomsMessages = async (req: Request, res: Response) => {
    const { id }  = req.params;

    const response = await this.service.roomsMessages(id);
    return res.status(200).json(response);
  }

  newMessage = async (req: Request, res: Response) => {
    const message = req.body;

    const response = await this.service.newMessage(message);
    return res.status(201).json(response);
  }
}