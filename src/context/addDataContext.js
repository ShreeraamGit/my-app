import { createContext } from 'react';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../utils/firebaseClient';

export const AddDataContext = createContext({});

export const AddDataProvider = ({ children }) => {
  const writeData = async (users) => {
    await setDoc(doc(db, 'data', 'boards'), {});
  };

  const writeUsers = async (users) => {
    const checkUserRef = doc(db, 'data', 'boards', 'users', `${users.uid}`);
    const docSnap = await getDoc(checkUserRef);

    if (docSnap.exists()) {
      //console.log('user is there');
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
        createdAt: serverTimestamp(),
      },
    );
  };

  const addColumns = async (boards, users) => {
    const columns = boards.columns.filter(
      (value) => Object.keys(value).length !== 0,
    );
    for (const item of columns) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
          createdAt: serverTimestamp(),
        },
      );
    }
  };

  const addTasks = async (columns, users, tasks, title) => {
    const subTasks = tasks.subtasks.filter(
      (value) => Object.keys(value).length !== 0,
    );
    for (const item of columns) {
      if (item.colName === tasks.status) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await setDoc(
          doc(
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
            `taskName - ${tasks.title.replace(/\s/g, '')}`,
          ),
          {
            taskName: tasks.title,
            colToAdd: item.colName,
            description: tasks.Description,
            createdAt: serverTimestamp(),
            subTasks: subTasks.map(({ title }) => ({
              title,
              isCompleted: false,
            })),
          },
        );
      }
    }
  };

  const value = {
    writeData,
    writeUsers,
    addBoards,
    addColumns,
    addTasks,
  };
  return (
    <AddDataContext.Provider value={value}>{children}</AddDataContext.Provider>
  );
};

/*const addTasks = async (columns, users, tasks, title) => {
    const subTasks = tasks.subtasks.filter(
      (value) => Object.keys(value).length !== 0,
    );
    for (const item of columns) {
      if (item.colName === tasks.status) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await setDoc(
          doc(
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
            `taskName - ${tasks.title.replace(/\s/g, '')}`,
          ),
          {
            taskName: tasks.title,
            colToAdd: item.colName,
            description: tasks.Description,
            createdAt: serverTimestamp(),
            subTasks: subTasks.map(({ title }) => ({
              title,
              isCompleted: false,
            })),
          },
        );
      }
    }
  };*/
