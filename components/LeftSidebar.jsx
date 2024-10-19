'use client';

import React from 'react';
import { Box, List, ListItem, ListItemIcon, Typography } from '@mui/material';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'; // Your media
import ImageIcon from '@mui/icons-material/Image'; // Image Upload
import GifIcon from '@mui/icons-material/Gif'; // GIF Upload
import CameraAltIcon from '@mui/icons-material/CameraAlt'; // Record & Create
import FolderOpenIcon from '@mui/icons-material/FolderOpen'; // Content Library
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark'; // Templates
import TextFieldsIcon from '@mui/icons-material/TextFields'; // Text
import MovieFilterIcon from '@mui/icons-material/MovieFilter'; // Transitions

const LeftSidebar = ({ selectedMediaType, setSelectedMediaType }) => {
  const handleItemClick = (mediaType) => {
    setSelectedMediaType(mediaType);
  };

  const selectedBgColor = '#444'; 

  const listItemStyles = (mediaType) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    backgroundColor: selectedMediaType === mediaType ? selectedBgColor : 'transparent',
    height: selectedMediaType === mediaType ? '80px' : '70px', 
    transition: 'height 0.2s, background-color 0.2s',
    borderRadius: '10px', 
  });

  const iconStyles = {
    justifyContent: 'center',
    color: '#fff',
    minWidth: 'auto',
  };

  const textStyles = {
    textAlign: 'center',
    fontSize: '0.75rem',
    color: '#fff',
    marginTop: '5px',
  };

  return (
    <Box sx={{ backgroundColor: '#34344a', width: '80px', height: '100vh', paddingTop: '20px', color: '#fff' }}>
      <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <ListItem
          button
          onClick={() => handleItemClick('media')}
          sx={listItemStyles('media')}
        >
          <ListItemIcon sx={iconStyles}>
            <VideoLibraryIcon />
          </ListItemIcon>
          <Typography variant="caption" sx={textStyles}>Your media</Typography>
        </ListItem>

        {/* Image Upload */}
        <ListItem
          button
          onClick={() => handleItemClick('image')}
          sx={listItemStyles('image')}
        >
          <ListItemIcon sx={iconStyles}>
            <ImageIcon />
          </ListItemIcon>
          <Typography variant="caption" sx={textStyles}>Image upload</Typography>
        </ListItem>

        {/* GIF Upload */}
        <ListItem
          button
          onClick={() => handleItemClick('gif')}
          sx={listItemStyles('gif')}
        >
          <ListItemIcon sx={iconStyles}>
            <GifIcon />
          </ListItemIcon>
          <Typography variant="caption" sx={textStyles}>GIF upload</Typography>
        </ListItem>

        {/* Record & Create */}
        <ListItem
          button
          onClick={() => handleItemClick('record')}
          sx={listItemStyles('record')}
        >
          <ListItemIcon sx={iconStyles}>
            <CameraAltIcon />
          </ListItemIcon>
          <Typography variant="caption" sx={textStyles}>Record & create</Typography>
        </ListItem>

        {/* Content Library */}
        <ListItem
          button
          onClick={() => handleItemClick('content')}
          sx={listItemStyles('content')}
        >
          <ListItemIcon sx={iconStyles}>
            <FolderOpenIcon />
          </ListItemIcon>
          <Typography variant="caption" sx={textStyles}>Content library</Typography>
        </ListItem>

        {/* Templates */}
        <ListItem
          button
          onClick={() => handleItemClick('templates')}
          sx={listItemStyles('templates')}
        >
          <ListItemIcon sx={iconStyles}>
            <CollectionsBookmarkIcon />
          </ListItemIcon>
          <Typography variant="caption" sx={textStyles}>Templates</Typography>
        </ListItem>

        {/* Text */}
        <ListItem
          button
          onClick={() => handleItemClick('text')}
          sx={listItemStyles('text')}
        >
          <ListItemIcon sx={iconStyles}>
            <TextFieldsIcon />
          </ListItemIcon>
          <Typography variant="caption" sx={textStyles}>Text</Typography>
        </ListItem>

        {/* Transitions */}
        <ListItem
          button
          onClick={() => handleItemClick('transitions')}
          sx={listItemStyles('transitions')}
        >
          <ListItemIcon sx={iconStyles}>
            <MovieFilterIcon />
          </ListItemIcon>
          <Typography variant="caption" sx={textStyles}>Transitions</Typography>
        </ListItem>
      </List>
    </Box>
  );
};

export default LeftSidebar;
