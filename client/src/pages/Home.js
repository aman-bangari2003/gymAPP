import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Activity, ShieldCheck, Users, Trophy, Clock, ArrowRight } from 'lucide-react';
import Features from '../components/Features';
import { motion } from 'framer-motion';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const showcaseImages = [
    { url: '/gym_interior_strength_1774284019119.png', label: 'Strength Zone' },
    { url: '/gym_interior_cardio_1774284131795.png', label: 'Cardio Suite' },
    { url: '/gym_interior_functional_2_1774284295686.png', label: 'Functional Training' },
    { url: '/gym_interior_strength_1774284019119.png', label: 'Elite Recovery' }
  ];

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const fadeVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <div className="home-page">

      {/* HERO SECTION */}
      <section id="hero" className="hero-section">
        <div className="hero-bg-image" style={{ backgroundImage: "url('/gym_interior_strength_1774284019119.png')" }}></div>
        <div className="hero-overlay"></div>
        <div className="container" style={styles.heroContainer}>
          <motion.h1 
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpVariant} transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            style={styles.heroTitle}
          >
            Forge Your <span>Best Self</span>
          </motion.h1>
          <motion.p 
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpVariant} transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            style={styles.heroSubtitle}
          >
            Push your limits, break your boundaries, and build the physique you've always wanted at IronClad Gym.
          </motion.p>
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeVariant} transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            style={styles.heroBtns}
          >
            <button onClick={() => navigate('/signup')} className="btn-primary interaction-btn" style={{ padding: '1rem 2rem', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>Join Now</button>
            <button onClick={() => navigate('/plans')} className="btn-outline interaction-btn" style={{ padding: '1rem 2rem', fontSize: '1.1rem', cursor: 'pointer' }}>View Plans</button>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats-ribbon">
        <div className="container">
          <div className="stats-grid">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpVariant} transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }} className="stat-item">
              <h3>500+</h3>
              <p>Active Members</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpVariant} transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }} className="stat-item">
              <h3>20+</h3>
              <p>Elite Trainers</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpVariant} transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }} className="stat-item">
              <h3>Flexible</h3>
              <p>Workout Hours</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpVariant} transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }} className="stat-item">
              <h3>100+</h3>
              <p>MACHINES</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <Features />

      {/* GYM SHOWCASE SECTION */}
      <section className="gym-showcase" style={{ padding: '5rem 0' }}>
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUpVariant}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="section-title">Explore <span>Our Space</span></h2>
            <p className="section-subtitle">A world-class environment designed for performance, comfort, and results. Take a look at your new second home.</p>
          </motion.div>
          <div className="showcase-grid">
            {showcaseImages.map((img, i) => (
              <motion.div 
                key={i} 
                className="showcase-item"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUpVariant}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              >
                <div className="showcase-img" style={{ backgroundImage: `url(${img.url})` }}></div>
                <div className="showcase-overlay"></div>
                <div style={styles.showcaseLabel}>{img.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPMENT SECTION */}
      <section className="equipment-section" style={{ padding: '5rem 0', backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUpVariant}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="section-title">Top <span>Equipment</span></h2>
            <p className="section-subtitle">We invest in the best gear so you can get the best results. Professional grade machines for every goal.</p>
          </motion.div>
          
          <div className="equipment-grid">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpVariant} transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }} className="equipment-card">
              <div className="equipment-image" style={{ backgroundImage: 'url(/gym_equipment_strength_2_1774284346800.png)' }}></div>
              <div className="equipment-icon-wrapper">
                <Dumbbell size={28} color="var(--primary-color)" />
              </div>
              <h3 className="equipment-title">Strength Training</h3>
              <p className="equipment-desc">Premium plate-loaded machines and power racks designed for maximum muscle engagement and safety.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpVariant} transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }} className="equipment-card">
              <div className="equipment-image" style={{ backgroundImage: 'url(/gym_equipment_cardio_2_1774284564229.png)' }}></div>
              <div className="equipment-icon-wrapper">
                <Activity size={28} color="var(--primary-color)" />
              </div>
              <h3 className="equipment-title">Cardio Machines</h3>
              <p className="equipment-desc">Top-of-the-line treadmills, cycles, and stair-masters with interactive tracking and scenic routes.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpVariant} transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }} className="equipment-card">
              <div className="equipment-image" style={{ backgroundImage: 'url(/gym_interior_strength_1774284019119.png)' }}></div>
              <div className="equipment-icon-wrapper">
                <Trophy size={28} color="var(--primary-color)" />
              </div>
              <h3 className="equipment-title">Free Weights</h3>
              <p className="equipment-desc">Extensive range of dumbbells up to 60kg, Olympic bars, and kettlebells in our dedicated iron paradise.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="cta-section">
        <div className="container">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpVariant} transition={{ duration: 0.5, ease: 'easeOut' }} className="cta-title">Ready to <span>Transform</span> Your Body?</motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpVariant} transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }} className="section-subtitle" style={{ marginBottom: '3rem' }}>Join IronClad today and get access to our elite facility, world-class trainers, and custom workout plans.</motion.p>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeVariant} transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }} className="cta-btns">
            <button onClick={() => navigate('/signup')} className="btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              Start Your Journey <ArrowRight size={20} />
            </button>
            <button onClick={() => navigate('/plans')} className="btn-outline" style={{ padding: '1.2rem 3rem', fontSize: '1.2rem' }}>
              View Membership Plans
            </button>
          </motion.div>
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
