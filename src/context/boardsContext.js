import { createContext, useState } from 'react';

export const BoardsContext = createContext({
  boards: [],
  setBoards: () => {},
});

export const BoardsProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);
  const value = { boards, setBoards };
  return (
    <BoardsContext.Provider value={value}>{children}</BoardsContext.Provider>
  );
};
