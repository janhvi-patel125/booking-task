import React, { useEffect, useState } from 'react';
import Login from './pages/authPages/login';
import SignUp from './pages/authPages/signUp';
import ProtectedRoute from './protectedRoute';
import BookingForm from './pages/bookingPage/bookingPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import VerificationPage from './pages/authPages/verification';

const AppRoutes = () => {
  // Get verification status from localStorage
  const [isVerified, setIsVerified] = useState(localStorage.getItem('is_verified') === 'true');

  // Listen for changes in localStorage
  useEffect(() => {
    const checkVerification = () => {
      setIsVerified(localStorage.getItem('is_verified') === 'true');
    };

    window.addEventListener('storage', checkVerification);
    return () => {
      window.removeEventListener('storage', checkVerification);
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isVerified ? "/booking" : "/login"} replace />} />
      <Route 
        path="/login" 
        element={
          isVerified ? <Navigate to="/booking" replace /> : <Login />
        } 
      />      
      <Route
        path="/signup"
        element={
          isVerified ? <Navigate to="/booking" replace /> : <SignUp />
        }
      />
      <Route
        path="/verify-otp"
        element={
          isVerified ? <Navigate to="/booking" replace /> : <VerificationPage />
        }
      />
      <Route
        path="/booking"
        element={
          <ProtectedRoute isAuthenticated={isVerified}>
            <BookingForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
