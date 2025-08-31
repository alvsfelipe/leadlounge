import React, { useState } from 'react';
import Step1Registration from './onboarding/Step1Registration';
import Step2FunnelSetup from './onboarding/Step2FunnelSetup';
import Step3TeamSetup from './onboarding/Step3TeamSetup';
import Step4Integrations from './onboarding/Step4Integrations';
import Step5AhaMoment from './onboarding/Step5AhaMoment';

const Onboarding = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState({
    step1: {},
    step2: {},
    step3: {},
    step4: {},
    step5: {}
  });

  const steps = [
    { id: 1, title: 'Cadastro Inicial', description: 'Informações básicas da empresa' },
    { id: 2, title: 'Configuração do Funil', description: 'Etapas do processo de vendas' },
    { id: 3, title: 'Cadastro da Equipe', description: 'Vendedores e WhatsApp' },
    { id: 4, title: 'Integrações', description: 'Google Agenda e CRM' },
    { id: 5, title: 'Primeiro Lead', description: 'Aha Moment!' }
  ];

  const updateStepData = (step, data) => {
    setOnboardingData(prev => ({
      ...prev,
      [step]: data
    }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Onboarding completo
      onComplete({
        token: 'demo_token_' + Date.now(),
        onboardingData
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercentage = (currentStep / 5) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Registration
            data={onboardingData.step1}
            onUpdate={(data) => updateStepData('step1', data)}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <Step2FunnelSetup
            data={onboardingData.step2}
            onUpdate={(data) => updateStepData('step2', data)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <Step3TeamSetup
            data={onboardingData.step3}
            onUpdate={(data) => updateStepData('step3', data)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <Step4Integrations
            data={onboardingData.step4}
            onUpdate={(data) => updateStepData('step4', data)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 5:
        return (
          <Step5AhaMoment
            data={onboardingData.step5}
            onUpdate={(data) => updateStepData('step5', data)}
            onNext={nextStep}
            onPrev={prevStep}
            allData={onboardingData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="onboarding-container">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🚀 Bem-vindo ao Lead Lounge AI
          </h1>
          <p className="text-gray-600">
            Configure seu sistema de automação em apenas 5 etapas (≈15 minutos)
          </p>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Steps Indicator */}
        <div className="flex justify-between mb-8">
          {steps.map((step) => (
            <div 
              key={step.id}
              className={`flex-1 text-center ${
                step.id <= currentStep ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-bold mb-2 ${
                step.id <= currentStep 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-400'
              }`}>
                {step.id}
              </div>
              <div className="text-xs font-medium">{step.title}</div>
            </div>
          ))}
        </div>

        {/* Current Step */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Etapa {currentStep}: {steps[currentStep - 1].title}
          </h2>
          <p className="text-gray-600">
            {steps[currentStep - 1].description}
          </p>
        </div>

        {/* Step Content */}
        {renderStep()}
      </div>
    </div>
  );
};

export default Onboarding;

