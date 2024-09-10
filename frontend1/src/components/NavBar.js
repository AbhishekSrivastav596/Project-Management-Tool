import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';  // Import logout API
// import './NavBar.css';  // Importing the CSS file

const NavBar = () => {
  const navigate = useNavigate();  
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    logout();  
    navigate('/login');  
  };

  return (
    <nav className="navbar-container">
      <div className="nav-logo-container">
        <Link to="/" className="nav-logo-text"> <i className="fas fa-home"></i> TaskVerse</Link>
      </div>
      
      <ul className="nav-menu">
        {!token ? (
          <>
            <li>
              <Link to="/login" className="nav-item-link" > <i className="fas fa-sign-in-alt"></i> Login</Link>
            </li>
            <li>
              <Link to="/signup" className="nav-item-link"><i className="fas fa-user-plus"></i> Signup</Link>
            </li>
            <li>
              <Link to="/about" className="nav-item-link"><i className="fas fa-user"> </i> AboutUs</Link>
            </li>
          </>
        ) : (
          <>
            {role === 'team leader' && (
              <li>
                <Link to="/dashboard/team-leader" className="nav-item-link">Dashboard</Link>
              </li>
            )}
            {role === 'team member' && (
              <li>
                <Link to="/dashboard/team-member" className="nav-item-link"><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
              </li>
            )}
            {role === 'admin' && (
              <li>
                <Link to="/dashboard/admin" className="nav-item-link"><i className="fas fa-tachometer-alt"></i> Admin Dashboard</Link>
              </li>
            )}
            <li>
              <button onClick={handleLogout} className="nav-item-logout"> <i className="fas fa-sign-out-alt"></i>Logout</button>
            </li>
            <li>
              <Link to="/about" className="nav-item-link"><i className="fas fa-user"> </i> AboutUs</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
