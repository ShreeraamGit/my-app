import React, { useContext } from 'react';
import DarkLightModeSwitch from './DarkLightModeSwitch';
import HideSideBar from './HideSideBar';
import LogoHeader from './LogoHeader';
import Boards from './Boards';
import { DarkLightModeContext } from '../context/darkLightMode';

const SideMenu = () => {
  const { darkMode } = useContext(DarkLightModeContext);
  return (
    <div
      className={`w-[23%] relative h-screen border p-6 flex flex-col justify-between items-start bg-${
        darkMode ? '[#3E3F4E]' : 'white'
      } text-${darkMode ? 'white' : 'gray-900'}`}
    >
      <div className="flex flex-col gap-16">
        <LogoHeader />
        <Boards />
      </div>
      <div className="flex flex-col gap-10">
        <DarkLightModeSwitch />
        <HideSideBar />
      </div>
    </div>
  );
};

export default SideMenu;
