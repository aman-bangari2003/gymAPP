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
      if (user.plan) {
        setSelectedPlan(user.plan);
      }
      if (user.membershipStatus) {
        setMembershipStatus(user.membershipStatus);
      }
    }
  }, []);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
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
    { title: 'Pro', features: ['Flexible hours access', 'All group classes', 'Monthy fitness assessment', 'Nutrition guide', 'Guest pass (1/month)'], isPopular: true },
    { title: 'Elite', features: ['Everything in Pro', '4 Personal training sessions', 'Recovery room access', 'Unlimited guest passes', 'Premium locker'], isPopular: false }
  ];

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="plans-page" style={{ paddingTop: '80px' }}>
      {/* TOAST NOTIFICATION */}
      <div className={`toast-notification ${toast.show ? 'show' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Bell size={20} color="var(--primary-color)" />
          <span style={{ fontWeight: '600', color: 'white' }}>{toast.message}</span>
        </div>
      </div>

      <section style={styles.section}>
        <div className="container" style={{ padding: '0 32px' }}>
          <motion.div 
            style={styles.sectionHeader}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUpVariant}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 style={styles.sectionTitle}>Choose Your <span>Plan</span></h2>
            <p style={styles.sectionSubtitle}>Flexible memberships to fit your fitness goals.</p>
          </motion.div>

          <div style={styles.grid3}>
            {plans.map((plan, idx) => {
              const tierMap = { 'Basic': 0, 'Pro': 1, 'Elite': 2 };
              return (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUpVariant}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
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
              );
            })}
          </div>
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
  section: { padding: '8rem 0' },
  sectionHeader: { textAlign: 'center', marginBottom: '4rem' },
  sectionTitle: { fontSize: '2.8rem', color: 'white', marginBottom: '1rem', textTransform: 'uppercase' },
  sectionSubtitle: { fontSize: '1.15rem', color: 'var(--text-muted)' },
  grid3: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'stretch' },
};

export default Plans;
