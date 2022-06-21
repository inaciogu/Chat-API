import { Document, model as createModel, Schema } from 'mongoose';
import { Message } from '../interfaces/message';
import MongoModel from './mongoModel';

interface MessageDocument extends Message, Document {}

const MessageSchema = new Schema<MessageDocument>({
  room: { type: String, required: true },
  author: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true }
}, {
  versionKey: false
});

export default class MessageModel extends MongoModel<Message> {
  constructor(model = createModel('message', MessageSchema)) {
    super(model);
  }

  roomsMessages(roomId: string) {
    return this.model.find({ room: roomId })
  }
}