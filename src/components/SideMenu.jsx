import React, { useContext } from 'react';
import DarkLightModeSwitch from './DarkLightModeSwitch';
import DropDownMenu from './HideSideBar';
import LogoHeader from './LogoHeader';
import Boards from './Boards';
import { DarkLightModeContext } from '../context/darkLightMode';

const SideMenu = () => {
  const { darkMode } = useContext(DarkLightModeContext);
  return (
    <div
      className={`${
        darkMode ? 'bg-lightBlack2' : 'white'
      } w-[22%] relative h-screen p-6 hidden md:flex flex-col justify-between items-center`}
    >
      <div className="flex flex-col gap-12">
        <LogoHeader />
        <Boards />
      </div>
      <div className="flex flex-col gap-4">
        <DarkLightModeSwitch />
        <DropDownMenu menuItems={['profile', 'account']} />
      </div>
    </div>
  );
};

export default SideMenu;

/*bg-${
        darkMode ? 'lightBlack2' : 'white'
      } text-${darkMode ? 'white' : 'gray-900'}`*/
