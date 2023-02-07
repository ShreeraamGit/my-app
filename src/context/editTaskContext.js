import { createContext, useState } from 'react';

export const EditTaskContext = createContext({
  editTaskOpen: null,
  setEditTaskOpen: () => {},
});

export const EditTaskProvider = ({ children }) => {
  const [editTaskOpen, setEditTaskOpen] = useState(null);
  const value = { editTaskOpen, setEditTaskOpen };
  return (
    <EditTaskContext.Provider value={value}>
      {children}
    </EditTaskContext.Provider>
  );
};
