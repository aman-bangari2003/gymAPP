import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Save to localStorage
    localStorage.setItem('userData', JSON.stringify({
      name: formData.name,
      email: formData.email,
      password: formData.password
    }));

    // Redirect to login
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Join <span>IronClad</span></h2>
          <p className="auth-subtitle">Create an account and start your journey.</p>
        </div>
        
        <form className="auth-form" onSubmit={handleSignup}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name</label>
            <input 
              className="form-input" 
              type="text" 
              id="name" 
              placeholder="Enter your name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input 
              className="form-input" 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input 
              className="form-input" 
              type="password" 
              id="password" 
              placeholder="Create a password" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
            <input 
              className="form-input" 
              type="password" 
              id="confirmPassword" 
              placeholder="Confirm your password" 
              value={formData.confirmPassword}
              onChange={handleChange}
              required 
            />
          </div>
          
          {error && <p className="error-message">{error}</p>}
          
          <button type="submit" className="btn-primary auth-btn">Create Account</button>
        </form>
        
        <div className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Login Here</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
