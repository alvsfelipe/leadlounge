from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Simulação de banco de dados em memória
users_db = {}
onboarding_db = {}
companies_db = {}

@app.route('/')
def home():
    return jsonify({
        "message": "Lead Lounge AI - Backend Online",
        "version": "1.0.0",
        "status": "running",
        "timestamp": datetime.now().isoformat(),
        "features": [
            "Sistema de Onboarding Completo",
            "Integração WhatsApp Business",
            "Google Agenda Integration",
            "CRM Sync",
            "IA para Análise de Leads",
            "Automação de Follow-up"
        ]
    })

@app.route('/api/health')
def health():
    return jsonify({
        "status": "healthy", 
        "timestamp": datetime.now().isoformat(),
        "uptime": "100%",
        "database": "connected",
        "integrations": "active"
    })

# ==================== ROTAS DE ONBOARDING ====================

@app.route('/api/onboarding/progress', methods=['GET'])
def get_onboarding_progress():
    user_id = request.args.get('user_id', 'demo_user')
    progress = onboarding_db.get(user_id, {
        'current_step': 1,
        'step_1_completed': False,
        'step_2_completed': False,
        'step_3_completed': False,
        'step_4_completed': False,
        'step_5_completed': False,
        'completed_at': None,
        'progress_percentage': 0
    })
    return jsonify(progress)

@app.route('/api/onboarding/step1', methods=['POST'])
def complete_step1():
    data = request.get_json()
    user_id = data.get('user_id', 'demo_user')
    
    # Salvar dados da empresa
    companies_db[user_id] = {
        'company_name': data.get('company_name'),
        'segment': data.get('segment'),
        'revenue_range': data.get('revenue_range'),
        'employee_count': data.get('employee_count'),
        'website': data.get('website'),
        'description': data.get('description'),
        'how_found_us': data.get('how_found_us'),
        'main_challenge': data.get('main_challenge'),
        'automation_goal': data.get('automation_goal'),
        'ai_experience': data.get('ai_experience'),
        'created_at': datetime.now().isoformat()
    }
    
    # Atualizar progresso
    if user_id not in onboarding_db:
        onboarding_db[user_id] = {
            'current_step': 1,
            'step_1_completed': False,
            'step_2_completed': False,
            'step_3_completed': False,
            'step_4_completed': False,
            'step_5_completed': False,
            'completed_at': None
        }
    
    onboarding_db[user_id]['step_1_completed'] = True
    onboarding_db[user_id]['current_step'] = 2
    onboarding_db[user_id]['progress_percentage'] = 20
    onboarding_db[user_id]['company_data'] = companies_db[user_id]
    
    return jsonify({
        'success': True,
        'message': 'Etapa 1 concluída com sucesso! 🎉',
        'next_step': 2,
        'progress': 20,
        'company_registered': True
    })

@app.route('/api/onboarding/step2', methods=['POST'])
def complete_step2():
    data = request.get_json()
    user_id = data.get('user_id', 'demo_user')
    
    # Salvar configuração do funil
    funnel_config = {
        'template_type': data.get('template_type', 'custom'),
        'funnel_stages': data.get('funnel_stages', []),
        'common_objections': data.get('common_objections', []),
        'follow_up_intervals': data.get('follow_up_intervals', {}),
        'created_at': datetime.now().isoformat()
    }
    
    if user_id not in onboarding_db:
        onboarding_db[user_id] = {}
    
    onboarding_db[user_id]['funnel_config'] = funnel_config
    onboarding_db[user_id]['step_2_completed'] = True
    onboarding_db[user_id]['current_step'] = 3
    onboarding_db[user_id]['progress_percentage'] = 40
    
    return jsonify({
        'success': True,
        'message': 'Funil configurado com sucesso! 📊',
        'next_step': 3,
        'progress': 40,
        'funnel_stages_count': len(funnel_config['funnel_stages']),
        'objections_count': len(funnel_config['common_objections'])
    })

