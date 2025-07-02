// src/context/BoardContext.js
import { createContext, useContext, useState } from 'react';

const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [board, setBoard] = useState({
    todo: [],
    inprogress: [],
    done: [],
  });

  return (
    <BoardContext.Provider value={{ board, setBoard }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => useContext(BoardContext);
