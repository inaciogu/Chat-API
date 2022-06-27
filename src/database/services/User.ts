import Service, { ServiceError } from '.';
import { User, UserSchema } from '../interfaces/User';
import UserModel from '../models/User';

export default class UserService extends Service<User> {
  constructor(model = new UserModel()) {
    super(model);
  }

  create = async (obj: User): Promise<User | ServiceError | null> => {
    const parsed = UserSchema.safeParse(obj);

    if (!parsed.success) return { error: parsed.error };

    return this.model.create(obj);
  }
}
