import { io } from "./http";

interface IMessage {
  room: string;
  username: string;
  author: string;
  time: string;
  message: string;
}

io.on("connection", socket => {
  console.log(`user with id: ${socket.id} is online`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("user joined room");
  });

  socket.on("send_message", (data: IMessage) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  })

  socket.on("disconnect", () => {
    console.log(`user is now disconnected`);
  })
});