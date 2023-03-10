import { createContext, useState } from 'react';

export const SnackBarContext = createContext({
  snackbarOpen: null,
  setSnackBarOpen: () => {},
});

export const SnackBarProvider = ({ children }) => {
  const [snackbarOpen, setSnackBarOpen] = useState(null);

  const handleClickSnackBar = () => {
    setSnackBarOpen(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarOpen(false);
  };
  const value = {
    snackbarOpen,
    setSnackBarOpen,
    handleClickSnackBar,
    handleCloseSnackBar,
  };
  return (
    <SnackBarContext.Provider value={value}>
      {children}
    </SnackBarContext.Provider>
  );
};
