import React, { useState } from 'react';

const Step5AhaMoment = ({ data, onUpdate, onNext, onPrev, allData }) => {
  const [formData, setFormData] = useState({
    name: data.name || '',
    phone: data.phone || '',
    email: data.email || '',
    source: data.source || '',
    interest: data.interest || '',
    score: data.score || 0
  });

  const [leadCreated, setLeadCreated] = useState(false);
  const [automationDemo, setAutomationDemo] = useState({
    whatsapp_sent: false,
    meeting_scheduled: false,
    followup_configured: false
  });

  const calculateScore = () => {
    let score = 50; // Base score
    
    // Aumentar score baseado nos dados
    if (formData.email && formData.email.includes('@')) score += 15;
    if (formData.phone && formData.phone.length > 10) score += 15;
    if (formData.source === 'Indicação') score += 20;
    if (formData.interest === 'Automação completa') score += 10;
    
    // Adicionar aleatoriedade para parecer mais real
    score += Math.floor(Math.random() * 10);
    
    return Math.min(score, 100);
  };

  const createLead = () => {
    if (!formData.name || !formData.phone) {
      alert('Por favor, preencha pelo menos nome e telefone');
      return;
    }

    const score = calculateScore();
    const newData = { ...formData, score };
    setFormData(newData);
    onUpdate(newData);
    setLeadCreated(true);

    // Simular criação do lead
    setTimeout(() => {
      alert(`🎉 Lead criado com sucesso!\n\nNome: ${formData.name}\nScore: ${score}%\n\nAgora vamos demonstrar as automações!`);
      startAutomationDemo();
    }, 1000);
  };

  const startAutomationDemo = () => {
    // Simular envio WhatsApp
    setTimeout(() => {
      setAutomationDemo(prev => ({ ...prev, whatsapp_sent: true }));
    }, 2000);

    // Simular agendamento
    setTimeout(() => {
      setAutomationDemo(prev => ({ ...prev, meeting_scheduled: true }));
    }, 4000);

    // Simular configuração de follow-up
    setTimeout(() => {
      setAutomationDemo(prev => ({ ...prev, followup_configured: true }));
    }, 6000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!leadCreated) {
      alert('Primeiro crie seu lead de demonstração!');
      return;
    }

    // Completar onboarding
    onNext();
  };

  const formatPhone = (phone) => {
    const numbers = phone.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return phone;
  };

  return (
    <form onSubmit={handleSubmit} className="step-container">
      {/* Criar Primeiro Lead */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          ⭐ Seu Primeiro Lead
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Vamos criar seu primeiro lead para demonstrar como o sistema funciona na prática!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="form-group">
            <label className="form-label">Nome do Lead *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Maria Silva"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={leadCreated}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Telefone/WhatsApp *</label>
            <input
              type="text"
              className="form-input"
              placeholder="(11) 99999-9999"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
              disabled={leadCreated}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="maria@empresa.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={leadCreated}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Como conheceu</label>
            <select
              className="form-select"
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              disabled={leadCreated}
            >
              <option value="">Selecione...</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Site">Site</option>
              <option value="Indicação">Indicação</option>
              <option value="Redes Sociais">Redes Sociais</option>
              <option value="Google">Google</option>
              <option value="Evento">Evento</option>
            </select>
          </div>

          <div className="form-group md:col-span-2">
            <label className="form-label">Interesse</label>
            <select
              className="form-select"
              value={formData.interest}
              onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
              disabled={leadCreated}
            >
              <option value="">Selecione...</option>
              <option value="Automação completa">Automação completa</option>
              <option value="Apenas WhatsApp">Apenas WhatsApp</option>
              <option value="Integração CRM">Integração CRM</option>
              <option value="Agendamento">Agendamento</option>
              <option value="Relatórios">Relatórios</option>
            </select>
          </div>
        </div>

        {!leadCreated ? (
          <button
            type="button"
            onClick={createLead}
            className="btn-primary"
          >
            🚀 Criar Meu Primeiro Lead
          </button>
        ) : (
          <div className="bg-white p-4 rounded-lg border-2 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">{formData.name}</h4>
                <p className="text-sm text-gray-600">{formData.phone} • {formData.email}</p>
                <p className="text-sm text-gray-600">Fonte: {formData.source} • Interesse: {formData.interest}</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{formData.score}%</div>
                <div className="text-xs text-gray-600">Score IA</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Demonstração das Automações */}
      {leadCreated && (
        <div className="bg-green-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            🤖 Automações em Ação
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Veja como o sistema trabalha automaticamente para você!
          </p>

          <div className="space-y-4">
            {/* WhatsApp */}
            <div className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
              automationDemo.whatsapp_sent ? 'bg-green-100 border-green-200' : 'bg-gray-100'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                automationDemo.whatsapp_sent ? 'bg-green-600 text-white' : 'bg-gray-400 text-white'
              }`}>
                {automationDemo.whatsapp_sent ? '✅' : '📱'}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Mensagem WhatsApp Enviada</h4>
                <p className="text-sm text-gray-600">
                  {automationDemo.whatsapp_sent 
                    ? `Olá ${formData.name}! Obrigado pelo interesse. Vamos agendar uma conversa?`
                    : 'Preparando mensagem personalizada...'
                  }
                </p>
              </div>
              {automationDemo.whatsapp_sent && (
                <span className="text-xs text-green-600 font-medium">Enviado!</span>
              )}
            </div>

            {/* Agendamento */}
            <div className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
              automationDemo.meeting_scheduled ? 'bg-blue-100 border-blue-200' : 'bg-gray-100'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                automationDemo.meeting_scheduled ? 'bg-blue-600 text-white' : 'bg-gray-400 text-white'
              }`}>
                {automationDemo.meeting_scheduled ? '✅' : '📅'}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Reunião Agendada</h4>
                <p className="text-sm text-gray-600">
                  {automationDemo.meeting_scheduled 
                    ? 'Reunião agendada para amanhã às 14:00 via Google Agenda'
                    : 'Verificando disponibilidade na agenda...'
                  }
                </p>
              </div>
              {automationDemo.meeting_scheduled && (
                <span className="text-xs text-blue-600 font-medium">Agendado!</span>
              )}
            </div>

            {/* Follow-up */}
            <div className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
              automationDemo.followup_configured ? 'bg-purple-100 border-purple-200' : 'bg-gray-100'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                automationDemo.followup_configured ? 'bg-purple-600 text-white' : 'bg-gray-400 text-white'
              }`}>
                {automationDemo.followup_configured ? '✅' : '🔄'}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Follow-up Configurado</h4>
                <p className="text-sm text-gray-600">
                  {automationDemo.followup_configured 
                    ? 'Sequência de 5 mensagens programadas baseada no score do lead'
                    : 'Configurando sequência de follow-up inteligente...'
                  }
                </p>
              </div>
              {automationDemo.followup_configured && (
                <span className="text-xs text-purple-600 font-medium">Ativo!</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Aha Moment */}
      {leadCreated && automationDemo.followup_configured && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg mb-6 border-2 border-yellow-200">
          <div className="text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Parabéns! Seu Sistema Está Funcionando!
            </h3>
            <p className="text-gray-600 mb-4">
              Em menos de 15 minutos você configurou um sistema completo de automação que:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">✅ O que você conquistou:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Sistema de onboarding personalizado</li>
                  <li>• Funil de vendas configurado</li>
                  <li>• Equipe cadastrada e verificada</li>
                  <li>• Integrações ativas</li>
                  <li>• Primeiro lead criado</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">🚀 Próximos passos:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Importar seus leads existentes</li>
                  <li>• Personalizar mensagens automáticas</li>
                  <li>• Configurar relatórios</li>
                  <li>• Treinar sua equipe</li>
                  <li>• Monitorar resultados</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resumo do Onboarding */}
      {leadCreated && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Resumo da Configuração</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {allData.step1?.company_name ? '✅' : '❌'}
              </div>
              <div className="text-sm text-gray-600">Empresa</div>
            </div>
            
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {allData.step2?.funnel_stages?.length || 0}
              </div>
              <div className="text-sm text-gray-600">Etapas Funil</div>
            </div>
            
            <div>
              <div className="text-2xl font-bold text-green-600">
                {allData.step3?.team_members?.length || 0}
              </div>
              <div className="text-sm text-gray-600">Vendedores</div>
            </div>
            
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {Object.values(allData.step4 || {}).filter(Boolean).length}
              </div>
              <div className="text-sm text-gray-600">Integrações</div>
            </div>
          </div>
        </div>
      )}

      {/* Botões */}
      <div className="flex justify-between">
        <button type="button" onClick={onPrev} className="btn-secondary">
          ← Voltar
        </button>
        
        {leadCreated && automationDemo.followup_configured ? (
          <button type="submit" className="btn-primary bg-gradient-to-r from-green-600 to-blue-600">
            🎉 Finalizar Onboarding
          </button>
        ) : (
          <button type="button" disabled className="btn-secondary opacity-50 cursor-not-allowed">
            Crie seu lead primeiro
          </button>
        )}
      </div>
    </form>
  );
};

export default Step5AhaMoment;

