import { useState } from 'react';
import { useBoard } from '../context/BoardContext';
import Modal from './Modal';

export default function Column({ title, cards, type, socket }) {
  const { board, setBoard } = useBoard();

  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [modalTitle, setModalTitle] = useState('Add Card');
  const [defaultValue, setDefaultValue] = useState('');

  const handleSave = (value) => {
    if (!value) return;
    const updated = { ...board };

    if (editIndex !== null) {
      updated[type][editIndex] = value;
    } else {
      updated[type].push(value);
    }

    const prev = { ...board };
    setBoard(updated);
    socket.emit("update", updated, (ack) => {
      if (!ack?.success) {
        alert("Update failed");
        setBoard(prev); // rollback
      }
    });
  };

  const openAddModal = () => {
    setEditIndex(null);
    setDefaultValue('');
    setModalTitle('Add Card');
    setModalOpen(true);
  };

  const openEditModal = (index) => {
    setEditIndex(index);
    setDefaultValue(board[type][index]);
    setModalTitle('Edit Card');
    setModalOpen(true);
  };

  return (
    <div className="bg-gray-100 w-72 rounded shadow p-4 flex-shrink-0">
      <h2 className="font-bold text-lg mb-2">{title}</h2>

      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white p-3 rounded shadow mb-2 cursor-pointer"
          onClick={() => openEditModal(index)}
        >
          {card}

          <div className="flex justify-between mt-2">
            {type !== 'todo' && (
              <button
                className="text-xs text-green-600"
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
                className="text-xs text-green-600"
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
      ))}

      <button
        className="mt-2 text-sm text-blue-600 hover:underline"
        onClick={openAddModal}
      >
        + Add Card
      </button>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        defaultValue={defaultValue}
        title={modalTitle}
      />
    </div>
  );

  function handleMoveCard(index, from, direction) {
    const positions = ['todo', 'inprogress', 'done'];
    const fromIndex = positions.indexOf(from);
    const to = positions[fromIndex + direction];
    if (!to) return;

    const movedCard = board[from][index];
    const updatedFrom = [...board[from]];
    updatedFrom.splice(index, 1);
    const updatedTo = [...board[to], movedCard];

    const updatedBoard = {
      ...board,
      [from]: updatedFrom,
      [to]: updatedTo,
    };

    const prev = { ...board };
    setBoard(updatedBoard);

    socket.emit("update", updatedBoard, (ack) => {
      if (!ack?.success) {
        setBoard(prev);
        alert("Move failed!");
      }
    });
  }
}
