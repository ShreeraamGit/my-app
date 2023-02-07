import React, { useContext } from 'react';
import { BsMoonStarsFill } from 'react-icons/bs';
import { FiSun } from 'react-icons/fi';
import { MdToggleOn } from 'react-icons/md';
import { MdToggleOff } from 'react-icons/md';
import { DarkLightModeContext } from '../context/darkLightMode';

const DarkLightModeSwitch = () => {
  const { darkMode, setDarkMode } = useContext(DarkLightModeContext);
  return (
    <div
      className={`flex w-full justify-center items-center gap-8 py-1 px-10 rounded-lg bg-[#F4F7FD] ${
        darkMode ? 'bg-[#20212C]' : 'bg-[#F4F7FD]'
      }`}
    >
      <BsMoonStarsFill
        className={`w-[2rem] h-[2rem] ${
          darkMode ? 'text-[#E4EBFA]' : 'text-[#3E3F4E]'
        }`}
      />
      <button
        onClick={() => setDarkMode((prevState) => !prevState)}
        className=""
      >
        {darkMode ? (
          <MdToggleOff
            className={`w-[4rem] h-[4rem] text-violet-500 ${
              darkMode ? 'text-[#635FC7]' : 'text-[#3E3F4E]'
            }`}
          />
        ) : (
          <MdToggleOn
            className={`w-[4rem] h-[4rem] text-violet-500 ${
              darkMode ? 'text-[#635FC7]' : 'text-[#3E3F4E]'
            }`}
          />
        )}
      </button>
      <FiSun
        className={`w-[2rem] h-[2rem] text-gray-500 ${
          darkMode ? 'text-[#E4EBFA]' : 'text-[#3E3F4E]'
        } `}
      />
    </div>
  );
};

export default DarkLightModeSwitch;

/*      <MdToggleOff className="w-[3rem] h-[3rem] text-violet-500" />*/
