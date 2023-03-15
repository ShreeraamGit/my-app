import { createContext, useState } from 'react';

export const TaskListModalOpenContext = createContext({
  taskListModalOpen: null,
  setTaskListModalOpen: () => {},
});

export const TaskListModalProvider = ({ children }) => {
  const [taskListModalOpen, setTaskListModalOpen] = useState(false);
  const handleTaskListModalOpen = () => setTaskListModalOpen(true);
  const handleTaskListModalClose = () => setTaskListModalOpen(false);
  const value = {
    taskListModalOpen,
    handleTaskListModalClose,
    handleTaskListModalOpen,
  };
  return (
    <TaskListModalOpenContext.Provider value={value}>
      {children}
    </TaskListModalOpenContext.Provider>
  );
};
