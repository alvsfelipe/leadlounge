# 🚀 Lead Lounge AI - Sistema de Automação de Vendas

## 📋 Visão Geral

Sistema completo de automação de vendas com IA, incluindo:
- ✅ **Onboarding em 5 etapas** (15 minutos)
- ✅ **Integração WhatsApp** Business
- ✅ **Google Agenda** para agendamentos
- ✅ **CRM Integration** (HubSpot, Pipedrive, etc.)
- ✅ **IA OpenAI** para análise e automação
- ✅ **Dashboard** com métricas em tempo real

## 🏗 Estrutura do Projeto

```
lead-lounge/
├── frontend/          # React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   └── onboarding/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── backend/           # Flask API
│   ├── src/
│   │   ├── app.py
│   │   └── models/
│   └── requirements.txt
└── README.md
```

## 🚀 Deploy Rápido

### Frontend (Vercel):
```bash
cd frontend
npm install
vercel
```

### Backend (Railway):
```bash
cd backend
railway init
railway up
```

## 📱 Funcionalidades

### 🎯 Sistema de Onboarding
1. **Cadastro da Empresa** - Dados básicos e perfil
2. **Configuração do Funil** - Etapas e objeções
3. **Cadastro da Equipe** - Vendedores + WhatsApp
4. **Integrações** - Google Agenda + CRM
5. **Primeiro Lead** - Aha Moment

### 🤖 Automação com IA
- **Análise de mensagens** WhatsApp
- **Score automático** de leads (0-100%)
- **Respostas inteligentes** personalizadas
- **Follow-up automático** baseado em comportamento

### 📊 Dashboard e Métricas
- **Leads em tempo real**
- **Taxa de conversão** por fonte
- **Tempo de resposta** médio
- **Agendamentos** automáticos

## 🔧 Configuração Local

### Pré-requisitos:
- Node.js 18+
- Python 3.11+
- Git

### Frontend:
```bash
cd frontend
npm install
npm run dev
# Acesse: http://localhost:5173
```

### Backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
python src/app.py
# Acesse: http://localhost:5000
```

## 🌐 URLs de Produção

- **Frontend:** https://lead-lounge.vercel.app
- **Backend:** https://lead-lounge-api.railway.app
- **Documentação:** https://docs.lead-lounge.ai

## 📞 Suporte

- **Email:** suporte@leadlounge.ai
- **WhatsApp:** (11) 99999-9999
- **Docs:** https://docs.leadlounge.ai

---

**Desenvolvido com ❤️ para automatizar vendas com IA**

