import { createContext } from 'react';
import { db } from '../utils/firebaseClient';
import { getDocs, collection } from 'firebase/firestore';

export const GetDataContext = createContext({});

export const GetDataProvider = ({ children }) => {
  const getTasks = async (users, title, columns) => {
    let tasks = [];
    if (columns.length > 0) {
      for (const item of columns) {
        const querySnapshot = await getDocs(
          collection(
            db,
            'data',
            'boards',
            'users',
            `${users.uid}`,
            'boardDetails',
            `boardName - ${title.replace(/\s/g, '')}`,
            'columns',
            `colName - ${item.colName.replace(/\s/g, '')}`,
            'tasks',
          ),
        );
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          tasks.push(doc.data());
        });
      }
    }
    return tasks;
  };
  const value = { getTasks };
  return (
    <GetDataContext.Provider value={value}>{children}</GetDataContext.Provider>
  );
};

/*const getTasks = async (users, title, columns) => {
    let tasks = [];
    for (const item of columns) {
      const snapshot = await collection(
        db,
        'data',
        'boards',
        'users',
        `${users.uid}`,
        'boardDetails',
        `boardName - ${title.replace(/\s/g, '')}`,
        'columns',
        `colName - ${item.colName.replace(/\s/g, '')}`,
        'tasks',
      );
      const q = query(snapshot, orderBy('createdAt', 'asc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tasks.push(doc.data());
        });
      });
    }
    return tasks;
  };*/
