import React from 'react';
import HeroSection from './home/HeroSection';
import Features from './home/Features';
import Stats from './home/Stats';

export default function Hero() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <Stats />
      <Features />
    </div>
  );
}