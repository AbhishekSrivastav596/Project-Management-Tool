import React from 'react';
import './AboutUs.css'; // Import the CSS for styling

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <div className="about-us-content">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            We are a team of passionate developers, designers, and thinkers, driven by our goal to create innovative solutions that solve real-world problems. 
            Our mission is to deliver high-quality products that bring value to our users.
          </p>
          <h2>Our Vision</h2>
          <p>
            Our vision is to be leaders in technology innovation by creating products that make a positive impact in the world. 
            We strive to maintain a balance between creativity, sustainability, and technology.
          </p>
        </div>
        <div className="about-image">
          <img
            src="https://via.placeholder.com/300" // Placeholder image, replace with a real one
            alt="Our Team"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
