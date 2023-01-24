import React from 'react';
import DarkLightModeSwitch from './DarkLightModeSwitch';
import HideSideBar from './HideSideBar';
import LogoHeader from './LogoHeader';
import Boards from './Boards';

const SideMenu = () => {
  return (
    <div className="w-[25%] h-screen border p-6 flex flex-col justify-between items-start">
      <div className="flex flex-col gap-16">
        <LogoHeader />
        <Boards />
      </div>
      <div className="">
        <DarkLightModeSwitch />
        <HideSideBar />
      </div>
    </div>
  );
};

export default SideMenu;
