import { createContext, useState } from 'react';

export const AddTaskModalContext = createContext({
  addTaskModalopen: false,
  setaddTaskModalOpen: () => {},
});

export const AddTaskModalProvider = ({ children }) => {
  const [addTaskModalopen, setAddTaskModalOpen] = useState(false);

  const handleAddTaskModalOpen = () =>
    setAddTaskModalOpen((prevState) => !prevState);
  const handleAddTaskModalClose = () =>
    setAddTaskModalOpen((prevState) => !prevState);

  const value = {
    addTaskModalopen,
    handleAddTaskModalClose,
    handleAddTaskModalOpen,
  };
  return (
    <AddTaskModalContext.Provider value={value}>
      {children}
    </AddTaskModalContext.Provider>
  );
};
