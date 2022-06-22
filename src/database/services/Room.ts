import Service from ".";
import { Room } from "../interfaces/Room";
import RoomModel from "../models/Room";

export default class RoomService extends Service<Room> {
  constructor(model = new RoomModel()) {
    super(model);
  }
}