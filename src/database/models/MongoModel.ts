import { Model as M, Document } from 'mongoose';
import IModel from '../interfaces/Model';

abstract class MongoModel<T> implements IModel<T> {
  constructor(public model: M<T & Document>) {}

  create = async (obj: T): Promise<T> => this.model.create({ ...obj });

  read = async (): Promise<T[]> => this.model.find();

  readOne = async (id: string): Promise<T | null> => this.model.findOne({ _id: id });
}

export default MongoModel;
