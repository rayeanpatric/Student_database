import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountMenu from './AccountMenu.js';
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';


const CustomAppBar = ({ email }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ padding: '16px', display: 'flex', justifyContent: 'center' }}>
        <img src={logo} alt="Logo" style={{ height: '60px', width: '150px' }} />
      </Box>
      <List>
      <ListItemButton 
        onClick={() => navigate('/StudentInfo')}
        sx={{ 
          bgcolor: '#fff', 
          margin: '1px 0', 
          '&:hover': {
            bgcolor: '#1c8ff3',
            color: 'white',
            '.MuiListItemText-root': {
            color: 'white',
            },
          },
        }}       
        key="Page1"
        >
        <ListItemText primary={<Typography sx={{ fontWeight: 'bold' }}>Student Info</Typography>} />
      </ListItemButton>

<ListItemButton 
  sx={{ 
    bgcolor: '#fff', 
    margin: '1px 0', 
    '&:hover': {
      bgcolor: '#1c8ff3',
      color: 'white',
      '.MuiListItemText-root': {
        color: 'white',
      },
    },
  }} 
  key="Page2"
>
  <ListItemText primary={<Typography sx={{ fontWeight: 'bold' }}>Page 2</Typography>} />
</ListItemButton>
      
  <ListItemButton 
  sx={{ 
    bgcolor: '#fff', 
    margin: '1px 0', 
    '&:hover': {
      bgcolor: '#1c8ff3',
      color: 'white',
      '.MuiListItemText-root': {
        color: 'white',
      },
    },
  }} 
  key="Page3"
>
  <ListItemText primary={<Typography sx={{ fontWeight: 'bold' }}>Page 3</Typography>} />
</ListItemButton>
      
  <ListItemButton 
  sx={{ 
    bgcolor: '#fff', 
    margin: '1px 0', 
    '&:hover': {
      bgcolor: '#1c8ff3',
      color: 'white',
      '.MuiListItemText-root': {
        color: 'white',
      },
    },
  }} 
  key="Page4"
>
  <ListItemText primary={<Typography sx={{ fontWeight: 'bold' }}>Page 4</Typography>} />
</ListItemButton>

<ListItemButton 
  sx={{ 
    bgcolor: '#fff', 
    margin: '1px 0', 
    '&:hover': {
      bgcolor: '#1c8ff3',
      color: 'white',
      '.MuiListItemText-root': {
        color: 'white',
      },
    },
  }} 
  key="Page5"
>
  <ListItemText primary={<Typography sx={{ fontWeight: 'bold' }}>Page 5</Typography>} />
</ListItemButton>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ marginBottom: '65px' }}>
      <Toolbar sx={{ bgcolor:'#e2e2e2'}}>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx={{ color: 'blue' }}>
          {drawerOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src={logo} alt="Logo" style={{ height: '50px', position: 'relative',margin:'8px' }} /> 
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <AccountMenu email={email} />
        </Box>
      </Toolbar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </AppBar>
  );
}

export default CustomAppBar;