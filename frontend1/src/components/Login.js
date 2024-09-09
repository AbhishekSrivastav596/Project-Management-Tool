import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';  // Import the login API call
import './login.css';  // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const data = await login(email, password);

      if (data.token) {
        // Save JWT token and user data in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('userId', data.userId);

        // Redirect based on role
        if (data.role === 'team leader') {
          navigate('/dashboard/team-leader');
        } else if (data.role === 'team member') {
          console.log("hello member")
          navigate('/dashboard/team-member');
        } else if (data.role === 'admin') {
          navigate('/dashboard/admin');
        }
      } else {
        setErrorMessage(data.message || 'Login failed, please try again.');
      }
    } catch (error) {
      setErrorMessage('Login failed, please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
