import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-red-900/20 text-red-400' : '';
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
        <div className="flex gap-6">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          <Link to="/steam" className={`nav-link ${isActive('/steam')}`}>Steam</Link>
          <Link to="/accounts" className={`nav-link ${isActive('/accounts')}`}>Accounts</Link>
          <Link to="/methods" className={`nav-link ${isActive('/methods')}`}>Methods</Link>
          <Link to="/other-services" className={`nav-link ${isActive('/other-services')}`}>Other Services</Link>
          <Link to="/members" className={`nav-link ${isActive('/members')}`}>Members</Link>
          <Link to="/feedback" className={`nav-link ${isActive('/feedback')}`}>Feedback</Link>
          <Link to="/auth" className={`nav-link ${isActive('/auth')}`}>Login</Link>
        </div>
      </div>
    </motion.nav>
  );
}