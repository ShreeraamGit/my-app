import React, { useContext, useEffect, useState } from 'react';
import { TasksManagementContext } from '../context/tasksManagementContext';
import { LoadingContext } from '../context/loadingContext';
import { UsersContext } from '../context/usersContext';
import { ColumnsContext } from '../context/columnContext';
import CircularProgress from '@mui/material/CircularProgress';
import { db } from '../utils/firebaseClient';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

const TasksBox = () => {
  const { title } = useContext(TasksManagementContext);
  const { loading } = useContext(LoadingContext);
  const { users } = useContext(UsersContext);
  const { columns, setColumns } = useContext(ColumnsContext);

  const getData = async () => {
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
        setColumns(cols);
      });
    }
  };

  useEffect(() => {
    getData();
  }, [title]);

  return (
    <div className="bg-[#F4F7FD] w-screen h-screen p-5">
      {loading ? (
        <div className="flex h-full justify-start items-start gap-20">
          <CircularProgress />
          <h1 className="text-4xl">Loading.... Please Wait....</h1>
        </div>
      ) : (
        <div className="p-2 flex gap-7 flex-nowrap overflow-x-scroll h-[85vh] w-full">
          {title && !loading
            ? columns.map((items) => (
                <div key={items.colName} className="min-w-[24%] min-h-full">
                  <div className="flex items-center gap-5">
                    <div className="h-5 w-5 bg-green-500 rounded-full" />
                    <h1 className="text-[18px] tracking-[0.3rem] text-[#828FA3] font-bold">
                      {items.colName.toUpperCase()} (0)
                    </h1>
                  </div>
                </div>
              ))
            : null}
          <div className="min-w-[25%] rounded-xl min-h-full flex text-[#828FA3] justify-center items-center text-[24px] font-extrabold bg-[#E4EBFA]">
            <button className="">+ New Column</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksBox;

/*
  const getData = async () => {
    let cols = [];
    if (title) {
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
        ),
        orderBy('createdAt'),
      );
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        cols.push(doc.data());
        setColumns(cols);
      });
    }
  };*/
