import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import useServicesStore from './store/servicesStore';
import useFeedbackStore from './store/feedbackStore';
import useMemberStore from './store/memberStore';
import PrivateRoute from './components/auth/PrivateRoute';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Steam from './components/Steam';
import Methods from './components/Methods';
import GeforceNow from './components/GeforceNow';
import Stremio from './components/Stremio';
import Accounts from './components/Accounts';
import OtherServices from './components/OtherServices';
import Members from './components/Members';
import Feedback from './components/Feedback';
import AuthPage from './components/auth/AuthPage';
import UserProfile from './components/UserProfile';
import Dashboard from './components/Dashboard';
import './styles/globals.css';

function AppContent() {
  const { user } = useAuth();
  const initializeServices = useServicesStore(state => state.initialize);
  const initializeFeedbacks = useFeedbackStore(state => state.initialize);
  const initializeMembers = useMemberStore(state => state.initialize);

  // Handle online status
  useOnlineStatus(user?.id);

  // Initialize Firebase listeners
  useEffect(() => {
    const unsubscribeServices = initializeServices();
    const unsubscribeFeedbacks = initializeFeedbacks();
    const unsubscribeMembers = initializeMembers();

    return () => {
      unsubscribeServices();
      unsubscribeFeedbacks();
      unsubscribeMembers();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/steam" element={<Steam />} />
          <Route path="/methods" element={<Methods />} />
          <Route path="/other-services" element={<OtherServices />} />
          <Route path="/geforce-now" element={<GeforceNow />} />
          <Route path="/stremio" element={<Stremio />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/members" element={<Members />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;