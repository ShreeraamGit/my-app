import { createContext, useState } from 'react';

export const RandomColorsContext = createContext({
  color: null,
  setColor: () => {},
});

export const RandomColorsProvider = ({ children }) => {
  const [color, setColor] = useState(null);

  const generateRandomColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
  };

  const value = { color, setColor, generateRandomColor };
  return (
    <RandomColorsContext.Provider value={value}>
      {children}
    </RandomColorsContext.Provider>
  );
};
