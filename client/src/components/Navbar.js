import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Dumbbell, User, Menu, X } from 'lucide-react';
import { isUserLoggedIn } from '../utils/userStorage';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = isUserLoggedIn();
  const [isOpen, setIsOpen] = useState(false);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Close on route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Plans', path: '/plans' },
    { name: 'Trainers', path: '/trainers' },
    { name: 'Find Us', path: '/find-us' },
    { name: 'Contact', path: '/contact' },
    ...(isAuthenticated ? [{ name: 'Dashboard', path: '/dashboard' }] : []),
  ];

  return (
    <nav style={styles.nav}>
      <div className="container" style={styles.container}>
        <Link to="/" style={styles.logo} className="nav-logo" onClick={closeMenu}>
          <Dumbbell size={28} color="var(--primary-color)" />
          <span style={styles.logoText}>IronClad</span>
        </Link>

        {/* Desktop Links */}
        <ul className="desktop-links" style={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link 
                to={link.path} 
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div style={styles.actions}>
          {isAuthenticated ? (
            <Link to="/profile" className="profile-btn desktop-profile" style={styles.profileBtn}>
              <User size={20} />
              <span>Profile</span>
            </Link>
          ) : (
            <div style={styles.authLinks} className="desktop-auth">
              {!isAuthPage && <Link to="/login" className="nav-link">Login</Link>}
              {!isAuthPage && <Link to="/signup" className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Join Now</Link>}
            </div>
          )}
          
          {/* Mobile Toggle Button */}
          <button onClick={toggleMenu} style={styles.menuToggle} className="menu-toggle">
            {isOpen ? <X size={32} color="white" /> : <Menu size={32} color="white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <ul style={styles.mobileNavLinks}>
          {navLinks.map((link) => (
            <li key={link.path} style={styles.mobileNavItem}>
              <Link 
                to={link.path} 
                onClick={closeMenu}
                style={{
                  ...styles.mobileNavLink, 
                  color: location.pathname === link.path ? 'var(--primary-color)' : 'white'
                }}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li style={{ marginTop: '1.5rem', width: '100%' }}>
            {isAuthenticated ? (
              <Link to="/profile" onClick={closeMenu} className="btn-primary" style={styles.mobileProfileBtn}>
                <User size={22} />
                View Profile
              </Link>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                <Link to="/login" onClick={closeMenu} className="nav-link" style={{ fontSize: '1.1rem' }}>Login</Link>
                <Link to="/signup" onClick={closeMenu} className="btn-primary" style={{ padding: '1rem', width: '100%', textAlign: 'center' }}>Join IronClad</Link>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    zIndex: 1000,
    padding: '1rem 0',
    transition: 'all 0.3s ease',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 1.5rem',
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
    gap: '2.5rem',
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
    backgroundColor: 'rgba(20,20,20,0.8)',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: '1px solid var(--border-color)',
    transition: 'all 0.3s ease',
  },
  authLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  menuToggle: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'none',
    padding: '0.5rem',
  },
  mobileNavLinks: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    listStyle: 'none',
    padding: '0 2.5rem',
  },
  mobileNavLink: {
    fontSize: '1.4rem',
    fontWeight: '700',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    display: 'block',
    padding: '1rem 0',
    width: '100%',
    textAlign: 'center',
  },
  mobileNavItem: {
    width: '100%',
    textAlign: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.05)'
  },
  mobileProfileBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6rem',
    width: '100%',
    padding: '1rem',
    fontSize: '1.1rem',
    fontWeight: '600',
  }
};

const styleSheet = document.createElement("style");
styleSheet.innerText = `
  .nav-logo:hover { opacity: 0.8; }
  .nav-link {
    color: var(--text-muted);
    font-weight: 500;
    transition: color 0.3s ease, transform 0.3s ease;
    font-size: 0.95rem;
    position: relative;
    text-decoration: none;
  }
  .nav-link:hover { color: white; transform: translateY(-1px); }
  .nav-link.active { color: var(--primary-color); font-weight: 600; }
  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--primary-color);
    border-radius: 2px;
  }
  .profile-btn:hover { background-color: var(--primary-color); border-color: var(--primary-color); transform: translateY(-2px); box-shadow: 0 4px 15px rgba(249, 115, 22, 0.2); }
  
  .mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: rgba(10, 10, 10, 0.98);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    padding: 2rem 0;
    transform: translateY(-150%);
    opacity: 0;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
    z-index: -1;
    pointer-events: none;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  }
  
  .mobile-menu.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  @media (max-width: 768px) {
    .desktop-links, .desktop-auth, .desktop-profile {
      display: none !important;
    }
    .menu-toggle {
      display: block !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Navbar;
