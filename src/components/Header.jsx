import React, { useContext } from 'react';
import { AddTaskModalContext } from '../context/addTaskModal';
import { TasksManagementContext } from '../context/tasksManagementContext';
import { DarkLightModeContext } from '../context/darkLightMode';
import { MobileBoardModalContext } from '../context/mobileBoardModalContext';
import LogoMobile from '../assets/logo-mobile.svg';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { RiArrowDropUpLine } from 'react-icons/ri';
import HeaderDropDownMenu from './HeaderDropDownMenu';
import { MdAddCircle } from 'react-icons/md';

const Header = () => {
  const { title } = useContext(TasksManagementContext);
  const { handleAddTaskModalOpen } = useContext(AddTaskModalContext);
  const { darkMode } = useContext(DarkLightModeContext);
  const { boardModalOpen, handleBoardModalOpen } = useContext(
    MobileBoardModalContext,
  );

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
          } font-bold text-[12px] md:text-[18px] hidden md:block`}
        >
          {title ? title.charAt(0).toUpperCase() + title.slice(1) : null}
        </h1>
        <button
          onClick={() => handleBoardModalOpen()}
          className="flex justify-center items-center gap-1"
        >
          {title ? (
            <h1
              className={` ${
                darkMode ? 'text-white' : 'text-black'
              } font-bold text-[12px] md:text-[18px]  block md:hidden`}
            >
              {title}
            </h1>
          ) : (
            <h1
              className={` ${
                darkMode ? 'text-white' : 'text-black'
              } font-bold text-[18px] md:text-[24px] block md:hidden`}
            >
              Boards
            </h1>
          )}
          {boardModalOpen ? (
            <RiArrowDropUpLine className="w-[2.5rem] h-[2.5rem] text-[#635FC7] block md:hidden" />
          ) : (
            <RiArrowDropDownLine className="w-[2.5rem] h-[2.5rem] text-[#635FC7] block md:hidden" />
          )}
        </button>
      </div>
      <div className="flex justify-center items-center gap-1 md:gap-0">
        <button
          onClick={() => {
            handleAddTaskModalOpen();
          }}
          className="p-2 text-[12px] md:text-[12px] rounded-full hidden md:block px-5 bg-[#635FC7] font-semibold text-white"
        >
          + Add New Task
        </button>
        <MdAddCircle
          onClick={() => {
            handleAddTaskModalOpen();
          }}
          className="md:hidden h-[2rem] w-[2rem] text-[#635FC7]"
        />
        <HeaderDropDownMenu menuItems={['edit Board', 'delete Board']} />
      </div>
    </div>
  );
};

export default Header;

/*bg-${
        darkMode ? '[#3E3F4E]' : 'white'
      } text-${darkMode ? 'white' : 'gray-900'}*/
