import { Router } from 'express';
import JWTAuth from '../database/auth/JWTAuth';
import MessageController from '../database/controllers/Message';

export default class MessageRouter {
  public router: Router

  constructor() {
    this.router = Router();
  }

  public addRoute(controller = new MessageController()) {
    this.router.get('/messages/:id', JWTAuth, controller.roomsMessages);
    this.router.post('/messages', JWTAuth, controller.newMessage);
  }
}
