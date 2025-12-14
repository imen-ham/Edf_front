import React from 'react';
import { Camera, TrendingUp, Activity, Network, Box, Zap } from 'lucide-react';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home-container">
     

      {/* SECTION - Hero */}
      <section className="hero-section">
        <div className="hero-content">

          {/* LEFT */}
          <div className="hero-left">
            <div className="hero-badge">⚡ Nouvelle génération de tracking</div>

            <h2 className="hero-title">
              Pilotez vos concentrateurs en toute <span className="highlight">intelligence</span>
            </h2>

            <p className="hero-description">
              Une solution complète pour tracer, gérer et optimiser la distribution de vos
              équipements CPL sur tout le territoire.
            </p>

            <div className="hero-buttons">
              <button className="btn-primary">
                <Camera className="w-5 h-5" />
                Commencer le scan
              </button>

              <button className="btn-secondary">Voir le dashboard</button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hero-right">
            <div className="hero-card">
              <div className="hero-card-pattern"></div>
              <div className="hero-card-content">

                <div className="concentrateurs-card">
                  <div className="concentrateurs-label">Concentrateurs suivis</div>
                  <div className="concentrateurs-value">
                    6386 <span className="units">unités</span>
                  </div>
                </div>

                <div className="activity-icon">
                  <Activity />
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION - Stats */}
      <section className="stats-section">
        <div className="stats-content">
          {[
            { value: '6386', label: 'Concentrateurs actifs', icon: Box, color: 'orange' },
            { value: '3', label: 'Bases opérationnelles', icon: Network, color: 'blue' },
            { value: '85.53%', label: 'Taux de disponibilité', icon: Zap, color: 'orange' }
          ].map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-card-header">
                <div className="stat-value">{stat.value}</div>
                <div className={`stat-icon ${stat.color}`}>
                  <stat.icon />
                </div>
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION - Features */}
      <section className="features-section">
        <div className="features-content">
          <div className="features-header">
            <h3 className="features-title">Fonctionnalités clés</h3>
            <p className="features-subtitle">Tout ce dont vous avez besoin pour une gestion optimale</p>
          </div>

          <div className="features-grid">
            {[
              {
                icon: Camera,
                title: 'Scanner & Tracer',
                description: 'Identifiez instantanément chaque concentrateur avec la technologie QR',
                color: 'blue'
              },
              {
                icon: Activity,
                title: 'Suivi en temps réel',
                description: "Visualisez l'état et la localisation de tous vos équipements",
                color: 'orange'
              },
              {
                icon: Network,
                title: 'Flux intelligents',
                description: "Optimisez vos transferts et actions avec l'analyse IA",
                color: 'blue'
              },
              {
                icon: TrendingUp,
                title: 'Analytics avancés',
                description: 'Prenez des décisions éclairées avec des données précises',
                color: 'orange'
              }
            ].map((f, index) => (
              <div key={index} className="feature-card">
                <div className={`feature-icon ${f.color}`}>
                  <f.icon />
                </div>
                <h4 className={`feature-title ${f.color}`}>{f.title}</h4>
                <p className="feature-description">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION - IA Banner */}
      <section className="ia-section">
        <div className="ia-background"></div>

        <div className="ia-content">
          {/* LEFT */}
          <div className="ia-left">
            <h2>
              Intelligence artificielle pour <span className="highlight">l'énergie</span>
            </h2>
            <p className="ia-description">
              Notre système analyse en temps réel les flux de concentrateurs et vous alerte sur les anomalies.
            </p>

           
          </div>

          {/* RIGHT */}
          <div className="ia-stats">
            {[
              { value: '24/7', label: 'Surveillance', gradient: 'orange' },
              { value: '< 2s', label: 'Temps de scan', gradient: 'orange' },
              { value: '100%', label: 'Traçabilité', gradient: 'blue' },
              { value: 'IA', label: 'Prédictions', gradient: 'orange' }
            ].map((s, index) => (
              <div key={index} className="ia-stat-card">
                <div className={`ia-stat-value ${s.gradient}`}>{s.value}</div>
                <div className="ia-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
