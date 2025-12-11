import React from 'react';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const stocksByBase = [
    { name: 'Magasin', count: 702 },
      { name: 'BO Centre', count: 2343 },
    { name: 'BO Nord', count: 2121 },
    { name: 'BO Sud', count: 2177 },
    { name: 'Labo', count: 123 },
  ];

  const statusData = [
    { status: 'Posés', count: 523, color: '#27AE60', icon: '🟢' },
    { status: 'En transit', count: 89, color: '#FF6B00', icon: '🟠' },
    { status: 'En stock', count: 175, color: '#0050A0', icon: '🔵' },
    { status: 'HS', count: 12, color: '#E74C3C', icon: '🔴' },
  ];

  const monthlyData = [
    { month: 'Juil', value: 65 },
    { month: 'Août', value: 78 },
    { month: 'Sept', value: 82 },
    { month: 'Oct', value: 91 },
    { month: 'Nov', value: 88 },
    { month: 'Déc', value: 95 },
  ];

  const totalStock = stocksByBase.reduce((sum, base) => sum + base.count, 0);

  return (
    <div className="dashboard-container">

      {/* ---- Dashboard Content ---- */}
      <div className="dashboard-content">
        <div className="cards-grid">

          {/* Stock par emplacement */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Stocks par emplacement</h2>
              <div className="card-icon">📦</div>
            </div>

            <div className="card-body">
              {stocksByBase.map((base, index) => (
                <div key={index} className="stock-item">
                  <span className="stock-name">{base.name}</span>
                  <span className="stock-count">{base.count}</span>
                </div>
              ))}

              <div className="stock-total">
                <span className="total-label">Total</span>
                <span className="total-count">{totalStock}</span>
              </div>
            </div>
          </div>

          {/* Statuts */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Statuts</h2>
              <div className="card-icon">📊</div>
            </div>

            <div className="card-body">
              {statusData.map((item, index) => (
                <div key={index} className="status-item">
                  <div className="status-label">
                    <span className="status-icon">{item.icon}</span>
                    <span className="status-name">{item.status}</span>
                  </div>

                  <span className="status-count" style={{ color: item.color }}>
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Graphique */}
        <div className="chart-container">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Évolution mensuelle</h2>
              <div className="card-icon">📈</div>
            </div>

            <div className="card-body">
              <div className="chart">
                {monthlyData.map((data, index) => (
                  <div key={index} className="chart-bar-container">
                    <div className="chart-bar-wrapper">
                      <div 
                        className="chart-bar"
                        style={{ height: `${data.value}%` }}
                      >
                        <span className="bar-value">{data.value}%</span>
                      </div>
                    </div>

                    <span className="chart-label">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
