# Frontend — Chat IA Local

Interface web do sistema de chat com Inteligência Artificial local.

Este frontend foi desenvolvido utilizando Next.js e TailwindCSS, sendo responsável pela comunicação entre o usuário e os workflows automatizados do n8n.

---

# Objetivo

O frontend tem como função:

* enviar mensagens para o n8n
* receber respostas da IA
* exibir conversa em tempo real
* fornecer experiência visual amigável
* facilitar testes locais de integração com IA

---

# Tecnologias Utilizadas

* Next.js
* React
* TypeScript
* TailwindCSS

---

# Funcionamento

O usuário envia uma mensagem pela interface.

O frontend envia uma requisição HTTP para:

```text id="1f9jv4"
http://localhost:5678/webhook/chat
```

O n8n:

* processa o workflow
* consulta histórico
* envia prompt para IA local
* recebe resposta do Ollama
* retorna resposta ao frontend

O frontend então renderiza a resposta da IA na interface.

---

# Estrutura de Comunicação

```text id="j93d6o"
Frontend
   ↓
Webhook n8n
   ↓
Ollama
   ↓
PostgreSQL
   ↓
Resposta para interface
```

---

# Como Executar o Frontend

## Instalar dependências

```bash id="g1i6kr"
npm install
```

---

## Executar ambiente de desenvolvimento

```bash id="q2m1rx"
npm run dev
```

---

## Acessar aplicação

```text id="sm8h17"
http://localhost:3001
```

---

# Configuração Importante

O frontend depende do n8n rodando corretamente.

Verifique:

* Docker ativo
* n8n iniciado
* workflow ativo
* Ollama executando localmente

---

# Endpoint utilizado

```text id="hcr1m4"
POST http://localhost:5678/webhook/chat
```

---

# Estrutura da Requisição

## Request

```json id="qrx53l"
{
  "telefone": "teste_frontend",
  "mensagem": "Olá IA"
}
```

---

# Estrutura da Resposta

```json id="m7r3ph"
{
  "reply": "Olá! Como posso ajudar?"
}
```

---

# Funcionalidades

* Chat em tempo real
* Histórico visual
* Indicador de carregamento
* Comunicação com IA local
* Integração com workflows n8n

---

# Melhorias Futuras

* streaming de respostas
* autenticação
* markdown renderer
* syntax highlight
* upload de arquivos
* dark/light mode
* múltiplas conversas
* memória vetorial

---

# Screenshots

<img width="1365" height="639" alt="image" src="https://github.com/user-attachments/assets/ece46265-a65a-4f0b-b899-48b4ca9b73a8" />


---

# Desenvolvedor

Felipe Simões Machado

GitHub:
https://github.com/Felipesimoesmachado1
