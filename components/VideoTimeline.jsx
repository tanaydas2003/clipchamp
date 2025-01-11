import React, { useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const VideoTimeline = ({
  thumbnails,
  totalDuration,
  durations,
  audioFile,
  textOverlays,
  currentTime,
  isDragging,
  handlePointerDown,
  handleTimelineDrop,
  handleTimelineDragOver,
  handleAddAudio,
  handleAddText,
  handleTextDragStart,
  draggedTextId,
  handleTextDrag,
  handleTextDragEnd,
  timelineRef,
  thumbnailWidth,
  thumbnailHeight
}) => {
  const totalTimelineWidth = thumbnails.length * (thumbnailWidth + 5) - 5;
  const playheadPosition =
    totalDuration > 0 ? (currentTime / totalDuration) * totalTimelineWidth : 0;

  useEffect(() => {
    if (draggedTextId) {
      document.addEventListener('pointermove', handleTextDrag);
      document.addEventListener('pointerup', handleTextDragEnd);
    } else {
      document.removeEventListener('pointermove', handleTextDrag);
      document.removeEventListener('pointerup', handleTextDragEnd);
    }
    return () => {
      document.removeEventListener('pointermove', handleTextDrag);
      document.removeEventListener('pointerup', handleTextDragEnd);
    };
  }, [draggedTextId, handleTextDrag, handleTextDragEnd]);

  return (
    <Box
      ref={timelineRef}
      sx={{
        width: '100%',
        height: `${thumbnailHeight * 3 + 40}px`,
        backgroundColor: '#222',
        borderRadius: '10px',
        mt: 2,
        position: 'relative',
        overflowX: 'auto',
        padding: '10px',
        border: '2px solid #4caf50',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
      }}
      onPointerDown={handlePointerDown}
      onDrop={handleTimelineDrop}
      onDragOver={handleTimelineDragOver}
    >
      {/* Vertical Line Indicator */}
      {totalDuration > 0 && (
        <Box
          sx={{
            position: 'absolute',
            left: `${playheadPosition}px`,
            top: 0,
            width: '2px',
            height: '100%',
            backgroundColor: 'yellow',
            zIndex: 1,
          }}
        />
      )}

      {/* Tracks Container */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          width: `${totalTimelineWidth}px`,
          flexShrink: 0,
        }}
      >
        {/* Time Scale Track */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '20px',
            backgroundColor: '#222',
            position: 'relative',
            flexShrink: 0,
            color: 'white',
            fontSize: '12px',
          }}
        >
          {totalDuration > 0 &&
            Array.from({ length: Math.floor(totalDuration) + 1 }, (_, i) => {
              const xPos = (i / totalDuration) * totalTimelineWidth;
              return (
                <Box
                  key={i}
                  sx={{
                    position: 'absolute',
                    left: `${xPos}px`,
                    borderLeft: '1px solid #aaa',
                    height: '100%',
                    pl: '2px',
                  }}
                >
                  {i > 0 && i % 5 === 0 && (
                    <Typography sx={{ color: 'white', fontSize: '10px' }}>
                      {i}s
                    </Typography>
                  )}
                </Box>
              );
            })}
        </Box>

        {/* Audio Track */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: `${thumbnailHeight}px`,
            backgroundColor: '#333',
            position: 'relative',
            flexShrink: 0,
            cursor: 'pointer',
          }}
          onClick={handleAddAudio}
        >
          {audioFile ? (
            <Box
              sx={{
                width: `${totalTimelineWidth}px`,
                height: '100%',
                backgroundColor: '#555',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              <Typography
                sx={{
                  color: 'white',
                  fontSize: '14px',
                  textAlign: 'center',
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {audioFile.name}
              </Typography>
            </Box>
          ) : (
            <Typography
              sx={{
                color: 'white',
                fontSize: '14px',
                textAlign: 'center',
                flexGrow: 1,
              }}
            >
              + Add audio
            </Typography>
          )}
        </Box>

        {/* Video Timeline (Thumbnails) */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            height: `${thumbnailHeight}px`,
            backgroundColor: '#333',
            position: 'relative',
            flexShrink: 0,
          }}
        >
          {thumbnails.map((thumb, index) => (
            <Box
              key={index}
              sx={{
                width: `${thumbnailWidth}px`,
                height: `${thumbnailHeight}px`,
                backgroundColor: '#333',
                overflow: 'hidden',
                marginRight:
                  index === thumbnails.length - 1 ? '0' : '5px',
                display: 'inline-block',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              <img
                src={thumb.src}
                alt={`Thumbnail ${index}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          ))}
        </Box>

        {/* Text Track */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: `${thumbnailHeight}px`,
            backgroundColor: '#333',
            position: 'relative',
            flexShrink: 0,
            cursor: 'pointer',
          }}
          onClick={handleAddText}
        >
          {textOverlays.length > 0 ? (
            <Box
              sx={{
                position: 'relative',
                width: `${totalTimelineWidth}px`,
                height: '100%',
                flexShrink: 0,
              }}
            >
              {textOverlays.map((overlay) => {
                const overlayStartPosition =
                  (overlay.startTime / totalDuration) * totalTimelineWidth;
                const overlayWidth =
                  (overlay.duration / totalDuration) * totalTimelineWidth;
                return (
                  <Box
                    key={overlay.id}
                    sx={{
                      position: 'absolute',
                      left: `${overlayStartPosition}px`,
                      width: `${overlayWidth}px`,
                      height: '100%',
                      backgroundColor: 'rgba(255, 255, 0, 0.5)',
                      cursor: 'move',
                    }}
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      handleTextDragStart(e, overlay.id);
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'black',
                        fontSize: '12px',
                        textAlign: 'center',
                        lineHeight: `${thumbnailHeight}px`,
                      }}
                    >
                      {overlay.text}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          ) : (
            <Typography
              sx={{
                color: 'white',
                fontSize: '14px',
                textAlign: 'center',
                flexGrow: 1,
              }}
            >
              + Add text
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default VideoTimeline;
