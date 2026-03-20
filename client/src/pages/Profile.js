import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, ArrowLeft } from 'lucide-react';

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

  return (
    <div className="container" style={styles.page}>
      <button className="back-btn" onClick={() => navigate('/home')} style={styles.backBtn}>
        <ArrowLeft size={20} />
        Back to Dashboard
      </button>
      <h1 style={styles.title}>Your <span>Profile</span></h1>
      
      <div style={styles.card}>
        <div style={styles.avatar}>
           <User size={64} color="var(--primary-color)" />
        </div>
        <div style={styles.info}>
          <div style={styles.field}>
            <span style={styles.label}>Name:</span>
            <span style={styles.value}>{user.name}</span>
          </div>
          <div style={styles.field}>
            <span style={styles.label}>Email:</span>
            <span style={styles.value}>{user.email}</span>
          </div>
          <div style={styles.field}>
            <span style={styles.label}>Membership Status:</span>
            <span style={styles.activeTag}>Active</span>
          </div>
        </div>
        
        <button className="btn-outline" onClick={handleLogout} style={styles.logoutBtn}>
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: '4rem 20px',
    minHeight: 'calc(100vh - 80px)', // adjust for navbar
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'var(--text-muted)',
    fontSize: '1rem',
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: '1rem',
    cursor: 'pointer',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    color: 'white',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '3rem',
    width: '100%',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
  },
  avatar: {
    backgroundColor: 'var(--bg-darker)',
    border: '1px solid var(--border-color)',
    borderRadius: '50%',
    width: '120px',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2rem',
  },
  info: {
    width: '100%',
    marginBottom: '2.5rem',
  },
  field: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 0',
    borderBottom: '1px solid var(--border-color)',
  },
  label: {
    color: 'var(--text-muted)',
    fontWeight: '500',
  },
  value: {
    color: 'white',
    fontWeight: '600',
  },
  activeTag: {
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    color: 'var(--primary-color)',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.875rem',
    fontWeight: '700',
  },
  logoutBtn: {
    width: '100%',
  }
};

const styleSheet = document.createElement("style");
styleSheet.innerText = `
  .back-btn:hover { color: white !important; }
`;
document.head.appendChild(styleSheet);

export default Profile;
