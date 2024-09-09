// src/components/Footer.js

import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      {/* <h3>Project Management Tool</h3> */}
      <p>
        &copy; {new Date().getFullYear()} Project Management Tool. All rights reserved.
      </p>
    
    </footer>
  );
};

export default Footer;
