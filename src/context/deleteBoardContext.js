import { createContext } from 'react';
import { doc, deleteDoc, collection } from 'firebase/firestore';
import { db } from '../utils/firebaseClient';

export const DeleteBoardContext = createContext({});

export const DeleteBoardProvider = ({ children }) => {
  const deleteBoards = async (users, title, handleClickSnackBar) => {
    try {
      await deleteDoc(
        doc(
          db,
          'data',
          'boards',
          'users',
          `${users.uid}`,
          'boardDetails',
          `boardName - ${title.replace(/\s/g, '')}`,
        ),
      );
      handleClickSnackBar();
    } catch (error) {
      console.error(error);
      // You can also call the handleClickSnackBar function to show an error message in a snackbar or some other UI element
    }
  };

  const value = { deleteBoards };
  return (
    <DeleteBoardContext.Provider value={value}>
      {children}
    </DeleteBoardContext.Provider>
  );
};

/*const deleteBoards = async (users, title, handleClickSnackBar) => {
    try {
      await deleteDoc(
        doc(
          db,
          'data',
          'boards',
          'users',
          `${users.uid}`,
          'boardDetails',
          `boardName - ${title.replace(/\s/g, '')}`,
        ),
      );
      handleClickSnackBar();
    } catch (error) {
      console.error(error);
      // You can also call the handleClickSnackBar function to show an error message in a snackbar or some other UI element
    }
  };*/
