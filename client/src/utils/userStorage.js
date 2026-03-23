/**
 * Centralized utility for managing user data and workout tracking in localStorage.
 */

const STORAGE_KEY = 'user';

/**
 * Checks if the user is currently logged in.
 */
export const isUserLoggedIn = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

/**
 * Initializes or retrieves user data from localStorage.
 */
export const getUserData = () => {
  if (!isUserLoggedIn()) {
    return null;
  }

  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    const defaultData = {
      name: "User",
      weight: null,
      height: null,
      calories: 2000,
      streak: 0,
      goal: "muscle", // "muscle" | "fat_loss"
      experience: "beginner", // "beginner" | "intermediate" | "advanced"
      plan: null,
      expiryDate: null,
      membershipStatus: "Inactive",
      workoutCompletedToday: false,
      lastWorkoutDate: null
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return defaultData;
  }
  
  const userData = JSON.parse(data);
  return checkAndResetWorkout(userData);
};

/**
 * Updates the entire user data object.
 */
export const setUserData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  
  // Sync with userData legacy key if needed (for other components)
  const userDataStr = localStorage.getItem('userData');
  if (userDataStr) {
    const legacyData = JSON.parse(userDataStr);
    localStorage.setItem('userData', JSON.stringify({ ...legacyData, ...data }));
  }
};

/**
 * Gets the chronological weight history array.
 */
export const getWeightHistory = () => {
  const history = localStorage.getItem('weightHistory');
  if (history) {
    return JSON.parse(history);
  }
  const data = getUserData();
  const currentWeight = data ? data.weight : null;
  if (!currentWeight) return [];
  
  // Initialize with 5 entries of current weight if no history but weight exists
  const defaultHistory = Array(5).fill(currentWeight);
  localStorage.setItem('weightHistory', JSON.stringify(defaultHistory));
  return defaultHistory;
};

/**
 * Adds a new weight entry to the history array (max 7).
 */
export const addWeightToHistory = (weight) => {
  let history = getWeightHistory();
  history = [...history, weight].slice(-7);
  localStorage.setItem('weightHistory', JSON.stringify(history));
  return history;
};

/**
 * Updates a specific field in the user data object.
 */
export const updateUserField = (field, value) => {
  const data = getUserData();
  const updatedData = { ...data, [field]: value };
  setUserData(updatedData);

  if (field === 'weight') {
    addWeightToHistory(value);
  }

  return updatedData;
};

/**
 * Checks if the last workout date is from a previous day and resets today's completion status.
 */
const checkAndResetWorkout = (userData) => {
  if (!userData.lastWorkoutDate) return userData;

  const lastDate = new Date(userData.lastWorkoutDate);
  const today = new Date();

  // If different calendar date, reset today's completion status
  if (lastDate.toDateString() !== today.toDateString()) {
    userData.workoutCompletedToday = false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  }
  
  return userData;
};

/**
 * Handles workout completion and streak logic.
 */
export const completeWorkout = () => {
  const data = getUserData();
  const now = new Date();
  
  if (data.workoutCompletedToday) return data;

  let newStreak = (data.streak || 0);
  
  if (data.lastWorkoutDate) {
    const lastDate = new Date(data.lastWorkoutDate);
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    // If last workout was yesterday, increment streak
    if (lastDate.toDateString() === yesterday.toDateString()) {
      newStreak += 1;
    } 
    // If last workout was today (shouldn't happen here but safe), keep streak
    else if (lastDate.toDateString() === now.toDateString()) {
      // already handled by workoutCompletedToday check
    }
    // If they missed a day, reset streak to 1
    else {
      newStreak = 1;
    }
  } else {
    // First ever workout
    newStreak = 1;
  }

  const updatedData = {
    ...data,
    streak: newStreak,
    workoutCompletedToday: true,
    lastWorkoutDate: now.toISOString()
  };

  setUserData(updatedData);
  
  // Also sync legacy workoutStreak key for components that might still use it
  localStorage.setItem('workoutStreak', newStreak.toString());
  localStorage.setItem('todayWorkoutCompleted', 'true');
  
  return updatedData;
};

/**
 * Daily workout mapping.
 */
export const getWorkoutForDay = (dayIndex) => {
  const schedule = {
    0: { muscle: 'Rest', color: '#94a3b8', exercises: ['Full Body Stretch', 'Light Walk', 'Meditation'] },
    1: { muscle: 'Chest', color: '#f97316', exercises: ['Bench Press', 'Incline Dumbbell Flys', 'Push-ups', 'Chest Dips'] },
    2: { muscle: 'Back', color: '#3b82f6', exercises: ['Deadlifts', 'Pull-ups', 'Bent Over Rows', 'Lat Pulldowns'] },
    3: { muscle: 'Legs', color: '#22c55e', exercises: ['Squats', 'Leg Press', 'Lunges', 'Calf Raises'] },
    4: { muscle: 'Shoulders', color: '#a855f7', exercises: ['Military Press', 'Lateral Raises', 'Front Raises', 'Shrugs'] },
    5: { muscle: 'Arms', color: '#ec4899', exercises: ['Bicep Curls', 'Tricep Extensions', 'Hammer Curls', 'Skull Crushers'] },
    6: { muscle: 'Cardio', color: '#eab308', exercises: ['5km Run', 'HIIT Circuit', 'Jump Rope', 'Swimming'] },
  };
  
  return schedule[dayIndex] || schedule[0];
};

/**
 * Customizes exercises based on user goals.
 */
export const getSmartExercises = (muscle, goal) => {
  const workout = Object.values({
    0: { muscle: 'Rest', exercises: ['Stretch', 'Walk', 'Meditation'] },
    1: { muscle: 'Chest', exercises: ['Bench Press', 'Incline Fly', 'Push-ups'] },
    2: { muscle: 'Back', exercises: ['Pull-ups', 'Deadlift', 'Rows'] },
    3: { muscle: 'Legs', exercises: ['Squats', 'Lunges', 'Leg Press'] },
    4: { muscle: 'Shoulders', exercises: ['Shoulder Press', 'Lateral Raise', 'Front Raise'] },
    5: { muscle: 'Arms', exercises: ['Bicep Curl', 'Tricep Pushdown', 'Hammer Curl'] },
    6: { muscle: 'Cardio', exercises: ['Run', 'Cycle', 'HIIT'] },
  }).find(w => w.muscle === muscle);

  if (!workout) return [];

  // Goal-based refinement
  if (goal === 'fat_loss') {
    return [...workout.exercises.slice(0, 2), 'HIIT Burner'];
  } else if (goal === 'muscle') {
    return [...workout.exercises.slice(0, 2), 'Heavy Overload'];
  }
  
  return workout.exercises;
};
