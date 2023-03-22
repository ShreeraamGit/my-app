import { createContext, useState } from 'react';

export const DarkLightModeContext = createContext({
  darkMode: null,
  setDarkMode: () => {},
  style: null,
  setStyle: () => {},
});

export const DarkLightModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [style, setStyle] = useState({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: [350, 370],
    bgcolor: darkMode ? '#2B2C37' : 'background.paper',
    boxShadow: 24,
    p: 2.5,
    borderRadius: 3,
  });

  const value = { darkMode, setDarkMode, style, setStyle };
  return (
    <DarkLightModeContext.Provider value={value}>
      {children}
    </DarkLightModeContext.Provider>
  );
};
