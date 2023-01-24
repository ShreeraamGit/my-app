import React from 'react';
import Avatar from '@mui/material/Avatar';
import Logo from '../assets/logo-dark.svg';

const LogoHeader = () => {
  return (
    <div className="flex w-full gap-20">
      <img className="" src={Logo} alt="Logo" />
      <div className="">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </div>
    </div>
  );
};

export default LogoHeader;
