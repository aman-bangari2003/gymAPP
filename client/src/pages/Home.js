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
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [tempViewingPlan, setTempViewingPlan] = useState(null);
  const [membershipStatus, setMembershipStatus] = useState('Inactive');
  const [toast, setToast] = useState({ show: false, message: '' });
  const [activeModal, setActiveModal] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const navigate = useNavigate();

  const observerRef = useRef(null);

  useEffect(() => {
    const user = getUserData();
    if (user) {
      if (user.plan) {
        setSelectedPlan(user.plan);
      }
      if (user.membershipStatus) {
        setMembershipStatus(user.membershipStatus);
      }
    }

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

  const handleOpenDurationModal = (planTitle) => {
    const user = getUserData();
    if (!user) {
      alert('Please log in to browse plans.');
      return;
    }
    setTempViewingPlan(planTitle);
    setActiveModal('duration');
  };

  const handleProceedToPayment = (planTitle, durationObj) => {
    setPaymentData({ 
      plan: planTitle, 
      label: durationObj.label, 
      price: durationObj.price, 
      months: durationObj.months 
    });
    setActiveModal('payment');
  };

  const handlePaymentSuccess = (planTitle, durationLabel) => {
    const user = getUserData();
    if (user) {
      const now = new Date();
      const expiry = new Date();
      expiry.setDate(now.getDate() + (paymentData.months * 30.44));

      const updatedUser = {
        ...user,
        membershipStatus: 'Active',
        plan: planTitle,
        duration: durationLabel,
        startDate: now.toISOString(),
        expiryDate: expiry.toISOString()
      };

      setUserData(updatedUser);

      setMembershipStatus('Active');
      setSelectedPlan(planTitle);
      setTempViewingPlan(null);
      setActiveModal(null);
      
      showToast('Payment Successful 🎉');
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    }
  };

  const plans = [
    { title: 'Basic', features: ['Access to gym equipment', 'Locker room access', '1 group class/week', 'Free Wi-Fi'], isPopular: false },
    { title: 'Pro', features: ['24/7 access', 'All group classes', 'Monthy fitness assessment', 'Nutrition guide', 'Guest pass (1/month)'], isPopular: true },
    { title: 'Elite', features: ['Everything in Pro', '4 Personal training sessions', 'Recovery room access', 'Unlimited guest passes', 'Premium locker'], isPopular: false }
  ];

  const trainers = [
    { name: 'Dolu', specialization: 'Strength & Conditioning', description: 'Former competitive powerlifter with 10 years of experience turning beginners into beasts.', imageUrl: '/dolu.jpg' },
    { name: 'Taarush', specialization: 'HIIT & Core', description: 'High energy coach guaranteed to make you sweat and build peak cardiovascular endurance.', imageUrl: '/taarush.png', imagePosition: 'top' },
    { name: 'Aman', specialization: 'Mobility & Recovery', description: 'Specializes in athletic longevity, fixing imbalances, and ensuring you can lift heavy, safely.', imageUrl: '/aman.jpg' }
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
      <section id="hero" className="hero-section reveal fade-in-up">
        <div className="hero-bg-image"></div>
        <div className="hero-overlay"></div>
        <div className="container" style={styles.heroContainer}>
          <h1 style={styles.heroTitle}>Forge Your <span>Best Self</span></h1>
          <p style={styles.heroSubtitle}>Push your limits, break your boundaries, and build the physique you've always wanted at IronClad Gym.</p>
          <div style={styles.heroBtns}>
            <a href="#membership" className="btn-primary interaction-btn" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>View Plans</a>
            <a href="#trainers" className="btn-outline interaction-btn" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Meet Trainers</a>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <Features />

      {/* MEMBERSHIP SECTION */}
      <section id="membership" style={styles.section} className="reveal fade-in-up delay-1">
        <div className="container" style={{ padding: '0 32px' }}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Choose Your <span>Plan</span></h2>
            <p style={styles.sectionSubtitle}>Flexible memberships to fit your fitness goals.</p>
          </div>

          <div style={styles.grid3}>
            {plans.map((plan, idx) => {
              const tierMap = { 'Basic': 0, 'Pro': 1, 'Elite': 2 };
              return (
                <PlanCard
                  key={idx}
                  {...plan}
                  onSelect={handleOpenDurationModal}
                  isSelected={selectedPlan === plan.title}
                  isPending={tempViewingPlan === plan.title}
                  isAnyPlanSelected={!!selectedPlan || !!tempViewingPlan}
                  membershipStatus={membershipStatus}
                  cardTier={tierMap[plan.title]}
                  currentPlanTier={selectedPlan ? tierMap[selectedPlan] : -1}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* TRAINERS SECTION */}
      <section id="trainers" style={{ ...styles.section, backgroundColor: 'var(--bg-darker)' }} className="reveal fade-in-up delay-2">
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
              <input className="form-input" type="text" id="name" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input className="form-input" type="email" id="email" placeholder="Your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="message">Message</label>
              <textarea className="form-input" id="message" rows="5" placeholder="How can we help?" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required style={{ resize: 'vertical' }} />
            </div>
            <button type="submit" className="btn-primary interaction-btn" style={{ width: '100%' }}>Send Message</button>
          </form>
        </div>
      </section>

      <Footer />

      {activeModal === 'duration' && (
        <DurationModal 
          plan={tempViewingPlan} 
          onClose={() => { setActiveModal(null); setTempViewingPlan(null); }} 
          onProceedToPayment={handleProceedToPayment} 
        />
      )}

      {activeModal === 'payment' && paymentData && (
        <PaymentModal 
          plan={paymentData.plan}
          duration={paymentData.label}
          price={paymentData.price}
          onClose={() => setActiveModal(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

const styles = {
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
  
  /* Hero Section Enhancements */
  .hero-section {
    min-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }
  
  .hero-bg-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=1920');
    background-size: cover;
    background-position: center;
    background-attachment: fixed; /* Parallax effect */
    filter: blur(2px) brightness(0.7);
    transform: scale(1.05); /* Slight zoom to hide blur edges */
    z-index: 1;
    animation: slowZoom 20s ease-out forwards;
  }

  @keyframes slowZoom {
    0% { transform: scale(1.05); }
    100% { transform: scale(1.12); }
  }
  
  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(0, 0, 0, 0.5) 0%, rgba(10, 10, 10, 0.95) 100%), linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(10,10,10,1) 100%);
    z-index: 2;
  }
  
  .hero-section .container {
    z-index: 3;
    position: relative;
  }
  
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
  
  /* Modal Overlays */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3000;
  }
  .modal-content {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    padding: 2.5rem;
    border-radius: 16px;
    width: 90%;
    max-width: 800px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    animation: modalPop 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .payment-modal { max-width: 500px; }
  
  @keyframes modalPop {
    0% { opacity: 0; transform: scale(0.95) translateY(20px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }

  /* Spin Animation */
  .spin { animation: spin 1s linear infinite; }
  @keyframes spin { 100% { transform: rotate(360deg); } }
`;
document.head.appendChild(styleSheet);

export default Home;
