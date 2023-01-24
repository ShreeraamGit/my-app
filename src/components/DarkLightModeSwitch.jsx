import React from 'react';
import { BsMoonStarsFill } from 'react-icons/bs';
import { FiSun } from 'react-icons/fi';
import { BsToggleOn } from 'react-icons/bs';

const DarkLightModeSwitch = () => {
  return (
    <div className="flex border w-full justify-center items-center gap-8 py-3 px-7 rounded-lg bg-[#F4F7FD]">
      <FiSun className="w-[1.5rem] h-[1.5rem]" />
      <BsToggleOn className="w-[2rem] h-[2rem]" />
      <BsMoonStarsFill className="w-[1.5rem] h-[1.5rem]" />
    </div>
  );
};

export default DarkLightModeSwitch;
