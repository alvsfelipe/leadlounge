import React, { useState } from 'react';

const Step2FunnelSetup = ({ data, onUpdate, onNext, onPrev }) => {
  const [formData, setFormData] = useState({
    template_type: data.template_type || '',
    funnel_stages: data.funnel_stages || [],
    common_objections: data.common_objections || [],
    follow_up_intervals: data.follow_up_intervals || {}
  });

  const templates = {
    saas: {
      name: 'SaaS/Tecnologia',
      stages: ['Lead', 'Demo Agendada', 'Demo Realizada', 'Proposta', 'Negociação', 'Fechamento'],
      objections: [
        'Preço muito alto',
        'Preciso consultar a equipe',
        'Já temos uma solução',
        'Não é o momento certo',
        'Preciso de mais funcionalidades'
      ]
    },
    ecommerce: {
      name: 'E-commerce',
      stages: ['Visitante', 'Interesse', 'Carrinho', 'Checkout', 'Compra', 'Pós-venda'],
      objections: [
        'Frete muito caro',
        'Não confio no site',
        'Produto muito caro',
        'Prazo de entrega longo',
        'Política de troca ruim'
      ]
    },
    consultoria: {
      name: 'Consultoria',
      stages: ['Contato', 'Diagnóstico', 'Proposta', 'Negociação', 'Contrato', 'Entrega'],
      objections: [
        'Valor do investimento',
        'Tempo de implementação',
        'Resultados não garantidos',
        'Experiência em nosso setor',
        'Equipe interna pode fazer'
      ]
    },
    custom: {
      name: 'Personalizado',
      stages: ['Etapa 1', 'Etapa 2', 'Etapa 3', 'Fechamento'],
      objections: ['Objeção 1', 'Objeção 2', 'Objeção 3']
    }
  };

  const handleTemplateSelect = (templateKey) => {
    const template = templates[templateKey];
    const newData = {
      ...formData,
      template_type: templateKey,
      funnel_stages: template.stages,
      common_objections: template.objections,
      follow_up_intervals: {
        'Lead': 1,
        'Demo Agendada': 1,
        'Demo Realizada': 2,
        'Proposta': 3,
        'Negociação': 1,
        'Fechamento': 7
      }
    };
    setFormData(newData);
    onUpdate(newData);
  };

  const handleStageChange = (index, value) => {
    const newStages = [...formData.funnel_stages];
    newStages[index] = value;
    const newData = { ...formData, funnel_stages: newStages };
    setFormData(newData);
    onUpdate(newData);
  };

  const addStage = () => {
    const newStages = [...formData.funnel_stages, 'Nova Etapa'];
    const newData = { ...formData, funnel_stages: newStages };
    setFormData(newData);
    onUpdate(newData);
  };

  const removeStage = (index) => {
    const newStages = formData.funnel_stages.filter((_, i) => i !== index);
    const newData = { ...formData, funnel_stages: newStages };
    setFormData(newData);
    onUpdate(newData);
  };

  const handleObjectionChange = (index, value) => {
    const newObjections = [...formData.common_objections];
    newObjections[index] = value;
    const newData = { ...formData, common_objections: newObjections };
    setFormData(newData);
    onUpdate(newData);
  };

  const addObjection = () => {
    const newObjections = [...formData.common_objections, 'Nova objeção'];
    const newData = { ...formData, common_objections: newObjections };
    setFormData(newData);
    onUpdate(newData);
  };

  const removeObjection = (index) => {
    const newObjections = formData.common_objections.filter((_, i) => i !== index);
    const newData = { ...formData, common_objections: newObjections };
    setFormData(newData);
    onUpdate(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.funnel_stages.length < 3) {
      alert('Seu funil deve ter pelo menos 3 etapas');
      return;
    }

    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="step-container">
      {/* Templates Pré-configurados */}
      <div className="bg-purple-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          🎯 Templates de Funil
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Escolha um template baseado no seu tipo de negócio ou crie um personalizado
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(templates).map(([key, template]) => (
            <div
              key={key}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.template_type === key
                  ? 'border-purple-500 bg-purple-100'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
              onClick={() => handleTemplateSelect(key)}
            >
              <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
              <div className="text-sm text-gray-600">
                <p className="mb-1">Etapas: {template.stages.length}</p>
                <p className="text-xs">{template.stages.slice(0, 3).join(' → ')}...</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configuração das Etapas */}
      {formData.template_type && (
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            📊 Etapas do Funil
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Personalize as etapas do seu processo de vendas
          </p>

          <div className="space-y-3">
            {formData.funnel_stages.map((stage, index) => (
              <div key={index} className="flex items-center space-x-3">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <input
                  type="text"
                  className="form-input flex-1"
                  value={stage}
                  onChange={(e) => handleStageChange(index, e.target.value)}
                  placeholder={`Etapa ${index + 1}`}
                />
                {formData.funnel_stages.length > 3 && (
                  <button
                    type="button"
                    onClick={() => removeStage(index)}
                    className="text-red-600 hover:text-red-800 p-2"
                  >
                    ❌
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addStage}
            className="mt-4 btn-secondary"
          >
            ➕ Adicionar Etapa
          </button>
        </div>
      )}

      {/* Objeções Comuns */}
      {formData.template_type && (
        <div className="bg-orange-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            💬 Objeções Comuns
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Liste as objeções que seus clientes costumam ter
          </p>

          <div className="space-y-3">
            {formData.common_objections.map((objection, index) => (
              <div key={index} className="flex items-center space-x-3">
                <span className="text-orange-600 text-lg">💭</span>
                <input
                  type="text"
                  className="form-input flex-1"
                  value={objection}
                  onChange={(e) => handleObjectionChange(index, e.target.value)}
                  placeholder={`Objeção ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeObjection(index)}
                  className="text-red-600 hover:text-red-800 p-2"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addObjection}
            className="mt-4 btn-secondary"
          >
            ➕ Adicionar Objeção
          </button>
        </div>
      )}

      {/* Dica de IA */}
      {formData.template_type && (
        <div className="bg-green-50 p-4 rounded-lg mb-6 border-l-4 border-green-400">
          <div className="flex items-start">
            <span className="text-green-600 text-lg mr-3">🤖</span>
            <div>
              <h4 className="font-semibold text-green-800 mb-1">Dica da IA</h4>
              <p className="text-sm text-green-700">
                Com base no seu funil, nossa IA irá sugerir automaticamente as melhores 
                mensagens de follow-up para cada etapa e respostas inteligentes para as objeções.
              </p>
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
          disabled={!formData.template_type}
        >
          Continuar →
        </button>
      </div>
    </form>
  );
};

export default Step2FunnelSetup;

