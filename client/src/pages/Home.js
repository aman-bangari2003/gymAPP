import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Activity, ShieldCheck, Users, Trophy, Clock, ArrowRight, Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Features from '../components/Features';
import TrainerCard from '../components/TrainerCard';
import { motion, AnimatePresence } from 'framer-motion';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeShowcase, setActiveShowcase] = useState(0);
  const [activeEquipment, setActiveEquipment] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handlePrevShowcase = () => setActiveShowcase((prev) => (prev === 0 ? showcaseImages.length - 1 : prev - 1));
  const handleNextShowcase = () => setActiveShowcase((prev) => (prev === showcaseImages.length - 1 ? 0 : prev + 1));

  const showcaseImages = [
    { url: '/gym_interior_strength_1774284019119.png', label: 'Strength Zone' },
    { url: '/gym_interior_cardio_1774284131795.png', label: 'Cardio Suite' },
    { url: '/gym_interior_functional_2_1774284295686.png', label: 'Functional Training' },
    { url: '/gym_interior_strength_1774284019119.png', label: 'Elite Recovery' }
  ];

  const testimonials = [
    { name: 'Rahul Sharma', review: 'IronClad transformed my life! The trainers push you to your absolute limits.', rating: 5 },
    { name: 'Neha Verma', review: 'Best facility in the city. The equipment is top-tier and the community is amazing.', rating: 5 },
    { name: 'Amit Patel', review: 'Lost 15kg in 4 months. The personalized diet and workout plans are totally worth it.', rating: 5 }
  ];

  const trainers = [
    { name: 'Dolu', specialization: 'Strength & Conditioning', description: '10+ years experience. Former competitive powerlifter.', imageUrl: '/dolu.jpg', imagePosition: 'top' },
    { name: 'Taarush', specialization: 'HIIT & Core', description: '5+ years experience. High energy cardiovascular coach.', imageUrl: '/taarush.png', imagePosition: 'top' },
    { name: 'Aman', specialization: 'Mobility & Recovery', description: 'Specializes in athletic longevity and fixing imbalances.', imageUrl: '/aman.jpg', imagePosition: 'top' }
  ];

  const successStories = [
    { title: 'Fat Loss Transformation', subtitle: 'Lost 12kg in 4 months through consistent training', image: '/transformation_fatloss.png' },
    { title: 'Muscle Gain Transformation', subtitle: 'Built lean muscle and improved strength in 16 weeks', image: '/transformation_muscle.png' }
  ];

  const equipmentItems = [
    { title: 'Strength Training', desc: 'Premium plate-loaded machines and power racks designed for maximum muscle engagement and safety.', image: '/gym_equipment_strength_2_1774284346800.png', icon: <Dumbbell size={28} color="var(--primary-color)" /> },
    { title: 'Cardio Machines', desc: 'Top-of-the-line treadmills, cycles, and stair-masters with interactive tracking and scenic routes.', image: '/gym_equipment_cardio_2_1774284564229.png', icon: <Activity size={28} color="var(--primary-color)" /> },
    { title: 'Free Weights', desc: 'Extensive range of dumbbells up to 60kg, Olympic bars, and kettlebells in our dedicated iron paradise.', image: '/gym_interior_strength_1774284019119.png', icon: <Trophy size={28} color="var(--primary-color)" /> }
  ];

  const handlePrevEquipment = () => setActiveEquipment((prev) => (prev === 0 ? equipmentItems.length - 1 : prev - 1));
  const handleNextEquipment = () => setActiveEquipment((prev) => (prev === equipmentItems.length - 1 ? 0 : prev + 1));

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

      {/* TESTIMONIAL SECTION */}
      <section className="testimonials-section" style={{ padding: '5rem 0', backgroundColor: 'var(--bg-darker)' }}>
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpVariant} transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="section-title">REAL RESULTS. <span>REAL PEOPLE.</span></h2>
            <p className="section-subtitle">Don't just take our word for it. See what our community has to say about the IronClad experience.</p>
          </motion.div>
          {isMobile ? (
            <div className="testimonials-slider-container">
              <div className="slider-wrapper">
                <button className="slider-btn prev" onClick={handlePrevTestimonial} aria-label="Previous testimonial">
                  <ChevronLeft size={24} color="var(--primary-color)" />
                </button>

                <div className="slider-viewport">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTestimonial}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="testimonial-card mobile-slider-card"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={(e, { offset }) => {
                        if (offset.x < -50) handleNextTestimonial();
                        else if (offset.x > 50) handlePrevTestimonial();
                      }}
                    >
                      <div style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>
                        <Quote fill="var(--primary-color)" size={32} />
                      </div>
                      <p className="testimonial-review">"{testimonials[activeTestimonial].review}"</p>
                      <div className="testimonial-rating">
                        {[...Array(testimonials[activeTestimonial].rating)].map((_, idx) => (
                          <Star key={idx} fill="#facc15" color="#facc15" size={18} />
                        ))}
                      </div>
                      <h4 className="testimonial-name">- {testimonials[activeTestimonial].name}</h4>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <button className="slider-btn next" onClick={handleNextTestimonial} aria-label="Next testimonial">
                  <ChevronRight size={24} color="var(--primary-color)" />
                </button>
              </div>

              <div className="slider-dots">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    className={`slider-dot ${idx === activeTestimonial ? 'active' : ''}`}
                    onClick={() => setActiveTestimonial(idx)}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="testimonials-grid">
              {testimonials.map((testi, i) => (
                <motion.div 
                  key={i} 
                  className="testimonial-card"
                  initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpVariant} transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                >
                  <div style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>
                    <Quote fill="var(--primary-color)" size={32} />
                  </div>
                  <p className="testimonial-review">"{testi.review}"</p>
                  <div className="testimonial-rating">
                    {[...Array(testi.rating)].map((_, idx) => (
                      <Star key={idx} fill="#facc15" color="#facc15" size={18} />
                    ))}
                  </div>
                  <h4 className="testimonial-name">- {testi.name}</h4>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* TRAINING SEC - NEW MODULE */}
      <section className="trainers-home-section" style={{ padding: '5rem 0' }}>
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpVariant} transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="section-title">TRAIN WITH <span>THE BEST</span></h2>
            <p className="section-subtitle">Our elite coaching staff is dedicated to pushing you beyond your perceived limits.</p>
          </motion.div>
          <div className="trainers-grid">
            {trainers.map((trainer, i) => (
              <motion.div 
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpVariant} transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              >
                <TrainerCard {...trainer} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES SECTION */}
      <section className="transformations-section" style={{ padding: '5rem 0', backgroundColor: 'var(--bg-darker)' }}>
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpVariant} transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="section-title">SUCCESS <span>STORIES</span></h2>
            <p className="section-subtitle">Real results achieved through absolute dedication and expert guidance.</p>
          </motion.div>
          <div className="transformations-grid">
            {successStories.map((story, i) => (
              <motion.div 
                key={i} 
                className="transformation-card"
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpVariant} transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
              >
                <div className="transformation-image-single">
                  <img src={story.image} alt={story.title} />
                </div>
                <div className="transformation-info">
                  <h3>{story.title}</h3>
                  <p>{story.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
          {isMobile ? (
            <div className="testimonials-slider-container">
              <div className="slider-wrapper">
                <button className="slider-btn prev" onClick={handlePrevShowcase} aria-label="Previous image">
                  <ChevronLeft size={24} color="var(--primary-color)" />
                </button>
                <div className="slider-viewport showcase-slider-viewport">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeShowcase}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="showcase-item mobile-showcase-card"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={(e, { offset }) => {
                        if (offset.x < -50) handleNextShowcase();
                        else if (offset.x > 50) handlePrevShowcase();
                      }}
                    >
                      <div className="showcase-img" style={{ backgroundImage: `url(${showcaseImages[activeShowcase].url})` }}></div>
                      <div className="showcase-overlay"></div>
                      <div style={styles.showcaseLabel}>{showcaseImages[activeShowcase].label}</div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <button className="slider-btn next" onClick={handleNextShowcase} aria-label="Next image">
                  <ChevronRight size={24} color="var(--primary-color)" />
                </button>
              </div>
              <div className="slider-dots">
                {showcaseImages.map((_, idx) => (
                  <button key={idx} className={`slider-dot ${idx === activeShowcase ? 'active' : ''}`} onClick={() => setActiveShowcase(idx)} aria-label={`Go to image ${idx + 1}`} />
                ))}
              </div>
            </div>
          ) : (
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
          )}
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
          {isMobile ? (
            <div className="testimonials-slider-container">
              <div className="slider-wrapper">
                <button className="slider-btn prev" onClick={handlePrevEquipment} aria-label="Previous equipment">
                  <ChevronLeft size={24} color="var(--primary-color)" />
                </button>
                <div className="slider-viewport">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeEquipment}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="equipment-card mobile-slider-card"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={(e, { offset }) => {
                        if (offset.x < -50) handleNextEquipment();
                        else if (offset.x > 50) handlePrevEquipment();
                      }}
                    >
                      <div className="equipment-image" style={{ backgroundImage: `url(${equipmentItems[activeEquipment].image})` }}></div>
                      <div className="equipment-icon-wrapper">
                        {equipmentItems[activeEquipment].icon}
                      </div>
                      <h3 className="equipment-title">{equipmentItems[activeEquipment].title}</h3>
                      <p className="equipment-desc">{equipmentItems[activeEquipment].desc}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <button className="slider-btn next" onClick={handleNextEquipment} aria-label="Next equipment">
                  <ChevronRight size={24} color="var(--primary-color)" />
                </button>
              </div>
              <div className="slider-dots">
                {equipmentItems.map((_, idx) => (
                  <button key={idx} className={`slider-dot ${idx === activeEquipment ? 'active' : ''}`} onClick={() => setActiveEquipment(idx)} aria-label={`Go to equipment ${idx + 1}`} />
                ))}
              </div>
            </div>
          ) : (
            <div className="equipment-grid">
              {equipmentItems.map((item, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpVariant} transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }} className="equipment-card">
                  <div className="equipment-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                  <div className="equipment-icon-wrapper">
                    {item.icon}
                  </div>
                  <h3 className="equipment-title">{item.title}</h3>
                  <p className="equipment-desc">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="cta-section">
        <div className="container">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpVariant} transition={{ duration: 0.5, ease: 'easeOut' }} className="cta-title">Ready to <span>Transform</span> Your Body?</motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpVariant} transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }} className="section-subtitle" style={{ marginBottom: '1.5rem' }}>Join IronClad today and get access to our elite facility, world-class trainers, and custom workout plans.</motion.p>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUpVariant} transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }} className="cta-offer">
            Try IronClad Free for 7 Days
          </motion.p>
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
