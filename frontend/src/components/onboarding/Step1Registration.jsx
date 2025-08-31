import React, { useState } from 'react';

const Step1Registration = ({ data, onUpdate, onNext }) => {
  const [formData, setFormData] = useState({
    company_name: data.company_name || '',
    segment: data.segment || '',
    revenue_range: data.revenue_range || '',
    employee_count: data.employee_count || '',
    website: data.website || '',
    description: data.description || '',
    how_found_us: data.how_found_us || '',
    main_challenge: data.main_challenge || '',
    automation_goal: data.automation_goal || '',
    ai_experience: data.ai_experience || ''
  });

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.company_name || !formData.segment || !formData.revenue_range || !formData.employee_count) {
      alert('Por favor, preencha todos os campos obrigatórios (*)');
      return;
    }

    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="step-container">
      {/* Dados da Empresa */}
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          🏢 Dados da Empresa
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Informações básicas sobre sua empresa
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">Nome da Empresa *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Minha Empresa Ltda"
              value={formData.company_name}
              onChange={(e) => handleChange('company_name', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Segmento/Área *</label>
            <select
              className="form-select"
              value={formData.segment}
              onChange={(e) => handleChange('segment', e.target.value)}
              required
            >
              <option value="">Selecione...</option>
              <option value="Tecnologia">Tecnologia</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Consultoria">Consultoria</option>
              <option value="Educação">Educação</option>
              <option value="Saúde">Saúde</option>
              <option value="Imobiliário">Imobiliário</option>
              <option value="Financeiro">Financeiro</option>
              <option value="Marketing">Marketing</option>
              <option value="Varejo">Varejo</option>
              <option value="Serviços">Serviços</option>
              <option value="Indústria">Indústria</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Faturamento Mensal *</label>
            <select
              className="form-select"
              value={formData.revenue_range}
              onChange={(e) => handleChange('revenue_range', e.target.value)}
              required
            >
              <option value="">Selecione...</option>
              <option value="Até R$ 10.000">Até R$ 10.000</option>
              <option value="R$ 10.000 - R$ 50.000">R$ 10.000 - R$ 50.000</option>
              <option value="R$ 50.000 - R$ 100.000">R$ 50.000 - R$ 100.000</option>
              <option value="R$ 100.000 - R$ 500.000">R$ 100.000 - R$ 500.000</option>
              <option value="R$ 500.000 - R$ 1.000.000">R$ 500.000 - R$ 1.000.000</option>
              <option value="Acima de R$ 1.000.000">Acima de R$ 1.000.000</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Número de Funcionários *</label>
            <select
              className="form-select"
              value={formData.employee_count}
              onChange={(e) => handleChange('employee_count', e.target.value)}
              required
            >
              <option value="">Selecione...</option>
              <option value="1-5 funcionários">1-5 funcionários</option>
              <option value="6-20 funcionários">6-20 funcionários</option>
              <option value="21-50 funcionários">21-50 funcionários</option>
              <option value="51-100 funcionários">51-100 funcionários</option>
              <option value="101-500 funcionários">101-500 funcionários</option>
              <option value="Mais de 500 funcionários">Mais de 500 funcionários</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Site da Empresa (opcional)</label>
          <input
            type="url"
            className="form-input"
            placeholder="https://www.minhaempresa.com.br"
            value={formData.website}
            onChange={(e) => handleChange('website', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Descrição da Empresa (opcional)</label>
          <textarea
            className="form-input"
            rows="3"
            placeholder="Conte um pouco sobre sua empresa, produtos e serviços..."
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>
      </div>

      {/* Perfil do Cliente */}
      <div className="bg-green-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          🎯 Perfil do Cliente
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Ajude-nos a personalizar sua experiência
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">Como conheceu nosso sistema?</label>
            <select
              className="form-select"
              value={formData.how_found_us}
              onChange={(e) => handleChange('how_found_us', e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="Google/Busca">Google/Busca</option>
              <option value="Redes Sociais">Redes Sociais</option>
              <option value="Indicação">Indicação</option>
              <option value="YouTube">YouTube</option>
              <option value="Blog/Artigo">Blog/Artigo</option>
              <option value="Evento/Webinar">Evento/Webinar</option>
              <option value="Anúncio Online">Anúncio Online</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Principal desafio em vendas</label>
            <select
              className="form-select"
              value={formData.main_challenge}
              onChange={(e) => handleChange('main_challenge', e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="Gerar mais leads">Gerar mais leads</option>
              <option value="Qualificar leads">Qualificar leads</option>
              <option value="Follow-up manual">Follow-up manual</option>
              <option value="Organização do funil">Organização do funil</option>
              <option value="Tempo de resposta">Tempo de resposta</option>
              <option value="Conversão baixa">Conversão baixa</option>
              <option value="Falta de automação">Falta de automação</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Objetivo com automação</label>
            <select
              className="form-select"
              value={formData.automation_goal}
              onChange={(e) => handleChange('automation_goal', e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="Economizar tempo">Economizar tempo</option>
              <option value="Aumentar conversões">Aumentar conversões</option>
              <option value="Melhorar follow-up">Melhorar follow-up</option>
              <option value="Organizar processos">Organizar processos</option>
              <option value="Escalar vendas">Escalar vendas</option>
              <option value="Reduzir custos">Reduzir custos</option>
              <option value="Melhorar experiência do cliente">Melhorar experiência do cliente</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Experiência com IA/Automação</label>
            <select
              className="form-select"
              value={formData.ai_experience}
              onChange={(e) => handleChange('ai_experience', e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="Nunca usei">Nunca usei</option>
              <option value="Iniciante">Iniciante</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-end space-x-4">
        <button type="submit" className="btn-primary">
          Continuar →
        </button>
      </div>

      {/* Suporte */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-2">
          Precisa de ajuda? Entre em contato conosco
        </p>
        <div className="flex justify-center space-x-4">
          <button type="button" className="text-sm text-blue-600 hover:text-blue-800">
            📧 Email
          </button>
          <button type="button" className="text-sm text-green-600 hover:text-green-800">
            📱 WhatsApp
          </button>
        </div>
      </div>
    </form>
  );
};

export default Step1Registration;

