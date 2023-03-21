import { createContext, useState } from 'react';

export const ClickEventContext = createContext({
  event: null,
  setEvent: () => {},
});

export const ClickEventProvider = ({ children }) => {
  const [event, setEvent] = useState(null);
  const value = { event, setEvent };
  return (
    <ClickEventContext.Provider value={value}>
      {children}
    </ClickEventContext.Provider>
  );
};
