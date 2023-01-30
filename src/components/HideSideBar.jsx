import React, { useContext } from 'react';
import { SignInUpContext } from '../context/loginContext.js';
import Avatar from '@mui/material/Avatar';
import { UsersContext } from '../context/usersContext';

const HideSideBar = () => {
  const { handleSignOut } = useContext(SignInUpContext);
  const { users, setUsers } = useContext(UsersContext);
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={() => {
          handleSignOut();
          setUsers(null);
        }}
        className="border-2 border-black p-3 text-xl rounded-lg"
      >
        Sign out
      </button>
      <div className="">
        <Avatar alt={users.displayName} src={users.photoURL} />
      </div>
    </div>
  );
};

export default HideSideBar;
