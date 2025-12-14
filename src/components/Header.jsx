import Rea
, { useState } from 'react';
import { Camera, Box, BarChart3, Network, LogIn, UserPlus, Menu, X, LogOut } from 'lucide-react';
import '../styles/Home.css';
import edfLogo from '../edf.png';

export default function Header({ currentPage, setCurrentPage, currentUser, handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Fonction pour afficher les boutons de navigation selon le rôle
  const renderNavButtons = () => {
    if (!currentUser) return null;

    const role = currentUser.profile;

    switch(role) {
      case 'magasin':
        return (
          <>
            <button className="nav-button" onClick={() => setCurrentPage('scanner')} style={{ color: currentPage === 'scanner' ? '#FF6600' : undefined }}>
              <Camera /> Scanner & Saisir
            </button>
            <button className="nav-button" onClick={() => setCurrentPage('dashboard')} style={{ color: currentPage === 'dashboard' ? '#FF6600' : undefined }}>
              <BarChart3 /> Dashboard
            </button>
          </>
        );
      case 'base':
        return (
          <>
            <button className="nav-button" onClick={() => setCurrentPage('actions')} style={{ color: currentPage === 'actions' ? '#FF6600' : undefined }}>
              <Box /> Actions
            </button>
            <button className="nav-button" onClick={() => setCurrentPage('dashboard')} style={{ color: currentPage === 'dashboard' ? '#FF6600' : undefined }}>
              <BarChart3 /> Dashboard
            </button>
            <button className="nav-button" onClick={() => setCurrentPage('mapflow')} style={{ color: currentPage === 'mapflow' ? '#FF6600' : undefined }}>
              <Network /> MapFlow
            </button>
          </>
        );
      case 'labo':
        return (
          <button className="nav-button" onClick={() => setCurrentPage('dashboard')} style={{ color: currentPage === 'dashboard' ? '#FF6600' : undefined }}>
            <BarChart3 /> Dashboard
          </button>
        );
      case 'admin':
        return (
          <>
            <button className="nav-button" onClick={() => setCurrentPage('scanner')} style={{ color: currentPage === 'scanner' ? '#FF6600' : undefined }}>
              <Camera /> Scanner & Saisir
            </button>
            <button className="nav-button" onClick={() => setCurrentPage('actions')} style={{ color: currentPage === 'actions' ? '#FF6600' : undefined }}>
              <Box /> Actions
            </button>
            <button className="nav-button" onClick={() => setCurrentPage('dashboard')} style={{ color: currentPage === 'dashboard' ? '#FF6600' : undefined }}>
              <BarChart3 /> Dashboard
            </button>
            <button className="nav-button" onClick={() => setCurrentPage('mapflow')} style={{ color: currentPage === 'mapflow' ? '#FF6600' : undefined }}>
              <Network /> MapFlow
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <div className="header-logo" style={{ cursor: 'pointer' }} onClick={() => setCurrentPage('home')}>
          <div className="logo-icon">
            <img src={edfLogo} alt="EDF Logo" style={{ width: '3rem', height: '3rem', objectFit: 'contain' }} />
          </div>
          <div className="logo-text">
            <h1>EDF CycleTrack</h1>
            <p>Suivi intelligent des concentrateurs</p>
          </div>
        </div>

        {/* MENU BURGER - mobile */}
        <button className="burger-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* MENU DESKTOP */}
        <nav className="header-nav">
          {renderNavButtons()}
        </nav>

        {/* BOUTONS AUTH */}
        <div className="header-auth">
          {!currentUser ? (
            <>
              <button className="auth-button login-btn" onClick={() => setCurrentPage('login')}>
                <LogIn size={18} /> Connexion
              </button>
              <button className="auth-button register-btn" onClick={() => setCurrentPage('register')}>
                <UserPlus size={18} /> Inscription
              </button>
            </>
          ) : (
            <button className="auth-button logout-btn" id="logoutbouton" onClick={handleLogout}>
              <LogOut size={18} /> Déconnexion
            </button>
          )}
        </div>
      </div>

      {/* MENU MOBILE DÉROULANT */}
      {menuOpen && (
        <div className="mobile-menu">
          {renderNavButtons()}
          {!currentUser ? (
            <>
              <button className="auth-button login-btn" onClick={() => setCurrentPage('login')}>
                <LogIn size={18} /> Connexion
              </button>
              <button className="auth-button register-btn" onClick={() => setCurrentPage('register')}>
                <UserPlus size={18} /> Inscription
              </button>
            </>
          ) : (
            <button className="auth-button logout-btn" id="logoutbouton" onClick={handleLogout}>
              <LogOut size={18} /> Déconnexion
            </button>
          )}
        </div>
      )}
    </header>
  );
}
