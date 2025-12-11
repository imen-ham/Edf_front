import React, { useState } from 'react';
import '../styles/Actions.css';

export default function Actions() {
  const [selectedAction, setSelectedAction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const quickActions = [
    { id: 1, title: 'Nouvelle pose', icon: '📦', color: '#27AE60', description: 'Enregistrer la pose d\'un nouveau concentrateur' },
    { id: 2, title: 'Transfert emplacement', icon: '🔄', color: '#0050A0', description: 'Transférer un concentrateur entre emplacements' },
    { id: 3, title: 'Dépose HS', icon: '⚠️', color: '#E74C3C', description: 'Signaler et déposer un concentrateur HS' },
    { id: 4, title: 'Retour constructeur', icon: '↩️', color: '#FF6B00', description: 'Retourner un concentrateur au constructeur' },
    { id: 5, title: 'Maintenance', icon: '🔧', color: '#9B59B6', description: 'Programmer une maintenance préventive' },
    { id: 6, title: 'Inventaire', icon: '📋', color: '#3498DB', description: 'Lancer un inventaire de stock' },
  ];

  const recentActions = [
    { id: 1, type: 'Pose', user: 'Jean Dupont', emplacement: 'Magasin', date: '10/12/2025 14:32', status: 'success', details: 'Concentrateur CPL-2024-A342' },
    { id: 2, type: 'Transfert', user: 'Marie Martin', emplacement: 'BO Nord → Magasin', date: '10/12/2025 13:15', status: 'success', details: '5 concentrateurs' },
    { id: 3, type: 'Dépose HS', user: 'Pierre Rossi', emplacement: 'BO Sud', date: '10/12/2025 11:45', status: 'warning', details: 'Concentrateur défectueux CPL-2023-P89' },
    { id: 4, type: 'Maintenance', user: 'Sophie Bernard', emplacement: 'Labo', date: '10/12/2025 09:20', status: 'success', details: 'Maintenance préventive programmée' },
    { id: 5, type: 'Retour', user: 'Luc Santoni', emplacement: 'Retour constructeur', date: '09/12/2025 16:50', status: 'pending', details: '3 concentrateurs en attente' },
  ];

  const handleActionClick = (action) => {
    setSelectedAction(action);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAction(null);
  };

  return (
    <div className="actions-content">

      {/* Actions rapides */}
      <div className="section">
        <h2 className="section-title">Actions rapides</h2>

        <div className="quick-actions-grid">
          {quickActions.map((action) => (
            <div key={action.id} className="action-card" onClick={() => handleActionClick(action)}>
              <div className="action-icon" style={{ backgroundColor: `${action.color}20` }}>
                <span style={{ fontSize: '2rem' }}>{action.icon}</span>
              </div>

              <h3 className="action-title" style={{ color: action.color }}>{action.title}</h3>
              <p className="action-description">{action.description}</p>

              <button className="action-button" style={{ backgroundColor: action.color, borderColor: action.color }}>
                Lancer
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Actions récentes */}
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Actions récentes</h2>
          <button className="export-button">📥 Exporter</button>
        </div>

        <div className="recent-actions-card">
          <table className="actions-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Profil</th>
                <th>Emplacement</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {recentActions.map((action) => (
                <tr key={action.id}>
                  <td><span className="action-type">{action.type}</span></td>
                  <td>{action.user}</td>
                  <td>{action.emplacement}</td>
                  <td className="date-cell">{action.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistiques */}
      <div className="section">
        <h2 className="section-title">Statistiques du jour</h2>

        <div className="stats-grid">
          <div className="stat-card stat-success">
            <div className="stat-value">12</div>
            <div className="stat-label">Poses effectuées</div>
          </div>

          <div className="stat-card stat-info">
            <div className="stat-value">8</div>
            <div className="stat-label">Transferts réalisés</div>
          </div>

          <div className="stat-card stat-warning">
            <div className="stat-value">3</div>
            <div className="stat-label">Déposes HS</div>
          </div>

          <div className="stat-card stat-orange">
            <div className="stat-value">5</div>
            <div className="stat-label">Retours constructeur</div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && selectedAction && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header" style={{ backgroundColor: selectedAction.color }}>
              <h2>{selectedAction.icon} {selectedAction.title}</h2>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>

            <div className="modal-body">
              <p className="modal-description">{selectedAction.description}</p>

              <div className="modal-form">
                <div className="form-group">
                  <label>N° de concentrateur</label>
                  <input type="text" placeholder="CPL-2024-XXXX" />
                </div>

                <div className="form-group">
                  <label>Emplacement</label>
                  <select>
                    <option>Magasin</option>
                    <option>BO Nord</option>
                    <option>BO Centre</option>
                    <option>BO Sud</option>
                    <option>Labo</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Statut</label>
                  <input type="text" placeholder="HS" />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input type="text" placeholder="" />
                </div>

                <div className="form-group">
                  <label>Commentaire</label>
                  <textarea rows="3" placeholder="Informations complémentaires..."></textarea>
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn-cancel" onClick={closeModal}>Annuler</button>
                <button className="btn-confirm" style={{ backgroundColor: selectedAction.color }}>
                  Confirmer
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
