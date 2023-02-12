import { createContext, useState } from 'react';

export const DarkLightModeContext = createContext({
  darkMode: null,
  setDarkMode: () => {},
  style: null,
  setStyle: () => {},
});

export const DarkLightModeProvider = ({ children }) => {
  const initialStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: [340, 500],
    bgcolor: '#FFFFFF',
    boxShadow: 24,
    p: 3,
    borderRadius: 3,
  };
  const [style, setStyle] = useState(initialStyle);
  const [darkMode, setDarkMode] = useState(false);

  const value = { darkMode, setDarkMode, style, setStyle };
  return (
    <DarkLightModeContext.Provider value={value}>
      {children}
    </DarkLightModeContext.Provider>
  );
};
