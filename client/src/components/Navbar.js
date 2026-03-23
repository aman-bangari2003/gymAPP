import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Dumbbell, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('hero');
  const isAuthenticated = localStorage.getItem('user');

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  useEffect(() => {
    const handleScroll = () => {
      if (isAuthPage || location.pathname !== '/home') return;
      const sections = ['hero', 'membership', 'trainers', 'contact'];
      let current = 'hero';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAuthPage, location]);

  return (
    <nav style={styles.nav}>
      <div className="container" style={styles.container}>
        <Link to={isAuthenticated ? '/home' : '/login'} style={styles.logo} className="nav-logo">
          <Dumbbell size={28} color="var(--primary-color)" />
          <span style={styles.logoText}>IronClad</span>
        </Link>

        {!isAuthPage && isAuthenticated && (
          <ul style={styles.navLinks}>
            <li>
              <Link 
                to="/home" 
                className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard" 
                className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
              >
                Dashboard
              </Link>
            </li>
            {location.pathname === '/home' && ['membership', 'trainers', 'contact'].map(sec => (
              <li key={sec}>
                <a 
                  href={`#${sec}`} 
                  className={`nav-link ${activeSection === sec ? 'active' : ''}`}
                >
                  {(sec.charAt(0).toUpperCase() + sec.slice(1)).replace('Membership', 'Plans')}
                </a>
              </li>
            ))}
          </ul>
        )}

        <div style={styles.actions}>
          {isAuthenticated ? (
            <Link to="/profile" className="profile-btn" style={styles.profileBtn}>
              <User size={20} />
              <span>Profile</span>
            </Link>
          ) : (
            <div style={styles.authLinks}>
              <Link to="/login" className="nav-link">Login</Link>
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
    backgroundColor: 'rgba(10, 10, 10, 0.85)',
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
`;
document.head.appendChild(styleSheet);

export default Navbar;
