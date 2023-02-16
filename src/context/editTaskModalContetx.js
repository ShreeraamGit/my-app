import { createContext, useState } from 'react';

export const EditTaskModalContext = createContext({
  openEditTaskModal: false,
  setOpenEditTaskModal: () => {},
});

export const EditTaskModalProvider = ({ children }) => {
  const [openEditTaskModal, setOpenEditTaskModal] = useState(false);

  const handleOpenEditTaskModal = () =>
    setOpenEditTaskModal((prevState) => !prevState);
  const handleCloseEditTaskModal = () =>
    setOpenEditTaskModal((prevState) => !prevState);

  const value = {
    openEditTaskModal,
    setOpenEditTaskModal,
    handleCloseEditTaskModal,
    handleOpenEditTaskModal,
  };
  return (
    <EditTaskModalContext.Provider value={value}>
      {children}
    </EditTaskModalContext.Provider>
  );
};
