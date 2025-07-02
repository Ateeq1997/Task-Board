import { useEffect } from "react";
import Board from "../components/Board";
import { useBoard } from "../context/BoardContext";
import useSocket from "../hooks/useSocket"; // ✅ import the hook directly

export default function Home({ initialBoard }) {
  const { setBoard } = useBoard();
  const socket = useSocket(setBoard); // ✅ call it at top-level (inside component)

  useEffect(() => {
    setBoard(initialBoard);
    fetch("/api/socket"); // make sure server starts
  }, [initialBoard, setBoard]);

  return (
    <div className="min-h-screen bg-gray-200">
      {socket.current && <Board socket={socket.current} />}
    </div>
  );
}
