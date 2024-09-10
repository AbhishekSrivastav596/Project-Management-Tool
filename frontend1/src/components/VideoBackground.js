import React, { useRef, useEffect } from 'react';
import './Videobg.css';  // Ensure this CSS file includes styles for the video

const VideoBackground = ({ onVideoLoad }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;  // Adjust this value to control the speed (0.5 is half speed)
      const handleLoadedData = () => {
        if (onVideoLoad) {
          onVideoLoad();
        }
      };
      videoRef.current.addEventListener('loadeddata', handleLoadedData);

      // Cleanup event listener on component unmount
      return () => {
        videoRef.current.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, [onVideoLoad]);

  return (
    <div className="video-background-container">
      <video ref={videoRef} autoPlay loop muted className="background-video">
        <source src={`/background2.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
