import { io } from "./http";

io.on("connection", socket => {
  console.log(`user with id: ${socket.id} is online`);

  socket.on("disconnect", () => {
    console.log(`user is now disconnected`);
  })
});