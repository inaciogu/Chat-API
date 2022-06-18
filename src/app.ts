import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import SocketServer from './socket';

dotenv.config();


export default class App {
  public app: express.Express;
  public serverHttp: http.Server
  public io: SocketServer

  constructor() {
    this.app = express();
    this.app.use(cors())
    this.serverHttp = http.createServer(this.app);
    this.io = new SocketServer(this.serverHttp);
    this.startSocket();
  }

  public start(PORT: string | number) {
    this.serverHttp.listen(PORT, () => console.log('Server is running on PORT' + PORT))
  }

  public startSocket() {
    this.io.socketConfig();
  }
}