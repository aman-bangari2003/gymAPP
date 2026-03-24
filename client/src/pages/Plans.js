import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PlanCard from '../components/PlanCard';
import DurationModal from '../components/DurationModal';
import PaymentModal from '../components/PaymentModal';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getUserData, setUserData, isUserLoggedIn } from '../utils/userStorage';

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [tempViewingPlan, setTempViewingPlan] = useState(null);
  const [membershipStatus, setMembershipStatus] = useState('Inactive');
  const [toast, setToast] = useState({ show: false, message: '' });
  const [activeModal, setActiveModal] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUserData();
    if (user) {
      if (user.plan) setSelectedPlan(user.plan);
      if (user.membershipStatus) setMembershipStatus(user.membershipStatus);
    }
  }, []);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleOpenDurationModal = (planTitle) => {
    if (!isUserLoggedIn()) {
      alert('Please log in to browse plans.');
      navigate('/login');
      return;
    }
    setTempViewingPlan(planTitle);
    setActiveModal('duration');
  };

  const handleProceedToPayment = (planTitle, durationObj) => {
    setPaymentData({ plan: planTitle, label: durationObj.label, price: durationObj.price, months: durationObj.months });
    setActiveModal('payment');
  };

  const handlePaymentSuccess = (planTitle, durationLabel) => {
    const user = getUserData();
    if (user) {
      const now = new Date();
      const expiry = new Date();
      expiry.setDate(now.getDate() + (paymentData.months * 30.44));
      const updatedUser = {
        ...user, membershipStatus: 'Active', plan: planTitle,
        duration: durationLabel, startDate: now.toISOString(), expiryDate: expiry.toISOString()
      };
      setUserData(updatedUser);
      setMembershipStatus('Active');
      setSelectedPlan(planTitle);
      setTempViewingPlan(null);
      setActiveModal(null);
      showToast('Payment Successful 🎉');
      setTimeout(() => navigate('/profile'), 1500);
    }
  };

  const plans = [
    { title: 'Basic', features: ['Access to gym equipment', 'Locker room access', '1 group class/week', 'Free Wi-Fi'], isPopular: false },
    { title: 'Pro', features: ['Flexible hours access', 'All group classes', 'Monthly fitness assessment', 'Nutrition guide', 'Guest pass (1/month)'], isPopular: true },
    { title: 'Elite', features: ['Everything in Pro', '4 Personal training sessions', 'Recovery room access', 'Unlimited guest passes', 'Premium locker'], isPopular: false },
  ];

  const tierMap = { Basic: 0, Pro: 1, Elite: 2 };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="plans-page" style={styles.page}>
      {/* Animated Background Gradient Orbs */}
      <div style={styles.bgOrb1} />
      <div style={styles.bgOrb2} />
      <div style={styles.bgOrb3} />

      {/* TOAST */}
      <div className={`toast-notification ${toast.show ? 'show' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Bell size={20} color="var(--primary-color)" />
          <span style={{ fontWeight: '600', color: 'white' }}>{toast.message}</span>
        </div>
      </div>

      <section style={styles.section}>
        <div className="container" style={{ padding: '0 32px', position: 'relative', zIndex: 1 }}>

          {/* Section Header */}
          <motion.div
            style={styles.sectionHeader}
            initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUpVariant}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <span style={styles.eyebrow}>Membership Plans</span>
            <h2 style={styles.sectionTitle}>
              Choose Your <span style={{ color: 'var(--primary-color)' }}>Plan</span>
            </h2>
            <p style={styles.sectionSubtitle}>
              Flexible memberships designed to fit your fitness journey and goals.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div style={styles.grid3}>
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.title}
                initial="hidden" whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeUpVariant}
                transition={{ duration: 0.5, delay: idx * 0.12, ease: 'easeOut' }}
                style={{ height: '100%' }}
              >
                <PlanCard
                  {...plan}
                  onSelect={handleOpenDurationModal}
                  isSelected={selectedPlan === plan.title}
                  isPending={tempViewingPlan === plan.title}
                  isAnyPlanSelected={!!selectedPlan || !!tempViewingPlan}
                  membershipStatus={membershipStatus}
                  cardTier={tierMap[plan.title]}
                  currentPlanTier={selectedPlan ? tierMap[selectedPlan] : -1}
                />
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <motion.p
            style={styles.footerNote}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.5 }}
          >
            All plans include a <strong style={{ color: 'white' }}>7-day free trial</strong>. Cancel anytime. No hidden fees.
          </motion.p>
        </div>
      </section>

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
  page: {
    paddingTop: '80px',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '100vh',
  },
  bgOrb1: {
    position: 'fixed', width: '600px', height: '600px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)',
    top: '-150px', left: '-150px', pointerEvents: 'none', zIndex: 0,
    animation: 'orbFloat1 12s ease-in-out infinite alternate',
  },
  bgOrb2: {
    position: 'fixed', width: '500px', height: '500px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(124,140,255,0.07) 0%, transparent 70%)',
    bottom: '0px', right: '-100px', pointerEvents: 'none', zIndex: 0,
    animation: 'orbFloat2 15s ease-in-out infinite alternate',
  },
  bgOrb3: {
    position: 'fixed', width: '300px', height: '300px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%)',
    top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 0,
  },
  section: { padding: '5rem 0 6rem', position: 'relative' },
  sectionHeader: { textAlign: 'center', marginBottom: '4rem' },
  eyebrow: {
    display: 'inline-block',
    color: 'var(--primary-color)', fontSize: '0.8rem', fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '1rem',
    background: 'rgba(249,115,22,0.12)', padding: '5px 18px', borderRadius: '20px',
    border: '1px solid rgba(249,115,22,0.3)',
  },
  sectionTitle: {
    fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', marginBottom: '1rem',
    textTransform: 'uppercase', fontWeight: '900', letterSpacing: '-1px',
    marginTop: '1rem',
  },
  sectionSubtitle: { fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2.5rem' },
  toggleWrapper: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: '12px', flexWrap: 'wrap',
  },
  toggleLabel: { fontSize: '0.95rem', fontWeight: '600', transition: 'color 0.3s ease' },
  toggleTrack: {
    width: '58px', height: '30px', borderRadius: '15px',
    background: 'linear-gradient(135deg, #f97316, #ff4500)',
    border: 'none', cursor: 'pointer', position: 'relative',
    boxShadow: '0 0 14px rgba(249,115,22,0.5)',
    flexShrink: 0,
  },
  toggleThumb: {
    position: 'absolute', top: '2px', width: '26px', height: '26px',
    borderRadius: '50%', background: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
    transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  saveBadge: {
    background: 'linear-gradient(135deg, rgba(34,197,94,0.25), rgba(34,197,94,0.1))',
    color: '#4ade80', fontSize: '0.78rem', fontWeight: '700',
    padding: '5px 14px', borderRadius: '20px',
    border: '1px solid rgba(34,197,94,0.4)',
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem', alignItems: 'stretch',
  },
  footerNote: {
    textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem',
    marginTop: '3rem', letterSpacing: '0.2px',
  },
};

// Inject orb animation keyframes
if (typeof document !== 'undefined' && !document.getElementById('plans-page-styles')) {
  const s = document.createElement('style');
  s.id = 'plans-page-styles';
  s.textContent = `
    @keyframes orbFloat1 {
      from { transform: translate(0, 0) scale(1); }
      to   { transform: translate(60px, 80px) scale(1.1); }
    }
    @keyframes orbFloat2 {
      from { transform: translate(0, 0) scale(1); }
      to   { transform: translate(-50px, -60px) scale(1.15); }
    }
    @keyframes pulse-cta {
      0%, 100% { box-shadow: 0 4px 20px rgba(249,115,22,0.4); }
      50%        { box-shadow: 0 4px 40px rgba(249,115,22,0.8), 0 0 20px rgba(249,115,22,0.4); }
    }
  `;
  document.head.appendChild(s);
}

export default Plans;
