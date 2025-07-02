import { useBoard } from '../context/BoardContext';

export default function Column({ title, cards, type, socket }) {
  const { board, setBoard } = useBoard();

  const handleAddCard = () => {
    const cardTitle = prompt("Enter card title:");
    if (!cardTitle) return;

    const prevBoard = structuredClone(board);
    const updatedBoard = {
      ...board,
      [type]: [...board[type], cardTitle],
    };

    setBoard(updatedBoard);
    socket.emit("update", updatedBoard, (ack) => {
      if (!ack?.success) {
        setBoard(prevBoard);
        alert("Failed to sync. Try again.");
      }
    });
  };

  const handleEditCard = (index) => {
    const newTitle = prompt("Edit card:", board[type][index]);
    if (!newTitle || newTitle === board[type][index]) return;

    const prevBoard = structuredClone(board);
    const updatedCards = [...board[type]];
    updatedCards[index] = newTitle;

    const updatedBoard = {
      ...board,
      [type]: updatedCards,
    };

    setBoard(updatedBoard);
    socket.emit("update", updatedBoard, (ack) => {
      if (!ack?.success) {
        setBoard(prevBoard);
        alert("Update failed.");
      }
    });
  };

  const handleMoveCard = (index, from, direction) => {
    const positions = ["todo", "inprogress", "done"];
    const fromIndex = positions.indexOf(from);
    const to = positions[fromIndex + direction];
    if (!to) return;

    const prevBoard = structuredClone(board);
    const movedCard = board[from][index];
    const updatedFrom = [...board[from]];
    updatedFrom.splice(index, 1);

    const updatedTo = [...board[to], movedCard];

    const updatedBoard = {
      ...board,
      [from]: updatedFrom,
      [to]: updatedTo,
    };

    setBoard(updatedBoard);
    socket.emit("update", updatedBoard, (ack) => {
      if (!ack?.success) {
        setBoard(prevBoard);
        alert("Failed to move card.");
      }
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-80 min-w-[18rem]">
      <h2 className="font-semibold text-xl mb-4 text-gray-800">{title}</h2>

      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-blue-100 p-3 rounded mb-3 text-gray-800 cursor-pointer hover:bg-blue-200 transition"
          onClick={() => handleEditCard(index)}
        >
          <div className="flex justify-between items-center">
            <span>{card}</span>
            <div className="flex space-x-1 ml-2">
              {type !== 'todo' && (
                <button
                  className="text-sm px-2 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMoveCard(index, type, -1);
                  }}
                >
                  ←
                </button>
              )}
              {type !== 'done' && (
                <button
                  className="text-sm px-2 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMoveCard(index, type, 1);
                  }}
                >
                  →
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      <button
        className="w-full mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        onClick={handleAddCard}
      >
        + Add Card
      </button>
    </div>
  );
}
