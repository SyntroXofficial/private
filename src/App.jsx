import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
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
import AuthCallback from './components/auth/AuthCallback';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-black">
          <Navbar />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route element={<PrivateRoute />}>
              <Route path="/steam" element={<Steam />} />
              <Route path="/methods" element={<Methods />} />
              <Route path="/other-services" element={<OtherServices />} />
              <Route path="/geforce-now" element={<GeforceNow />} />
              <Route path="/stremio" element={<Stremio />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/members" element={<Members />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;