import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Dumbbell, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('user');

  // Don't show fully formed navbar on auth pages if preferred, but usually standard Gym sites have minimal header on auth or none.
  // We'll show a full navbar, but adjust links based on auth state.
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <nav style={styles.nav}>
      <div className="container" style={styles.container}>
        <Link to={isAuthenticated ? '/home' : '/login'} style={styles.logo}>
          <Dumbbell size={28} color="var(--primary-color)" />
          <span style={styles.logoText}>IronClad</span>
        </Link>

        {!isAuthPage && isAuthenticated && (
          <ul style={styles.navLinks}>
            <li><a href="#hero" style={styles.link}>Home</a></li>
            <li><a href="#membership" style={styles.link}>Membership</a></li>
            <li><a href="#trainers" style={styles.link}>Trainers</a></li>
            <li><a href="#contact" style={styles.link}>Contact</a></li>
          </ul>
        )}

        <div style={styles.actions}>
          {isAuthenticated ? (
            <Link to="/profile" style={styles.profileBtn}>
              <User size={20} />
              <span>Profile</span>
            </Link>
          ) : (
            <div style={styles.authLinks}>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/signup" className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Join Now</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid var(--border-color)',
    zIndex: 1000,
    padding: '1rem 0'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logoText: {
    fontFamily: 'Outfit, sans-serif',
    fontSize: '1.5rem',
    fontWeight: '800',
    color: 'white',
    letterSpacing: '1px',
    textTransform: 'uppercase'
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    gap: '2rem',
  },
  link: {
    color: 'var(--text-main)',
    fontWeight: '500',
    transition: 'color 0.3s',
    fontSize: '0.95rem'
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
  },
  profileBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'white',
    backgroundColor: 'var(--bg-card)',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: '1px solid var(--border-color)',
    transition: 'all 0.3s',
  },
  authLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  }
};

export default Navbar;
