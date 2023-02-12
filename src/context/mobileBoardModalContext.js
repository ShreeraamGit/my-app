import { createContext, useState } from 'react';

export const MobileBoardModalContext = createContext({
  boardModalOpen: null,
  setBoardModalOpen: () => {},
});

export const MobileBoardModalProvider = ({ children }) => {
  const [boardModalOpen, setBoardModalOpen] = useState(false);

  const handleBoardModalOpen = () =>
    setBoardModalOpen((prevState) => !prevState);
  const handleBoardModalClose = () =>
    setBoardModalOpen((prevState) => !prevState);

  const value = {
    boardModalOpen,
    setBoardModalOpen,
    handleBoardModalClose,
    handleBoardModalOpen,
  };
  return (
    <MobileBoardModalContext.Provider value={value}>
      {children}
    </MobileBoardModalContext.Provider>
  );
};
