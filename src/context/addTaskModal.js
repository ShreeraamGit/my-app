import { createContext, useState } from 'react';

export const AddTaskModalContext = createContext({
  addTaskModalopen: false,
  setaddTaskModalOpen: () => {},
  addTaskCompletion: false,
  setAddTaskCompletion: () => {},
  updateTaskCompletion: false,
  setUpdateTaskCompletion: () => {},
});

export const AddTaskModalProvider = ({ children }) => {
  const [addTaskModalopen, setAddTaskModalOpen] = useState(false);
  const [addTaskCompletion, setAddTaskCompletion] = useState(false);
  const [updateTaskCompletion, setUpdateTaskCompletion] = useState(false);

  const handleAddTaskModalOpen = () =>
    setAddTaskModalOpen((prevState) => !prevState);
  const handleAddTaskModalClose = () =>
    setAddTaskModalOpen((prevState) => !prevState);
  const handleAddTaskCompletion = () =>
    setAddTaskCompletion((prevState) => !prevState);
  const handleUpdateTaskCompletion = () =>
    setUpdateTaskCompletion((prevState) => !prevState);

  const value = {
    addTaskModalopen,
    handleAddTaskModalClose,
    handleAddTaskModalOpen,
    handleAddTaskCompletion,
    addTaskCompletion,
    setAddTaskCompletion,
    handleUpdateTaskCompletion,
    updateTaskCompletion,
  };
  return (
    <AddTaskModalContext.Provider value={value}>
      {children}
    </AddTaskModalContext.Provider>
  );
};
