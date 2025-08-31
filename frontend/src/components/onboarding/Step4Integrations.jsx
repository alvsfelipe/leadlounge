import React, { useState } from 'react';

const Step4Integrations = ({ data, onUpdate, onNext, onPrev }) => {
  const [formData, setFormData] = useState({
    google_calendar: data.google_calendar || false,
    crm_integration: data.crm_integration || {},
    whatsapp_business: data.whatsapp_business || false,
    ...data
  });

  const [integrationStatus, setIntegrationStatus] = useState({
    google_calendar: 'disconnected',
    crm: 'disconnected',
    whatsapp_business: 'disconnected'
  });

  const connectGoogleCalendar = () => {
    setIntegrationStatus({ ...integrationStatus, google_calendar: 'connecting' });
    
    // Simular processo de conexão
    setTimeout(() => {
      setIntegrationStatus({ ...integrationStatus, google_calendar: 'connected' });
      const newData = { ...formData, google_calendar: true };
      setFormData(newData);
      onUpdate(newData);
      alert('Google Agenda conectado com sucesso! ✅');
    }, 2000);
  };

  const connectCRM = (crmType) => {
    setIntegrationStatus({ ...integrationStatus, crm: 'connecting' });
    
    // Simular processo de conexão
    setTimeout(() => {
      setIntegrationStatus({ ...integrationStatus, crm: 'connected' });
      const newData = { 
        ...formData, 
        crm_integration: { 
          type: crmType, 
          connected: true,
          connected_at: new Date().toISOString()
        }
      };
      setFormData(newData);
      onUpdate(newData);
      alert(`${crmType} conectado com sucesso! ✅`);
    }, 2000);
  };

  const connectWhatsAppBusiness = () => {
    setIntegrationStatus({ ...integrationStatus, whatsapp_business: 'connecting' });
    
    // Simular processo de conexão
    setTimeout(() => {
      setIntegrationStatus({ ...integrationStatus, whatsapp_business: 'connected' });
      const newData = { ...formData, whatsapp_business: true };
      setFormData(newData);
      onUpdate(newData);
      alert('WhatsApp Business conectado com sucesso! ✅');
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const crmOptions = [
    { id: 'hubspot', name: 'HubSpot', icon: '🔶', description: 'CRM completo com automação' },
    { id: 'pipedrive', name: 'Pipedrive', icon: '🟢', description: 'Funil de vendas visual' },
    { id: 'salesforce', name: 'Salesforce', icon: '☁️', description: 'CRM enterprise' },
    { id: 'rd_station', name: 'RD Station', icon: '🚀', description: 'Marketing e vendas' },
    { id: 'other', name: 'Outro CRM', icon: '⚙️', description: 'Integração personalizada' }
  ];

  return (
    <form onSubmit={handleSubmit} className="step-container">
      {/* Google Agenda */}
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          📅 Google Agenda
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Conecte sua agenda para agendamentos automáticos de reuniões
        </p>

        <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl">
              📅
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Google Calendar</h4>
              <p className="text-sm text-gray-600">
                Sincronização bidirecional com sua agenda
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {integrationStatus.google_calendar === 'connected' || formData.google_calendar ? (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                ✅ Conectado
              </span>
            ) : integrationStatus.google_calendar === 'connecting' ? (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                🔄 Conectando...
              </span>
            ) : (
              <button
                type="button"
                onClick={connectGoogleCalendar}
                className="btn-primary text-sm"
              >
                Conectar
              </button>
            )}
          </div>
        </div>

        {(integrationStatus.google_calendar === 'connected' || formData.google_calendar) && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
            <p className="text-sm text-green-700">
              ✅ Agora você pode agendar reuniões automaticamente quando leads demonstrarem interesse!
            </p>
          </div>
        )}
      </div>

      {/* CRM Integration */}
      <div className="bg-purple-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          🔗 Integração com CRM
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Conecte seu CRM atual para sincronizar leads e oportunidades
        </p>

        {formData.crm_integration?.connected ? (
          <div className="p-4 bg-white rounded-lg border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">
                  {crmOptions.find(crm => crm.id === formData.crm_integration.type)?.icon}
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {crmOptions.find(crm => crm.id === formData.crm_integration.type)?.name}
                  </h4>
                  <p className="text-sm text-gray-600">Conectado e sincronizando</p>
                </div>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                ✅ Ativo
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {crmOptions.map((crm) => (
              <div
                key={crm.id}
                className="p-4 bg-white rounded-lg border hover:border-purple-300 cursor-pointer transition-all"
                onClick={() => connectCRM(crm.name)}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{crm.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">{crm.name}</h4>
                    <p className="text-xs text-gray-600">{crm.description}</p>
                  </div>
                </div>
                
                {integrationStatus.crm === 'connecting' ? (
                  <span className="text-sm text-blue-600">🔄 Conectando...</span>
                ) : (
                  <span className="text-sm text-purple-600 hover:text-purple-800">
                    Clique para conectar →
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
          <p className="text-sm text-yellow-700">
            💡 <strong>Opcional:</strong> Você pode pular esta etapa e configurar depois no dashboard
          </p>
        </div>
      </div>

      {/* WhatsApp Business */}
      <div className="bg-green-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          📱 WhatsApp Business API
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Configure o WhatsApp Business para automação completa de mensagens
        </p>

        <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white text-xl">
              📱
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">WhatsApp Business API</h4>
              <p className="text-sm text-gray-600">
                Envio e recebimento automático de mensagens
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {integrationStatus.whatsapp_business === 'connected' || formData.whatsapp_business ? (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                ✅ Conectado
              </span>
            ) : integrationStatus.whatsapp_business === 'connecting' ? (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                🔄 Conectando...
              </span>
            ) : (
              <button
                type="button"
                onClick={connectWhatsAppBusiness}
                className="btn-primary text-sm"
              >
                Conectar
              </button>
            )}
          </div>
        </div>

        {(integrationStatus.whatsapp_business === 'connected' || formData.whatsapp_business) && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
            <p className="text-sm text-green-700">
              ✅ WhatsApp Business ativo! Agora você pode enviar mensagens automáticas e receber leads.
            </p>
          </div>
        )}
      </div>

      {/* Resumo das Integrações */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Resumo das Integrações</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className={`text-3xl mb-2 ${formData.google_calendar ? 'text-green-600' : 'text-gray-400'}`}>
              {formData.google_calendar ? '✅' : '⏳'}
            </div>
            <div className="text-sm font-medium text-gray-900">Google Agenda</div>
            <div className="text-xs text-gray-600">
              {formData.google_calendar ? 'Conectado' : 'Pendente'}
            </div>
          </div>

          <div className="text-center">
            <div className={`text-3xl mb-2 ${formData.crm_integration?.connected ? 'text-green-600' : 'text-gray-400'}`}>
              {formData.crm_integration?.connected ? '✅' : '⏳'}
            </div>
            <div className="text-sm font-medium text-gray-900">CRM</div>
            <div className="text-xs text-gray-600">
              {formData.crm_integration?.connected ? formData.crm_integration.type : 'Pendente'}
            </div>
          </div>

          <div className="text-center">
            <div className={`text-3xl mb-2 ${formData.whatsapp_business ? 'text-green-600' : 'text-gray-400'}`}>
              {formData.whatsapp_business ? '✅' : '⏳'}
            </div>
            <div className="text-sm font-medium text-gray-900">WhatsApp</div>
            <div className="text-xs text-gray-600">
              {formData.whatsapp_business ? 'Conectado' : 'Pendente'}
            </div>
          </div>
        </div>
      </div>

      {/* Dica sobre Integrações */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6 border-l-4 border-blue-400">
        <div className="flex items-start">
          <span className="text-blue-600 text-lg mr-3">💡</span>
          <div>
            <h4 className="font-semibold text-blue-800 mb-1">Sobre as Integrações</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>Google Agenda:</strong> Essencial para agendamentos automáticos</li>
              <li>• <strong>CRM:</strong> Opcional, mas recomendado para empresas que já usam</li>
              <li>• <strong>WhatsApp:</strong> Fundamental para automação de mensagens</li>
              <li>• Todas podem ser configuradas depois no dashboard</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-between">
        <button type="button" onClick={onPrev} className="btn-secondary">
          ← Voltar
        </button>
        <button type="submit" className="btn-primary">
          Continuar →
        </button>
      </div>
    </form>
  );
};

export default Step4Integrations;

