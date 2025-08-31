import React, { useState } from 'react';

const Step3TeamSetup = ({ data, onUpdate, onNext, onPrev }) => {
  const [formData, setFormData] = useState({
    team_members: data.team_members || []
  });

  const [newMember, setNewMember] = useState({
    name: '',
    whatsapp: '',
    role: 'Vendedor',
    verified: false,
    verification_code: ''
  });

  const [verificationStep, setVerificationStep] = useState({});

  const addTeamMember = () => {
    if (!newMember.name || !newMember.whatsapp) {
      alert('Por favor, preencha nome e WhatsApp');
      return;
    }

    const member = {
      ...newMember,
      id: Date.now(),
      verified: false
    };

    const newTeamMembers = [...formData.team_members, member];
    const newData = { ...formData, team_members: newTeamMembers };
    
    setFormData(newData);
    onUpdate(newData);
    
    setNewMember({
      name: '',
      whatsapp: '',
      role: 'Vendedor',
      verified: false,
      verification_code: ''
    });
  };

  const removeMember = (id) => {
    const newTeamMembers = formData.team_members.filter(member => member.id !== id);
    const newData = { ...formData, team_members: newTeamMembers };
    setFormData(newData);
    onUpdate(newData);
  };

  const sendVerificationCode = async (memberId) => {
    const member = formData.team_members.find(m => m.id === memberId);
    if (!member) return;

    try {
      // Simular envio de código
      setVerificationStep({ ...verificationStep, [memberId]: 'sending' });
      
      // Simular delay de envio
      setTimeout(() => {
        setVerificationStep({ ...verificationStep, [memberId]: 'sent' });
        alert(`Código enviado para ${member.whatsapp}!\n\nPara demonstração, use o código: 123456`);
      }, 2000);

    } catch (error) {
      alert('Erro ao enviar código. Tente novamente.');
      setVerificationStep({ ...verificationStep, [memberId]: 'error' });
    }
  };

  const verifyCode = (memberId, code) => {
    if (code === '123456') {
      const newTeamMembers = formData.team_members.map(member => 
        member.id === memberId 
          ? { ...member, verified: true }
          : member
      );
      const newData = { ...formData, team_members: newTeamMembers };
      setFormData(newData);
      onUpdate(newData);
      setVerificationStep({ ...verificationStep, [memberId]: 'verified' });
      alert('WhatsApp verificado com sucesso! ✅');
    } else {
      alert('Código inválido. Para demonstração, use: 123456');
    }
  };

  const formatWhatsApp = (phone) => {
    // Remove tudo que não é número
    const numbers = phone.replace(/\D/g, '');
    
    // Aplica máscara (11) 99999-9999
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return phone;
  };

  const handleWhatsAppChange = (value) => {
    const formatted = formatWhatsApp(value);
    setNewMember({ ...newMember, whatsapp: formatted });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.team_members.length === 0) {
      alert('Adicione pelo menos um membro da equipe');
      return;
    }

    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="step-container">
      {/* Adicionar Novo Membro */}
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          👥 Adicionar Membro da Equipe
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Cadastre os vendedores que irão usar o sistema
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="form-group">
            <label className="form-label">Nome Completo</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: João Silva"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">WhatsApp</label>
            <input
              type="text"
              className="form-input"
              placeholder="(11) 99999-9999"
              value={newMember.whatsapp}
              onChange={(e) => handleWhatsAppChange(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Função</label>
            <select
              className="form-select"
              value={newMember.role}
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
            >
              <option value="Vendedor">Vendedor</option>
              <option value="Gerente de Vendas">Gerente de Vendas</option>
              <option value="SDR">SDR</option>
              <option value="Closer">Closer</option>
              <option value="Coordenador">Coordenador</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={addTeamMember}
          className="btn-primary"
        >
          ➕ Adicionar à Equipe
        </button>
      </div>

      {/* Lista da Equipe */}
      {formData.team_members.length > 0 && (
        <div className="bg-green-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            📱 Equipe Cadastrada
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Verifique os números do WhatsApp para ativar as funcionalidades
          </p>

          <div className="space-y-4">
            {formData.team_members.map((member) => (
              <div key={member.id} className="bg-white p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    <p className="text-sm text-gray-600">{member.whatsapp}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {member.verified ? (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        ✅ Verificado
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        ⏳ Pendente
                      </span>
                    )}
                    
                    <button
                      type="button"
                      onClick={() => removeMember(member.id)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {/* Verificação WhatsApp */}
                {!member.verified && (
                  <div className="border-t pt-3">
                    {verificationStep[member.id] === 'verified' ? (
                      <div className="text-green-600 text-sm">
                        ✅ WhatsApp verificado com sucesso!
                      </div>
                    ) : verificationStep[member.id] === 'sent' ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          className="form-input flex-1"
                          placeholder="Digite o código recebido"
                          maxLength="6"
                          onChange={(e) => {
                            if (e.target.value.length === 6) {
                              verifyCode(member.id, e.target.value);
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => sendVerificationCode(member.id)}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Reenviar
                        </button>
                      </div>
                    ) : verificationStep[member.id] === 'sending' ? (
                      <div className="text-blue-600 text-sm">
                        📤 Enviando código...
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => sendVerificationCode(member.id)}
                        className="btn-secondary text-sm"
                      >
                        📱 Enviar Código de Verificação
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Informações sobre WhatsApp */}
      <div className="bg-yellow-50 p-4 rounded-lg mb-6 border-l-4 border-yellow-400">
        <div className="flex items-start">
          <span className="text-yellow-600 text-lg mr-3">💡</span>
          <div>
            <h4 className="font-semibold text-yellow-800 mb-1">Sobre a Verificação WhatsApp</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• O código será enviado via WhatsApp para o número informado</li>
              <li>• Certifique-se de que o WhatsApp está ativo no número</li>
              <li>• A verificação é necessária para envio de mensagens automáticas</li>
              <li>• Você pode pular esta etapa e verificar depois</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Estatísticas da Equipe */}
      {formData.team_members.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">📊 Resumo da Equipe</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {formData.team_members.length}
              </div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {formData.team_members.filter(m => m.verified).length}
              </div>
              <div className="text-sm text-gray-600">Verificados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {formData.team_members.filter(m => !m.verified).length}
              </div>
              <div className="text-sm text-gray-600">Pendentes</div>
            </div>
          </div>
        </div>
      )}

      {/* Botões */}
      <div className="flex justify-between">
        <button type="button" onClick={onPrev} className="btn-secondary">
          ← Voltar
        </button>
        <button 
          type="submit" 
          className="btn-primary"
          disabled={formData.team_members.length === 0}
        >
          Continuar →
        </button>
      </div>
    </form>
  );
};

export default Step3TeamSetup;

