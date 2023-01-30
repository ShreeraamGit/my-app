import { createContext } from 'react';
import { db } from '../utils/firebaseClient';
import { doc, getDocs, collection } from 'firebase/firestore';

export const GetDataContext = createContext({});

export const GetDataProvider = ({ children }) => {
  let dataArray = [];
  const getBoards = async (users) => {
    const querySnapshot = await getDocs(
      collection(db, 'data', 'boards', 'users', `${users.uid}`, 'boardDetails'),
    );
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data();
      dataArray.push(data);
    });
    return dataArray;
  };
  const value = { getBoards };
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
