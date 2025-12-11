import React from 'react';
import { Zap, Camera, Box, BarChart3, Network } from 'lucide-react';
import '../styles/Home.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <div className="header-logo">
          <div className="logo-icon">
            <Zap />
          </div>
          <div className="logo-text">
            <h1>CPL Tracker 360</h1>
            <p>Suivi intelligent des concentrateurs</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="header-nav">
          <button className="nav-button">
            <Camera />
            Scanner & Saisir
          </button>

          <button className="nav-button">
            <Box />
            Actions
          </button>

          <button className="nav-button">
            <BarChart3 />
            Dashboard
          </button>

          <button className="nav-button">
            <Network />
            MapFlow
          </button>
        </nav>
      </div>
    </header>
  );
}
