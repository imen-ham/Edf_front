import React, { useState } from 'react';
import { Zap, Camera, Box, BarChart3, Network, LogIn, UserPlus, Menu, X } from 'lucide-react';
import '../styles/Home.css';
import edfLogo from '../edf.png'; 

export default function Header({ currentPage, setCurrentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

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
            <img 
              src={edfLogo} 
              alt="EDF Logo" 
              style={{ width: '3rem', height: '3rem', objectFit: 'contain' }} 
            />
          </div>
          <div className="logo-text">
            <h1>CPL Tracker 360</h1>
            <p>Suivi intelligent des concentrateurs</p>
          </div>
        </div>

        {/* MENU BURGER - visible en mobile */}
        <button 
          className="burger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* MENU DESKTOP */}
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

        {/* BOUTONS DESKTOP */}
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

      {/* MENU MOBILE DÉROULANT */}
      {menuOpen && (
        <div className="mobile-menu">
          <button className="nav-button" onClick={() => setCurrentPage('scanner')}>Scanner & Saisir</button>
          <button className="nav-button" onClick={() => setCurrentPage('actions')}>Actions</button>
          <button className="nav-button" onClick={() => setCurrentPage('dashboard')}>Dashboard</button>
          <button className="nav-button" onClick={() => setCurrentPage('mapflow')}>MapFlow</button>

          <button className="auth-button login-btn" id='bouttonconnexionmobile' onClick={() => setCurrentPage('login')}>
            <LogIn size={18} /> Connexion
          </button>
          <button className="auth-button register-btn"id='bouttoninscritionmobile' onClick={() => setCurrentPage('register')}>
            <UserPlus size={18} /> Inscription
          </button>
        </div>
      )}
    </header>
  );
}
