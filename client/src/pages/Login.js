import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, XCircle } from 'lucide-react';
import { isUserLoggedIn } from '../utils/userStorage';
import { auth } from '../db/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, []);

  useEffect(() => {
    if (isUserLoggedIn()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleKeyDown = (e, nextRef) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const currentField = e.target.id;
      let isValid = false;

      if (currentField === 'email') isValid = isEmailValid;
      else if (currentField === 'password') isValid = isPasswordValid;

      if (isValid && nextRef) {
        nextRef.current.focus();
      } else if (isValid && !nextRef) {
        handleLogin(e);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("Logged in:", userCredential.user);
      localStorage.setItem('user', JSON.stringify({
        name: userCredential.user.displayName || 'User',
        email: userCredential.user.email,
        membershipStatus: 'Inactive',
        plan: null
      }));
      localStorage.setItem('isLoggedIn', 'true');

      navigate('/home');

    } catch (error) {
      console.log(error.message);
      setError("Invalid email or password");
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
              ref={emailRef}
              className={`form-input ${email && !isEmailValid ? 'invalid' : ''}`}
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, passwordRef)}
              required
            />
            {email && !isEmailValid && (
              <p className="field-error"><XCircle size={14} /> Please enter a valid email address</p>
            )}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                ref={passwordRef}
                className={`form-input ${password && !isPasswordValid ? 'invalid' : ''}`}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, null)}
                style={{ paddingRight: '45px' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px'
                }}
              >
                {showPassword ? <EyeOff size={20} color="var(--text-muted)" /> : <Eye size={20} color="var(--text-muted)" />}
              </button>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button
            type="submit"
            className="btn-primary auth-btn"
            disabled={!isFormValid}
            style={{ opacity: isFormValid ? 1 : 0.7 }}
          >
            Login
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/signup" className="auth-link">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
