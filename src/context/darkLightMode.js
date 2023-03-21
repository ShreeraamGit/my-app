import { createContext, useState } from 'react';

export const DarkLightModeContext = createContext({
  darkMode: null,
  setDarkMode: () => {},
});

export const DarkLightModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const value = { darkMode, setDarkMode };
  return (
    <DarkLightModeContext.Provider value={value}>
      {children}
    </DarkLightModeContext.Provider>
  );
};
