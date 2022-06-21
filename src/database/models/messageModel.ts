import { Document, model as createModel, Schema } from 'mongoose';
import { Message } from '../interfaces/message';

interface MessageDocument extends Message, Document {}

const MessageSchema = new Schema<MessageDocument>({
  room: { type: String, required: true },
  author: { type: String, required: true },
  message: { type: String, required: true },
  time: { type: String, required: true }
}, {
  versionKey: false
});