import { Message } from "../interfaces/Message";
import MessageModel from "../models/Message";

export default class MessageService {
  constructor(protected model = new MessageModel()) { }

  roomsMessages(roomId: string) {
    return this.model.roomsMessages(roomId)
  }

  newMessage(messageItem: Message) {
    return this.model.create(messageItem);
  }
}