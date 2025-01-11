'use client';

import React, { useState } from 'react';
import { Box, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ImageIcon from '@mui/icons-material/Image';
import GifIcon from '@mui/icons-material/Gif';
import VideoPreview from './VideoPreview';
import Template from './Template'; 
import TextComponent from './TextComponent';

const MainContent = ({ selectedMediaType }) => {
  const [uploadedFiles, setUploadedFiles] = useState({
    image: [],
    gif: [],
    media: [],
  });

  const [previewFile, setPreviewFile] = useState(null);
  const [draggedFile, setDraggedFile] = useState(null);
  const [videoFilter, setVideoFilter] = useState('none'); 
  const acceptedTypes = {
    media: ['video/*'],
    image: ['image/*'],
    gif: ['image/gif'],
  };

  const handleFileInput = (event) => {
    let files = Array.from(event.target.files);
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

  // Drag & drop (left side) to import
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let files = Array.from(event.dataTransfer.files);

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

  // Drag & drop onto the preview
  const handleDragStart = (file) => {
    setDraggedFile(file);
  };

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

  const handleImportClick = () => {
    document.getElementById('file-input').click();
  };

  let importButtonText = 'Import Media';
  let acceptedFileTypes = 'video/*';
  if (selectedMediaType === 'image') {
    importButtonText = 'Import Image';
    acceptedFileTypes = 'image/*';
  } else if (selectedMediaType === 'gif') {
    importButtonText = 'Import GIF';
    acceptedFileTypes = 'image/gif';
  }
  const dragDropBgColor =
    selectedMediaType === 'image' || selectedMediaType === 'gif' ? '#444' : '#262626';
  const dragDropHeight = selectedMediaType ? '500px' : 'auto';
  if (selectedMediaType === 'templates') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, height: '100vh', p: 2 }}>
        {/* LEFT: Template Options */}
        <Template 
          handlePreviewDrop={handlePreviewDrop} 
          handleDragOverPreview={handleDragOverPreview} 
        />

        {/* RIGHT: Video Preview */}
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
  } else if (selectedMediaType === 'filter') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, height: '100vh', p: 2 }}>
        
        <Box
          sx={{
            flex: '0 0 250px',
            backgroundColor: '#262626',
            borderRadius: '10px',
            padding: 2,
            color: '#fff',
          }}
        >
          <Typography variant="h6" textAlign="center" marginBottom={2}>
            Choose a Filter
          </Typography>
          <FormControl fullWidth variant="outlined" sx={{ color: '#fff' }}>
            <InputLabel sx={{ color: '#fff' }}>Filter</InputLabel>
            <Select
              label="Filter"
              value={videoFilter}
              onChange={(e) => setVideoFilter(e.target.value)}
              sx={{
                color: '#fff',
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: '#fff',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#fff',
                },
                '.MuiSvgIcon-root': {
                  color: '#fff',
                },
              }}
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="grayscale(100%)">Grayscale</MenuItem>
              <MenuItem value="sepia(100%)">Sepia</MenuItem>
              <MenuItem value="contrast(150%)">High Contrast</MenuItem>
            </Select>
          </FormControl>
        </Box>

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
          <VideoPreview previewFile={previewFile} videoFilter={videoFilter} />
        </Box>
      </Box>
    );
  } 
  else if (selectedMediaType === 'text') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, height: '100vh', p: 2 }}>
        <TextComponent />

        {/* RIGHT: Video Preview */}
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
  }
  else {
    return (
      <Box sx={{ padding: 2, display: 'flex', flexDirection: 'row', gap: 2, height: '100vh' }}>
        
        {/* LEFT: IMPORT / DRAG-AND-DROP */}
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
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#8033FF',
              textTransform: 'none',
              borderRadius: '8px',
              width: '100%',
            }}
            onClick={handleImportClick}
          >
            {importButtonText}
          </Button>

          <input
            id="file-input"
            type="file"
            accept={acceptedFileTypes}
            style={{ display: 'none' }}
            onChange={handleFileInput}
            multiple
          />
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
                      <Typography sx={{ color: '#fff' }}>
                        File uploaded: {file.name}
                      </Typography>
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
                <Typography
                  sx={{ color: '#fff', fontWeight: 600, textAlign: 'center' }}
                >
                  Drag & drop or import {selectedMediaType}
                </Typography>
              </>
            )}
          </Box>
        </Box>

        {/* RIGHT: VIDEO PREVIEW */}
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
          <VideoPreview previewFile={previewFile} videoFilter="none" />
        </Box>
      </Box>
    );
  }
};

export default MainContent;
