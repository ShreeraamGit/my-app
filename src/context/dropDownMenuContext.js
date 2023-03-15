import { createContext } from 'react';

export const DropDownMenuContext = createContext({});

export const DropDownMenuProvider = ({ children }) => {
  const value = {};
  return (
    <DropDownMenuContext.Provider value={value}>
      {children}
    </DropDownMenuContext.Provider>
  );
};
