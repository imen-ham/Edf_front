// ============================================
// FICHIER : pages/MapFlow.jsx
// ============================================

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/MapFlow.css';

// Correction icône par défaut Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default function MapFlow() {
  const [selectedBase, setSelectedBase] = useState(null);
  const [viewMode, setViewMode] = useState('map'); // 'map' ou 'flow'
  const [selectedFlow, setSelectedFlow] = useState(null);

  // Bases avec coordonnées lat/lng pour Leaflet
  const bases = [
    { 
      id: 1, 
      name: 'BO Centre', 
      position: { lat: 41.9268, lng: 8.7369 },
      stock: 342,
      status: 'active',
      coordinates: '41.9268° N, 8.7369° E',
      responsable: 'laeti mezair',
      color: '#27AE60'
    },
   
    { 
      id: 3, 
      name: 'BO Sud', 
      position: { lat: 41.6761, lng: 8.9039 },
      stock: 120,
      status: 'warning',
      coordinates: '41.6761° N, 8.9039° E',
      responsable: 'azerty tes ',
      color: '#FF6B00'
    },
    
    { 
      id: 5,  
      name: 'Retour Constructeur', 
      position: { lat: 42.0, lng: 9.35 }, // approximatif
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
      from: 'BO Nord',
      to: 'Magasin',
      quantity: 15,
      date: '12/12/2025',
      status: 'pose',
      type: 'transfert',
      estimatedArrival: '14/12/2025',
      fromBase: bases[1],
      toBase: bases[0]
    },
    {
      id: 2,
      from: 'Magasin',
      to: 'BO Sud',
      quantity: 8,
      date: '09/12/2025',
      status: 'termine',
      type: 'transfert',
      estimatedArrival: '09/12/2025',
      fromBase: bases[0],
      toBase: bases[2]
    },
    
    {
      id: 4,
      from: 'BO Nord',
      to: 'BO Sud',
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
          <div className="map-section">
            <MapContainer 
              center={[42.0396, 9.0129]} // centre de la Corse
              zoom={8}
              style={{ height: '500px', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />

              {/* GeoJSON pour la Corse */}
              <GeoJSON
                data={{
                  "type": "Feature",
                  "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                      [8.0, 41.2],
                      [9.8, 41.2],
                      [9.8, 43.0],
                      [8.0, 43.0],
                      [8.0, 41.2]
                    ]]
                  }
                }}
                style={{
                  color: "#0050A0",
                  weight: 2,
                  fillColor: "#bbdefb",
                  fillOpacity: 0.2
                }}
              />

              {bases.map(base => (
                <Marker
                  key={base.id}
                  position={[base.position.lat, base.position.lng]}
                  eventHandlers={{
                    click: () => setSelectedBase(base),
                  }}
                >
                  <Popup>
                    <strong>{base.name}</strong><br/>
                    Stock: {base.stock}<br/>
                    Responsable: {base.responsable}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

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
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Flow View entièrement conservée */
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
          </div>
        )}
      </div>
    </div>
  );
}
