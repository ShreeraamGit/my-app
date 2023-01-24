import { createContext, useState } from 'react';

export const TasksManagementContext = createContext({
  title: null,
  setTitle: () => {},
});

export const TasksManagementProvider = ({ children }) => {
  const [title, setTitle] = useState(null);
  const value = { title, setTitle };
  return (
    <TasksManagementContext.Provider value={value}>
      {children}
    </TasksManagementContext.Provider>
  );
};
