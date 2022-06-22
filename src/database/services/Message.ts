import { Message, MessageSchema } from "../interfaces/Message";
import MessageModel from "../models/Message";

export default class MessageService {
  constructor(protected model = new MessageModel()) { }

  roomsMessages(roomId: string) {
    return this.model.roomsMessages(roomId)
  }

  newMessage(messageItem: Message) {
    const parsed = MessageSchema.safeParse(messageItem);

    if (!parsed.success) return { error: parsed.error }

    return this.model.create(messageItem);
  }
}