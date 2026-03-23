import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Flame, 
  Calendar, 
  Clock, 
  Activity, 
  Award,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import Footer from '../components/Footer';
import TodayWorkout from '../components/TodayWorkout';
import ProgressChart from '../components/ProgressChart';
import { getUserData } from '../utils/userStorage';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [timerColor, setTimerColor] = useState('gray');
  const [streak, setStreak] = useState(0);

  const workoutSchedule = [
    { day: 'Sunday', muscle: 'Rest', color: '#94a3b8', exercises: ['Full Body Stretch', 'Light Walk', 'Meditation'] },
    { day: 'Monday', muscle: 'Chest', color: '#f97316', exercises: ['Bench Press', 'Incline Dumbbell Flys', 'Push-ups', 'Chest Dips'] },
    { day: 'Tuesday', muscle: 'Back', color: '#3b82f6', exercises: ['Deadlifts', 'Pull-ups', 'Bent Over Rows', 'Lat Pulldowns'] },
    { day: 'Wednesday', muscle: 'Legs', color: '#22c55e', exercises: ['Squats', 'Leg Press', 'Lunges', 'Calf Raises'] },
    { day: 'Thursday', muscle: 'Shoulders', color: '#a855f7', exercises: ['Military Press', 'Lateral Raises', 'Front Raises', 'Shrugs'] },
    { day: 'Friday', muscle: 'Arms', color: '#ec4899', exercises: ['Bicep Curls', 'Tricep Extensions', 'Hammer Curls', 'Skull Crushers'] },
    { day: 'Saturday', muscle: 'Cardio', color: '#eab308', exercises: ['5km Run', 'HIIT Circuit', 'Jump Rope', 'Swimming'] },
  ];

  const currentDayIndex = new Date().getDay();
  const todayWorkout = workoutSchedule[currentDayIndex];

  useEffect(() => {
    const loadData = () => {
      const userData = getUserData();
      if (userData) {
        setUser(userData);
        setStreak(userData.streak || 0);
      } else {
        navigate('/login');
      }
    };

    loadData();

    // Listen for storage changes
    const handleStorageChange = () => {
      loadData();
    };
    window.addEventListener('storage', handleStorageChange);
    
    // Smooth sync
    const interval = setInterval(handleStorageChange, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [navigate]);

  useEffect(() => {
    if (!user || !user.expiryDate) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const expiry = new Date(user.expiryDate);
      const diffTime = expiry - now;

      if (diffTime <= 0) {
        setTimeLeft('Expired');
        setTimerColor('#ef4444');
        return;
      }

      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      let newColor = '#4ade80';
      if (diffDays < 5) newColor = '#f59e0b';

      setTimeLeft(`⏳ ${diffDays} days left`);
      setTimerColor(newColor);
    };

    calculateTimeLeft();
    const timerId = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timerId);
  }, [user]);

  if (!user) return null;

  return (
    <div className="dashboard-page" style={styles.pageWrapper}>
      <div style={styles.contentWrapper}>
        <div className="container" style={styles.content}>
          
          {/* WELCOME HEADER */}
          <header style={styles.header}>
            <div>
              <h1 style={styles.welcomeTitle}>Welcome back, <span>{user.name.split(' ')[0]}!</span></h1>
              <p style={styles.welcomeSubtitle}>Ready to crush today's {todayWorkout.muscle} session?</p>
            </div>
            <div style={styles.dateDisplay}>
              <Calendar size={20} color="var(--primary-color)" />
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>
          </header>

          {/* TWO-COLUMN UPPER GRID */}
          <div style={styles.upperGrid}>
            <TodayWorkout />
            <ProgressChart />
          </div>

          {/* PROGRESS & STATUS STATS GRID */}
          <div style={styles.statsGrid}>
            <div className="dash-card stat-card" style={styles.statCard}>
              <div style={styles.statHeader}>
                <Activity size={20} color="#3b82f6" />
                <span>Current Weight</span>
              </div>
              <div style={styles.statValue}>{user.weight || 75} <span>kg</span></div>
              <div style={{...styles.statChange, color: '#4ade80'}}>Goal: {user.goal === 'fat_loss' ? 'Fat Loss' : 'Muscle Gain'}</div>
            </div>
            <div className="dash-card stat-card" style={styles.statCard}>
              <div style={styles.statHeader}>
                <Flame size={20} color="#f97316" />
                <span>Calories Burned</span>
              </div>
              <div style={styles.statValue}>{user.calories || 2450} <span>kcal</span></div>
              <div style={{...styles.statChange, color: '#4ade80'}}>Level: {user.experience}</div>
            </div>
            <div className="dash-card stat-card" style={styles.statCard}>
              <div style={styles.statHeader}>
                <Award size={20} color="#eab308" />
                <span>Workout Streak</span>
              </div>
              <div style={styles.statValue}>{streak} <span>days</span></div>
              <div style={{...styles.statChange, color: 'var(--text-muted)'}}>Keep it up! ⚡</div>
            </div>
            
            {/* INTEGRATED MEMBERSHIP CARD */}
            <div className="dash-card stat-card" style={{...styles.statCard, cursor: 'pointer'}} onClick={() => navigate('/profile')}>
              <div style={styles.statHeader}>
                <ShieldCheck size={20} color="var(--primary-color)" />
                <span>Membership Status</span>
              </div>
              <div style={{...styles.statValue, fontSize: '1.6rem', marginTop: '0.5rem'}}>{user.plan || 'No Plan'}</div>
              <div style={{...styles.statChange, color: timerColor}}>{timeLeft || 'Inactive'}</div>
            </div>
          </div>

          {/* WEEKLY PLAN */}
          <div className="dash-card" style={styles.weeklyPlanCard}>
            <div style={styles.cardHeader}>
              <div style={styles.cardIconWrapper}>
                <Calendar size={24} color="var(--primary-color)" />
              </div>
              <h2 style={styles.cardTitle}>Weekly <span>Workout Plan</span></h2>
            </div>
            <div style={styles.weeklyGrid}>
              {workoutSchedule.map((day, i) => {
                const isToday = i === currentDayIndex;
                return (
                  <div key={i} style={{...styles.dayCard, ...(isToday ? styles.todayCard : {})}}>
                    <p style={{...styles.dayName, color: isToday ? 'white' : 'var(--text-muted)'}}>{day.day.substring(0, 3)}</p>
                    <div style={{...styles.dot, backgroundColor: day.color}}></div>
                    <p style={{...styles.muscleName, color: isToday ? 'var(--primary-color)' : 'white'}}>{day.muscle}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  pageWrapper: { minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-dark)' },
  contentWrapper: { flex: 1, paddingTop: '80px' },
  content: { padding: '3rem 20px', maxWidth: '1200px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' },
  welcomeTitle: { fontSize: '2.5rem', fontWeight: '800', color: 'white', margin: 0, textTransform: 'uppercase' },
  welcomeSubtitle: { color: 'var(--text-muted)', fontSize: '1.1rem', margin: '0.5rem 0 0' },
  dateDisplay: { display: 'flex', alignItems: 'center', gap: '0.8rem', backgroundColor: 'var(--bg-card)', padding: '0.75rem 1.25rem', borderRadius: '10px', border: '1px solid var(--border-color)', color: 'white', fontWeight: '600' },
  upperGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginBottom: '2.5rem' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' },
  weeklyPlanCard: { backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', marginTop: '2.5rem' },
  cardHeader: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' },
  cardIconWrapper: { width: '48px', height: '48px', backgroundColor: 'rgba(249, 115, 22, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontSize: '1.5rem', color: 'white', margin: 0 },
  statCard: { backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  statHeader: { display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem', fontWeight: '600' },
  statValue: { fontSize: '2rem', fontWeight: '800', color: 'white', marginBottom: '0.25rem' },
  statChange: { fontSize: '0.85rem', fontWeight: '600' },
  weeklyGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1rem' },
  dayCard: { backgroundColor: 'rgba(0,0,0,0.2)', padding: '1.5rem 1rem', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.03)', transition: 'all 0.3s ease' },
  todayCard: { borderColor: 'var(--primary-color)', backgroundColor: 'rgba(249, 115, 22, 0.05)', transform: 'scale(1.05)', boxShadow: '0 0 20px rgba(249, 115, 22, 0.1)' },
  dayName: { fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.75rem' },
  muscleName: { fontSize: '1rem', fontWeight: '700', margin: '0.75rem 0 0' },
  dot: { width: '8px', height: '8px', borderRadius: '50%', margin: '0 auto' }
};

const styleSheet = document.createElement("style");
styleSheet.innerText = `
  span { color: var(--primary-color); }
  .dash-card { transition: all 0.4s ease; }
  .dash-card:hover { transform: translateY(-5px); border-color: rgba(249, 115, 22, 0.3); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
  .stat-card:hover { border-color: rgba(255,255,255,0.1); }
  @media (max-width: 768px) {
    .dashboard-column { grid-column: span 1 !important; }
  }
`;
document.head.appendChild(styleSheet);

export default Dashboard;
