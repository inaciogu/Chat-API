import { Document, model as createModel, Schema } from 'mongoose';
import { User } from '../interfaces/User';
import MongoModel from './MongoModel';

interface UserDocument extends User, Document {}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
}, {
  versionKey: false,
});

export default class UserModel extends MongoModel<User> {
  constructor(model = createModel('user', userSchema)) {
    super(model);
  }

  readByEmail(email: string) {
    return this.model.findOne({ email }).select('+password');
  }
}
