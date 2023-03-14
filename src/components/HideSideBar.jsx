import React, { useContext } from 'react';
import { SignInUpContext } from '../context/loginContext.js';
import Avatar from '@mui/material/Avatar';
import { UsersContext } from '../context/usersContext';
import { ColumnsContext } from '../context/columnContext';
import { TasksManagementContext } from '../context/tasksManagementContext';
import { DarkLightModeContext } from '../context/darkLightMode.js';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

const DropDownMenu = ({ menuItems }) => {
  const { handleSignOut } = useContext(SignInUpContext);
  const { darkMode } = useContext(DarkLightModeContext);
  const { users, setUsers } = useContext(UsersContext);
  const { setColumns } = useContext(ColumnsContext);
  const { setTitle, setTasksLists } = useContext(TasksManagementContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          gap: '7px',
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
            <Avatar
              sx={{ width: 32, height: 32 }}
              alt={users.displayName}
              src={users.photoURL}
            />
          </IconButton>
        </Tooltip>
        <Typography variant="h6" sx={{ minWidth: 100 }}>
          {darkMode ? (
            <span className="font-normal text-white underline underline-offset-4">
              Welcome {users.displayName.split(' ')[0]}
            </span>
          ) : (
            <span className="font-normal underline underline-offset-4">
              Welcome {users.displayName.split(' ')[0]}
            </span>
          )}
        </Typography>
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
            width: 150,
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
        {menuItems.map((items) => (
          <MenuItem
            sx={{
              fontSize: '20px',
            }}
            key={items}
            onClick={handleClose}
          >
            {items.charAt(0).toUpperCase() + items.slice(1)}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem
          sx={{
            fontSize: '20px',
          }}
          onClick={() => {
            handleSignOut();
            setUsers(null);
            setTitle(null);
            setColumns(null);
            setTasksLists(null);
            handleClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default DropDownMenu;

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
