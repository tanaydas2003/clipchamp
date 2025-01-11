import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Forward10Icon from '@mui/icons-material/Forward10';
import Replay10Icon from '@mui/icons-material/Replay10';

const VideoControls = ({
  isPlaying,
  isMuted,
  currentTime,
  totalDuration,
  handlePlayPause,
  handleMuteToggle,
  seekToTime,
  requestFullscreen,
}) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time % 60) || 0;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Box sx={{ mt: 2 }}>
      {/* Video Controls */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <IconButton onClick={() => seekToTime(Math.max(0, currentTime - 10))}>
          <Replay10Icon sx={{ color: 'white' }} />
        </IconButton>
        <IconButton onClick={handlePlayPause}>
          {isPlaying ? (
            <PauseIcon sx={{ color: 'white' }} />
          ) : (
            <PlayArrowIcon sx={{ color: 'white' }} />
          )}
        </IconButton>
        <IconButton onClick={handleMuteToggle}>
          {isMuted ? (
            <VolumeOffIcon sx={{ color: 'white' }} />
          ) : (
            <VolumeUpIcon sx={{ color: 'white' }} />
          )}
        </IconButton>
        <IconButton
          onClick={() => {
            seekToTime(Math.min(totalDuration, currentTime + 10));
          }}
        >
          <Forward10Icon sx={{ color: 'white' }} />
        </IconButton>
        <IconButton onClick={requestFullscreen}>
          <FullscreenIcon sx={{ color: 'white' }} />
        </IconButton>
      </Box>
      <Typography sx={{ color: 'white', textAlign: 'right' }}>
        {formatTime(currentTime)} / {formatTime(totalDuration)}
      </Typography>
    </Box>
  );
};

export default VideoControls;