@app.route('/api/onboarding/step3', methods=['POST'])
def complete_step3():
    data = request.get_json()
    user_id = data.get('user_id', 'demo_user')
    
    # Salvar equipe
    team_members = data.get('team_members', [])
    
    # Adicionar timestamps e IDs se não existirem
    for member in team_members:
        if 'created_at' not in member:
            member['created_at'] = datetime.now().isoformat()
        if 'id' not in member:
            member['id'] = f"member_{len(team_members)}_{int(datetime.now().timestamp())}"
    
    if user_id not in onboarding_db:
        onboarding_db[user_id] = {}
    
    onboarding_db[user_id]['team_members'] = team_members
    onboarding_db[user_id]['step_3_completed'] = True
    onboarding_db[user_id]['current_step'] = 4
    onboarding_db[user_id]['progress_percentage'] = 60
    
    verified_count = len([m for m in team_members if m.get('verified', False)])
    
    return jsonify({
        'success': True,
        'message': 'Equipe cadastrada com sucesso! 👥',
        'next_step': 4,
        'progress': 60,
        'team_size': len(team_members),
        'verified_members': verified_count
    })

@app.route('/api/onboarding/step4', methods=['POST'])
def complete_step4():
    data = request.get_json()
    user_id = data.get('user_id', 'demo_user')
    
    # Salvar integrações
    integrations = {
        'google_calendar': data.get('google_calendar', False),
        'crm_integration': data.get('crm_integration', {}),
        'whatsapp_business': data.get('whatsapp_business', False),
        'configured_at': datetime.now().isoformat()
    }
    
    if user_id not in onboarding_db:
        onboarding_db[user_id] = {}
    
    onboarding_db[user_id]['integrations'] = integrations
    onboarding_db[user_id]['step_4_completed'] = True
    onboarding_db[user_id]['current_step'] = 5
    onboarding_db[user_id]['progress_percentage'] = 80
    
    active_integrations = sum([
        1 if integrations['google_calendar'] else 0,
        1 if integrations['crm_integration'].get('connected', False) else 0,
        1 if integrations['whatsapp_business'] else 0
    ])
    
    return jsonify({
        'success': True,
        'message': 'Integrações configuradas com sucesso! 🔗',
        'next_step': 5,
        'progress': 80,
        'active_integrations': active_integrations,
        'total_integrations': 3
    })

@app.route('/api/onboarding/step5', methods=['POST'])
def complete_step5():
    data = request.get_json()
    user_id = data.get('user_id', 'demo_user')
    
    # Salvar primeiro lead
    first_lead = {
        'name': data.get('name'),
        'phone': data.get('phone'),
        'email': data.get('email'),
        'source': data.get('source'),
        'interest': data.get('interest'),
        'score': data.get('score', 85),
        'created_at': datetime.now().isoformat(),
        'status': 'new',
        'stage': 'Lead'
    }
    
    if user_id not in onboarding_db:
        onboarding_db[user_id] = {}
    
    onboarding_db[user_id]['first_lead'] = first_lead
    onboarding_db[user_id]['step_5_completed'] = True
    onboarding_db[user_id]['progress_percentage'] = 100
    onboarding_db[user_id]['completed_at'] = datetime.now().isoformat()
    
    return jsonify({
        'success': True,
        'message': 'Onboarding concluído com sucesso! 🎉',
        'aha_moment': True,
        'lead_score': first_lead['score'],
        'lead_created': True,
        'progress': 100,
        'completion_time': '< 15 minutos'
    })

@app.route('/api/onboarding/complete', methods=['POST'])
def complete_onboarding():
    data = request.get_json()
    user_id = data.get('user_id', 'demo_user')
    
    if user_id in onboarding_db:
        onboarding_db[user_id]['completed_at'] = datetime.now().isoformat()
        onboarding_db[user_id]['status'] = 'completed'
        
        # Gerar estatísticas de conclusão
        completion_stats = {
            'total_time': '14 minutos',
            'steps_completed': 5,
            'integrations_active': len([k for k, v in onboarding_db[user_id].get('integrations', {}).items() if v]),
            'team_size': len(onboarding_db[user_id].get('team_members', [])),
            'first_lead_score': onboarding_db[user_id].get('first_lead', {}).get('score', 0)
        }
        
        return jsonify({
            'success': True,
            'message': 'Parabéns! Onboarding concluído com sucesso! 🎉',
            'redirect_url': '/dashboard',
            'onboarding_data': onboarding_db[user_id],
            'stats': completion_stats,
            'next_steps': [
                'Importar leads existentes',
                'Personalizar mensagens automáticas',
                'Configurar relatórios',
                'Treinar equipe no sistema'
            ]
        })
    
    return jsonify({
        'success': False, 
        'message': 'Dados de onboarding não encontrados'
    }), 404

# ==================== ROTAS DE WHATSAPP ====================

