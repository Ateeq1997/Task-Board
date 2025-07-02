import { Server } from "socket.io";
import { getBoard, setBoard } from "../../lib/storage";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: "/api/socket",
    });

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("🔗 New client:", socket.id);
      socket.emit("init", getBoard());

      socket.on("update", (newBoard, callback) => {
        setBoard(newBoard);
        socket.broadcast.emit("update", newBoard);
        if (callback) callback({ success: true });
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
