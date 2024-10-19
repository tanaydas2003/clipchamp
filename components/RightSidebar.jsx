import React from 'react';
import { Box, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
// import AudioTrackIcon from '@mui/icons-material/AudioTrack';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import SpeedIcon from '@mui/icons-material/Speed';

const RightSidebar = () => {
  return (
    <Box sx={{ backgroundColor: '#2e2e3e', width: '80px', padding: 2, color: '#fff' }}>
      <List>
{/*         <ListItem button>
          <ListItemIcon>
            <AudioTrackIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
        </ListItem> */}
        <ListItem button>
          <ListItemIcon>
            <FilterDramaIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SpeedIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
        </ListItem>
      </List>
    </Box>
  );
};

export default RightSidebar;
