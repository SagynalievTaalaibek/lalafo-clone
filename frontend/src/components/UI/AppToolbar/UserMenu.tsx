import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@mui/material';
import { User } from '../../../types';
interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  /* const dispatch = useAppDispatch();*/
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <Button color="inherit" onClick={handleClick}>
        Hello, {user.displayName}!
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem onClick={() => navigate('/add-new-item')}>
          Add new item
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
