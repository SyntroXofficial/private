import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-red-900/20 text-red-400' : '';
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass-effect fixed w-full top-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-red-500">
          Prime Nexo
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/steam" className={`nav-link ${isActive('/steam')}`}>Steam</Link>
              <Link to="/accounts" className={`nav-link ${isActive('/accounts')}`}>Accounts</Link>
              <Link to="/methods" className={`nav-link ${isActive('/methods')}`}>Methods</Link>
              <Link to="/other-services" className={`nav-link ${isActive('/other-services')}`}>Other Services</Link>
              <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>Dashboard</Link>
              <div className="flex items-center gap-2">
                <Link to="/profile" className="flex items-center gap-2">
                  {user?.profilePic ? (
                    <img src={user.profilePic} alt={user.username} className="w-8 h-8 rounded-full" />
                  ) : (
                    <UserCircleIcon className="w-8 h-8 text-gray-400" />
                  )}
                  <span className="text-gray-300">{user?.username}</span>
                </Link>
                <button onClick={handleLogout} className="nav-link">Logout</button>
              </div>
            </>
          ) : (
            <Link to="/auth" className={`nav-link ${isActive('/auth')}`}>Login</Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}