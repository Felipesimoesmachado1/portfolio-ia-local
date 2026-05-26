"use client";

import { useState, useRef, useEffect } from "react";

interface Mensagem {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const mensagensRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mensagensRef.current?.scrollTo({
      top: mensagensRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [mensagens]);

  async function enviarMensagem() {
    if (!input.trim()) return;

    const texto = input;

    setMensagens((prev) => [
      ...prev,
      {
        role: "user",
        content: texto,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5678/webhook/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            telefone: "teste_frontend",
            mensagem: texto,
          }),
        }
      );

      const data = await response.json();

      setMensagens((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply ||
            data.response ||
            "Sem resposta da IA.",
        },
      ]);
    } catch (error) {
      console.error(error);

      setMensagens((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Erro ao conectar com IA.",
        },
      ]);
    }

    setLoading(false);
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter") {
      enviarMensagem();
    }
  }

  return (
    <main className="flex flex-col h-screen bg-[#212121] text-white">
      {/* HEADER */}
      <div className="border-b border-zinc-700 p-4 text-center text-xl font-semibold">
        IA Assistant
      </div>

      {/* CHAT */}
      <div
        ref={mensagensRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-6"
      >
        {mensagens.length === 0 && (
          <div className="h-full flex items-center justify-center text-zinc-500">
            Comece uma conversa...
          </div>
        )}

        {mensagens.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-[#0b93f6]"
                  : "bg-[#2f2f2f]"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#2f2f2f] px-4 py-3 rounded-2xl">
              Pensando...
            </div>
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="p-4 border-t border-zinc-700">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-[#2f2f2f] rounded-xl px-4 py-3 outline-none"
          />

          <button
            onClick={enviarMensagem}
            disabled={loading}
            className="bg-white text-black px-5 rounded-xl font-medium hover:opacity-90"
          >
            Enviar
          </button>
        </div>
      </div>
    </main>
  );
}