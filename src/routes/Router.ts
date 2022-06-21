import { Router } from "express"
import MessageController from "../database/controllers/Message"

export default class MessageRouter {
  public router: Router

  constructor() {
    this.router = Router()
  }

  public addRoute(controller = new MessageController()) {
    this.router.get('/messages/:id', controller.roomsMessages)
  }
}