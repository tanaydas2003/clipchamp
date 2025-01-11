import React, { useRef, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
} from '@mui/material';
import VideoControls from './VideoControls';
import VideoTimeline from './VideoTimeline';

const VideoPreview = ({ previewFile, videoFilter = 'none' }) => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const audioInputRef = useRef(null);

  const [videoElement, setVideoElement] = useState(null);
  const [videoFiles, setVideoFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [durations, setDurations] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [thumbnails, setThumbnails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState('original');
  const [videoAspectRatio, setVideoAspectRatio] = useState('16 / 9');
  const [naturalAspectRatio, setNaturalAspectRatio] = useState('16 / 9');
  const [videoWidth, setVideoWidth] = useState(null);
  const [videoHeight, setVideoHeight] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [textOverlays, setTextOverlays] = useState([]);
  const [draggedTextId, setDraggedTextId] = useState(null);

  const thumbnailWidth = 80;
  const thumbnailHeight = 60;

  const aspectRatioOptions = [
    { label: 'Original', value: 'original' },
    { label: '16:9', value: '16 / 9' },
    { label: '4:3', value: '4 / 3' },
    { label: '1:1', value: '1 / 1' },
  ];

  const parseAspectRatio = (aspectRatioStr) => {
    const [width, height] = aspectRatioStr.split('/').map(Number);
    return width / height;
  };

  useEffect(() => {
    if (previewFile) {
      setVideoFiles((prevFiles) => {
        const isAlreadyAdded = prevFiles.some((file) => file === previewFile);
        if (!isAlreadyAdded) {
          return [...prevFiles, previewFile];
        }
        return prevFiles;
      });
    }
  }, [previewFile]);

  useEffect(() => {
    const urls = videoFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [videoFiles]);

  useEffect(() => {
    const generateThumbnails = async () => {
      if (!videoFiles.length) return;
      setIsLoading(true);
      const tempThumbnails = [];
      const tempDurations = [];

      for (let i = 0; i < videoFiles.length; i++) {
        const file = videoFiles[i];
        const url = previewUrls[i];
        const videoClone = document.createElement('video');
        videoClone.src = url;
        videoClone.crossOrigin = 'anonymous';

        await new Promise((resolve, reject) => {
          videoClone.onloadedmetadata = () => {
            tempDurations[i] = videoClone.duration;
            resolve();
          };
          videoClone.onerror = reject;
        });

        const maxThumbnailsPerVideo = 20;
        const totalThumbnailsForVideo = Math.min(
          Math.ceil(videoClone.duration / 5),
          maxThumbnailsPerVideo
        );
        const interval = videoClone.duration / totalThumbnailsForVideo;

        for (let j = 0; j < totalThumbnailsForVideo; j++) {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = thumbnailWidth;
          canvas.height = thumbnailHeight;

          await new Promise((resolve) => {
            videoClone.currentTime = j * interval;
            videoClone.onseeked = () => {
              context.drawImage(
                videoClone,
                0,
                0,
                canvas.width,
                canvas.height
              );
              const time =
                tempDurations.slice(0, i).reduce((acc, dur) => acc + dur, 0) +
                j * interval;
              tempThumbnails.push({
                src: canvas.toDataURL('image/png'),
                time,
                videoIndex: i,
              });
              resolve();
            };
          });
        }
      }

      setThumbnails(tempThumbnails);
      setDurations(tempDurations);
      setIsLoading(false);
    };

    if (videoFiles.length > 0) {
      generateThumbnails();
    }
  }, [videoFiles, previewUrls, thumbnailWidth, thumbnailHeight]);

  useEffect(() => {
    if (selectedAspectRatio === 'original') {
      setVideoAspectRatio(naturalAspectRatio);
    } else {
      setVideoAspectRatio(selectedAspectRatio);
    }
  }, [selectedAspectRatio, naturalAspectRatio]);

  useEffect(() => {
    if (containerRef.current) {
      const { width: containerWidth, height: containerHeight } =
        containerRef.current.getBoundingClientRect();

      const containerAspectRatio = containerWidth / containerHeight;
      const aspectRatioValue = parseAspectRatio(videoAspectRatio);

      let newVideoWidth, newVideoHeight;
      if (aspectRatioValue > containerAspectRatio) {
        newVideoWidth = containerWidth;
        newVideoHeight = containerWidth / aspectRatioValue;
      } else {
        newVideoHeight = containerHeight;
        newVideoWidth = containerHeight * aspectRatioValue;
      }

      setVideoWidth(newVideoWidth);
      setVideoHeight(newVideoHeight);
    }
  }, [videoAspectRatio]);

  const handlePlayPause = () => {
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
        if (audioRef.current) {
          audioRef.current.pause();
        }
      } else {
        videoElement.play();
        if (audioRef.current) {
          audioRef.current.play();
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoElement) {
      videoElement.muted = !videoElement.muted;
      setIsMuted(videoElement.muted);
    }
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  };

  const videoTotalDuration = durations.reduce((acc, dur) => acc + dur, 0);
  const totalDuration = Math.max(videoTotalDuration, audioDuration);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    updateCurrentTimeFromPointer(e);
  };

  const handlePointerMove = (e) => {
    if (isDragging) {
      updateCurrentTimeFromPointer(e);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const updateCurrentTimeFromPointer = (e) => {
    if (timelineRef.current && thumbnails.length > 0) {
      const totalTimelineWidth = thumbnails.length * (thumbnailWidth + 5) - 5;
      const rect = timelineRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left + timelineRef.current.scrollLeft;
      const clampedX = Math.max(0, Math.min(x, totalTimelineWidth));
      const newTime = (clampedX / totalTimelineWidth) * totalDuration;
      seekToTime(newTime);
    }
  };

  const seekToTime = (time) => {
    let accumulatedDuration = 0;
    for (let i = 0; i < durations.length; i++) {
      if (time < accumulatedDuration + durations[i]) {
        setCurrentVideoIndex(i);
        if (videoRef.current) {
          videoRef.current.currentTime = time - accumulatedDuration;
        }
        break;
      } else {
        accumulatedDuration += durations[i];
      }
    }
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    setCurrentTime(time);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    } else {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    }
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging]);

  const handleVideoEnded = () => {
    if (currentVideoIndex < videoFiles.length - 1) {
      setCurrentVideoIndex((prevIndex) => prevIndex + 1);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  };

  const handleTimelineDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files).filter((file) =>
      file.type.startsWith('video/')
    );
    if (files.length > 0) {
      setVideoFiles((prev) => [...prev, ...files]);
    }
  };

  const handleTimelineDragOver = (event) => {
    event.preventDefault();
  };

  // Audio Functionality
  const handleAddAudio = () => {
    audioInputRef.current.click();
  };

  const handleAudioSelected = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onloadedmetadata = () => {
        setAudioDuration(audioRef.current.duration);
      };
    }
  }, [audioUrl]);

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  useEffect(() => {
    if (videoElement && audioRef.current) {
      const audioElement = audioRef.current;

      const syncAudio = () => {
        if (Math.abs(audioElement.currentTime - videoElement.currentTime) > 0.3) {
          audioElement.currentTime = videoElement.currentTime;
        }
      };

      const handlePlay = () => {
        audioElement.play();
      };

      const handlePause = () => {
        audioElement.pause();
      };

      videoElement.addEventListener('play', handlePlay);
      videoElement.addEventListener('pause', handlePause);
      videoElement.addEventListener('timeupdate', syncAudio);

      return () => {
        videoElement.removeEventListener('play', handlePlay);
        videoElement.removeEventListener('pause', handlePause);
        videoElement.removeEventListener('timeupdate', syncAudio);
      };
    }
  }, [videoElement, audioUrl]);
  useEffect(() => {
    if (!videoElement) return;

    const handleTimeUpdate = () => {
      if (!isDragging) {
        const timeUpToPreviousVideos = durations
          .slice(0, currentVideoIndex)
          .reduce((acc, dur) => acc + dur, 0);
        const totalCurrentTime = timeUpToPreviousVideos + videoElement.currentTime;
        setCurrentTime(totalCurrentTime);
      }
    };

    videoElement.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [isDragging, videoElement, currentVideoIndex, durations]);

  // Text Overlay Functionality
  const handleAddText = () => {
    const text = prompt('Enter text to display:');
    if (text) {
      const newOverlay = {
        id: Date.now(),
        text,
        startTime: currentTime,
        duration: 5,
      };
      setTextOverlays((prev) => [...prev, newOverlay]);
    }
  };

  const handleTextDragStart = (e, id) => {
    e.stopPropagation();
    setDraggedTextId(id);
  };

  const handleTextDrag = (e) => {
    e.preventDefault();
    if (draggedTextId && timelineRef.current && thumbnails.length > 0) {
      const totalTimelineWidth = thumbnails.length * (thumbnailWidth + 5) - 5;
      const rect = timelineRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left + timelineRef.current.scrollLeft;
      const clampedX = Math.max(0, Math.min(x, totalTimelineWidth));
      const newStartTime = (clampedX / totalTimelineWidth) * totalDuration;

      setTextOverlays((prev) =>
        prev.map((overlay) =>
          overlay.id === draggedTextId
            ? { ...overlay, startTime: newStartTime }
            : overlay
        )
      );
    }
  };

  const handleTextDragEnd = () => {
    setDraggedTextId(null);
  };

  const requestFullscreen = () => {
    if (videoElement && videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '720px', margin: '0 auto' }}>
      {/* Hidden Audio Input */}
      <input
        type="file"
        accept="audio/*"
        ref={audioInputRef}
        style={{ display: 'none' }}
        onChange={handleAudioSelected}
      />

      {/* Video Preview */}
      <Box
        ref={containerRef}
        sx={{
          width: '100%',
          height: '400px',
          backgroundColor: '#111',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {videoFiles.length > 0 ? (
          videoWidth &&
          videoHeight && (
            <>
              <video
                ref={(el) => {
                  videoRef.current = el;
                  setVideoElement(el);
                }}
                src={previewUrls[currentVideoIndex]}
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                    const vw = videoRef.current.videoWidth;
                    const vh = videoRef.current.videoHeight;
                    if (vw && vh) {
                      const ratio = `${vw} / ${vh}`;
                      setNaturalAspectRatio(ratio);
                      if (selectedAspectRatio === 'original') {
                        setVideoAspectRatio(ratio);
                      }
                    }
                  }
                }}
                onEnded={handleVideoEnded}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: `${videoWidth}px`,
                  height: `${videoHeight}px`,
                  filter: videoFilter,
                }}
                muted={isMuted}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                autoPlay
              />
              {/* Overlay Texts */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: `${videoWidth}px`,
                  height: `${videoHeight}px`,
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                }}
              >
                {textOverlays.map((overlay) => {
                  const isVisible =
                    currentTime >= overlay.startTime &&
                    currentTime <= overlay.startTime + overlay.duration;
                  return (
                    isVisible && (
                      <Typography
                        key={overlay.id}
                        sx={{
                          color: 'white',
                          fontSize: '24px',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          textShadow: '2px 2px 4px #000',
                        }}
                      >
                        {overlay.text}
                      </Typography>
                    )
                  );
                })}
              </Box>
            </>
          )
        ) : (
          <Typography
            sx={{
              color: 'white',
              textAlign: 'center',
              mt: 2,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            Drag and drop a video here to preview
          </Typography>
        )}

        {/* Aspect Ratio Options */}
        {videoFiles.length > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '5px',
              padding: '5px',
            }}
          >
            <Select
              value={selectedAspectRatio}
              onChange={(e) => setSelectedAspectRatio(e.target.value)}
              sx={{
                color: 'white',
                '.MuiSelect-icon': {
                  color: 'white',
                },
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
                '.MuiSelect-select': {
                  padding: '5px',
                },
              }}
            >
              {aspectRatioOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        )}
      </Box>

      {audioUrl && (
        <audio ref={audioRef} src={audioUrl} preload="auto" style={{ display: 'none' }} />
      )}

      {videoFiles.length > 0 ? (
        isLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
            }}
          >
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <>
            <VideoControls
              isPlaying={isPlaying}
              isMuted={isMuted}
              currentTime={currentTime}
              totalDuration={totalDuration}
              handlePlayPause={handlePlayPause}
              handleMuteToggle={handleMuteToggle}
              seekToTime={seekToTime}
              requestFullscreen={requestFullscreen}
            />

            <VideoTimeline
              thumbnails={thumbnails}
              totalDuration={totalDuration}
              durations={durations}
              audioFile={audioFile}
              textOverlays={textOverlays}
              currentTime={currentTime}
              isDragging={isDragging}
              handlePointerDown={handlePointerDown}
              handleTimelineDrop={handleTimelineDrop}
              handleTimelineDragOver={handleTimelineDragOver}
              handleAddAudio={handleAddAudio}
              handleAddText={handleAddText}
              handleTextDragStart={handleTextDragStart}
              draggedTextId={draggedTextId}
              handleTextDrag={handleTextDrag}
              handleTextDragEnd={handleTextDragEnd}
              timelineRef={timelineRef}
              thumbnailWidth={thumbnailWidth}
              thumbnailHeight={thumbnailHeight}
            />
          </>
        )
      ) : null}
    </Box>
  );
};

export default VideoPreview;
