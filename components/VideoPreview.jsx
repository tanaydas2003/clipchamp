'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';

const VideoPreview = () => {
  const [previewMedia, setPreviewMedia] = useState(null);

  // Handle drag over event
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  // Handle drop event
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const files = Array.from(event.dataTransfer.files);
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        setPreviewMedia(URL.createObjectURL(file));
      } else {
        alert('Please drop an image or GIF file.');
      }
    }
  };

  return (
    <Box
      sx={{
        width: '60%',
        maxWidth: '720px',
        height: '330px',
        backgroundColor: '#111',
        borderRadius: '5px',
        position: 'relative',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {previewMedia ? (
        <img
          src={previewMedia}
          alt="Preview"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : (
        <Box
          sx={{
            color: '#fff',
            textAlign: 'center',
          }}
        >
          Drag & drop an image or GIF here
        </Box>
      )}
    </Box>
  );
};

export default VideoPreview;
