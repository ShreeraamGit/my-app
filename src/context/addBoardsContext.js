import { createContext } from 'react';

export const AddBoardsContext = createContext({});

export const AddBoardsProvider = ({ children }) => {
  const addBoardsData = async (users, boards) => {};

  const readDataFirst = async (users) => {};

  const value = { readDataFirst, addBoardsData };
  return (
    <AddBoardsContext.Provider value={value}>
      {children}
    </AddBoardsContext.Provider>
  );
};

/*boards.columns.map((item) => ({ colName: item.columnName }))*/
/* boards: arrayUnion({ name: boards.title }),*/
