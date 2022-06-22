import { model as createModel, Document, Schema } from 'mongoose';
import { Room } from '../interfaces/Room';
import MongoModel from './MongoModel';

interface RoomDocument extends Room, Document {}

const roomSchema = new Schema<RoomDocument>({
  name: { type: String, required: true }
}, {
  versionKey: false
});

export default class RoomModel extends MongoModel<Room> {
  constructor(model = createModel('room', roomSchema)) {
    super(model);
  }
}