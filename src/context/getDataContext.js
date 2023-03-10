import { createContext } from 'react';
import { db } from '../utils/firebaseClient';
import { getDocs, collection, orderBy, query } from 'firebase/firestore';

export const GetDataContext = createContext({});

export const GetDataProvider = ({ children }) => {
  const getColumns = async (users, title) => {
    let columns = [];
    const columnsRef = collection(
      db,
      'data',
      'boards',
      'users',
      `${users.uid}`,
      'boardDetails',
      `boardName - ${title.replace(/\s/g, '')}`,
      'columns',
    );
    const q = query(columnsRef, orderBy('createdAt', 'asc'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      columns.push(doc.data());
    });
    return columns;
  };

  const getTasks = async (users, title, columns) => {
    let tasks = [];
    if (columns.length > 0) {
      for (const item of columns) {
        const tasksRef = collection(
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
        const q = query(tasksRef, orderBy('createdAt', 'asc'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          tasks.push(doc.data());
        });
      }
    }
    return tasks;
  };
  const value = { getTasks, getColumns };
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
