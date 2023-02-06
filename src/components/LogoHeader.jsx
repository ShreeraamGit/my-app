import React, { useContext } from 'react';
import Logo from '../assets/logo-dark.svg';
import LogoLight from '../assets/logo-light.svg';
import { DarkLightModeContext } from '../context/darkLightMode';

const LogoHeader = () => {
  const { darkMode } = useContext(DarkLightModeContext);
  return (
    <div className={`flex w-full gap-20`}>
      {darkMode ? (
        <img className="" src={LogoLight} alt="Logo" />
      ) : (
        <img className="" src={Logo} alt="Logo" />
      )}
    </div>
  );
};

export default LogoHeader;

/*bg-${
        darkMode ? '[#3E3F4E]' : 'white'
      } text-${darkMode ? 'white' : 'gray-900'}*/
