import Service, { ServiceError } from '.';
import { User, UserSchema } from '../interfaces/User';
import UserModel from '../models/User';

export default class UserService {
  constructor(protected model = new UserModel()) { }

  read = async (): Promise<User[]> => this.model.read()

  readOne = async (id: string): Promise<User | ServiceError | null> => this.model.readOne(id)

  create = async (obj: User): Promise<User | ServiceError> => {
    const parsed = UserSchema.safeParse(obj);

    if (!parsed.success) return { error: parsed.error };

    return this.model.create(obj);
  }

  readByEmail = async (email: string): Promise<User | ServiceError | null> => {
    const response = this.model.readByEmail(email);
    console.log(response);
    return response;
  }
}
