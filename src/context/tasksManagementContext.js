import { createContext, useState } from 'react';

export const TasksManagementContext = createContext({
  title: null,
  setTitle: () => {},
  taskLists: null,
  setTasksLists: () => {},
});

export const TasksManagementProvider = ({ children }) => {
  const [title, setTitle] = useState(null);
  const [taskLists, setTasksLists] = useState([]);

  const value = { title, setTitle, taskLists, setTasksLists };
  return (
    <TasksManagementContext.Provider value={value}>
      {children}
    </TasksManagementContext.Provider>
  );
};
