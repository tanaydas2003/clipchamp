'use client';

import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // For video
import MusicNoteIcon from '@mui/icons-material/MusicNote'; // For music
import ImageIcon from '@mui/icons-material/Image'; // For images
import GifIcon from '@mui/icons-material/Gif'; // For GIFs
import VideoPreview from './VideoPreview'; // Importing the VideoPreview component

const MainContent = ({ selectedMediaType }) => {
  const [uploadedFiles, setUploadedFiles] = useState({
    image: [],
    gif: [],
    media: [], 
  });
  const [previewFile, setPreviewFile] = useState(null);
  const [draggedFile, setDraggedFile] = useState(null); 
  const acceptedTypes = {
    media: ['video/*'],
    image: ['image/*'],
    gif: ['image/gif'],
  };

  const handleFileInput = (event) => {
    let files = Array.from(event.target.files);

    // Filter files based on selectedMediaType
    const accepted = acceptedTypes[selectedMediaType] || [];
    files = files.filter((file) =>
      accepted.some((type) => file.type.match(type))
    );

    if (files && files.length > 0) {
      setUploadedFiles((prevFiles) => ({
        ...prevFiles,
        [selectedMediaType]: [
          ...(prevFiles[selectedMediaType] || []),
          ...files,
        ],
      }));
    }
  };

  // Function to handle file drag over preview area
  const handlePreviewDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (draggedFile) {
      setPreviewFile(draggedFile);
      setDraggedFile(null); 
    }
  };

  const handleDragOverPreview = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  // Function to handle drag start in import section
  const handleDragStart = (file) => {
    setDraggedFile(file);
  };

  // Function to handle drag and drop in import section
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let files = Array.from(event.dataTransfer.files);

    // Filter files based on selectedMediaType
    const accepted = acceptedTypes[selectedMediaType] || [];
    files = files.filter((file) =>
      accepted.some((type) => file.type.match(type))
    );

    if (files && files.length > 0) {
      setUploadedFiles((prevFiles) => ({
        ...prevFiles,
        [selectedMediaType]: [
          ...(prevFiles[selectedMediaType] || []),
          ...files,
        ],
      }));
    }
  };

  const handleDragOverImport = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  // Function to handle import button click
  const handleImportClick = () => {
    document.getElementById('file-input').click();
  };

  // Determine the import button text and accepted file types based on selectedMediaType
  let importButtonText = 'Import Media';
  let acceptedFileTypes = 'video/*';

  if (selectedMediaType === 'image') {
    importButtonText = 'Import Image';
    acceptedFileTypes = 'image/*';
  } else if (selectedMediaType === 'gif') {
    importButtonText = 'Import GIF';
    acceptedFileTypes = 'image/gif';
  }

  // Determine the backgroundColor and height for drag and drop area
  const dragDropBgColor =
    selectedMediaType === 'image' || selectedMediaType === 'gif' ? '#444' : '#262626';
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
          onDragOver={handleDragOverImport}
        >
          {uploadedFiles[selectedMediaType] && uploadedFiles[selectedMediaType].length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {uploadedFiles[selectedMediaType].map((file, index) => (
                <Box
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(file)}
                >
                  {(selectedMediaType === 'image' || selectedMediaType === 'gif') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Uploaded"
                      style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                  ) : selectedMediaType === 'media' && file.type.startsWith('video/') ? (
                    <video
                      src={URL.createObjectURL(file)}
                      muted 
                      style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                  ) : (
                    <Typography sx={{ color: '#fff' }}>File uploaded: {file.name}</Typography>
                  )}
                </Box>
              ))}
            </Box>
          ) : (
            <>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                {selectedMediaType === 'media' && (
                  <PlayArrowIcon sx={{ color: '#FF4500', fontSize: 40 }} />
                )}
                {selectedMediaType === 'image' && (
                  <ImageIcon sx={{ color: '#32CD32', fontSize: 40 }} />
                )}
                {selectedMediaType === 'gif' && (
                  <GifIcon sx={{ color: '#FFD700', fontSize: 40 }} />
                )}
              </Box>
              <Typography sx={{ color: '#fff', fontWeight: 600, textAlign: 'center' }}>
                Drag & drop or import {selectedMediaType}
              </Typography>
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
          border: '2px dashed #444', 
          borderRadius: '10px',
        }}
        onDrop={handlePreviewDrop}
        onDragOver={handleDragOverPreview}
      >
        <VideoPreview previewFile={previewFile} />
      </Box>
    </Box>
  );
};

export default MainContent;
