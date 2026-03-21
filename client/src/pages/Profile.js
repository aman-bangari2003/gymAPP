import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, ArrowLeft, ShieldCheck, ShieldAlert, Crown, Flame, Dumbbell, CalendarDays } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  const isActive = user.membershipStatus === 'Active';
  const memberSince = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  const getPlanIcon = () => {
    switch (user.plan) {
      case 'Elite': return <Crown size={24} color="#f59e0b" />; // Gold
      case 'Pro': return <Flame size={24} color="#ef4444" />;   // Red-Orange
      case 'Basic': return <Dumbbell size={24} color="#3b82f6" />; // Blue
      default: return null;
    }
  };

  return (
    <div className="container" style={styles.page}>
      
      <button className="back-btn" onClick={() => navigate('/home')} style={styles.backBtn}>
        <ArrowLeft size={20} />
        Back to Dashboard
      </button>

      <div style={styles.headerTitle}>
        <h1 style={styles.title}>Your <span>Profile</span></h1>
        <p style={styles.subtitle}>Manage your account and membership details</p>
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
        
        <div style={styles.detailsSection}>
          <div style={styles.detailCard}>
            <div style={styles.detailHeader}>
              <span style={styles.detailLabel}>Membership Status</span>
              {isActive ? (
                <div className="status-badge-active" style={styles.statusBadgeActive}>
                  <div className="pulse-dot"></div>
                  <ShieldCheck size={16} /> Active
                </div>
              ) : (
                <div style={styles.statusBadgeInactive}>
                  <ShieldAlert size={16} /> Inactive
                </div>
              )}
            </div>
            <div style={styles.detailBody}>
              <p style={styles.detailText}>
                {isActive 
                  ? "Your membership is currently active and in good standing." 
                  : "You do not have an active membership yet."}
              </p>
            </div>
          </div>

          <div style={styles.detailCard}>
             <div style={styles.detailHeader}>
              <span style={styles.detailLabel}>Current Plan</span>
             </div>
             <div style={styles.detailBody}>
                {user.plan ? (
                  <div style={styles.planBadgeContainer}>
                    <div style={styles.iconWrapper}>
                      {getPlanIcon()}
                    </div>
                    <div style={styles.planBadge}>{user.plan} Plan</div>
                  </div>
                ) : (
                  <p style={styles.noPlanText}>No plan selected</p>
                )}
             </div>
          </div>
        </div>
        
        <button className="btn-outline logout-btn" onClick={handleLogout} style={styles.logoutBtn}>
          <LogOut size={18} />
          Logout from account
        </button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: '7rem 20px 3rem',
    minHeight: 'calc(100vh - 80px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    color: 'var(--primary-color)',
    fontSize: '1.05rem',
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: '2.5rem',
    cursor: 'pointer',
    padding: '0.75rem 1.25rem',
    background: 'rgba(249, 115, 22, 0.1)',
    borderRadius: '8px',
    border: '1px solid rgba(249, 115, 22, 0.3)',
  },
  headerTitle: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  title: {
    fontSize: '3rem',
    color: 'white',
    lineHeight: '1.2',
  },
  subtitle: {
    color: 'var(--text-muted)',
    fontSize: '1.1rem',
    marginTop: '0.5rem',
  },
  card: {
    background: 'linear-gradient(145deg, var(--bg-card) 0%, rgba(15,15,15,0.9) 100%)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '20px',
    padding: '3.5rem',
    width: '100%',
    maxWidth: '680px',
    boxShadow: '0 25px 65px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
  },
  avatarSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '2.5rem',
    paddingBottom: '2.5rem',
    borderBottom: '1px solid var(--border-color)',
    marginBottom: '2.5rem',
  },
  avatarGlow: {
    background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.5), rgba(249, 115, 22, 0.05))',
    padding: '5px',
    borderRadius: '50%',
    boxShadow: '0 0 25px rgba(249, 115, 22, 0.15)',
  },
  avatar: {
    backgroundColor: 'var(--bg-darker)',
    borderRadius: '50%',
    width: '110px',
    height: '110px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '3px solid var(--bg-card)',
  },
  userNameBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  name: {
    fontSize: '2rem',
    color: 'white',
    fontWeight: '800',
    margin: 0,
    letterSpacing: '-0.5px',
  },
  email: {
    color: 'var(--text-muted)',
    fontSize: '1.05rem',
    margin: 0,
  },
  memberSince: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginTop: '8px',
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    fontWeight: '500',
    backgroundColor: 'var(--bg-darker)',
    padding: '4px 10px',
    borderRadius: '6px',
    width: 'fit-content',
    border: '1px solid var(--border-color)',
  },
  detailsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    marginBottom: '3.5rem',
  },
  detailCard: {
    backgroundColor: 'rgba(10, 10, 10, 0.4)',
    borderRadius: '16px',
    padding: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)',
  },
  detailHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  detailLabel: {
    color: 'var(--text-muted)',
    fontSize: '0.95rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
  },
  statusBadgeActive: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    color: '#4ade80',
    padding: '8px 16px',
    borderRadius: '30px',
    fontSize: '0.9rem',
    fontWeight: '700',
    border: '1px solid rgba(34, 197, 94, 0.25)',
  },
  statusBadgeInactive: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    color: '#f87171',
    padding: '8px 16px',
    borderRadius: '30px',
    fontSize: '0.9rem',
    fontWeight: '700',
    border: '1px solid rgba(239, 68, 68, 0.25)',
  },
  detailBody: {
    display: 'flex',
  },
  detailText: {
    color: 'var(--text-main)',
    fontSize: '1.05rem',
    lineHeight: '1.5',
    margin: 0,
  },
  planBadgeContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    backgroundColor: 'rgba(249, 115, 22, 0.08)',
    padding: '12px 24px',
    borderRadius: '12px',
    border: '1px solid rgba(249, 115, 22, 0.2)',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: '10px',
    borderRadius: '10px',
  },
  planBadge: {
    color: 'white',
    fontSize: '1.3rem',
    fontWeight: '800',
  },
  noPlanText: {
    color: 'var(--text-muted)',
    fontSize: '1rem',
    fontStyle: 'italic',
    margin: 0,
  },
  logoutBtn: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '1.2rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    borderRadius: '12px',
    letterSpacing: '0.5px'
  }
};

const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulseGlow {
    0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
    100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
  }
  .pulse-dot {
    width: 8px;
    height: 8px;
    background-color: #4ade80;
    border-radius: 50%;
    animation: pulseGlow 2s infinite;
  }
  .status-badge-active {
    box-shadow: 0 0 15px rgba(34, 197, 94, 0.15);
  }
  .back-btn { transition: all 0.3s ease !important; }
  .back-btn:hover { background: var(--primary-color) !important; color: white !important; transform: translateX(-4px) !important; }
  .profile-card { transition: transform 0.4s ease, box-shadow 0.4s ease; }
  .profile-card:hover { transform: translateY(-4px); box-shadow: 0 30px 70px rgba(0, 0, 0, 0.8), 0 0 60px rgba(249, 115, 22, 0.08); }
  .logout-btn:hover { background-color: rgba(239, 68, 68, 0.1) !important; border-color: #ef4444 !important; color: #ef4444 !important; }
`;
document.head.appendChild(styleSheet);

export default Profile;