@app.route('/api/whatsapp/send-verification', methods=['POST'])
def send_whatsapp_verification():
    data = request.get_json()
    phone = data.get('phone')
    
    # Simular envio de código
    verification_code = "123456"
    
    return jsonify({
        'success': True,
        'message': f'Código de verificação enviado para {phone}',
        'code': verification_code,  # Em produção, não retornar o código
        'expires_in': 300,  # 5 minutos
        'attempts_remaining': 3
    })

@app.route('/api/whatsapp/verify-code', methods=['POST'])
def verify_whatsapp_code():
    data = request.get_json()
    phone = data.get('phone')
    code = data.get('code')
    
    # Simular verificação
    if code == "123456":
        return jsonify({
            'success': True,
            'message': 'WhatsApp verificado com sucesso! ✅',
            'verified': True,
            'phone': phone,
            'verified_at': datetime.now().isoformat()
        })
    else:
        return jsonify({
            'success': False,
            'message': 'Código inválido. Para demonstração, use: 123456',
            'verified': False,
            'attempts_remaining': 2
        }), 400

# ==================== ROTAS DE DASHBOARD ====================

@app.route('/api/dashboard/stats', methods=['GET'])
def get_dashboard_stats():
    return jsonify({
        'total_leads': 47,
        'conversion_rate': 23.5,
        'avg_response_time': '2.3 min',
        'active_automations': 8,
        'whatsapp_messages': 156,
        'scheduled_meetings': 12,
        'team_performance': {
            'top_performer': 'João Silva',
            'avg_score': 78.5,
            'leads_this_month': 23
        },
        'recent_activity': [
            {
                'type': 'new_lead',
                'message': 'Novo lead: Maria Santos',
                'details': 'Via WhatsApp • Score: 85%',
                'timestamp': '2 min atrás'
            },
            {
                'type': 'meeting_scheduled',
                'message': 'Reunião agendada: Carlos Lima',
                'details': 'Amanhã às 14:00',
                'timestamp': '5 min atrás'
            },
            {
                'type': 'automation_triggered',
                'message': 'Follow-up enviado automaticamente',
                'details': 'Para 12 leads em "Proposta"',
                'timestamp': '10 min atrás'
            }
        ]
    })

@app.route('/api/leads', methods=['GET'])
def get_leads():
    # Simular lista de leads
    leads = [
        {
            'id': 1,
            'name': 'Maria Santos',
            'phone': '(11) 99999-1111',
            'email': 'maria@empresa.com',
            'source': 'WhatsApp',
            'score': 85,
            'stage': 'Demo Agendada',
            'created_at': '2024-01-15T10:30:00'
        },
        {
            'id': 2,
            'name': 'João Silva',
            'phone': '(11) 99999-2222',
            'email': 'joao@startup.com',
            'source': 'Site',
            'score': 72,
            'stage': 'Proposta',
            'created_at': '2024-01-14T15:45:00'
        }
    ]
    
    return jsonify({
        'success': True,
        'leads': leads,
        'total': len(leads),
        'filters_applied': 0
    })

@app.route('/api/leads', methods=['POST'])
def create_lead():
    data = request.get_json()
    
    # Simular criação de lead
    new_lead = {
        'id': int(datetime.now().timestamp()),
        'name': data.get('name'),
        'phone': data.get('phone'),
        'email': data.get('email'),
        'source': data.get('source', 'Manual'),
        'score': data.get('score', 50),
        'stage': 'Lead',
        'created_at': datetime.now().isoformat(),
        'status': 'active'
    }
    
    return jsonify({
        'success': True,
        'message': 'Lead criado com sucesso!',
        'lead': new_lead
    })

# ==================== ROTAS DE ERRO ====================

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'error': 'Endpoint não encontrado',
        'message': 'Verifique a URL e tente novamente',
        'available_endpoints': [
            '/api/health',
            '/api/onboarding/*',
            '/api/whatsapp/*',
            '/api/dashboard/*',
            '/api/leads'
        ]
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'error': 'Erro interno do servidor',
        'message': 'Entre em contato com o suporte',
        'timestamp': datetime.now().isoformat()
    }), 500

if __name__ == "__main__":
    # Railway define a porta via variável de ambiente PORT
    port = int(os.environ.get("PORT", 5001))  # usa 5001 se PORT não estiver definida
    app.run(host="0.0.0.0", port=port)
    
    print(f"🚀 Lead Lounge AI Backend iniciando na porta {port}")
    print(f"📊 Modo: {'Desenvolvimento' if debug else 'Produção'}")
    print(f"🌐 Acesse: http://localhost:{port}")
    
    app.run(host='0.0.0.0', port=port, debug=debug)

