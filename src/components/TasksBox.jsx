import React, { useContext, useEffect } from 'react';
import { TasksManagementContext } from '../context/tasksManagementContext';
import { LoadingContext } from '../context/loadingContext';
import { ColumnsContext } from '../context/columnContext';
import { GetDataContext } from '../context/getDataContext';
import { UsersContext } from '../context/usersContext';
import { DarkLightModeContext } from '../context/darkLightMode';
import CircularProgress from '@mui/material/CircularProgress';

const TasksBox = () => {
  const { title, taskLists, setTasksLists } = useContext(
    TasksManagementContext,
  );
  const { loading, setLoading } = useContext(LoadingContext);
  const { darkMode } = useContext(DarkLightModeContext);
  const { columns } = useContext(ColumnsContext);
  const { getTasks } = useContext(GetDataContext);
  const { users } = useContext(UsersContext);

  useEffect(() => {
    const getTasksLists = async () => {
      const recieveTasks = await getTasks(users, title, columns);
      setTasksLists(recieveTasks);
    };

    if (title && columns.length > 0) {
      getTasksLists();
    }
  }, [title, columns, taskLists]);

  return (
    <div
      className={`bg-${
        darkMode ? '[#2B2C37]' : '[#F4F7FD] '
      } w-screen h-screen p-5`}
    >
      {loading ? (
        <div className="flex h-full justify-start items-start gap-20">
          <CircularProgress />
          <h1 className="text-4xl">Loading.... Please Wait....</h1>
        </div>
      ) : (
        <div className="p-2 flex gap-7 flex-nowrap overflow-x-scroll h-[85vh] w-full">
          {title && !loading
            ? columns.map((items) => (
                <div
                  key={items.colName}
                  className="min-w-[18%] min-h-full flex flex-col gap-6 h-fit"
                >
                  <div className="flex items-center gap-5 ">
                    <div className="h-3 w-3 bg-green-500 rounded-full" />
                    <h1 className="text-[18px] tracking-[0.3rem] text-[#828FA3] font-bold">
                      {items.colName.toUpperCase()} (0)
                    </h1>
                  </div>
                  <div className="tasks-box flex flex-col gap-5">
                    {taskLists.map((item, index) =>
                      item.colToAdd === items.colName ? (
                        <button
                          key={index}
                          className="flex shadow-xl rounded-lg cursor-pointer flex-col gap-2 bg-white p-4"
                        >
                          <h1 className="font-bold text-[18px]">
                            {item.taskName}
                          </h1>
                          <span className="">
                            0 of {item.subTasks.length} Subtasks
                          </span>
                        </button>
                      ) : null,
                    )}
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

/*const getTasks = async () => {
    let tasks = [];
    if (title) {
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
          setTasksList(tasks);
        });
      }
    }
  };

  useEffect(() => {
    getData();
  }, [title]);

  useEffect(() => {
    getTasks();
  }, [title]);*/

/* console.log('tasks', taskLists);
  console.log('columns', columns);
  console.log('title', title);*/
