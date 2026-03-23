import React from 'react';
import { Dumbbell, Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        <div style={styles.brand}>
          <div style={styles.logo}>
            <Dumbbell size={24} color="var(--primary-color)" />
            <span style={styles.logoText}>IronClad</span>
          </div>
          <p style={styles.description}>
            Forge your best self at IronClad. Premium equipment, elite trainers, and a community that pushes you to the limit.
          </p>
          <div style={styles.socials}>
            <a href="#" style={styles.socialIcon}><Instagram size={20} /></a>
            <a href="#" style={styles.socialIcon}><Twitter size={20} /></a>
            <a href="#" style={styles.socialIcon}><Facebook size={20} /></a>
          </div>
        </div>
        
        <div style={styles.links}>
          <h4 style={styles.heading}>Quick Links</h4>
          <ul style={styles.list}>
            <li><Link to="/" style={styles.link}>Home</Link></li>
            <li><Link to="/plans" style={styles.link}>Membership Plans</Link></li>
            <li><Link to="/trainers" style={styles.link}>Our Trainers</Link></li>
            <li><Link to="/contact" style={styles.link}>Contact Us</Link></li>
            <li><Link to="/dashboard" style={styles.link}>Dashboard</Link></li>
          </ul>
        </div>
        
        <div style={styles.links}>
          <h4 style={styles.heading}>Opening Hours</h4>
          <ul style={styles.list}>
            <li style={styles.text}>Mon - Fri: 5:00 AM - 11:00 PM</li>
            <li style={styles.text}>Sat - Sun: 7:00 AM - 9:00 PM</li>
            <li style={styles.text}>Holidays: 8:00 AM - 6:00 PM</li>
          </ul>
        </div>
      </div>
      <div style={styles.bottom}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} IronClad Gym. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: 'var(--bg-darker)',
    borderTop: '1px solid var(--border-color)',
    paddingTop: '4rem',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '3rem',
    marginBottom: '3rem',
  },
  brand: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
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
  description: {
    color: 'var(--text-muted)',
    lineHeight: '1.6',
    fontSize: '0.95rem',
  },
  socials: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
  },
  socialIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'var(--bg-card)',
    color: 'white',
    transition: 'all 0.3s',
    border: '1px solid var(--border-color)',
  },
  heading: {
    color: 'white',
    fontSize: '1.2rem',
    marginBottom: '1.5rem',
  },
  list: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  link: {
    color: 'var(--text-muted)',
    transition: 'color 0.3s',
    fontSize: '0.95rem',
  },
  text: {
    color: 'var(--text-muted)',
    fontSize: '0.95rem',
  },
  bottom: {
    borderTop: '1px solid var(--border-color)',
    padding: '1.5rem 0',
    textAlign: 'center',
    color: 'var(--text-muted)',
    fontSize: '0.875rem',
    backgroundColor: 'var(--bg-dark)',
  }
};

export default Footer;
