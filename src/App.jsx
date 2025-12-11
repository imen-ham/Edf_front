import { useState } from 'react';
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

  return (
    <>
      {/* Header avec navigation */}
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Affichage conditionnel des pages */}
      {currentPage === 'home' && <Home />}
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'actions' && <Actions />}
      {currentPage === 'scanner' && <Scanner />}
      {currentPage === 'mapflow' && <MapFlow />}
      {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
      {currentPage === 'register' && <Register setCurrentPage={setCurrentPage} />}
    </>
  );
}

export default App;