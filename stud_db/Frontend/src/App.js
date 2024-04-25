import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LoginForm from './components/loginform';
import Evarsity from './components/evarsity';
import Profile from './components/Profile';
import StudentInfo from './components/StudentInfo';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/evarsity" element={
          <ProtectedRoute>
            <Evarsity />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/StudentInfo" element={
        <ProtectedRoute>
          <StudentInfo />
        </ProtectedRoute>    
      } />
      </Routes>
    </Router>
  );
};

export default App;