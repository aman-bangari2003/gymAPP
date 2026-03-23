import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import { getUserData } from './utils/userStorage';

function App() {
  useEffect(() => {
    // Global user initialization and daily workout reset
    const user = getUserData();
    
    // Check for plan expiry
    if (user && user.expiryDate && new Date() > new Date(user.expiryDate)) {
      if (user.membershipStatus !== 'Expired') {
        const userStr = localStorage.getItem('user');
        const userData = JSON.parse(userStr);
        userData.membershipStatus = 'Expired';
        localStorage.setItem('user', JSON.stringify(userData));
        
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
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          
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
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
