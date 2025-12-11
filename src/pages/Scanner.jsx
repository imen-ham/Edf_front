// ============================================
// FICHIER : pages/Scanner.jsx
// ============================================

import React, { useState } from 'react';
import '../styles/Scanner.css';

export default function Scanner() {
  const [scanMode, setScanMode] = useState('camera'); // 'camera' ou 'manual'
  const [scannedCode, setScannedCode] = useState('');
  const [concentratorInfo, setConcentratorInfo] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');

  // Données de simulation pour les concentrateurs
  const concentratorsDatabase = {
    'CPL-2024-A342': {
      code: 'CPL-2024-A342',
      status: 'En stock',
      base: 'Ajaccio',
      dateArrival: '05/12/2025',
      manufacturer: 'Linky Solutions',
      model: 'CPL-Pro-2024',
      lastMaintenance: '01/12/2025',
      nextMaintenance: '01/03/2026',
      condition: 'Excellent',
      history: [
        { date: '05/12/2025', action: 'Arrivée en stock', user: 'Jean Dupont' },
        { date: '03/12/2025', action: 'Transfert depuis Bastia', user: 'Marie Martin' },
        { date: '01/12/2025', action: 'Maintenance préventive', user: 'Tech Support' }
      ]
    },
    'CPL-2023-B128': {
      code: 'CPL-2023-B128',
      status: 'Posé',
      base: 'Bastia',
      dateArrival: '15/11/2025',
      manufacturer: 'Smart Grid Inc',
      model: 'CPL-Standard-2023',
      lastMaintenance: '10/11/2025',
      nextMaintenance: '10/02/2026',
      condition: 'Bon',
      history: [
        { date: '20/11/2025', action: 'Installation chez client', user: 'Pierre Rossi' },
        { date: '15/11/2025', action: 'Arrivée en stock', user: 'Sophie Bernard' }
      ]
    },
    'CPL-2024-P089': {
      code: 'CPL-2024-P089',
      status: 'HS',
      base: 'Propriano',
      dateArrival: '01/12/2025',
      manufacturer: 'Linky Solutions',
      model: 'CPL-Pro-2024',
      lastMaintenance: '28/11/2025',
      nextMaintenance: 'N/A',
      condition: 'Défectueux',
      history: [
        { date: '08/12/2025', action: 'Signalé HS', user: 'Luc Santoni' },
        { date: '01/12/2025', action: 'Arrivée en stock', user: 'Admin' }
      ]
    }
  };

  const handleStartScan = () => {
    setIsScanning(true);
    // Simulation d'un scan après 2 secondes
    setTimeout(() => {
      const randomCodes = Object.keys(concentratorsDatabase);
      const randomCode = randomCodes[Math.floor(Math.random() * randomCodes.length)];
      handleScanComplete(randomCode);
    }, 2000);
  };

  const handleScanComplete = (code) => {
    setScannedCode(code);
    setIsScanning(false);
    
    const info = concentratorsDatabase[code];
    if (info) {
      setConcentratorInfo(info);
    } else {
      setConcentratorInfo({
        code: code,
        status: 'Inconnu',
        error: 'Concentrateur non trouvé dans la base de données'
      });
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualCode.trim()) {
      handleScanComplete(manualCode.trim().toUpperCase());
    }
  };

  const handleReset = () => {
    setScannedCode('');
    setConcentratorInfo(null);
    setManualCode('');
    setIsScanning(false);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'En stock': return '#0050A0';
      case 'Posé': return '#27AE60';
      case 'En transit': return '#FF6B00';
      case 'HS': return '#E74C3C';
      default: return '#999';
    }
  };

  return (
    <div className="scanner-container">
      {/* Header */}
      <div className="scanner-header">
        <div className="header-content">
          <div className="edf-logo">
            <div className="logo-square"></div>
            <span className="logo-text">EDF</span>
          </div>
          <h1 className="scanner-title">Scanner & Traçabilité</h1>
        </div>
      </div>

      <div className="scanner-content">
        {/* Mode Selection */}
        <div className="mode-selector">
          <button 
            className={`mode-button ${scanMode === 'camera' ? 'active' : ''}`}
            onClick={() => setScanMode('camera')}
          >
            📷 Scanner QR Code
          </button>
          <button 
            className={`mode-button ${scanMode === 'manual' ? 'active' : ''}`}
            onClick={() => setScanMode('manual')}
          >
            ⌨️ Saisie manuelle
          </button>
        </div>

        <div className="scanner-main">
          {/* Left Panel - Scanner */}
          <div className="scanner-panel">
            {scanMode === 'camera' ? (
              <div className="camera-scanner">
                <div className={`camera-view ${isScanning ? 'scanning' : ''}`}>
                  {!isScanning && !scannedCode && (
                    <div className="camera-placeholder">
                      <div className="scan-icon">📷</div>
                      <p>Appuyez sur "Démarrer le scan" pour commencer</p>
                    </div>
                  )}
                  
                  {isScanning && (
                    <div className="scanning-animation">
                      <div className="scan-line"></div>
                      <div className="scan-corners">
                        <div className="corner top-left"></div>
                        <div className="corner top-right"></div>
                        <div className="corner bottom-left"></div>
                        <div className="corner bottom-right"></div>
                      </div>
                      <p className="scanning-text">Scan en cours...</p>
                    </div>
                  )}

                  {scannedCode && !isScanning && (
                    <div className="scan-success">
                      <div className="success-icon">✓</div>
                      <p className="success-text">Code scanné avec succès !</p>
                      <p className="scanned-code">{scannedCode}</p>
                    </div>
                  )}
                </div>

                <div className="camera-controls">
                  {!isScanning && !scannedCode && (
                    <button className="btn-primary" onClick={handleStartScan}>
                      🎯 Démarrer le scan
                    </button>
                  )}
                  {scannedCode && (
                    <button className="btn-secondary" onClick={handleReset}>
                      🔄 Nouveau scan
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="manual-input">
                <div className="manual-form-container">
                  <div className="manual-icon">⌨️</div>
                  <h3>Saisie manuelle du code</h3>
                  <p className="manual-description">
                    Entrez le code du concentrateur manuellement si le QR code n'est pas lisible
                  </p>
                  
                  <form onSubmit={handleManualSubmit} className="manual-form">
                    <input
                      type="text"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      placeholder="Ex: CPL-2024-A342"
                      className="manual-input-field"
                    />
                    <button type="submit" className="btn-primary">
                      🔍 Rechercher
                    </button>
                  </form>

                  {scannedCode && (
                    <button className="btn-secondary" onClick={handleReset}>
                      🔄 Nouvelle recherche
                    </button>
                  )}

                  <div className="example-codes">
                    <p className="example-title">Codes d'exemple :</p>
                    <div className="example-chips">
                      {Object.keys(concentratorsDatabase).map(code => (
                        <span 
                          key={code}
                          className="example-chip"
                          onClick={() => {
                            setManualCode(code);
                            handleScanComplete(code);
                          }}
                        >
                          {code}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Results */}
          <div className="results-panel">
            {!concentratorInfo ? (
              <div className="no-results">
                <div className="no-results-icon">📦</div>
                <h3>Aucun résultat</h3>
                <p>Scannez ou saisissez un code pour afficher les informations du concentrateur</p>
              </div>
            ) : concentratorInfo.error ? (
              <div className="error-results">
                <div className="error-icon">⚠️</div>
                <h3>Concentrateur non trouvé</h3>
                <p className="error-code">Code : {concentratorInfo.code}</p>
                <p className="error-message">{concentratorInfo.error}</p>
                <button className="btn-secondary" onClick={handleReset}>
                  Réessayer
                </button>
              </div>
            ) : (
              <div className="concentrator-info">
                <div className="info-header">
                  <div>
                    <h2>{concentratorInfo.code}</h2>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(concentratorInfo.status) }}
                    >
                      {concentratorInfo.status}
                    </span>
                  </div>
                </div>

                <div className="info-section">
                  <h3>📍 Localisation</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Base actuelle :</span>
                      <span className="info-value">{concentratorInfo.base}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Date d'arrivée :</span>
                      <span className="info-value">{concentratorInfo.dateArrival}</span>
                    </div>
                  </div>
                </div>

                <div className="info-section">
                  <h3>🔧 Informations techniques</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Fabricant :</span>
                      <span className="info-value">{concentratorInfo.manufacturer}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Modèle :</span>
                      <span className="info-value">{concentratorInfo.model}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">État :</span>
                      <span className="info-value">{concentratorInfo.condition}</span>
                    </div>
                  </div>
                </div>

                <div className="info-section">
                  <h3>🛠️ Maintenance</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Dernière maintenance :</span>
                      <span className="info-value">{concentratorInfo.lastMaintenance}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Prochaine maintenance :</span>
                      <span className="info-value">{concentratorInfo.nextMaintenance}</span>
                    </div>
                  </div>
                </div>

                <div className="info-section">
                  <h3>📜 Historique</h3>
                  <div className="history-timeline">
                    {concentratorInfo.history.map((entry, index) => (
                      <div key={index} className="history-item">
                        <div className="history-dot"></div>
                        <div className="history-content">
                          <div className="history-date">{entry.date}</div>
                          <div className="history-action">{entry.action}</div>
                          <div className="history-user">Par {entry.user}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="action-buttons">
                  <button className="btn-action btn-edit">✏️ Modifier</button>
                  <button className="btn-action btn-transfer">🔄 Transférer</button>
                  <button className="btn-action btn-maintenance">🔧 Maintenance</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Statistics */}
        <div className="scanner-stats">
          <div className="stat-item">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-value">1,247</div>
              <div className="stat-label">Scans aujourd'hui</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">✓</div>
            <div className="stat-content">
              <div className="stat-value">98.5%</div>
              <div className="stat-label">Taux de réussite</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <div className="stat-value">1.2s</div>
              <div className="stat-label">Temps moyen</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}