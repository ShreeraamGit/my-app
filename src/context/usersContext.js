import { createContext, useState } from 'react';

export const UsersContext = createContext({
  user: null,
  setUsers: () => {},
});

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const value = { users, setUsers };
  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
