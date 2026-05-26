# n8n Workflows

Esta pasta contém os workflows utilizados no projeto de automação com IA local.

---

# Workflow Principal

## `chat-api.json`

Workflow responsável por integrar:

* Frontend Next.js
* IA Local (Ollama)
* PostgreSQL
* Histórico de conversas
* Automação com n8n

O fluxo recebe mensagens do usuário através do frontend, processa o contexto da conversa, envia para o modelo LLM local e retorna a resposta da IA em tempo real.

---

# Arquitetura do fluxo

```text
Frontend (Next.js)
        ↓
Webhook n8n
        ↓
Busca histórico PostgreSQL
        ↓
Monta contexto da conversa
        ↓
Envia prompt para Ollama
        ↓
Recebe resposta da IA
        ↓
Salva histórico no PostgreSQL
        ↓
Retorna resposta ao frontend
```

# Screenshot:

<img width="1158" height="545" alt="image" src="https://github.com/user-attachments/assets/5c73a373-dcb0-4628-8249-71d9fb5bded7" />

---

# Explicação de cada node

## 1. Webhook

Responsável por receber as mensagens enviadas pelo frontend.

### Função:

* Receber requisições HTTP
* Capturar mensagem do usuário
* Iniciar o workflow

### Método:

```http
POST
```

### Dados recebidos:

```json
{
  "telefone": "teste_frontend",
  "mensagem": "Olá IA"
}
```

---

## 2. PostgreSQL — Buscar Histórico

Node responsável por consultar o histórico da conversa no banco de dados.

### Objetivo:

* Recuperar mensagens anteriores
* Criar contexto para a IA
* Melhorar continuidade da conversa

### Operação:

```sql
SELECT
```

---

## 3. Code / Function Node

Responsável por estruturar o contexto enviado para o modelo LLM.

### Função:

* Organizar mensagens
* Limitar histórico
* Criar prompt final
* Inserir instruções do sistema

### Exemplo:

```text
Você é um assistente virtual útil e natural.
Responda sempre em português.
```

---

## 4. HTTP Request — Ollama API

Node responsável por enviar o prompt para o modelo de IA local.

### Endpoint:

```http
http://host.docker.internal:11434/api/generate
```

### Modelo utilizado:

```text
llama3.2:latest
```

### Função:

* Enviar contexto
* Receber resposta da IA
* Controlar temperatura e comportamento do modelo

---

## 5. Edit Fields / Set

Responsável por tratar a resposta retornada pelo Ollama.

### Função:

* Extrair apenas a resposta útil
* Remover dados desnecessários
* Estruturar retorno para o frontend

### Resultado:

```json
{
  "reply": "Resposta da IA"
}
```

---

## 6. PostgreSQL — Salvar Histórico

Node responsável por salvar:

* mensagem do usuário
* resposta da IA

### Objetivo:

* Persistência de dados
* Continuidade da conversa
* Histórico de interações

### Operação:

```sql
INSERT
```

---

## 7. Respond to Webhook

Último node do fluxo.

### Função:

* Retornar resposta para o frontend
* Encerrar requisição HTTP
* Exibir resposta no chat

---

# Tecnologias utilizadas

* n8n
* PostgreSQL
* Docker
* Docker Compose
* Ollama
* Llama 3
* Next.js
* JavaScript

---

# Objetivos do projeto

Este projeto foi desenvolvido para demonstrar conhecimentos práticos em:

* Automação de workflows
* Integração entre APIs
* IA local com LLMs
* Containers Docker
* Banco de dados SQL
* Desenvolvimento fullstack
* Estruturação de contexto para IA

---

# Importação do workflow

O workflow pode ser importado diretamente no n8n:

```text
Import Workflow → JSON File
```

Arquivo:

```text
chat-api.json
```
