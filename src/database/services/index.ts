import { ZodError } from "zod";
import IModel from "../interfaces/Model";

export interface ServiceError {
  error: ZodError;
}

export default abstract class Service<T> {
  constructor(protected model: IModel<T>) { }

  public create = async (obj: T): Promise<T | ServiceError | null> => {
    return this.model.create(obj);
  }

  public read = async (): Promise<T[]> => {
    return this.model.read();
  }

  public readOne = async (id: string): Promise<T | ServiceError | null> => {
    return this.model.readOne(id);
  }
}