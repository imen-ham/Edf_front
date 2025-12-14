import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Actions from './pages/Actions';
import Scanner from './pages/Scanner';
import MapFlow from './pages/MapFlow';
import Login from './pages/login';
import Register from './pages/Register';
import Header from './components/Header';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // Home par défaut
  const [currentUser, setCurrentUser] = useState(null);   // Utilisateur connecté

  // ✅ Charger l'utilisateur depuis le localStorage si déjà connecté
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
  }, []);

  // ✅ Fonction pour rediriger automatiquement selon le profil
  const redirectAfterLogin = (profile) => {
    switch(profile) {
      case 'magasin':
        setCurrentPage('scanner'); // Scanner + Dashboard possible
        break;
      case 'base':
        setCurrentPage('actions'); // Actions + Dashboard
        break;
      case 'labo':
        setCurrentPage('actions'); // Actions + Dashboard (limité à ses tests)
        break;
      case 'admin':
        setCurrentPage('dashboard'); // Admin voit tout
        break;
      default:
        setCurrentPage('home');
    }
  };

  // ✅ Fonction pour se déconnecter
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    setCurrentPage('home');
  };

  // ✅ Vérification d'accès pour chaque page selon le rôle
  const canAccess = (page) => {
    if (!currentUser) return false; // Non connecté
    const role = currentUser.profile;
    switch(page) {
      case 'scanner':
        return role === 'magasin' || role === 'admin';
      case 'actions':
        return role === 'base' || role === 'labo' || role === 'admin';
      case 'dashboard':
        return role === 'magasin' || role === 'base' || role === 'labo' || role === 'admin';
      case 'mapflow':
        return role === 'base' || role === 'admin';
      default:
        return true;
    }
  };

  return (
    <>
      {/* Header avec navigation */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        currentUser={currentUser}
        handleLogout={handleLogout}
      />

      {/* Pages conditionnelles */}
      {currentPage === 'home' && <Home />}
      {currentPage === 'dashboard' && canAccess('dashboard') && <Dashboard />}
      {currentPage === 'actions' && canAccess('actions') && <Actions />}
      {currentPage === 'scanner' && canAccess('scanner') && <Scanner />}
      {currentPage === 'mapflow' && canAccess('mapflow') && <MapFlow />}
      {currentPage === 'login' && (
        <Login
          setCurrentPage={setCurrentPage}
          setCurrentUser={setCurrentUser}
          redirectAfterLogin={redirectAfterLogin}
        />
      )}
      {currentPage === 'register' && <Register setCurrentPage={setCurrentPage} />}
    </>
  );
}

export default App;
