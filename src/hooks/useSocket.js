import { useEffect, useRef } from "react";
import io from "socket.io-client";

export default function useSocket(setBoardState) {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io({
      path: "/api/socket",
    });

    socketRef.current.on("init", (data) => {
      console.log("🟢 Initial board data received");
      setBoardState(data);
    });

    socketRef.current.on("update", (data) => {
      console.log("🟡 Board updated from another client");
      setBoardState(data);
    });

    socketRef.current.on("disconnect", () => {
      console.warn("🔌 Disconnected from socket server");
      alert("Disconnected from server. Changes may not sync.");
    });

    socketRef.current.on("reconnect", () => {
      console.log("🔁 Reconnected to server");
      alert("Reconnected! Your changes will sync again.");
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [setBoardState]);

  return socketRef;
}
