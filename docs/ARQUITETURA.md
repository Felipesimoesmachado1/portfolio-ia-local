# Arquitetura do Projeto

## Visão Geral

Este projeto consiste em um sistema de chat com Inteligência Artificial local utilizando automação de workflows, containers Docker e integração entre serviços.

A arquitetura foi desenvolvida com foco em:

* isolamento de serviços
* automação
* integração entre APIs
* persistência de dados
* facilidade de deploy
* aprendizado prático sobre infraestrutura e IA local

---

# Componentes da Arquitetura

## Frontend

Interface web responsável pela comunicação com o usuário.

### Tecnologias

* Next.js
* React
* TailwindCSS

### Funções

* envio de mensagens
* exibição das respostas da IA
* comunicação com o webhook do n8n
* experiência visual do usuário

---

## n8n (Automação)

Responsável por toda a lógica de automação do sistema.

### Funções

* receber mensagens do frontend
* processar workflows
* consultar histórico
* enviar prompts para IA
* salvar mensagens no banco de dados
* retornar respostas ao frontend

### Workflow principal

Arquivo:

```bash
n8n/workflows/chat-api.json
```

---

## Ollama (IA Local)

Serviço responsável por executar modelos LLM localmente.

### Modelo utilizado

* llama3.2

### Funções

* geração de respostas
* interpretação de contexto
* processamento de prompts

### Comunicação

O n8n envia requisições HTTP para:

```bash
http://host.docker.internal:11434/api/generate
```

---

## PostgreSQL

Banco de dados utilizado para persistência das mensagens.

### Funções

* armazenamento de histórico
* persistência de conversas
* suporte ao contexto da IA

### Estrutura principal

Tabela:

```sql
mensagens
```

Campos:

* id
* telefone
* mensagem
* role
* created_at

---

# Infraestrutura Docker

Todos os serviços são executados em containers Docker.

## Containers

### n8n

* Porta: 5678

### PostgreSQL

* Porta: 5432

---

# Fluxo da Aplicação

## Fluxo completo

1. Usuário envia mensagem pelo frontend
2. Frontend envia requisição HTTP para o n8n
3. n8n recebe a mensagem via Webhook
4. Workflow consulta histórico no PostgreSQL
5. Contexto da conversa é estruturado
6. n8n envia prompt para Ollama
7. IA gera resposta
8. Resposta é salva no banco
9. n8n retorna resposta ao frontend
10. Frontend exibe resposta ao usuário

---

# Objetivos Técnicos do Projeto

## Aprendizados aplicados

* APIs REST
* automação com n8n
* containers Docker
* Docker Compose
* PostgreSQL
* integração com IA local
* workflows automatizados
* comunicação entre serviços
* troubleshooting de infraestrutura
* integração frontend/backend

---

# Estrutura de Pastas

```bash
portfolio-ia-local/
│
├── docs/
├── frontend/
├── n8n/
│   └── workflows/
├── postgres/
├── assets/
├── docker-compose.yml
└── README.md
```

---

# Possíveis Evoluções Futuras

* autenticação de usuários
* integração WhatsApp
* memória vetorial
* RAG com documentos
* múltiplos agentes IA
* deploy em cloud
* painel administrativo
* streaming de respostas
* integração com OpenAI APIs
