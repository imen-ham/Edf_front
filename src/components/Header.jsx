// src/components/Header.jsx
import React from 'react';
import { Camera, FileText, BarChart3, Map, Zap } from 'lucide-react';

export function Header({ onNavigate, currentScreen }) {
  const navItems = [
    { id: 'scanner', label: 'Scanner & Saisir', icon: Camera },
    { id: 'actions', label: 'Actions', icon: FileText },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'mapflow', label: 'MapFlow', icon: Map },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_2px_16px_rgba(0,80,160,0.1)] border-b border-[#E5E5E5]">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between max-w-[1440px] mx-auto">
          {/* Logo EDF + Titre */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-4 hover:opacity-80 transition-opacity"
          >
            <div className="w-[60px] h-[60px] bg-gradient-to-br from-[#0050A0] to-[#003D7A] rounded-xl flex items-center justify-center shadow-lg">
              <Zap size={32} className="text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[#0050A0] tracking-tight font-bold">CPL Tracker 360</span>
              <span className="text-xs text-[#666]">Suivi intelligent des concentrateurs</span>
            </div>
          </button>

          {/* Navigation */}
          <nav className="flex gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#0050A0] text-white shadow-lg shadow-[#0050A0]/30'
                      : 'text-[#0050A0] hover:bg-[#F0F7FF]'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
