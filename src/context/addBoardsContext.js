import { createContext, useState } from 'react';
import { db } from '../utils/firebaseClient';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from 'firebase/firestore';

export const AddBoardsContext = createContext({});

export const AddBoardsProvider = ({ children }) => {
  const addBoardsData = async (users, boards) => {};

  const readDataFirst = async (users) => {};

  const value = { readDataFirst, addBoardsData };
  return (
    <AddBoardsContext.Provider value={value}>
      {children}
    </AddBoardsContext.Provider>
  );
};

/*boards.columns.map((item) => ({ colName: item.columnName }))*/
/* boards: arrayUnion({ name: boards.title }),*/
