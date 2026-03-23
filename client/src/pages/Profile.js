import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, ArrowLeft, ShieldCheck, ShieldAlert, Crown, Flame, Dumbbell, CalendarDays, Edit3, Target, Award as AwardIcon } from 'lucide-react';
import { getUserData, updateUserField, isUserLoggedIn } from '../utils/userStorage';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [timerColor, setTimerColor] = useState('gray');
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigate('/login');
      return;
    }
    const data = getUserData();
    if (data) {
      setUser(data);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (!user || (!user.expiryDate && user.membershipStatus === 'Active')) return;

    const calculateTimeLeft = () => {
      if (!user.expiryDate) return;
      
      const now = new Date();
      const expiry = new Date(user.expiryDate);
      const diffTime = expiry - now;

      if (diffTime <= 0) {
        setTimeLeft('Expired');
        setTimerColor('#ef4444');
        return;
      }

      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      let newColor = '#4ade80'; // Green
      if (diffDays < 5) newColor = '#f59e0b'; // Orange

      setTimeLeft(`⏳ ${diffDays} days left`);
      setTimerColor(newColor);
    };

    calculateTimeLeft();
    const timerId = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timerId);
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userData');
    localStorage.removeItem('weightHistory');
    localStorage.removeItem('workoutStreak');
    localStorage.removeItem('todayWorkoutCompleted');
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/login');
  };

  const handleCancelPlan = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    const updatedUser = { ...user, plan: null, membershipStatus: 'Inactive', duration: null, startDate: null, expiryDate: null };
    setUser(updatedUser);
    updateUserField('plan', null);
    updateUserField('membershipStatus', 'Inactive');
    updateUserField('expiryDate', null);
    
    setShowCancelModal(false);
    
    setTimeout(() => {
      navigate('/home#membership');
    }, 2000);
  };

  const handleFieldChange = (field, value) => {
    const updatedUser = updateUserField(field, value);
    setUser(updatedUser);
  };

  if (!user) return null;

  const isActive = user.membershipStatus === 'Active' && timeLeft !== 'Expired';
  const memberSince = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  const expiryFormatted = user.expiryDate ? new Date(user.expiryDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : null;

  const getPlanIcon = () => {
    switch (user.plan) {
      case 'Elite': return <Crown size={24} color="#f59e0b" />; 
      case 'Pro': return <Flame size={24} color="#ef4444" />;   
      case 'Basic': return <Dumbbell size={24} color="#3b82f6" />; 
      default: return null;
    }
  };

  return (
    <div className="container" style={styles.page}>
      
      <button className="back-btn sticky-back" onClick={() => navigate('/home')} style={styles.backBtnFixed}>
        <ArrowLeft size={20} />
        Back
      </button>

      <div style={styles.headerTitle}>
        <h1 style={styles.title}>Your <span>Profile</span></h1>
        <p style={styles.subtitle}>Personalize your fitness journey and account settings</p>
      </div>
      
      <div className="profile-card" style={styles.card}>
        <div style={styles.avatarSection}>
          <div style={styles.avatarGlow}>
            <div style={styles.avatar}>
              <User size={56} color="var(--primary-color)" />
            </div>
          </div>
          <div style={styles.userNameBlock}>
            <h2 style={styles.name}>{user.name}</h2>
            <p style={styles.email}>{user.email}</p>
            <div style={styles.memberSince}>
              <CalendarDays size={14} color="var(--text-muted)" />
              <span>Member since {memberSince}</span>
            </div>
          </div>
        </div>

        {/* PERSONAL STATS SECTION */}
        <div style={styles.statsEditGrid}>
          <div style={styles.editCard}>
            <div style={styles.editLabel}>
              <Edit3 size={16} /> <span>Current Weight (kg)</span>
            </div>
            <input 
              type="number" 
              style={styles.editInput} 
              value={user.weight !== undefined && user.weight !== null ? user.weight : ''} 
              placeholder="Enter weight"
              onChange={(e) => {
                const val = e.target.value;
                setUser({ ...user, weight: val });
              }}
              onBlur={(e) => {
                const val = e.target.value;
                if (!val) {
                  handleFieldChange('weight', null);
                } else {
                  let num = parseFloat(val);
                  if (isNaN(num) || num <= 0 || num < 20 || num > 300) {
                    handleFieldChange('weight', null);
                  } else {
                    handleFieldChange('weight', num);
                  }
                }
              }}
            />
          </div>
          <div style={styles.editCard}>
            <div style={styles.editLabel}>
              <Edit3 size={16} /> <span>Height (cm)</span>
            </div>
            <input 
              type="number" 
              style={styles.editInput} 
              value={user.height !== undefined && user.height !== null ? user.height : ''} 
              placeholder="Enter height"
              onChange={(e) => {
                const val = e.target.value;
                setUser({ ...user, height: val });
              }}
              onBlur={(e) => {
                const val = e.target.value;
                if (!val) {
                  handleFieldChange('height', null);
                } else {
                  let num = parseFloat(val);
                  if (isNaN(num)) num = null;
                  else if (num < 100) num = 100;
                  else if (num > 250) num = 250;
                  handleFieldChange('height', num);
                }
              }}
            />
          </div>
          <div style={styles.editCard}>
            <div style={styles.editLabel}>
              <Target size={16} /> <span>Fitness Goal</span>
            </div>
            <select 
              style={styles.editInput} 
              value={user.goal || 'muscle'} 
              onChange={(e) => handleFieldChange('goal', e.target.value)}
            >
              <option value="muscle">Muscle Gain</option>
              <option value="fat_loss">Fat Loss</option>
            </select>
          </div>
          <div style={styles.editCard}>
            <div style={styles.editLabel}>
              <AwardIcon size={16} /> <span>Experience</span>
            </div>
            <select 
              style={styles.editInput} 
              value={user.experience || 'beginner'} 
              onChange={(e) => handleFieldChange('experience', e.target.value)}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
        
        <div style={styles.detailsSection}>
          <div style={styles.detailCard}>
            <div style={styles.detailHeader}>
              <span style={styles.detailLabel}>Membership Status</span>
              {isActive ? (
                <div className="status-badge-active" style={styles.statusBadgeActive}>
                  <div className="pulse-dot"></div>
                  <ShieldCheck size={16} /> Active
                </div>
              ) : timeLeft === 'Expired' ? (
                <div style={styles.statusBadgeExpired}>
                  <ShieldAlert size={16} /> Expired
                </div>
              ) : (
                <div style={styles.statusBadgeInactive}>
                  <ShieldAlert size={16} /> Inactive
                </div>
              )}
            </div>
            <div style={styles.detailBody}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                <p style={styles.detailText}>
                  {isActive 
                    ? "Your membership is currently active and in good standing." 
                    : timeLeft === 'Expired'
                    ? "Your membership has expired. Please renew to continue using our services."
                    : "You do not have an active membership yet."}
                </p>
                {timeLeft === 'Expired' && (
                  <button className="btn-primary" onClick={() => navigate('/home#membership')} style={{ alignSelf: 'flex-start', padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                    Renew Plan
                  </button>
                )}
              </div>
            </div>
          </div>

           <div style={styles.detailCard}>
             <div style={styles.detailHeader}>
              <span style={styles.detailLabel}>Current Plan</span>
             </div>
             <div style={{...styles.detailBody, flexDirection: 'column', gap: '1rem'}}>
                {user.plan ? (
                  <>
                    <div style={styles.planBadgeContainer}>
                      <div style={styles.iconWrapper}>
                        {getPlanIcon()}
                      </div>
                      <div style={styles.planBadge}>{user.plan} Plan</div>
                      {user.duration && (
                        <div style={{ marginLeft: 'auto', backgroundColor: 'rgba(255,255,255,0.05)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {user.duration}
                        </div>
                      )}
                    </div>
                    {user.expiryDate && (
                      <div style={styles.validityContainer}>
                        <div>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '4px', margin: 0 }}>Valid till</p>
                          <p style={{ color: 'white', fontWeight: '600', fontSize: '1.1rem', margin: 0 }}>{expiryFormatted}</p>
                        </div>
                        <div style={{ color: timerColor, fontWeight: '700', backgroundColor: `${timerColor}22`, padding: '8px 16px', borderRadius: '12px', fontSize: '0.95rem', border: `1px solid ${timerColor}44`, display: 'flex', alignItems: 'center' }}>
                          {timeLeft}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <p style={styles.noPlanText}>No plan selected</p>
                )}
             </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
          {user.plan && user.membershipStatus !== 'Inactive' && (
            <button className="btn-outline cancel-btn" onClick={handleCancelPlan} style={{ ...styles.cancelBtn, flex: 1 }}>
               Cancel Membership
            </button>
          )}
          <button className="btn-outline logout-btn" onClick={handleLogout} style={{ ...styles.logoutBtn, flex: 1 }}>
            <LogOut size={18} />
            Logout Account
          </button>
        </div>
      </div>

      {showCancelModal && (
        <div className="modal-overlay" style={styles.modalOverlay} onClick={() => setShowCancelModal(false)}>
          <div className="modal-content cancel-modal" style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <ShieldAlert size={48} color="#ef4444" style={{ marginBottom: '1.5rem' }} />
            <h2 style={{ color: 'white', marginBottom: '1rem' }}>Cancel Membership?</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
              Are you sure you want to cancel your <strong>{user.plan} Plan</strong>? This action will immediately deactivate your access to premium features.
            </p>
            <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
              <button className="btn-primary" onClick={handleConfirmCancel} style={{ flex: 1, backgroundColor: '#ef4444', borderColor: '#ef4444' }}>
                Yes, Cancel
              </button>
              <button className="btn-outline" onClick={() => setShowCancelModal(false)} style={{ flex: 1 }}>
                Keep Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  page: { padding: '7rem 20px 3rem', minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)' },
  backBtnFixed: { position: 'fixed', top: '30px', left: '30px', zIndex: 1000, display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--primary-color)', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', padding: '0.75rem 1.25rem', background: 'rgba(10, 10, 10, 0.85)', backdropFilter: 'blur(12px)', borderRadius: '10px', border: '1px solid rgba(249, 115, 22, 0.3)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
  headerTitle: { textAlign: 'center', marginBottom: '3rem' },
  title: { fontSize: '3rem', color: 'white', lineHeight: '1.2' },
  subtitle: { color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem' },
  card: { background: 'linear-gradient(145deg, var(--bg-card) 0%, rgba(15,15,15,0.9) 100%)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '24px', padding: '3.5rem', width: '100%', maxWidth: '700px', boxShadow: '0 25px 65px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.05)' },
  avatarSection: { display: 'flex', alignItems: 'center', gap: '2rem', paddingBottom: '2.5rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2.5rem' },
  avatarGlow: { background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.5), rgba(249, 115, 22, 0.05))', padding: '5px', borderRadius: '50%', boxShadow: '0 0 25px rgba(249, 115, 22, 0.15)' },
  avatar: { backgroundColor: 'var(--bg-darker)', borderRadius: '50%', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid var(--bg-card)' },
  userNameBlock: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  name: { fontSize: '2rem', color: 'white', fontWeight: '800', margin: 0 },
  email: { color: 'var(--text-muted)', fontSize: '1rem', margin: 0 },
  memberSince: { display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '500', backgroundColor: 'var(--bg-darker)', padding: '4px 10px', borderRadius: '6px', width: 'fit-content', border: '1px solid var(--border-color)' },
  
  statsEditGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '3rem' },
  editCard: { backgroundColor: 'rgba(0,0,0,0.3)', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' },
  editLabel: { display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '1px' },
  editInput: { width: '100%', backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid rgba(249, 115, 22, 0.2)', color: 'white', fontSize: '1.1rem', fontWeight: '600', padding: '4px 0', outline: 'none', cursor: 'pointer' },
  
  detailsSection: { display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3.5rem' },
  detailCard: { backgroundColor: 'rgba(10, 10, 10, 0.4)', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(255, 255, 255, 0.05)', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)' },
  detailHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  detailLabel: { color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px' },
  statusBadgeActive: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(34, 197, 94, 0.12)', color: '#4ade80', padding: '8px 16px', borderRadius: '30px', fontSize: '0.9rem', fontWeight: '700', border: '1px solid rgba(34, 197, 94, 0.25)' },
  statusBadgeInactive: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', color: 'rgba(255, 255, 255, 0.6)', padding: '8px 16px', borderRadius: '30px', fontSize: '0.9rem', fontWeight: '700', border: '1px solid rgba(255, 255, 255, 0.1)' },
  statusBadgeExpired: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(239, 68, 68, 0.12)', color: '#f87171', padding: '8px 16px', borderRadius: '30px', fontSize: '0.9rem', fontWeight: '700', border: '1px solid rgba(239, 68, 68, 0.25)', boxShadow: '0 0 15px rgba(239, 68, 68, 0.1)' },
  detailBody: { display: 'flex' },
  detailText: { color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: '1.5', margin: 0 },
  planBadgeContainer: { display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: 'rgba(249, 115, 22, 0.08)', padding: '12px 24px', borderRadius: '12px', border: '1px solid rgba(249, 115, 22, 0.2)' },
  iconWrapper: { display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '10px' },
  planBadge: { color: 'white', fontSize: '1.3rem', fontWeight: '800' },
  validityContainer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' },
  noPlanText: { color: 'var(--text-muted)', fontSize: '1rem', fontStyle: 'italic', margin: 0 },
  logoutBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem', fontSize: '1rem', fontWeight: '600', borderRadius: '12px', transition: 'all 0.3s ease' },
  cancelBtn: { padding: '1rem', fontSize: '1rem', fontWeight: '600', borderRadius: '12px', color: '#94a3b8', border: '1px solid #334155', transition: 'all 0.3s ease' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000, animation: 'fadeIn 0.3s ease-out' },
  modalContent: { backgroundColor: 'var(--bg-card)', padding: '3rem', borderRadius: '24px', maxWidth: '450px', width: '90%', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)', animation: 'modalPopUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }
};

const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulseGlow { 0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); } 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); } }
  .pulse-dot { width: 8px; height: 8px; background-color: #4ade80; border-radius: 50%; animation: pulseGlow 2s infinite; }
  .status-badge-active { box-shadow: 0 0 15px rgba(34, 197, 94, 0.15); }
  .back-btn:hover { background: var(--primary-color) !important; color: white !important; transform: translateX(-4px) !important; scale: 1.05; }
  .profile-card:hover { border-color: rgba(249, 115, 22, 0.3); }
  .logout-btn:hover { background-color: rgba(239, 68, 68, 0.1) !important; border-color: #ef4444 !important; color: #ef4444 !important; }
  .cancel-btn:hover { background-color: rgba(239, 68, 68, 0.1) !important; border-color: #ef4444 !important; color: #ef4444 !important; transform: translateY(-2px); }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes modalPopUp { from { opacity: 0; transform: scale(0.9) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
  
  select option { background-color: var(--bg-card); color: white; }
`;
document.head.appendChild(styleSheet);

export default Profile;
