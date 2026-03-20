import React, { useState } from 'react';
import PlanCard from '../components/PlanCard';
import TrainerCard from '../components/TrainerCard';
import Footer from '../components/Footer';

const Home = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const plans = [
    {
      title: 'Basic',
      price: '29',
      features: ['Access to gym equipment', 'Locker room access', '1 group class/week', 'Free Wi-Fi'],
      isPopular: false
    },
    {
      title: 'Pro',
      price: '59',
      features: ['24/7 access', 'All group classes', 'Monthy fitness assessment', 'Nutrition guide', 'Guest pass (1/month)'],
      isPopular: true
    },
    {
      title: 'Elite',
      price: '99',
      features: ['Everything in Pro', '4 Personal training sessions', 'Recovery room access', 'Unlimited guest passes', 'Premium locker'],
      isPopular: false
    }
  ];

  const trainers = [
    {
      name: 'Marcus Rush',
      specialization: 'Strength & Conditioning',
      description: 'Former competitive powerlifter with 10 years of experience turning beginners into beasts.'
    },
    {
      name: 'Sarah Jenks',
      specialization: 'HIIT & Core',
      description: 'High energy coach guaranteed to make you sweat and build peak cardiovascular endurance.'
    },
    {
      name: 'David Chen',
      specialization: 'Mobility & Recovery',
      description: 'Specializes in athletic longevity, fixing imbalances, and ensuring you can lift heavy, safely.'
    }
  ];

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section id="hero" style={styles.hero}>
        <div className="container" style={styles.heroContainer}>
          <h1 style={styles.heroTitle}>Forge Your <span>Best Self</span></h1>
          <p style={styles.heroSubtitle}>Push your limits, break your boundaries, and build the physique you've always wanted at IronClad Gym.</p>
          <div style={styles.heroBtns}>
            <a href="#membership" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>View Plans</a>
            <a href="#trainers" className="btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Meet Trainers</a>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP SECTION */}
      <section id="membership" style={styles.section}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Choose Your <span>Plan</span></h2>
            <p style={styles.sectionSubtitle}>Flexible memberships to fit your fitness goals.</p>
          </div>
          
          <div style={styles.grid3}>
            {plans.map((plan, idx) => (
              <PlanCard key={idx} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* TRAINERS SECTION */}
      <section id="trainers" style={{...styles.section, backgroundColor: 'var(--bg-darker)'}}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Meet Our <span>Trainers</span></h2>
            <p style={styles.sectionSubtitle}>Learn from the best to become the best.</p>
          </div>
          
          <div style={styles.grid3}>
            {trainers.map((trainer, idx) => (
              <TrainerCard key={idx} {...trainer} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" style={styles.section}>
        <div className="container" style={styles.contactContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Get In <span>Touch</span></h2>
            <p style={styles.sectionSubtitle}>Have questions? We're here to help you start your journey.</p>
          </div>
          
          <form style={styles.contactForm} onSubmit={handleContactSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Name</label>
              <input 
                className="form-input" 
                type="text" 
                id="name" 
                placeholder="Your name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input 
                className="form-input" 
                type="email" 
                id="email" 
                placeholder="Your email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="message">Message</label>
              <textarea 
                className="form-input" 
                id="message" 
                rows="5"
                placeholder="How can we help?" 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required 
                style={{ resize: 'vertical' }}
              />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>Send Message</button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const styles = {
  hero: {
    minHeight: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // We simulate a dark gym background with a radial gradient
    background: 'radial-gradient(circle at center, rgba(38, 38, 38, 0.8) 0%, rgba(10, 10, 10, 1) 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  heroContainer: {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    maxWidth: '800px',
  },
  heroTitle: {
    fontSize: '4.5rem',
    fontWeight: '800',
    color: 'white',
    lineHeight: '1.1',
    marginBottom: '1.5rem',
    textTransform: 'uppercase',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    color: 'var(--text-muted)',
    marginBottom: '2.5rem',
    lineHeight: '1.6',
  },
  heroBtns: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  section: {
    padding: '6rem 0',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '4rem',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    color: 'white',
    marginBottom: '1rem',
    textTransform: 'uppercase',
  },
  sectionSubtitle: {
    fontSize: '1.1rem',
    color: 'var(--text-muted)',
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    alignItems: 'stretch',
  },
  contactContainer: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  contactForm: {
    backgroundColor: 'var(--bg-card)',
    padding: '3rem',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  }
};

// Global style addition for highlighting text
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  h1 span, h2 span { color: var(--primary-color); }
  html { scroll-behavior: smooth; }
`;
document.head.appendChild(styleSheet);

export default Home;
