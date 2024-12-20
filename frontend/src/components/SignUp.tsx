import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import lgLogo from '../assets/lg_logo.png';
import './Login-SignUp.css';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    try {
      await axios.post('http://14.46.254.67:3000/register', {
        username,
        password,
      });
      navigate('/login'); // Redirect on success
    } catch (error) {
      console.error("Signup error:", error);
      alert('Signup failed. Please try again.');
    }
  };
  
  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="signup-container"> 
      <img className="lg-logo" src={lgLogo} alt="LG logo" />
      <h1 className="signup-header">Sign Up</h1>
      
      <input
        type="text"
        placeholder="Username"
        className="input-field"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="input-field"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="input-field"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button className="signup-button" onClick={handleSignup}>Sign Up</button>

      <div className="existing-account-text">
        Already have an account? <span className="login-link" onClick={handleLoginRedirect}>Login</span>
      </div>
    </div>
  );
};

export default SignUp;
