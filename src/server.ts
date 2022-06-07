import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';

dotenv.config();

interface IMessage {
  room: string;
  author: string;
  time: string;
  message: string;
}

const app = express();
app.use(cors());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: ["https://chat-app-inaciogu.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"],
}).listen(serverHttp);

  app.get('/', (_req, res) => res.send('hello world'));

io.on("connection", socket => {
  console.log(`user with id: ${socket.id} is online`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("user joined room");
  });

  socket.on("send_message", (data: IMessage) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log('user disconnected', socket.id);
  });
});


serverHttp.listen(process.env.PORT, () => console.log('Server is running on PORT' + process.env.PORT))