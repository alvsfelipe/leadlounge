import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificar se usuário já completou onboarding
    const onboardingCompleted = localStorage.getItem('onboarding_completed');
    const userToken = localStorage.getItem('user_token');
    
    if (!onboardingCompleted || !userToken) {
      setShowOnboarding(true);
    } else {
      setUser({ token: userToken });
    }
  }, []);

  const handleOnboardingComplete = (userData) => {
    localStorage.setItem('onboarding_completed', 'true');
    localStorage.setItem('user_token', userData.token || 'demo_token');
    setUser(userData);
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                🚀 Lead Lounge AI
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Bem-vindo de volta!
              </span>
              <button 
                onClick={() => {
                  localStorage.clear();
                  setShowOnboarding(true);
                }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Refazer Onboarding
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard
          </h2>
          <p className="text-gray-600">
            Visão geral do seu sistema de automação de vendas
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid mb-8">
          <div className="stat-card">
            <div className="stat-number">47</div>
            <div className="stat-label">Total de Leads</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">23.5%</div>
            <div className="stat-label">Taxa de Conversão</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">2.3 min</div>
            <div className="stat-label">Tempo de Resposta</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">8</div>
            <div className="stat-label">Automações Ativas</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ações Rápidas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="btn-primary">
              📱 Novo Lead WhatsApp
            </button>
            <button className="btn-primary">
              📅 Agendar Reunião
            </button>
            <button className="btn-primary">
              🤖 Criar Automação
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Atividade Recente
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium text-gray-900">
                  Novo lead: João Silva
                </p>
                <p className="text-sm text-gray-600">
                  Via WhatsApp • Score: 85%
                </p>
              </div>
              <span className="text-sm text-gray-500">2 min atrás</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium text-gray-900">
                  Reunião agendada: Maria Santos
                </p>
                <p className="text-sm text-gray-600">
                  Amanhã às 14:00
                </p>
              </div>
              <span className="text-sm text-gray-500">5 min atrás</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">
                  Follow-up enviado automaticamente
                </p>
                <p className="text-sm text-gray-600">
                  Para 12 leads em "Proposta"
                </p>
              </div>
              <span className="text-sm text-gray-500">10 min atrás</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

