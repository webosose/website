import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import lgLogo from '../assets/lg_logo.png';
import './Login-SignUp.css';
import { settoken } from './ServiceFunction/ServiceToTypeScript';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://14.46.254.67:3000/login', {
        username,
        password,
      });
      const token = response.data.token;
      console.log("store token",token);
      
      console.log("store by webos token",settoken(token));
      // Store token in localStorage
      //localStorage.setItem('token', token);
      

      // Redirect to home page on successful login
      navigate('/home');
    } catch (error) {
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <img className="lg-logo" src={lgLogo} alt="LG logo" />
      <div className="welcome-text">WELCOME</div>

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

      <button className="login-button" onClick={handleLogin}>Login</button>

      <div className="forget-password-text">Forget password/username</div>
      <div className="sign-up-text">
        <span>Don’t have an account? </span>
        <span className="signup-link" onClick={handleSignUpRedirect}>
          Sign Up
        </span>
      </div>
    </div>
  );
};

export default Login;
