import React, { useContext } from 'react';
import { RxDotsVertical } from 'react-icons/rx';
import { AddTaskModalContext } from '../context/addTaskModal';
import { TasksManagementContext } from '../context/tasksManagementContext';
import { DarkLightModeContext } from '../context/darkLightMode';

const Header = () => {
  const { title } = useContext(TasksManagementContext);
  const { handleAddTaskModalOpen } = useContext(AddTaskModalContext);
  const { darkMode } = useContext(DarkLightModeContext);

  return (
    <div
      className={`h-[5rem] flex justify-between items-center p-6 ${
        darkMode ? 'bg-lightBlack2' : 'bg-white'
      }`}
    >
      <div className="">
        <h1
          className={` ${
            darkMode ? 'text-white' : 'text-black'
          } font-bold text-[24px]`}
        >
          {title}
        </h1>
      </div>
      <div className="flex justify-center items-center gap-7">
        <button
          onClick={() => {
            handleAddTaskModalOpen();
          }}
          className="border p-2 rounded-full px-9 bg-[#635FC7] font-semibold text-white"
        >
          + Add Task
        </button>
        <RxDotsVertical
          className={`w-[1.8rem] h-[1.8rem] ${
            darkMode ? 'text-[#E4EBFA]' : 'text-[#3E3F4E]'
          }`}
        />
      </div>
    </div>
  );
};

export default Header;

/*bg-${
        darkMode ? '[#3E3F4E]' : 'white'
      } text-${darkMode ? 'white' : 'gray-900'}*/
