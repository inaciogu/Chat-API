import { Router } from 'express';
import UserController from '../database/controllers/User';

export default class UserRouter {
  public router: Router

  constructor() {
    this.router = Router();
  }

  public addRoute(controller = new UserController(), route = controller.route) {
    this.router.post(route, controller.create);
    this.router.get(`${route}/:id`, controller.readById);
    this.router.get(route, controller.readAll);
  }
}
