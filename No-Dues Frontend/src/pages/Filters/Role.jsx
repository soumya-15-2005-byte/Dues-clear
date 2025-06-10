// Role.js
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Menu, MenuItem } from '@mui/material';

const Role = ({ menuItems, placeholder }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
    setAnchorEl(null);
  };

  return (
    <div style={{
      position: 'relative',
      display: "inline-block",
      borderRadius: '25px',
      width: '23vw',
      height: '5vh'
    }}>
      <div onClick={handleClick} style={{
        cursor: 'pointer', display: 'flex', borderRadius: '25px',
        height: '32px'
      }}>
        <input placeholder={placeholder} style={{
          width: '17vw',
          paddingLeft: '15px',
          backgroundColor: '#77889930',
          borderTopLeftRadius: '25px',
          borderBottomLeftRadius: '25px',
          borderTopRightRadius: '0px',
          borderBottomRightRadius: '0px'
        }} type="text" value={selectedItem ? selectedItem.label : ''} readOnly />
        <div style={{
          width: '5vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0259a5',
          borderTopLeftRadius: '0px',
          borderBottomLeftRadius: '0px',
          borderTopRightRadius: '25px',
          borderBottomRightRadius: '25px',
          outline: 'none',
        }}>
          <KeyboardArrowDownIcon style={{ fontSize: 'xx-large' }} />
        </div>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={() => handleMenuItemClick(item)} style={{ padding: '5px', cursor: 'pointer' }}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default Role;
