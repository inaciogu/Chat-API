import { Server } from 'socket.io';
import http from 'http';

interface IMessage {
  room: string;
  author: string;
  time: string;
  message: string;
}

export default class SocketServer {
  public ioServer: Server;

  constructor(public httpServer: http.Server) {
    this.ioServer = new Server(this.httpServer, {
      cors: {
        origin: ['https://chat-app-inaciogu.vercel.app', 'http://localhost:3000'],
        methods: ['GET', 'POST'],
      },
      transports: ['websocket', 'polling'],
    });
  }

  public socketConfig() {
    this.ioServer.on('connection', (socket) => {
      console.log(`user with id: ${socket.id} is online`);

      socket.on('join_room', (data: string) => {
        socket.join(data);
      });

      socket.on('send_message', (data: IMessage) => {
        socket.to(data.room).emit('receive_message', data);
      });

      socket.on('change_room', (oldRoom: string, newRoom: string) => {
        socket.leave(oldRoom);
        socket.join(newRoom);
      });

      socket.on('disconnect', () => {
        console.log(`user ${socket.id} was disconnected`);
      });
    });
  }
}
