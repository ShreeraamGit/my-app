import { createContext, useState } from 'react';

export const ModalContext = createContext({
  open: false,
  setOpen: () => {},
});

export const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen((prevState) => !prevState);
  const handleClose = () => setOpen((prevState) => !prevState);

  const value = { open, setOpen, handleOpen, handleClose };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
