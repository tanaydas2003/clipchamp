'use client';

import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; 
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ImageIcon from '@mui/icons-material/Image';
import GifIcon from '@mui/icons-material/Gif';
import VideoPreview from './VideoPreview';

const MainContent = ({ selectedMediaType }) => {
  const [uploadedFiles, setUploadedFiles] = useState({
    image: [],
    gif: [],
  });
  const handleFileInput = (event) => {
    const files = Array.from(event.target.files);
    if (files && files.length > 0) {
      setUploadedFiles((prevFiles) => ({
        ...prevFiles,
        [selectedMediaType]: [...prevFiles[selectedMediaType], ...files],
      }));
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation(); 
    const files = Array.from(event.dataTransfer.files);
    if (files && files.length > 0) {
      setUploadedFiles((prevFiles) => ({
        ...prevFiles,
        [selectedMediaType]: [...prevFiles[selectedMediaType], ...files],
      }));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const handleImportClick = () => {
    document.getElementById('file-input').click();
  };
  let importButtonText = 'Import media';
  let acceptedFileTypes = 'video/*,audio/*,image/*';

  if (selectedMediaType === 'image') {
    importButtonText = 'Import Image';
    acceptedFileTypes = 'image/*';
  } else if (selectedMediaType === 'gif') {
    importButtonText = 'Import GIF';
    acceptedFileTypes = 'image/gif';
  }
  const dragDropBgColor = selectedMediaType === 'image' || selectedMediaType === 'gif' ? '#444' : '#262626';
  const dragDropHeight = selectedMediaType ? '500px' : 'auto';

  return (
    <Box sx={{ padding: 2, display: 'flex', flexDirection: 'row', gap: 2, height: '100vh' }}>
      
      {/* Left Side (Media Import Section) */}
      <Box
        sx={{
          flex: '0 0 250px', 
          backgroundColor: '#262626', 
          borderRadius: '10px', 
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Import Media Button */}
        <Button
          variant="contained"
          sx={{ backgroundColor: '#8033FF', textTransform: 'none', borderRadius: '8px', width: '100%' }}
          onClick={handleImportClick}
        >
          {importButtonText}
        </Button>

        {/* Hidden file input */}
        <input
          id="file-input"
          type="file"
          accept={acceptedFileTypes}
          style={{ display: 'none' }}
          onChange={handleFileInput}
          multiple
        />

        {/* Drag & Drop Area */}
        <Box
          sx={{
            flexGrow: 1,
            border: '2px dashed #444',
            borderRadius: '10px',
            padding: 3,
            color: '#fff',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            overflowY: 'auto',
            backgroundColor: dragDropBgColor,
            height: dragDropHeight,
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {uploadedFiles[selectedMediaType] && uploadedFiles[selectedMediaType].length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {uploadedFiles[selectedMediaType].map((file, index) => (
                <Box key={index}>
                  {(selectedMediaType === 'image' || selectedMediaType === 'gif') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Uploaded"
                      style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                  ) : (
                    <Typography sx={{ color: '#fff' }}>File uploaded: {file.name}</Typography>
                  )}
                </Box>
              ))}
            </Box>
          ) : (
            // Default drag & drop area content
            <>
              {/* Media Icons */}
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                <PlayArrowIcon sx={{ color: '#FF4500', fontSize: 40 }} />
                <MusicNoteIcon sx={{ color: '#FF69B4', fontSize: 40 }} />
                <ImageIcon sx={{ color: '#32CD32', fontSize: 40 }} />
              </Box>

              <Typography sx={{ color: '#fff', fontWeight: 600, textAlign: 'center' }}>
                Drag & drop media from your device to import
              </Typography>
              <Typography sx={{ color: '#aaa', textAlign: 'center' }}>Videos, audio, images, GIFs</Typography>
            </>
          )}
        </Box>
      </Box>

      {/* Right Side (Video Preview Section) */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 2,
        }}
      >
        <VideoPreview />
      </Box>
    </Box>
  );
};

export default MainContent;
