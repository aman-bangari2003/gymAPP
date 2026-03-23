import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Plans from './pages/Plans';
import Trainers from './pages/Trainers';
import Contact from './pages/Contact';
import FindUs from './pages/FindUs';
import Footer from './components/Footer';
import { getUserData, isUserLoggedIn } from './utils/userStorage';

function PageTitleManager() {
  const location = useLocation();
  
  useEffect(() => {
    const titles = {
      '/': 'Home',
      '/plans': 'Plans',
      '/trainers': 'Trainers',
      '/contact': 'Contact',
      '/find-us': 'Find Us',
      '/dashboard': 'Dashboard',
      '/profile': 'Profile',
      '/login': 'Login',
      '/signup': 'Signup'
    };
    
    const pageTitle = titles[location.pathname] || 'Elite Fitness';
    document.title = `IronClad | ${pageTitle}`;
  }, [location]);

  return null;
}

function App() {
  useEffect(() => {
    // Top-level cleanup for auth consistency
    if (!isUserLoggedIn()) {
      localStorage.removeItem('user');
      localStorage.removeItem('userData');
      localStorage.removeItem('weightHistory');
      localStorage.removeItem('workoutStreak');
      localStorage.removeItem('todayWorkoutCompleted');
    }

    // Global user initialization and daily workout reset
    const user = getUserData();
    
    // Check for plan expiry
    if (user && user.expiryDate && new Date() > new Date(user.expiryDate)) {
      if (user.membershipStatus !== 'Expired') {
        const userStr = localStorage.getItem('user');
        const userData = JSON.parse(userStr);
        if (userData) {
          userData.membershipStatus = 'Expired';
          localStorage.setItem('user', JSON.stringify(userData));
        }
        
        // Sync legacy key
        const legacyDataStr = localStorage.getItem('userData');
        if (legacyDataStr) {
          const legacyData = JSON.parse(legacyDataStr);
          legacyData.membershipStatus = 'Expired';
          localStorage.setItem('userData', JSON.stringify(legacyData));
        }
      }
    }
  }, []);

  return (
    <Router>
      <PageTitleManager />
      <ScrollToTop />
      <div className="App">
        <Navbar />
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="/plans" element={<Plans />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/find-us" element={<FindUs />} />
            
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
