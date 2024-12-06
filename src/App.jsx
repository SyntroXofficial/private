import React, { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazyLoad } from './utils/lazyLoad.jsx';
import Navbar from './components/Navbar';
import './styles/globals.css';

const Hero = lazyLoad(lazy(() => import('./components/Hero')));
const Steam = lazyLoad(lazy(() => import('./components/Steam')));
const Methods = lazyLoad(lazy(() => import('./components/Methods')));
const GeforceNow = lazyLoad(lazy(() => import('./components/GeforceNow')));
const Stremio = lazyLoad(lazy(() => import('./components/Stremio')));
const Accounts = lazyLoad(lazy(() => import('./components/Accounts')));
const OtherServices = lazyLoad(lazy(() => import('./components/OtherServices')));

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/steam" element={<Steam />} />
          <Route path="/methods" element={<Methods />} />
          <Route path="/other-services" element={<OtherServices />} />
          <Route path="/geforce-now" element={<GeforceNow />} />
          <Route path="/stremio" element={<Stremio />} />
          <Route path="/accounts" element={<Accounts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;