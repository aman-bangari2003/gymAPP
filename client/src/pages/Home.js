import React, { useState, useEffect, useRef } from 'react';
import PlanCard from '../components/PlanCard';
import TrainerCard from '../components/TrainerCard';
import Footer from '../components/Footer';
import Features from '../components/Features';
import DurationModal from '../components/DurationModal';
import PaymentModal from '../components/PaymentModal';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getUserData, setUserData } from '../utils/userStorage';

const Home = () => {
  const navigate = useNavigate();
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return (
    <div className="home-page">

      {/* HERO SECTION */}
      <section id="hero" className="hero-section reveal fade-in-up">
        <div className="hero-bg-image"></div>
        <div className="hero-overlay"></div>
        <div className="container" style={styles.heroContainer}>
          <h1 style={styles.heroTitle}>Forge Your <span>Best Self</span></h1>
          <p style={styles.heroSubtitle}>Push your limits, break your boundaries, and build the physique you've always wanted at IronClad Gym.</p>
          <div style={styles.heroBtns}>
            <button onClick={() => navigate('/plans')} className="btn-primary interaction-btn" style={{ padding: '1rem 2rem', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>View Plans</button>
            <button onClick={() => navigate('/trainers')} className="btn-outline interaction-btn" style={{ padding: '1rem 2rem', fontSize: '1.1rem', cursor: 'pointer' }}>Meet Trainers</button>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <Features />

      <Footer />
    </div>
  );
};

const styles = {
  heroContainer: { position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '800px', padding: '0 32px' },
  heroTitle: { fontSize: '4.5rem', fontWeight: '800', color: 'white', lineHeight: '1.1', marginBottom: '1.5rem', textTransform: 'uppercase' },
  heroSubtitle: { fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.6' },
  heroBtns: { display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }
};

export default Home;
