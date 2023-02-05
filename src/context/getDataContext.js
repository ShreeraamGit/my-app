import { createContext } from 'react';
import { db } from '../utils/firebaseClient';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';

export const GetDataContext = createContext({});

export const GetDataProvider = ({ children }) => {
  const getData = async (users, title) => {
    let cols = [];
    if (title) {
      const snapshot = await collection(
        db,
        'data',
        'boards',
        'users',
        `${users.uid}`,
        'boardDetails',
        `boardName - ${title.replace(/\s/g, '')}`,
        'columns',
      );
      const q = query(snapshot, orderBy('createdAt', 'asc'));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        cols.push(doc.data());
      });
    }
    return cols;
  };

  const getTasks = async (users, title, columns) => {
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
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        tasks.push(doc.data());
      });
    }
    return tasks;
  };

  const value = { getData, getTasks };
  return (
    <GetDataContext.Provider value={value}>{children}</GetDataContext.Provider>
  );
};

/*const docRef = doc(
      db,
      'data',
      'boards',
      'users',
      `${users.uid}`,
      'boardDetails',
      'boardName - Testing',
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }*/
