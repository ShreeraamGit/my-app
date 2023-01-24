import { createContext, useState } from 'react';

export const ColumnsContext = createContext({
  columns: [],
  setColumns: () => {},
});

export const ColumnsProvider = ({ children }) => {
  const [columns, setColumns] = useState([]);
  const value = { columns, setColumns };
  return (
    <ColumnsContext.Provider value={value}>{children}</ColumnsContext.Provider>
  );
};
