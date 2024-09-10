import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import NavBar from './components/NavBar';
import TeamLeaderDashboard from './components/TeamLeaderDashboard';
import TeamMemberDashboard from './components/TeamMemberDashboard';
import AdminDashboard from './components/adminDashboard';  // Import AdminDashboard component
import VideoBackground from './components/VideoBackground';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import './App.css';

const App = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };
// dvdb
  return (
    <Router>
      
       <VideoBackground onVideoLoad={handleVideoLoad} />
      {videoLoaded ? ( 
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard/team-leader" element={<TeamLeaderDashboard />} />
            <Route path="/dashboard/team-member" element={<TeamMemberDashboard />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <div className="loading-overlay">Loading...</div>
      )} 
    </Router>
  );
};

export default App;
