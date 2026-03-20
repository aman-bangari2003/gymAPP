import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Simulated login from localStorage
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.email === email && user.password === password) {
        localStorage.setItem('user', JSON.stringify({ name: user.name, email: user.email }));
        navigate('/home');
        return;
      }
    }
    
    // Default fallback or wrong credentials
    if (email === 'test@test.com' && password === 'password') {
      localStorage.setItem('user', JSON.stringify({ name: 'Test User', email }));
      navigate('/home');
    } else {
      setError('Invalid email or password. Please try again or create an account.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Welcome <span>Back</span></h2>
          <p className="auth-subtitle">Log in to enter the forge.</p>
        </div>
        
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input 
              className="form-input" 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input 
              className="form-input" 
              type="password" 
              id="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          {error && <p className="error-message">{error}</p>}
          
          <button type="submit" className="btn-primary auth-btn">Login</button>
        </form>
        
        <div className="auth-footer">
          Don't have an account? <Link to="/signup" className="auth-link">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
