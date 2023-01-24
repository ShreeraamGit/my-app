import React, { useContext } from 'react';
import { TasksManagementContext } from '../context/tasksManagementContext';
import { LoadingContext } from '../context/loadingContext';
import { BoardsContext } from '../context/boardsContext';
import CircularProgress from '@mui/material/CircularProgress';

const TasksBox = () => {
  const { title } = useContext(TasksManagementContext);
  const { loading } = useContext(LoadingContext);
  const { boards } = useContext(BoardsContext);

  return (
    <div className="bg-[#F4F7FD] w-screen h-screen p-5">
      {loading ? (
        <div className="flex h-full justify-start items-start gap-20">
          <CircularProgress />
          <h1 className="text-4xl">Loading.... Please Wait....</h1>
        </div>
      ) : (
        <div className="p-2 flex gap-7 flex-nowrap overflow-x-scroll h-[85vh] w-full">
          {boards.map((items) => {
            if (items.title === title && items.hasOwnProperty('columns')) {
              return items.columns.map((cols) => (
                <div key={cols.columnName} className="min-w-[24%] min-h-full">
                  <div className="flex items-center gap-5">
                    <div className="h-5 w-5 bg-green-500 rounded-full" />
                    <h1 className="text-[18px] tracking-[0.3rem] text-[#828FA3] font-bold">
                      {cols.columnName.toUpperCase()} (4)
                    </h1>
                  </div>
                </div>
              ));
            }
          })}
          {title ? (
            <div className="min-w-[25%] rounded-xl min-h-full flex text-[#828FA3] justify-center items-center text-[24px] font-extrabold bg-[#E4EBFA]">
              <button className="">+ New Column</button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default TasksBox;

/*  {loading ? (
        <div className="flex h-full justify-center items-center">
        <CircularProgress />
      </div>
      ) : (
        <div className="p-8 flex gap-10 border h-full">
          {boards.map((items) => {
            if (items.title === title) {
              return items.columns.map((cols) => (
                <div className="min-w-[25%] min-h-full">
                <div className="flex items-center gap-5">
                    <div className="h-5 w-5 bg-green-500 rounded-full" />
                    <h1 className="text-[18px] tracking-[0.3rem] text-[#828FA3] font-bold">
                      {cols.columnName.toUpperCase()} (4)
                    </h1>
                  </div></div>
                  
              ));
            }
          })}
        </div>
      )}*/
