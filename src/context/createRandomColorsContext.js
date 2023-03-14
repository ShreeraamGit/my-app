import { createContext, useState } from 'react';

export const RandomColorsContext = createContext({
  color: null,
  setColor: () => {},
});

export const RandomColorsProvider = ({ children }) => {
  const [color, setColor] = useState(null);

  const generateRandomColor = () => {
    // generate a random number between 0 and 16777215 (0xffffff in decimal)
    const randomColor = Math.floor(Math.random() * 16777215);
    // convert the number to a hexadecimal string
    const hexColor = randomColor.toString(16);
    // pad the string with zeros until it has six characters
    return `text-[#${hexColor.padStart(6, '0')}]`;
  };

  const value = { color, setColor, generateRandomColor };
  return (
    <RandomColorsContext.Provider value={value}>
      {children}
    </RandomColorsContext.Provider>
  );
};
