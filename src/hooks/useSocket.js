// hooks/useSocket.js
import { useEffect, useRef } from "react";
import io from "socket.io-client";

export default function useSocket(setBoardState) {
  const socketRef = useRef();

  useEffect(() => {
    // Connect to the socket
    socketRef.current = io({
      path: "/api/socket",
    });

    // Receive initial board data
    socketRef.current.on("init", (data) => {
      console.log("🟢 Initial board data received");
      setBoardState(data);
    });

    // Receive updates from other clients
    socketRef.current.on("update", (data) => {
      console.log("🟡 Board updated from another client");
      setBoardState(data);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [setBoardState]);

  return socketRef;
}
