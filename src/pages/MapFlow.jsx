// ============================================
// FICHIER : pages/MapFlow.jsx
// ============================================

import React, { useState } from 'react';
import '../styles/MapFlow.css';

export default function MapFlow() {
  const [selectedBase, setSelectedBase] = useState(null);
  const [viewMode, setViewMode] = useState('map'); // 'map' ou 'flow'
  const [selectedFlow, setSelectedFlow] = useState(null);

  const bases = [
    { 
      id: 1, 
      name: 'Ajaccio', 
      position: { top: '55%', left: '35%' },
      stock: 342,
      status: 'active',
      coordinates: '41.9268° N, 8.7369° E',
      responsable: 'Jean Dupont',
      color: '#27AE60'
    },
    { 
      id: 2, 
      name: 'Bastia', 
      position: { top: '25%', left: '45%' },
      stock: 280,
      status: 'active',
      coordinates: '42.7028° N, 9.4507° E',
      responsable: 'Marie Martin',
      color: '#0050A0'
    },
    { 
      id: 3, 
      name: 'Propriano', 
      position: { top: '75%', left: '25%' },
      stock: 120,
      status: 'warning',
      coordinates: '41.6761° N, 8.9039° E',
      responsable: 'Pierre Rossi',
      color: '#FF6B00'
    },
    { 
      id: 4, 
      name: 'Retour Constructeur', 
      position: { top: '45%', left: '85%' },
      stock: 45,
      status: 'inactive',
      coordinates: 'Hors site',
      responsable: 'Service Logistique',
      color: '#E74C3C'
    }
  ];

  const flows = [
    {
      id: 1,
      from: 'Bastia',
      to: 'Ajaccio',
      quantity: 15,
      date: '10/12/2025',
      status: 'en-cours',
      type: 'transfert',
      estimatedArrival: '11/12/2025',
      fromBase: bases[1],
      toBase: bases[0]
    },
    {
      id: 2,
      from: 'Ajaccio',
      to: 'Propriano',
      quantity: 8,
      date: '09/12/2025',
      status: 'termine',
      type: 'transfert',
      estimatedArrival: '09/12/2025',
      fromBase: bases[0],
      toBase: bases[2]
    },
    {
      id: 3,
      from: 'Propriano',
      to: 'Retour Constructeur',
      quantity: 3,
      date: '08/12/2025',
      status: 'en-cours',
      type: 'retour',
      estimatedArrival: '15/12/2025',
      fromBase: bases[2],
      toBase: bases[3]
    },
    {
      id: 4,
      from: 'Bastia',
      to: 'Propriano',
      quantity: 12,
      date: '07/12/2025',
      status: 'termine',
      type: 'transfert',
      estimatedArrival: '07/12/2025',
      fromBase: bases[1],
      toBase: bases[2]
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return '#27AE60';
      case 'warning': return '#FF6B00';
      case 'inactive': return '#E74C3C';
      default: return '#999';
    }
  };

  const getFlowStatusColor = (status) => {
    switch(status) {
      case 'en-cours': return '#FF6B00';
      case 'termine': return '#27AE60';
      case 'annule': return '#E74C3C';
      default: return '#999';
    }
  };

  return (
    <div className="mapflow-container">
      <div className="mapflow-header">
        <div className="header-content">
          <div className="edf-logo">
            <div className="logo-square"></div>
            <span className="logo-text">EDF</span>
          </div>
          <h1 className="mapflow-title">Map & Flow - Visualisation des flux</h1>
        </div>
      </div>

      <div className="mapflow-content">
        {/* View Mode Selector */}
        <div className="view-selector">
          <button 
            className={`view-button ${viewMode === 'map' ? 'active' : ''}`}
            onClick={() => setViewMode('map')}
          >
            🗺️ Vue Carte
          </button>
          <button 
            className={`view-button ${viewMode === 'flow' ? 'active' : ''}`}
            onClick={() => setViewMode('flow')}
          >
            📊 Vue Flux
          </button>
        </div>

        <div className="mapflow-main">
          {viewMode === 'map' ? (
            <>
              {/* Map View */}
              <div className="map-section">
                <div className="map-container">
                  <div className="map-background">
                    <div className="corsica-shape"></div>
                  </div>

                  {/* Bases on Map */}
                  {bases.map(base => (
                    <div
                      key={base.id}
                      className={`base-marker ${selectedBase?.id === base.id ? 'selected' : ''}`}
                      style={{ 
                        top: base.position.top, 
                        left: base.position.left,
                        borderColor: base.color
                      }}
                      onClick={() => setSelectedBase(base)}
                    >
                      <div 
                        className="marker-dot"
                        style={{ backgroundColor: base.color }}
                      ></div>
                      <div className="marker-label">{base.name}</div>
                      <div className="marker-stock">{base.stock}</div>
                    </div>
                  ))}

                  {/* Flow Lines */}
                  {flows.filter(f => f.status === 'en-cours').map(flow => (
                    <div
                      key={flow.id}
                      className="flow-line"
                      style={{
                        top: flow.fromBase.position.top,
                        left: flow.fromBase.position.left,
                        width: `${Math.abs(
                          parseFloat(flow.toBase.position.left) - 
                          parseFloat(flow.fromBase.position.left)
                        )}%`,
                        height: `${Math.abs(
                          parseFloat(flow.toBase.position.top) - 
                          parseFloat(flow.fromBase.position.top)
                        )}%`,
                        transform: `rotate(${Math.atan2(
                          parseFloat(flow.toBase.position.top) - parseFloat(flow.fromBase.position.top),
                          parseFloat(flow.toBase.position.left) - parseFloat(flow.fromBase.position.left)
                        ) * 180 / Math.PI}deg)`
                      }}
                    >
                      <div className="flow-arrow">→</div>
                    </div>
                  ))}
                </div>

                {/* Map Legend */}
                <div className="map-legend">
                  <h4>Légende</h4>
                  <div className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: '#27AE60' }}></span>
                    <span>Base active</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: '#FF6B00' }}></span>
                    <span>Stock faible</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: '#E74C3C' }}></span>
                    <span>Hors site</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-arrow">→</span>
                    <span>Flux en cours</span>
                  </div>
                </div>
              </div>

              {/* Base Details Panel */}
              <div className="details-panel">
                {!selectedBase ? (
                  <div className="no-selection">
                    <div className="no-selection-icon">🗺️</div>
                    <h3>Sélectionnez une base</h3>
                    <p>Cliquez sur un marqueur sur la carte pour afficher les détails</p>
                  </div>
                ) : (
                  <div className="base-details">
                    <div className="details-header">
                      <h2>{selectedBase.name}</h2>
                      <span 
                        className="status-indicator"
                        style={{ backgroundColor: getStatusColor(selectedBase.status) }}
                      >
                        {selectedBase.status === 'active' ? '🟢 Active' : 
                         selectedBase.status === 'warning' ? '🟠 Stock faible' : 
                         '🔴 Hors site'}
                      </span>
                    </div>

                    <div className="details-section">
                      <h4>📊 Stock actuel</h4>
                      <div className="stock-display">
                        <span className="stock-number">{selectedBase.stock}</span>
                        <span className="stock-label">concentrateurs</span>
                      </div>
                    </div>

                    <div className="details-section">
                      <h4>📍 Localisation</h4>
                      <p className="detail-text">{selectedBase.coordinates}</p>
                    </div>

                    <div className="details-section">
                      <h4>👤 Responsable</h4>
                      <p className="detail-text">{selectedBase.responsable}</p>
                    </div>

                    <div className="details-section">
                      <h4>🔄 Flux actifs</h4>
                      {flows.filter(f => 
                        (f.from === selectedBase.name || f.to === selectedBase.name) && 
                        f.status === 'en-cours'
                      ).map(flow => (
                        <div key={flow.id} className="flow-item">
                          <div className="flow-direction">
                            {flow.from === selectedBase.name ? '📤 Sortie' : '📥 Entrée'}
                          </div>
                          <div className="flow-info">
                            <span className="flow-quantity">{flow.quantity} unités</span>
                            <span className="flow-destination">
                              {flow.from === selectedBase.name ? `vers ${flow.to}` : `depuis ${flow.from}`}
                            </span>
                          </div>
                        </div>
                      ))}
                      {flows.filter(f => 
                        (f.from === selectedBase.name || f.to === selectedBase.name) && 
                        f.status === 'en-cours'
                      ).length === 0 && (
                        <p className="no-flows">Aucun flux en cours</p>
                      )}
                    </div>

                    <div className="details-actions">
                      <button className="btn-action">📦 Nouveau transfert</button>
                      <button className="btn-action">📊 Voir historique</button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Flow View */
            <div className="flow-view">
              <div className="flow-table-container">
                <h3>📊 Liste des flux</h3>
                <table className="flow-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>De</th>
                      <th>Vers</th>
                      <th>Quantité</th>
                      <th>Type</th>
                      <th>Statut</th>
                      <th>Arrivée prévue</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flows.map(flow => (
                      <tr 
                        key={flow.id}
                        className={selectedFlow?.id === flow.id ? 'selected' : ''}
                        onClick={() => setSelectedFlow(flow)}
                      >
                        <td>{flow.date}</td>
                        <td><strong>{flow.from}</strong></td>
                        <td><strong>{flow.to}</strong></td>
                        <td className="quantity-cell">{flow.quantity} unités</td>
                        <td>
                          <span className={`type-badge type-${flow.type}`}>
                            {flow.type === 'transfert' ? '🔄 Transfert' : '↩️ Retour'}
                          </span>
                        </td>
                        <td>
                          <span 
                            className="status-badge"
                            style={{ backgroundColor: getFlowStatusColor(flow.status) }}
                          >
                            {flow.status === 'en-cours' ? '⏳ En cours' : '✓ Terminé'}
                          </span>
                        </td>
                        <td>{flow.estimatedArrival}</td>
                        <td>
                          <button className="btn-icon" title="Détails">👁️</button>
                          <button className="btn-icon" title="Modifier">✏️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Flow Statistics */}
              <div className="flow-statistics">
                <h3>📈 Statistiques des flux</h3>
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon">🔄</div>
                    <div className="stat-value">
                      {flows.filter(f => f.status === 'en-cours').length}
                    </div>
                    <div className="stat-label">Flux en cours</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">✓</div>
                    <div className="stat-value">
                      {flows.filter(f => f.status === 'termine').length}
                    </div>
                    <div className="stat-label">Flux terminés</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">📦</div>
                    <div className="stat-value">
                      {flows.reduce((sum, f) => sum + f.quantity, 0)}
                    </div>
                    <div className="stat-label">Unités en transit</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">⏱️</div>
                    <div className="stat-value">2.3j</div>
                    <div className="stat-label">Délai moyen</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}