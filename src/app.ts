import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import SocketServer from './socket';
import connectToDatabase from './database/models/connection';
import MessageRouter from './routes/Message';
import RoomRouter from './routes/Room';
import UserRouter from './routes/User';

dotenv.config();

export default class App {
  public app: express.Express;

  public serverHttp: http.Server

  public io: SocketServer

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.serverHttp = http.createServer(this.app);
    this.io = new SocketServer(this.serverHttp);
    this.startSocket();
    this.addRouter();
  }

  public start(PORT: string | number) {
    connectToDatabase();
    this.serverHttp.listen(PORT, () => console.log(`Server is running on PORT${PORT}`));
    this.app.get('/', (_req: Request, res: Response) => {
      res.send('<h1>Welcome to Chat API!</h1>');
    });
  }

  public startSocket() {
    this.io.socketConfig();
  }

  public addRouter() {
    const messageRouter = new MessageRouter();
    const roomRouter = new RoomRouter();
    const userRouter = new UserRouter();

    userRouter.addRoute();
    roomRouter.addRoute();
    messageRouter.addRoute();

    this.app.use(messageRouter.router);
    this.app.use(roomRouter.router);
    this.app.use(userRouter.router);
  }
}
