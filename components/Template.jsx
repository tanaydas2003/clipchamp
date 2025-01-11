// Template.jsx
'use client';

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import VideoPreview from './VideoPreview';

const templatesList = [
  {
    title: 'All templates',
    imageUrl: 'https://cdn.pixabay.com/photo/2015/01/11/09/19/film-596009_1280.jpg',
  },
  {
    title: 'YouTube',
    imageUrl: 'https://cdn.pixabay.com/photo/2022/01/21/00/38/youtube-icon-6953530_1280.jpg',
  },
  {
    title: 'Instagram',
    imageUrl: 'https://cdn.pixabay.com/photo/2021/10/24/21/23/instagram-6739335_1280.jpg',
  },
  {
    title: 'Intro & outro templates',
    imageUrl: 'https://cdn.pixabay.com/photo/2021/06/29/21/20/welcome-6375274_1280.jpg',
  },
  {
    title: 'Gaming',
    imageUrl: 'https://cdn.pixabay.com/photo/2024/09/25/10/10/gamer-9073431_1280.png',
  },
  {
    title: 'Corporate templates',
    imageUrl: 'https://cdn.pixabay.com/photo/2024/06/03/05/28/ai-generated-8805518_1280.png',
  },
  {
    title: 'Facebook',
    imageUrl: 'https://cdn.pixabay.com/photo/2013/01/29/22/06/facebook-76658_1280.png',
  },
];

const Template = ({ handlePreviewDrop, handleDragOverPreview }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh', p: 2, gap: 2 }}>
      
      {/* LEFT: TEMPLATES SIDEBAR */}
      <Box
        sx={{
          flex: '0 0 250px',
          backgroundColor: '#1F1F2E',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        <Box sx={{ p: 2 }}>
          {/* Layout toggle button */}
          <Box 
            sx={{
              mt: 2,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              variant="text"
              sx={{
                color: '#fff',
                fontSize: '1.25rem',
                minWidth: 'auto',
                padding: 0,
              }}
            >
              <i className="fas fa-list" />
            </Button>
          </Box>
        </Box>

        {/* TEMPLATES LIST */}
        <Box sx={{ px: 2, pb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {templatesList.map((template, index) => (
            <Box
              key={index}
              sx={{
                position: 'relative',
                width: '100%',
                height: '100px',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              {/* Background image */}
              <img
                src={template.imageUrl}
                alt={template.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Title overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0, 0, 0, 0.3)',
                }}
              >
                <Typography
                  sx={{
                    color: '#fff',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    px: 1,
                    borderRadius: '4px',
                  }}
                >
                  {template.title}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Template;
