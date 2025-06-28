import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

// Base URL for your backend API
const API_BASE_URL = 'http://localhost:5000/api/users';

export const Login = () => {
  const [credentials, setCredentials] = useState({ 
    username: '', 
    password: '' 
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset any previous errors

    try {
      // Make API call to login endpoint
      const response = await axios.post(`${API_BASE_URL}/login`, credentials);

      // Log the response (for debugging purposes)
      console.log('Login successful:', response.data);

      // Store the auth token in localStorage
      localStorage.setItem('authToken', response.data.token);

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      // Log the error (for debugging purposes)
      console.error('Login error:', err.response || err);

      // Set the error message
      setError(err.response?.data?.message || 'Invalid username or password');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">FloSync</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="form-button">
            Login
          </button>
        </form>
        <Link to="/signup" className="auth-link">
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
  );
};

export const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    lastPeriodDate: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset any previous errors

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, {
        username: formData.username,
        password: formData.password,
        lastPeriodDate: formData.lastPeriodDate
      });

      // Store the token in localStorage
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('lastPeriodDate', formData.lastPeriodDate);
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      // Handle signup errors
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">FloSync</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-input"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Last Period Date</label>
            <input
              type="date"
              className="form-input"
              value={formData.lastPeriodDate}
              onChange={(e) => setFormData({ ...formData, lastPeriodDate: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="form-button">
            Sign Up
          </button>
        </form>
        <Link to="/login" className="auth-link">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

