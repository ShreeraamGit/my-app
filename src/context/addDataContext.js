import { createContext, useState } from 'react';
import { doc, setDoc, getDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../utils/firebaseClient';
import { async } from '@firebase/util';

export const AddDataContext = createContext({});

export const AddDataProvider = ({ children }) => {
  const writeData = async (users) => {
    await setDoc(doc(db, 'data', 'boards'), {});
  };

  const writeUsers = async (users) => {
    const checkUserRef = doc(db, 'data', 'boards', 'users', `${users.uid}`);
    const docSnap = await getDoc(checkUserRef);

    if (docSnap.exists()) {
      console.log('user is there');
    } else {
      await setDoc(doc(db, 'data', 'boards', 'users', `${users.uid}`), {
        uid: users.uid,
        name: users.displayName,
      });
    }
  };

  const addBoards = async (boards, users) => {
    await setDoc(
      doc(
        db,
        'data',
        'boards',
        'users',
        `${users.uid}`,
        'boardDetails',
        `boardName - ${boards.title.replace(/\s/g, '')}`,
      ),
      {
        boardName: boards.title,
      },
    );
  };

  const addColumns = async (boards, users) => {
    const columns = boards.columns.filter(
      (value) => Object.keys(value).length !== 0,
    );
    for (const item of columns) {
      await setDoc(
        doc(
          db,
          'data',
          'boards',
          'users',
          `${users.uid}`,
          'boardDetails',
          `boardName - ${boards.title.replace(/\s/g, '')}`,
          'columns',
          `colName - ${item.columnName.replace(/\s/g, '')}`,
        ),
        {
          colName: item.columnName,
        },
      );
    }
  };

  const value = { writeData, writeUsers, addBoards, addColumns };
  return (
    <AddDataContext.Provider value={value}>{children}</AddDataContext.Provider>
  );
};
/*boards.map((items) => items.columns.map((item) => await setDoc(
      doc(
        db,
        'data',
        'boards',
        'users',
        `${users.uid}`,
        'boardDetails',
        `boardName - ${boards.title.replace(/\s/g, '')}`,
        "columns",
        `colName - ${item.columnName.replace(/\s/g, '')}`,
      ),
      {
        colName: item.columnName,
      },
    )))*/
