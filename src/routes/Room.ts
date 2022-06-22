import { Router } from "express"
import RoomController from "../database/controllers/Room"

export default class MessageRouter {
  public router: Router

  constructor() {
    this.router = Router()
  }

  public addRoute(controller = new RoomController(), route = controller.route) {
    this.router.get(`${route}/:id`, controller.getOneRoom);
    this.router.get(route, controller.getRooms);
  }
}