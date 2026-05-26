# Instalação do Projeto

## Requisitos

Antes de iniciar, instale:

* Docker Desktop
* Docker Compose
* Git
* Node.js (opcional para frontend)

---

# Clonar Repositório

```bash
git clone https://github.com/Felipesimoesmachado1/portfolio-ia-local.git
```

Entrar na pasta:

```bash
cd portfolio-ia-local
```

---

# Subir Containers

Execute:

```bash
docker compose up -d
```

Verificar containers:

```bash
docker ps
```

Containers esperados:

* n8n_portfolio
* postgres_portfolio

---

# Instalar Ollama

Download oficial:

[Ollama Official Website](https://ollama.com?utm_source=chatgpt.com)

Após instalar:

---

# Baixar Modelo LLM

Executar:

```bash
ollama pull llama3.2
```

Testar:

```bash
ollama run llama3.2
```

---

# Configuração da IA

O workflow utiliza:

```bash
http://host.docker.internal:11434/api/generate
```

Essa URL permite que containers Docker se comuniquem com o Ollama executando no Windows host.

---

# Importar Workflow no n8n

Acesse:

```bash
http://localhost:5678
```

Importe:

```bash
n8n/workflows/chat-api.json
```

---

# Configurar Banco PostgreSQL

Criar credencial PostgreSQL no n8n:

## Dados

Host:

```bash
postgres
```

Porta:

```bash
5432
```

Database:

```bash
n8n
```

Usuário:

```bash
n8n
```

Senha:

```bash
n8n123
```

---

# Criar Tabela

Executar no PostgreSQL:

```sql
CREATE TABLE mensagens (
    id SERIAL PRIMARY KEY,
    telefone TEXT,
    mensagem TEXT,
    role TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

# Executar Workflow

Ativar workflow no n8n.

Webhook principal:

```bash
POST /webhook/chat
```

---

# Estrutura de Funcionamento

Frontend → n8n → Ollama → PostgreSQL → Frontend

---

# Possíveis Problemas

## ECONNREFUSED

Verifique:

* se Ollama está rodando
* se Docker está ativo
* se a URL do Ollama está correta

---

## Workflow não responde

Verifique:

* workflow ativado
* webhook correto
* credenciais PostgreSQL

---

## IA responde errado

Verifique:

* contexto enviado
* modelo utilizado
* temperatura configurada

---

# Encerrar Containers

```bash
docker compose down
```

---

# Reiniciar Containers

```bash
docker compose up -d
```
