'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

const TextComponent = () => {
  const textPresets = [
    {
      category: 'Plain text',
      items: [
        { label: 'Text', bgColor: '#000000' },
      ],
    },
    {
      category: 'Recently used',
      items: [
        { label: 'Fireworks', bgColor: '#000000' },
      ],
    },
    {
      category: 'Title',
      items: [
        { label: 'Typewrl', bgColor: '#000000' },
        { label: 'Circular', bgColor: '#4285f4' },
        { label: 'GROOVY', bgColor: '#000000' },
        { label: 'Fireworks', bgColor: '#000000' },
        { label: 'Smoke', bgColor: '#000000' },
        { label: 'Fade', bgColor: '#000000' },
        { label: 'Clean Title', bgColor: '#000000' },
        { label: 'TIDAL', bgColor: '#000000' },
      ],
    },
  ];

  return (
    <Box
      sx={{
        flex: '0 0 250px',
        backgroundColor: '#262626',
        borderRadius: '10px',
        padding: 2,
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {textPresets.map((preset, index) => (
        <Box key={index}>
          <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
            {preset.category}
          </Typography>
          <Box 
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: 1 
            }}
          >
            {preset.items.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 1,
                  backgroundColor: item.bgColor,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <Typography variant="body2" sx={{ color: '#fff' }}>
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default TextComponent;
