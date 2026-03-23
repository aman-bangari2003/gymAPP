import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Flame, 
  Calendar, 
  Clock, 
  Activity, 
  Award,
  TrendingUp,
  ShieldCheck,
  Edit3,
  Target
} from 'lucide-react';
import TodayWorkout from '../components/TodayWorkout';
import ProgressChart from '../components/ProgressChart';
import { getUserData, updateUserField } from '../utils/userStorage';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [timerColor, setTimerColor] = useState('gray');
  const [streak, setStreak] = useState(0);
  const [saveStatus, setSaveStatus] = useState(''); // 'Saving...', 'Saved ✔', or ''
  const hasInitialized = useRef(false);

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
      const storedData = getUserData();
      if (storedData) {
        setStreak(storedData.streak || 0);

        if (!hasInitialized.current) {
          // Initial full load including input strings
          setUserData({
            ...storedData,
            weight: storedData.weight !== null ? String(storedData.weight) : '',
            height: storedData.height !== null ? String(storedData.height) : ''
          });
          hasInitialized.current = true;
        }
      } else {
        navigate('/login');
      }
    };

    loadData();

    // Still sync if they change it in another tab, but it won't trigger every 5s
    const handleStorageChange = () => loadData();
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [navigate]);

  useEffect(() => {
    if (!userData || !userData.expiryDate) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const expiry = new Date(userData.expiryDate);
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
  }, [userData?.expiryDate]);

  if (!userData) return null;

  const handleSave = () => {
    setSaveStatus('Saving...');
    
    // Parse numeric inputs for storage
    const weightNum = userData.weight === '' ? null : parseFloat(userData.weight);
    const heightNum = userData.height === '' ? null : parseFloat(userData.height);
    
    const finalData = {
      ...userData,
      weight: weightNum,
      height: heightNum
    };

    // Persist to localStorage
    updateUserField('weight', weightNum);
    updateUserField('height', heightNum);
    updateUserField('goal', userData.goal);
    updateUserField('experience', userData.experience);
    
    setSaveStatus('Saved ✔');
    setTimeout(() => setSaveStatus(''), 3000);
    
    // Trigger a sync for other components
    window.dispatchEvent(new Event('storage'));
  };

  const getBmiData = () => {
    const h = parseFloat(userData.height);
    const w = parseFloat(userData.weight);
    
    if (isNaN(h) || isNaN(w) || h <= 0) {
      return { value: null, status: 'Enter data to calculate', color: 'var(--text-muted)' };
    }
    const heightInMeters = h / 100;
    const bmi = (w / (heightInMeters * heightInMeters)).toFixed(1);
    
    let status = 'Normal ✅';
    let color = '#4ade80';
    if (bmi < 18.5) {
      status = 'Underweight';
      color = '#3b82f6';
    } else if (bmi >= 25 && bmi < 30) {
      status = 'Overweight ⚠️';
      color = '#f59e0b';
    } else if (bmi >= 30) {
      status = 'Obese ❌';
      color = '#ef4444';
    }
    
    return { value: bmi, status, color };
  };

  const bmiData = getBmiData();

  return (
    <div className="dashboard-page" style={styles.pageWrapper}>
      <div style={styles.contentWrapper}>
        <div className="container" style={styles.content}>
          
          {/* WELCOME HEADER */}
          <header style={styles.header}>
            <div>
              <h1 style={styles.welcomeTitle}>Welcome back, <span>{userData.name ? userData.name.split(' ')[0] : 'User'}!</span></h1>
              <p style={styles.welcomeSubtitle}>Ready to crush today's {todayWorkout.muscle} session?</p>
            </div>
            <div style={styles.dateDisplay}>
              <Calendar size={20} color="var(--primary-color)" />
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>
          </header>

          {/* TWO-COLUMN UPPER GRID */}
          <div style={styles.upperGrid}>
            <TodayWorkout user={userData} />
            <ProgressChart />
          </div>

          {/* FITNESS CONTROL PANEL */}
          <div className="dash-card" style={styles.controlPanel}>
            <div style={styles.cardHeader}>
              <div style={styles.cardIconWrapper}>
                <Edit3 size={24} color="var(--primary-color)" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <h2 style={styles.cardTitle}>Fitness <span>Control Panel</span></h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {saveStatus && <span style={{ color: '#4ade80', fontWeight: '700', fontSize: '0.9rem' }}>{saveStatus}</span>}
                  <button onClick={handleSave} className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>Save Changes</button>
                </div>
              </div>
            </div>
            <div style={styles.inputGrid}>
              <div style={styles.editCard}>
                <div style={styles.editLabel}>Weight (kg)</div>
                <input 
                  type="number" 
                  style={styles.editInput} 
                  value={userData.weight} 
                  placeholder="0.0" 
                  onChange={(e) => setUserData({...userData, weight: e.target.value})}
                />
              </div>
              <div style={styles.editCard}>
                <div style={styles.editLabel}>Height (cm)</div>
                <input 
                  type="number" 
                  style={styles.editInput} 
                  value={userData.height} 
                  placeholder="0" 
                  onChange={(e) => setUserData({...userData, height: e.target.value})}
                />
              </div>
              <div style={styles.editCard}>
                <div style={styles.editLabel}>Goal</div>
                <select 
                  style={styles.editInput} 
                  value={userData.goal} 
                  onChange={(e) => setUserData({...userData, goal: e.target.value})}
                >
                  <option value="muscle">Muscle Gain</option>
                  <option value="fat_loss">Fat Loss</option>
                </select>
              </div>
              <div style={styles.editCard}>
                <div style={styles.editLabel}>Experience</div>
                <select 
                  style={styles.editInput} 
                  value={userData.experience} 
                  onChange={(e) => setUserData({...userData, experience: e.target.value})}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>

          {/* PROGRESS & STATUS STATS GRID */}
          <div style={styles.statsGrid}>
            <div className="dash-card stat-card" style={styles.statCard}>
              <div style={styles.statHeader}>
                <Activity size={20} color="#3b82f6" />
                <span>Current Weight</span>
              </div>
              {userData.weight ? (
                <>
                  <div style={styles.statValue}>{userData.weight} <span>kg</span></div>
                  <div style={{...styles.statChange, color: '#4ade80'}}>Goal: {userData.goal === 'fat_loss' ? 'Fat Loss' : 'Muscle Gain'}</div>
                </>
              ) : (
                <>
                  <div style={styles.statValue}><span style={{fontSize: '1.2rem', color: 'var(--text-muted)'}}>No weight data</span></div>
                  <div style={{...styles.statChange, color: '#3b82f6', cursor: 'pointer', textDecoration: 'underline'}} onClick={() => document.getElementById('weight-input')?.focus()}>
                    Add your weight
                  </div>
                </>
              )}
            </div>
            <div className="dash-card stat-card" style={styles.statCard}>
              <div style={styles.statHeader}>
                <Flame size={20} color="#f97316" />
                <span>Calories Burned</span>
              </div>
              <div style={styles.statValue}>{userData.calories || 2450} <span>kcal</span></div>
              <div style={{...styles.statChange, color: '#4ade80'}}>Level: {userData.experience || 'Beginner'}</div>
            </div>
            <div className="dash-card stat-card" style={styles.statCard}>
              <div style={styles.statHeader}>
                <Award size={20} color="#eab308" />
                <span>Workout Streak</span>
              </div>
              <div style={styles.statValue}>{streak} <span>days</span></div>
              <div style={{...styles.statChange, color: 'var(--text-muted)'}}>Keep it up! ⚡</div>
            </div>
            
            {/* BMI CARD */}
            <div className="dash-card stat-card" style={styles.statCard}>
              <div style={styles.statHeader}>
                <Activity size={20} color="#8b5cf6" />
                <span>BMI</span>
              </div>
              <div style={styles.statValue}>{bmiData.value || '--'}</div>
              <div style={{...styles.statChange, color: bmiData.color}}>Status: {bmiData.status}</div>
            </div>
            {/* INTEGRATED MEMBERSHIP CARD */}
            <div className="dash-card stat-card" style={{...styles.statCard, cursor: 'pointer'}} onClick={() => navigate('/profile')}>
              <div style={styles.statHeader}>
                <ShieldCheck size={20} color="var(--primary-color)" />
                <span>Membership Status</span>
              </div>
              <div style={{...styles.statValue, fontSize: '1.6rem', marginTop: '0.5rem'}}>{userData.plan || 'No Plan'}</div>
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
  controlPanel: { backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', marginBottom: '2.5rem' },
  inputGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '1rem' },
  editCard: { backgroundColor: 'rgba(0,0,0,0.2)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' },
  editLabel: { color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '1px' },
  editInput: { width: '100%', backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid rgba(249, 115, 22, 0.2)', color: 'white', fontSize: '1.1rem', fontWeight: '600', padding: '4px 0', outline: 'none' },
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
