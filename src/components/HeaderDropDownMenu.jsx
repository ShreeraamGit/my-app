import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CustomizedSnackbars from './CustomizedSnackBar';
import { RxDotsVertical } from 'react-icons/rx';
import { EditTaskModalContext } from '../context/editTaskModalContetx';
import { DarkLightModeContext } from '../context/darkLightMode';
import { DeleteBoardContext } from '../context/deleteBoardContext';
import { UsersContext } from '../context/usersContext';
import { TasksManagementContext } from '../context/tasksManagementContext.js';
import { SnackBarContext } from '../context/customizedSnakabrContext';
import { ColumnsContext } from '../context/columnContext';

const HeaderDropDownMenu = ({ menuItems }) => {
  const { title, setTasksLists, setTitle } = useContext(TasksManagementContext);
  const { setColumns } = useContext(ColumnsContext);
  const { users } = useContext(UsersContext);
  const { handleOpenEditTaskModal } = useContext(EditTaskModalContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { darkMode } = useContext(DarkLightModeContext);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { deleteBoards } = useContext(DeleteBoardContext);
  const { handleClickSnackBar, snackbarOpen } = useContext(SnackBarContext);

  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          gap: '30px',
        }}
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <RxDotsVertical
              className={`${
                darkMode ? 'text-white' : 'text-black'
              } w-[2rem] h-[2rem] md:w-[2rem] md:h-[2rem]`}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1,
            width: 200,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          sx={{
            fontSize: '20px',
          }}
          onClick={() => {
            handleOpenEditTaskModal();
            handleClose();
          }}
        >
          Edit Board
        </MenuItem>
        <MenuItem
          sx={{
            fontSize: '20px',
          }}
          onClick={() => {
            deleteBoards(users, title, handleClickSnackBar);
            handleClose();
          }}
        >
          Delete Board
        </MenuItem>
      </Menu>
      {snackbarOpen ? (
        <CustomizedSnackbars
          message={`The Board ${title} deleted succesfully`}
        />
      ) : null}
    </React.Fragment>
  );
};

export default HeaderDropDownMenu;

/*<div className="flex justify-between items-center">
      <button
        onClick={() => {
          handleSignOut();
          setUsers(null);
        }}
        className="border-2 border-black p-3 text-xl rounded-lg"
      >
        Sign out
      </button>
      <button className="">
        <Avatar alt={users.displayName} src={users.photoURL} />
      </button>
    </div>*/

/*<MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Hide SideBar</MenuItem>
        <MenuItem
          onClick={() => {
            handleSignOut();
            setUsers(null);
            handleClose();
          }}
        >
          Logout
        </MenuItem>*/
