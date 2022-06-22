import { Request, Response } from "express";
import MessageService from "../services/Message";

export default class MessageController {
  constructor(protected service = new MessageService()) {}

  roomsMessages = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const response = await this.service.roomsMessages(id);
      return response
        ? res.status(200).json(response)
        : res.status(404).json({
            message: "Room not found",
          });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  newMessage = async (req: Request, res: Response) => {
    try {
      const message = req.body;

      const response = await this.service.newMessage(message);

      if (!response) {
        return res.status(500).json({ message: "Internal server error" });
      }

      if ('error' in response) {
        return res.status(400).json(response);
      }
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}
