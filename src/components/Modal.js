
export default function Modal({ isOpen, onClose, onSave, defaultValue = '', title }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-4">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <input
          type="text"
          className="w-full border border-gray-300 p-2 rounded mb-4"
          defaultValue={defaultValue}s
          id="modal-input"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              const inputValue = document.getElementById('modal-input').value;
              onSave(inputValue);
              onClose();
            }}
            className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
