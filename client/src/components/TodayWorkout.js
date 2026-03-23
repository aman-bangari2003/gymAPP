import React, { useState, useEffect } from 'react';
import { Dumbbell, CheckCircle2 } from 'lucide-react';
import { getUserData, completeWorkout, getWorkoutForDay, getSmartExercises } from '../utils/userStorage';

const TodayWorkout = ({ user: userProp }) => {
  const [user, setUser] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [workout, setWorkout] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [reps, setReps] = useState('4 x 12 Reps');

  const loadWorkoutData = (dataToUse) => {
    const data = dataToUse || getUserData();
    if (!data) return;

    setUser(data);
    setIsCompleted(data.workoutCompletedToday);
    
    // Reps Logic
    const exp = data.experience || 'beginner';
    if (exp === 'beginner') {
      setReps('3 x 10 Reps');
    } else if (exp === 'advanced') {
      setReps('5 x 15 Reps');
    } else {
      setReps('4 x 12 Reps');
    }

    // Get workout based on current day
    const currentDay = new Date().getDay();
    const dayWorkout = getWorkoutForDay(currentDay);
    setWorkout(dayWorkout);

    // Smart Touch: Refine exercises based on goal
    const tailoredExercises = getSmartExercises(dayWorkout.muscle, data.goal);
    setExercises(tailoredExercises);
  };

  useEffect(() => {
    // Priority: use the prop if provided for instant updates
    if (userProp) {
      loadWorkoutData(userProp);
    }
  }, [userProp?.goal, userProp?.experience, userProp?.workoutCompletedToday]);

  useEffect(() => {
    // If no prop (fallback), load initially and sync with storage
    if (!userProp) loadWorkoutData();

    const handleSync = () => loadWorkoutData();
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, []);

  const handleMarkDone = () => {
    if (isCompleted) return;
    
    const updatedData = completeWorkout();
    setIsCompleted(updatedData.workoutCompletedToday);
    
    // Optional: Trigger a refresh or event for other components to sync streak
    window.dispatchEvent(new Event('storage'));
  };

  if (!workout) return null;

  return (
    <div className="dash-card" style={styles.card}>
      <div style={styles.cardHeader}>
        <div style={styles.cardIconWrapper}>
          <Dumbbell size={24} color="var(--primary-color)" />
        </div>
        <div>
          <h2 style={styles.cardTitle}>Today's <span>Workout</span></h2>
          <div style={styles.badgeContainer}>
            <span style={styles.badge}>
              {user?.goal === 'fat_loss' ? 'Goal: Fat Loss 🔥' : 'Goal: Muscle 💪'}
            </span>
            <span style={styles.badge}>
              Level: {user?.experience ? user.experience.charAt(0).toUpperCase() + user.experience.slice(1) : 'Beginner'}
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0.5rem 0 0', fontWeight: '600' }}>
            Focus Area: <span style={{ color: workout.color, fontWeight: '700' }}>{workout.muscle}</span>
          </p>
        </div>
      </div>

      <div style={styles.exerciseList}>
        {exercises.map((ex, i) => (
          <div key={i} style={styles.exerciseItem}>
            <div style={{...styles.dot, backgroundColor: workout.color}}></div>
            <span style={styles.exerciseText}>{ex}</span>
            <span style={styles.reps}>{reps}</span>
          </div>
        ))}
      </div>

      <button 
        className={isCompleted ? "btn-primary disabled-btn" : "btn-primary interaction-btn"}
        style={{
          ...styles.doneBtn, 
          ...(isCompleted ? styles.completedBtn : {})
        }}
        onClick={handleMarkDone}
        disabled={isCompleted}
      >
        <CheckCircle2 size={18} />
        {isCompleted ? "Completed ✅" : "Mark as Done"}
      </button>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'var(--bg-card)',
    padding: '2rem',
    borderRadius: '16px',
    border: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    height: '420px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
  },
  cardIconWrapper: {
    width: '48px',
    height: '48px',
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: '1.4rem',
    color: 'white',
    margin: 0,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  badgeContainer: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '0.4rem',
  },
  badge: {
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: '2px 8px',
    borderRadius: '4px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    border: '1px solid rgba(255,255,255,0.03)',
  },
  exerciseList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    flex: 1,
    overflowY: 'auto',
  },
  exerciseItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  exerciseText: {
    color: 'white',
    fontWeight: '600',
    fontSize: '0.95rem',
    flex: 1,
  },
  reps: {
    color: 'var(--text-muted)',
    fontSize: '0.85rem',
    fontWeight: '500',
  },
  doneBtn: {
    width: '100%',
    marginTop: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '1.2rem',
    fontWeight: '700',
    transition: 'all 0.3s ease',
  },
  completedBtn: {
    backgroundColor: '#22c55e', // Green
    borderColor: '#22c55e',
    cursor: 'not-allowed',
    opacity: 0.9,
    transform: 'none !important',
  }
};

export default TodayWorkout;
