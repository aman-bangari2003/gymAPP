import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Activity, ShieldCheck, Users, Trophy, Clock, ArrowRight } from 'lucide-react';
import Features from '../components/Features';
import './Home.css';

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

  const showcaseImages = [
    { url: '/gym_interior_strength_1774284019119.png', label: 'Strength Zone' },
    { url: '/gym_interior_cardio_1774284131795.png', label: 'Cardio Suite' },
    { url: '/gym_interior_functional_2_1774284295686.png', label: 'Functional Training' },
    { url: '/gym_interior_strength_1774284019119.png', label: 'Elite Recovery' } // reuse for 4th or find another
  ];

  return (
    <div className="home-page">

      <section id="hero" className="hero-section reveal fade-in-up">
        <div className="hero-bg-image" style={{ backgroundImage: "url('/gym_interior_strength_1774284019119.png')" }}></div>
        <div className="hero-overlay"></div>
        <div className="container" style={styles.heroContainer}>
          <h1 style={styles.heroTitle}>Forge Your <span>Best Self</span></h1>
          <p style={styles.heroSubtitle}>Push your limits, break your boundaries, and build the physique you've always wanted at IronClad Gym.</p>
          <div style={styles.heroBtns}>
            <button onClick={() => navigate('/signup')} className="btn-primary interaction-btn" style={{ padding: '1rem 2rem', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>Join Now</button>
            <button onClick={() => navigate('/plans')} className="btn-outline interaction-btn" style={{ padding: '1rem 2rem', fontSize: '1.1rem', cursor: 'pointer' }}>View Plans</button>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats-ribbon reveal">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>500+</h3>
              <p>Active Members</p>
            </div>
            <div className="stat-item">
              <h3>20+</h3>
              <p>Elite Trainers</p>
            </div>
            <div className="stat-item">
              <h3>Flexible</h3>
              <p>Workout Hours</p>
            </div>
            <div className="stat-item">
              <h3>100+</h3>
              <p>MACHINES</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <div className="reveal">
        <Features />
      </div>

      {/* GYM SHOWCASE SECTION */}
      <section className="gym-showcase reveal" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Explore <span>Our Space</span></h2>
            <p className="section-subtitle">A world-class environment designed for performance, comfort, and results. Take a look at your new second home.</p>
          </div>
          <div className="showcase-grid">
            {showcaseImages.map((img, i) => (
              <div key={i} className="showcase-item">
                <div className="showcase-img" style={{ backgroundImage: `url(${img.url})` }}></div>
                <div className="showcase-overlay"></div>
                <div style={styles.showcaseLabel}>{img.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPMENT SECTION */}
      <section className="equipment-section reveal" style={{ padding: '5rem 0', backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Top <span>Equipment</span></h2>
            <p className="section-subtitle">We invest in the best gear so you can get the best results. Professional grade machines for every goal.</p>
          </div>
          <div className="equipment-grid">
            <div className="equipment-card">
              <div className="equipment-image" style={{ backgroundImage: 'url(/gym_equipment_strength_2_1774284346800.png)' }}></div>
              <div className="equipment-icon-wrapper">
                <Dumbbell size={28} color="var(--primary-color)" />
              </div>
              <h3 className="equipment-title">Strength Training</h3>
              <p className="equipment-desc">Premium plate-loaded machines and power racks designed for maximum muscle engagement and safety.</p>
            </div>
            <div className="equipment-card">
              <div className="equipment-image" style={{ backgroundImage: 'url(/gym_equipment_cardio_2_1774284564229.png)' }}></div>
              <div className="equipment-icon-wrapper">
                <Activity size={28} color="var(--primary-color)" />
              </div>
              <h3 className="equipment-title">Cardio Machines</h3>
              <p className="equipment-desc">Top-of-the-line treadmills, cycles, and stair-masters with interactive tracking and scenic routes.</p>
            </div>
            <div className="equipment-card">
              <div className="equipment-image" style={{ backgroundImage: 'url(/gym_interior_strength_1774284019119.png)' }}></div>
              <div className="equipment-icon-wrapper">
                <Trophy size={28} color="var(--primary-color)" />
              </div>
              <h3 className="equipment-title">Free Weights</h3>
              <p className="equipment-desc">Extensive range of dumbbells up to 60kg, Olympic bars, and kettlebells in our dedicated iron paradise.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="cta-section reveal">
        <div className="container">
          <h2 className="cta-title">Ready to <span>Transform</span> Your Body?</h2>
          <p className="section-subtitle" style={{ marginBottom: '3rem' }}>Join IronClad today and get access to our elite facility, world-class trainers, and custom workout plans.</p>
          <div className="cta-btns">
            <button onClick={() => navigate('/signup')} className="btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              Start Your Journey <ArrowRight size={20} />
            </button>
            <button onClick={() => navigate('/plans')} className="btn-outline" style={{ padding: '1.2rem 3rem', fontSize: '1.2rem' }}>
              View Membership Plans
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

const styles = {
  heroContainer: { position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '800px', padding: '100px 32px 0 32px' },
  heroTitle: { fontSize: '4.5rem', fontWeight: '800', color: 'white', lineHeight: '1.1', marginBottom: '1.5rem', textTransform: 'uppercase' },
  heroSubtitle: { fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.6' },
  heroBtns: { display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' },
  showcaseLabel: { position: 'absolute', bottom: '20px', left: '20px', color: 'white', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', zIndex: 5 }
};

export default Home;
