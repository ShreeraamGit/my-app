import React, { useContext } from 'react';
import Logo from '../assets/logo-dark.svg';

const LogoHeader = () => {
  return (
    <div className="flex w-full gap-20">
      <img className="" src={Logo} alt="Logo" />
    </div>
  );
};

export default LogoHeader;
