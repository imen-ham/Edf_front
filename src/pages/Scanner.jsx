import React, { useState } from 'react';
import '../styles/Scanner.css';

export default function Scanner() {
  const [scanMode, setScanMode] = useState('camera');
  const [scannedCode, setScannedCode] = useState('');
  const [concentratorInfo, setConcentratorInfo] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');

  const concentratorsDatabase = {
    'CPL-2024-A342': {
      code: 'CPL-2024-A342',
      status: 'En stock',
      emplacement: 'Magasin',
      dateArrival: '05/12/2025',
      serialNumber: 'SN-2024-A342-987',
      statut: 'Opérationnel',
      lastMaintenance: '01/12/2025',
      nextMaintenance: '01/03/2026',
      history: [
        { date: '05/12/2025', action: 'Arrivée en stock', user: 'Jean Dupont' },
        { date: '03/12/2025', action: 'Transfert depuis BO Nord', user: 'Marie Martin' },
        { date: '01/12/2025', action: 'Maintenance préventive', user: 'Tech Support' }
      ]
    },
    'CPL-2023-B128': {
      code: 'CPL-2023-B128',
      status: 'Posé',
      emplacement: 'BO Nord',
      dateArrival: '15/11/2025',
      serialNumber: 'SN-2023-B128-654',
      statut: 'Opérationnel',
      lastMaintenance: '10/11/2025',
      nextMaintenance: '10/02/2026',
      history: [
        { date: '20/11/2025', action: 'Installation chez client', user: 'Pierre Rossi' },
        { date: '15/11/2025', action: 'Arrivée en stock', user: 'Sophie Bernard' }
      ]
    },
    'CPL-2024-P089': {
      code: 'CPL-2024-P089',
      status: 'HS',
      emplacement: 'Labo',
      dateArrival: '01/12/2025',
      serialNumber: 'SN-2024-P089-321',
      statut: 'Défectueux',
      lastMaintenance: '28/11/2025',
      nextMaintenance: 'N/A',
      history: [
        { date: '08/12/2025', action: 'Signalé HS', user: 'Luc Santoni' },
        { date: '01/12/2025', action: 'Arrivée en stock', user: 'Admin' }
      ]
    }
  };

  const handleStartScan = () => {
    setIsScanning(true);
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
    setConcentratorInfo(
      info || {
        code,
        status: 'Inconnu',
        error: 'Concentrateur non trouvé dans la base de données'
      }
    );
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

      {/* --- AUCUN HEADER ICI (supprimé) --- */}

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

          {/* Left Panel */}
          <div className="scanner-panel">
            {scanMode === 'camera' ? (
              <div className="camera-scanner">
                <div className={`camera-view ${isScanning ? 'scanning' : ''}`}>

                  {!isScanning && !scannedCode && (
                    <div className="camera-placeholder">
                      <div className="scan-icon">📷</div>
                      <p>Appuyez sur "Démarrer le scan"</p>
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
                      <p className="success-text">Code scanné !</p>
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
                </div>
              </div>
            )}
          </div>

          {/* Right Panel */}
          <div className="results-panel">
            {!concentratorInfo ? (
              <div className="no-results">
                <div className="no-results-icon">📦</div>
                <h3>Aucun résultat</h3>
              </div>
            ) : concentratorInfo.error ? (
              <div className="error-results">
                <div className="error-icon">⚠️</div>
                <h3>Concentrateur non trouvé</h3>
                <button className="btn-secondary" onClick={handleReset}>
                  Réessayer
                </button>
              </div>
            ) : (
              <div className="concentrator-info">

                <h2>{concentratorInfo.code}</h2>
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(concentratorInfo.status) }}
                >
                  {concentratorInfo.status}
                </span>

                {/* Info sections */}
                <div className="info-section">
                  <h3>📍 Localisation</h3>
                  <p>Emplacement : {concentratorInfo.emplacement}</p>
                  <p>Arrivé le : {concentratorInfo.dateArrival}</p>
                </div>

                {/* Historique */}
                <div className="info-section">
                  <h3>📜 Historique</h3>
                  {concentratorInfo.history.map((entry, i) => (
                    <div key={i}>
                      <strong>{entry.date}</strong> — {entry.action} (par {entry.user})
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
