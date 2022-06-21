export default interface IModel<T> {
  read: () => Promise<T[]>;
  readOne: (id: string) => Promise<T | null>;
  create: (obj: T) => Promise<T>;
}