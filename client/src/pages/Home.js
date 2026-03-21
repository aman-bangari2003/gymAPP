import React, { useState, useEffect, useRef } from 'react';
import PlanCard from '../components/PlanCard';
import TrainerCard from '../components/TrainerCard';
import Footer from '../components/Footer';
import { Bell } from 'lucide-react';

const Home = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '' });

  // Intersection Observer for scroll animations
  const observerRef = useRef(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.plan) {
        setSelectedPlan(user.plan);
      }
    }

    // Set up observer for reveal animations
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

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    showToast('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleSelectPlan = (planTitle) => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      user.membershipStatus = 'Active';
      user.plan = planTitle;
      localStorage.setItem('user', JSON.stringify(user));
      
      const userDataStr = localStorage.getItem('userData');
      if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        if (userData.email === user.email) {
          userData.membershipStatus = 'Active';
          userData.plan = planTitle;
          localStorage.setItem('userData', JSON.stringify(userData));
        }
      }
      setSelectedPlan(planTitle);
      showToast(`${planTitle} Plan Activated 🚀`);
    } else {
      alert('Please log in to select a plan.');
    }
  };

  const plans = [
    { title: 'Basic', price: '29', features: ['Access to gym equipment', 'Locker room access', '1 group class/week', 'Free Wi-Fi'], isPopular: false },
    { title: 'Pro', price: '59', features: ['24/7 access', 'All group classes', 'Monthy fitness assessment', 'Nutrition guide', 'Guest pass (1/month)'], isPopular: true },
    { title: 'Elite', price: '99', features: ['Everything in Pro', '4 Personal training sessions', 'Recovery room access', 'Unlimited guest passes', 'Premium locker'], isPopular: false }
  ];

  const trainers = [
    { name: 'Marcus Rush', specialization: 'Strength & Conditioning', description: 'Former competitive powerlifter with 10 years of experience turning beginners into beasts.' },
    { name: 'Sarah Jenks', specialization: 'HIIT & Core', description: 'High energy coach guaranteed to make you sweat and build peak cardiovascular endurance.' },
    { name: 'David Chen', specialization: 'Mobility & Recovery', description: 'Specializes in athletic longevity, fixing imbalances, and ensuring you can lift heavy, safely.' }
  ];

  return (
    <div className="home-page">
      
      {/* TOAST NOTIFICATION */}
      <div className={`toast-notification ${toast.show ? 'show' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Bell size={20} color="var(--primary-color)" />
          <span style={{ fontWeight: '600', color: 'white' }}>{toast.message}</span>
        </div>
      </div>

      {/* HERO SECTION */}
      <section id="hero" style={styles.hero} className="reveal fade-in-up">
        <div className="container" style={styles.heroContainer}>
          <h1 style={styles.heroTitle}>Forge Your <span>Best Self</span></h1>
          <p style={styles.heroSubtitle}>Push your limits, break your boundaries, and build the physique you've always wanted at IronClad Gym.</p>
          <div style={styles.heroBtns}>
            <a href="#membership" className="btn-primary interaction-btn" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>View Plans</a>
            <a href="#trainers" className="btn-outline interaction-btn" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Meet Trainers</a>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP SECTION */}
      <section id="membership" style={styles.section} className="reveal fade-in-up delay-1">
        <div className="container" style={{ padding: '0 32px' }}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Choose Your <span>Plan</span></h2>
            <p style={styles.sectionSubtitle}>Flexible memberships to fit your fitness goals.</p>
          </div>
          
          <div style={styles.grid3}>
            {plans.map((plan, idx) => (
              <PlanCard 
                key={idx} 
                {...plan} 
                onSelect={handleSelectPlan} 
                isSelected={selectedPlan === plan.title}
                isAnyPlanSelected={!!selectedPlan}
              />
            ))}
          </div>
        </div>
      </section>

      {/* TRAINERS SECTION */}
      <section id="trainers" style={{...styles.section, backgroundColor: 'var(--bg-darker)'}} className="reveal fade-in-up delay-2">
        <div className="container" style={{ padding: '0 32px' }}>
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
      <section id="contact" style={styles.section} className="reveal fade-in-up">
        <div className="container" style={styles.contactContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Get In <span>Touch</span></h2>
            <p style={styles.sectionSubtitle}>Have questions? We're here to help you start your journey.</p>
          </div>
          
          <form style={styles.contactForm} onSubmit={handleContactSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Name</label>
              <input className="form-input" type="text" id="name" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input className="form-input" type="email" id="email" placeholder="Your email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="message">Message</label>
              <textarea className="form-input" id="message" rows="5" placeholder="How can we help?" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required style={{ resize: 'vertical' }} />
            </div>
            <button type="submit" className="btn-primary interaction-btn" style={{ width: '100%' }}>Send Message</button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const styles = {
  hero: { minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at center, rgba(38, 38, 38, 0.8) 0%, rgba(10, 10, 10, 1) 100%)', position: 'relative', overflow: 'hidden' },
  heroContainer: { position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '800px', padding: '0 32px' },
  heroTitle: { fontSize: '4.5rem', fontWeight: '800', color: 'white', lineHeight: '1.1', marginBottom: '1.5rem', textTransform: 'uppercase' },
  heroSubtitle: { fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.6' },
  heroBtns: { display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' },
  section: { padding: '8rem 0' },
  sectionHeader: { textAlign: 'center', marginBottom: '4rem' },
  sectionTitle: { fontSize: '2.8rem', color: 'white', marginBottom: '1rem', textTransform: 'uppercase' },
  sectionSubtitle: { fontSize: '1.15rem', color: 'var(--text-muted)' },
  grid3: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'stretch' },
  contactContainer: { maxWidth: '650px', margin: '0 auto', padding: '0 32px' },
  contactForm: { backgroundColor: 'var(--bg-card)', padding: '3.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)' }
};

const styleSheet = document.createElement("style");
styleSheet.innerText = `
  h1 span, h2 span { color: var(--primary-color); }
  html { scroll-behavior: smooth; }
  
  /* Toast Notification */
  .toast-notification {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: var(--bg-card);
    border-left: 4px solid var(--primary-color);
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(249, 115, 22, 0.1);
    transform: translateX(120%);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 2000;
  }
  .toast-notification.show {
    transform: translateX(0);
    opacity: 1;
  }

  /* Reveal Animations */
  .reveal { opacity: 0; transform: translateY(40px); transition: all 1s ease-out; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .delay-1 { transition-delay: 0.1s; }
  .delay-2 { transition-delay: 0.2s; }
`;
document.head.appendChild(styleSheet);

export default Home;
