import { io } from "./http";

io.on("connection", socket => {
  console.log(`user with id: ${socket.id} is online`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("user joined room");
  });

  socket.on("send_message", (data) => {
    console.log(data);
  })

  socket.on("disconnect", () => {
    console.log(`user is now disconnected`);
  })
});