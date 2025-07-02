let boardData = {
  todo: ['Task 1', 'Task 2'],
  inprogress: ['Task 3'],
  done: ['Task 4'],
};

export function getBoard() {
  return boardData;
}

export function setBoard(newBoard) {
  boardData = newBoard;
}
