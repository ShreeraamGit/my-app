import React, { useContext } from 'react';
import { RxDotsVertical } from 'react-icons/rx';
import { TasksManagementContext } from '../context/tasksManagementContext';

const Header = () => {
  const { title } = useContext(TasksManagementContext);

  return (
    <div className="h-[5rem] border flex justify-between items-center p-6">
      <div className="">
        <h1 className="font-bold text-[24px]">{title}</h1>
      </div>
      <div className="flex justify-center items-center gap-7">
        <button className="border p-2 rounded-full px-9 bg-[#635FC7] font-semibold text-white">
          + Add Task
        </button>
        <RxDotsVertical className="w-5 h-5" />
      </div>
    </div>
  );
};

export default Header;
