import React, { useContext } from 'react';
import { RxDotsVertical } from 'react-icons/rx';
import { AddTaskModalContext } from '../context/addTaskModal';
import { TasksManagementContext } from '../context/tasksManagementContext';
import { DarkLightModeContext } from '../context/darkLightMode';
import { EditTaskContext } from '../context/editTaskContext';
import LogoMobile from '../assets/logo-mobile.svg';
import { RiArrowDropDownLine } from 'react-icons/ri';

const Header = () => {
  const { title } = useContext(TasksManagementContext);
  const { handleAddTaskModalOpen } = useContext(AddTaskModalContext);
  const { darkMode } = useContext(DarkLightModeContext);
  const { setEditTaskOpen } = useContext(EditTaskContext);

  return (
    <div
      className={`h-[5rem] flex justify-between items-center p-6 ${
        darkMode ? 'bg-lightBlack2' : 'bg-white'
      }`}
    >
      <div className="flex justify-center items-center gap-4">
        <div className="">
          <img className="block md:hidden" src={LogoMobile} alt="Logo" />
        </div>
        <h1
          className={` ${
            darkMode ? 'text-white' : 'text-black'
          } font-bold text-[15px] md:text-[24px] hidden md:block`}
        >
          {title}
        </h1>
        <button
          onClick={() => console.log('clicked')}
          className="flex justify-center items-center gap-1"
        >
          {title ? (
            <h1
              className={` ${
                darkMode ? 'text-white' : 'text-black'
              } font-bold text-[15px] md:text-[24px] block md:hidden`}
            >
              {title}
            </h1>
          ) : (
            <h1
              className={` ${
                darkMode ? 'text-white' : 'text-black'
              } font-bold text-[15px] md:text-[24px] block md:hidden`}
            >
              Boards
            </h1>
          )}
          <RiArrowDropDownLine className="w-[2.5rem] h-[2.5rem] text-[#635FC7] block md:hidden" />
        </button>
      </div>
      <div className="flex justify-center items-center gap-2 md:gap-7">
        <button
          onClick={() => {
            handleAddTaskModalOpen();
          }}
          className="p-2 rounded-full hidden md:block px-9 bg-[#635FC7] font-semibold text-white"
        >
          + Add New Task
        </button>
        <button
          onClick={() => {
            handleAddTaskModalOpen();
          }}
          className="py-2 px-2 md:hidden rounded-full flex justify-center items-center bg-[#635FC7] text-white font-extrabold text-[20px]"
        >
          +
        </button>
        <RxDotsVertical
          onClick={() => {
            setEditTaskOpen((prevState) => !prevState);
          }}
          className={`w-[1.5rem] h-[1.5rem] md:w-[1.8rem] md:h-[1.8rem] cursor-pointer ${
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
