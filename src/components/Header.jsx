import React from 'react';
import { Zap, Camera, Box, BarChart3, Network, LogIn, UserPlus } from 'lucide-react';
import '../styles/Home.css';

export default function Header({ currentPage, setCurrentPage }) {
  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <div 
          className="header-logo"
          style={{ cursor: 'pointer' }}
          onClick={() => setCurrentPage('home')}
        >
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
          <button 
            className="nav-button"
            onClick={() => setCurrentPage('scanner')}
            style={{ color: currentPage === 'scanner' ? '#FF6600' : undefined }}
          >
            <Camera />
            Scanner & Saisir
          </button>

          <button 
            className="nav-button"
            onClick={() => setCurrentPage('actions')}
            style={{ color: currentPage === 'actions' ? '#FF6600' : undefined }}
          >
            <Box />
            Actions
          </button>

          <button 
            className="nav-button"
            onClick={() => setCurrentPage('dashboard')}
            style={{ color: currentPage === 'dashboard' ? '#FF6600' : undefined }}
          >
            <BarChart3 />
            Dashboard
          </button>

          <button 
            className="nav-button"
            onClick={() => setCurrentPage('mapflow')}
            style={{ color: currentPage === 'mapflow' ? '#FF6600' : undefined }}
          >
            <Network />
            MapFlow
          </button>
        </nav>

        {/* Boutons d'authentification */}
        <div className="header-auth">
          <button 
            className="auth-button login-btn"
            onClick={() => setCurrentPage('login')}
          >
            <LogIn size={18} />
            Connexion
          </button>

          <button 
            className="auth-button register-btn"
            onClick={() => setCurrentPage('register')}
          >
            <UserPlus size={18} />
            Inscription
          </button>
        </div>
      </div>
    </header>
  );
}
