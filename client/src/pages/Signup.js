import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck, XCircle, CheckCircle2 } from 'lucide-react';
import { isUserLoggedIn } from '../utils/userStorage';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

  useEffect(() => {
    if (nameRef.current) nameRef.current.focus();
  }, []);

  const passwordRules = [
    { label: 'Minimum 6 characters', regex: /.{6,}/ },
    { label: 'At least 1 uppercase letter', regex: /[A-Z]/ },
    { label: 'At least 1 lowercase letter', regex: /[a-z]/ },
    { label: 'At least 1 number', regex: /[0-9]/ },
    { label: 'At least 1 special character (!@#$%^&*)', regex: /[!@#$%^&*]/ },
  ];

  const validation = passwordRules.map(rule => ({
    ...rule,
    isValid: rule.regex.test(formData.password)
  }));

  const satisfiedCount = validation.filter(r => r.isValid).length;
  const strength = satisfiedCount <= 2 ? 'Weak' : satisfiedCount <= 4 ? 'Medium' : 'Strong';
  const strengthColor = strength === 'Weak' ? '#ef4444' : strength === 'Medium' ? '#f59e0b' : '#4ade80';
  
  const allRulesMet = validation.every(rule => rule.isValid);
  const passwordsMatch = formData.password && formData.password === formData.confirmPassword;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(formData.email);
  const isFormValid = allRulesMet && passwordsMatch && isEmailValid;

  useEffect(() => {
    if (isUserLoggedIn()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    let { id, value } = e.target;
    if (id === 'name') {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    setFormData({ ...formData, [id]: value });
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const currentField = e.target.id;
      let isValid = false;

      if (currentField === 'name') isValid = formData.name.trim().length > 0;
      else if (currentField === 'email') isValid = isEmailValid;
      else if (currentField === 'password') isValid = allRulesMet;
      else if (currentField === 'confirmPassword') isValid = passwordsMatch && isFormValid;

      if (isValid && nextRef) {
        nextRef.current.focus();
      } else if (isValid && !nextRef) {
        handleSignup(e);
      }
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!allRulesMet) return;
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Save to localStorage
    localStorage.setItem('userData', JSON.stringify({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      membershipStatus: 'Inactive',
      plan: null
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
              ref={nameRef}
              className={`form-input ${formData.name && formData.name.trim().length === 0 ? 'invalid' : ''}`} 
              type="text" 
              id="name" 
              placeholder="Enter your name" 
              value={formData.name}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, emailRef)}
              required 
            />
            {formData.name.length > 0 && formData.name.trim().length === 0 && (
              <p className="field-error"><XCircle size={14} /> Name cannot be empty</p>
            )}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input 
              ref={emailRef}
              className={`form-input ${formData.email && !isEmailValid ? 'invalid' : ''}`} 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              value={formData.email}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, passwordRef)}
              required 
            />
            {/* Real-time Email Validation */}
            {formData.email && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px', 
                marginTop: '8px', 
                fontSize: '0.85rem',
                color: isEmailValid ? '#4ade80' : '#ef4444',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}>
                {isEmailValid ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                <span>{isEmailValid ? 'Valid email' : 'Invalid email format'}</span>
              </div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                ref={passwordRef}
                className={`form-input ${formData.password && !allRulesMet ? 'invalid' : ''}`} 
                type={showPassword ? "text" : "password"} 
                id="password" 
                placeholder="Create a password" 
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                onKeyDown={(e) => handleKeyDown(e, confirmRef)}
                style={{ paddingRight: '45px' }}
                required 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
              >
                {showPassword ? <EyeOff size={20} color="var(--text-muted)" /> : <Eye size={20} color="var(--text-muted)" />}
              </button>
            </div>
            
            {/* Password Strength Bar */}
            {formData.password && (
              <div style={styles.strengthContainer}>
                <div style={styles.strengthBarOuter}>
                  <div style={{ 
                    ...styles.strengthBarInner, 
                    width: `${(satisfiedCount / 5) * 100}%`, 
                    backgroundColor: strengthColor 
                  }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>Strength: <span style={{ color: strengthColor }}>{strength}</span></span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{satisfiedCount}/5 requirements</span>
                </div>
              </div>
            )}

            {/* Real-time Password Checklist */}
            {(passwordFocus || formData.password) && (
              <div style={styles.checklist}>
                {validation.map((rule, idx) => (
                  <div key={idx} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    fontSize: '0.8rem',
                    color: rule.isValid ? '#4ade80' : formData.password ? '#ef4444' : 'var(--text-muted)',
                    marginBottom: '4px',
                    transition: 'all 0.3s ease'
                  }}>
                    {rule.isValid ? <CheckCircle2 size={14} /> : <div style={styles.dot}></div>}
                    <span>{rule.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                ref={confirmRef}
                className={`form-input ${formData.confirmPassword && !passwordsMatch ? 'invalid' : ''}`} 
                type={showConfirmPassword ? "text" : "password"} 
                id="confirmPassword" 
                placeholder="Confirm your password" 
                value={formData.confirmPassword}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, null)}
                style={{ paddingRight: '45px' }}
                required 
              />
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeBtn}
              >
                {showConfirmPassword ? <EyeOff size={20} color="var(--text-muted)" /> : <Eye size={20} color="var(--text-muted)" />}
              </button>
            </div>
            
            {/* Passwords Match Indicator */}
            {formData.confirmPassword && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px', 
                marginTop: '10px', 
                fontSize: '0.85rem',
                color: passwordsMatch ? '#4ade80' : '#ef4444',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}>
                {passwordsMatch ? <ShieldCheck size={16} /> : <XCircle size={16} />}
                <span>{passwordsMatch ? 'Passwords match perfectly' : 'Passwords do not match yet'}</span>
              </div>
            )}
          </div>
          
          {error && <p className="error-message">{error}</p>}
          
          <button 
            type="submit" 
            className="btn-primary auth-btn" 
            disabled={!isFormValid}
            style={{ 
              opacity: isFormValid ? 1 : 0.6, 
              cursor: isFormValid ? 'pointer' : 'not-allowed',
              transform: isFormValid ? 'scale(1)' : 'scale(0.98)',
              filter: isFormValid ? 'none' : 'grayscale(0.5)'
            }}
          >
            Create Account
          </button>
        </form>

        <div style={styles.divider}></div>

        
        <div className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Login Here</Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  checklist: {
    marginTop: '15px',
    padding: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.05)'
  },
  strengthContainer: {
    marginTop: '15px',
    marginBottom: '5px'
  },
  strengthBarOuter: {
    height: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  strengthBarInner: {
    height: '100%',
    transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.4s'
  },
  eyeBtn: {
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
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'currentColor',
    opacity: 0.3
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--border-color)',
    margin: '2rem 0'
  }
};

export default Signup;
