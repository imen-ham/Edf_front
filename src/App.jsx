import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Actions from './pages/Actions';
import Scanner from './pages/Scanner';
import MapFlow from './pages/MapFlow';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <>
      <nav style={{ 
        padding: '1rem 2rem', 
        background: '#0050A0', 
        display: 'flex', 
        gap: '1rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <button 
          onClick={() => setCurrentPage('dashboard')}
          style={{ 
            padding: '0.75rem 1.5rem', 
            background: currentPage === 'dashboard' ? '#FF6B00' : 'white',
            color: currentPage === 'dashboard' ? 'white' : '#0050A0',
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          📊 Dashboard
        </button>
        <button 
          onClick={() => setCurrentPage('actions')}
          style={{ 
            padding: '0.75rem 1.5rem', 
            background: currentPage === 'actions' ? '#FF6B00' : 'white',
            color: currentPage === 'actions' ? 'white' : '#0050A0',
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          ⚡ Actions
        </button>
        <button 
          onClick={() => setCurrentPage('scanner')}
          style={{ 
            padding: '0.75rem 1.5rem', 
            background: currentPage === 'scanner' ? '#FF6B00' : 'white',
            color: currentPage === 'scanner' ? 'white' : '#0050A0',
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          📷 Scanner
        </button>
        <button 
          onClick={() => setCurrentPage('mapflow')}
          style={{ 
            padding: '0.75rem 1.5rem', 
            background: currentPage === 'mapflow' ? '#FF6B00' : 'white',
            color: currentPage === 'mapflow' ? 'white' : '#0050A0',
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          🗺️ MapFlow
        </button>
      </nav>

      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'actions' && <Actions />}
      {currentPage === 'scanner' && <Scanner />}
      {currentPage === 'mapflow' && <MapFlow />}
    </>
  );
}

export default App;