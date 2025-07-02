import Column from './Column';
import { useBoard } from '../context/BoardContext';

export default function Board({ socket }) {
  const { board } = useBoard();

  if (!board || !board.todo || !board.inprogress || !board.done) {
    return <div className="text-center text-gray-500 mt-10">Loading board...</div>;
  }

  return (
    <div className="p-6 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Real-Time Task Board</h1>
      <div className="flex gap-6 overflow-x-auto">
        <Column title="To Do" cards={board.todo} type="todo" socket={socket} />
        <Column title="In Progress" cards={board.inprogress} type="inprogress" socket={socket} />
        <Column title="Done" cards={board.done} type="done" socket={socket} />
      </div>
    </div>
  );
}

