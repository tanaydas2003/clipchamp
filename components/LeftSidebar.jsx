'use client';

import React from 'react';
import { Box, List, ListItem, ListItemIcon, Typography } from '@mui/material';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ImageIcon from '@mui/icons-material/Image';
import GifIcon from '@mui/icons-material/Gif';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';

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
        
        {/* Your media */}
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

        {/* Filter */}
        <ListItem
          button
          onClick={() => handleItemClick('filter')}
          sx={listItemStyles('filter')}
        >
          <ListItemIcon sx={iconStyles}>
            <FolderOpenIcon />
          </ListItemIcon>
          <Typography variant="caption" sx={textStyles}>Filter</Typography>
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
