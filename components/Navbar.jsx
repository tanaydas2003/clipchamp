import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import UploadIcon from '@mui/icons-material/Upload';
import Box from '@mui/material/Box';

const Navbar = () => {
  return (
    <AppBar position="static" color="default" sx={{ backgroundColor: '#1a1a2e', color: '#fff' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, ml: 2 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: { xs: '0.8rem', sm: '1.2rem', md: '1.5rem' }, 
              mr: 2,
            }}
          >
            DHANUR AI
          </Typography>
          <Box
            component="div"
            sx={{
              display: { xs: 'none', md: 'flex' }, 
              backgroundColor: '#2a2a3e',
              border: '1px solid #444',
              borderRadius: '5px',
              padding: { xs: '3px 10px', sm: '5px 15px', md: '5px 20px' },
              fontSize: { xs: '0.7rem', sm: '0.9rem', md: '1rem' },
            }}
          >
            <Button color="inherit" style={{ color: '#fff', fontSize: 'inherit' }}>Untitled video</Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="div"
            sx={{
              display: { xs: 'none', md: 'flex' },
              backgroundColor: '#2a2a3e',
              border: '1px solid #444',
              borderRadius: '5px',
              padding: { xs: '3px 10px', sm: '5px 15px', md: '5px 20px' },
              mr: 1,
              fontSize: { xs: '0.7rem', sm: '0.9rem', md: '1rem' },
            }}
          >
            <Button color="inherit" startIcon={<ArrowUpwardIcon />} style={{ color: '#fff', fontSize: 'inherit' }}>
              Upgrade
            </Button>
          </Box>
          <Box
            component="div"
            sx={{
              backgroundColor: '#2a2a3e',
              border: '1px solid #444',
              borderRadius: '5px',
              padding: { xs: '3px 10px', sm: '5px 15px', md: '5px 20px' },
              mr: 1,
              fontSize: { xs: '0.7rem', sm: '0.9rem', md: '1rem' },
            }}
          >
            <Button color="inherit" startIcon={<UploadIcon />} style={{ color: '#fff', fontSize: 'inherit' }}>
              Export
            </Button>
          </Box>
          <IconButton
            color="inherit"
            sx={{ display: { xs: 'none', md: 'flex' }, fontSize: { xs: 'small', sm: 'medium', md: 'large' }, mr: 1 }}
          >
            <NotificationsIcon />
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            sx={{ display: { xs: 'none', md: 'flex' }, fontSize: { xs: 'small', sm: 'medium', md: 'large' } }}
          >
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
