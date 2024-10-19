'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import LeftSidebar from './LeftSidebar';
import MainContent from './MainContent';
import RightSidebar from './RightSidebar';

const Dashboard = () => {
  const [selectedMediaType, setSelectedMediaType] = useState('media'); // Default to 'media'

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#1a1a2e' }}>
      {/* Left Sidebar */}
      <LeftSidebar selectedMediaType={selectedMediaType} setSelectedMediaType={setSelectedMediaType} />

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <MainContent selectedMediaType={selectedMediaType} />
      </Box>

      {/* Right Sidebar */}
      <RightSidebar />
    </Box>
  );
};

export default Dashboard;
