import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

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
    origin: "http://192.168.0.103:3000",
    methods: ["GET", "POST"],
  }
});

// app.get('/', (_req, res) => res.send('hello world'));

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


serverHttp.listen(3001, () => console.log('Server is running on PORT 3001'))