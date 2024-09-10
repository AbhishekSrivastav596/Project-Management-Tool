import React, { useRef, useEffect } from 'react';
import './Videobg.css';  

const VideoBackground = ({ onVideoLoad }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;  
      const handleLoadedData = () => {
        if (onVideoLoad) {
          onVideoLoad();
        }
      };
      videoRef.current.addEventListener('loadeddata', handleLoadedData);

   
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
