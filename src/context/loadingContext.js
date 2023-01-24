import { createContext, useState } from 'react';

export const LoadingContext = createContext({
  loading: null,
  setLoading: () => {},
});

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(null);
  const value = { loading, setLoading };
  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};
