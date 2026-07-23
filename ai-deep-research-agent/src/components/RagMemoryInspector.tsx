import React, { useState } from "react";
import {
  Database,
  Search,
  Cpu,
  Layers,
  Send,
  Bot,
  User,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { ResearchSession, VectorChunk, ChatMessage } from "../types";

interface RagMemoryInspectorProps {
  session: ResearchSession | null;
}

export const RagMemoryInspector: React.FC<RagMemoryInspectorProps> = ({ session }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "msg-init",
      sender: "assistant",
      text: "Hello! I am connected to the active RAG Vector Memory store. You can ask me follow-up questions over the indexed research corpus.",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isAsking, setIsAsking] = useState(false);

  if (!session) {
    return (
      <div className="p-8 text-center text-zinc-400 bg-[#0F0F12] rounded-2xl border border-white/10 font-mono text-xs">
        No active research session loaded.
      </div>
    );
  }

  const chunks = session.ragMemoryChunks || [];
  const filteredChunks = chunks.filter(
    (c) =>
      c.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.sourceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isAsking) return;

    const userText = chatInput.trim();
    setChatInput("");

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString(),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsAsking(true);

    try {
      const response = await fetch("/api/research/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: session.topic,
          query: userText,
          memoryChunks: chunks.slice(0, 10),
        }),
      });

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: "assistant",
        text: data.reply || "Unable to answer based on RAG memory.",
        timestamp: new Date().toLocaleTimeString(),
        citedChunks: data.citedChunks || [],
      };

      setChatMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      setChatMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "assistant",
          text: "An error occurred while querying the RAG memory store.",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0F0F12] border border-white/10 p-4 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase tracking-wider mb-1">
            <span>Total Indexed Chunks</span>
            <Database className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-zinc-100 font-mono">{chunks.length}</div>
          <div className="text-[10px] text-zinc-500 font-mono mt-1">Chunk size: ~500 tokens</div>
        </div>

        <div className="bg-[#0F0F12] border border-white/10 p-4 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase tracking-wider mb-1">
            <span>Deduplicated Items</span>
            <Layers className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">
            {session.stats.deduplicatedCount} Chunks
          </div>
          <div className="text-[10px] text-zinc-500 font-mono mt-1">Cosine Sim &gt; 0.85 filtered</div>
        </div>

        <div className="bg-[#0F0F12] border border-white/10 p-4 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase tracking-wider mb-1">
            <span>Unique Web Sources</span>
            <Search className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-zinc-100 font-mono">
            {session.sources.length}
          </div>
          <div className="text-[10px] text-zinc-500 font-mono mt-1">Grounding Metadata</div>
        </div>

        <div className="bg-[#0F0F12] border border-white/10 p-4 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase tracking-wider mb-1">
            <span>Embedding Model</span>
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">0.93 Sim</div>
          <div className="text-[10px] text-zinc-500 font-mono mt-1">gemini-embedding-2-preview</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Vector Memory Store List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#0F0F12] border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search vector memory chunks by keyword, category, or source..."
                className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <span className="text-xs text-zinc-400 font-mono shrink-0">
              Showing {filteredChunks.length} of {chunks.length}
            </span>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {filteredChunks.map((chunk: VectorChunk) => (
              <div
                key={chunk.id}
                className="p-4 rounded-2xl bg-[#0F0F12] border border-white/10 hover:border-emerald-500/40 transition-colors space-y-2 text-xs shadow-xl"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 font-mono text-[10px] border border-emerald-500/30">
                      ID: {chunk.vectorId || chunk.id}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 text-[10px] font-mono border border-white/10">
                      {chunk.category || "General"}
                    </span>
                  </div>

                  <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span>Sim: {(chunk.similarityScore * 100).toFixed(0)}%</span>
                  </div>
                </div>

                <p className="text-zinc-300 leading-relaxed font-sans">{chunk.text}</p>

                <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono pt-2 border-t border-white/5">
                  <span className="truncate max-w-xs text-zinc-400">{chunk.sourceTitle}</span>
                  <a
                    href={chunk.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>Link</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: RAG Q&A Interactive Chatbot */}
        <div className="bg-[#0F0F12] border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col h-[680px]">
          <div className="border-b border-white/10 pb-3 mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-xs text-zinc-100 uppercase tracking-wide">RAG Memory Q&amp;A Agent</h3>
                <p className="text-[10px] text-zinc-400 font-mono">Query indexed corpus in real time</p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 uppercase">
              Active Store
            </span>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-xl text-xs space-y-1 max-w-[90%] ${
                  msg.sender === "user"
                    ? "bg-emerald-950/40 text-emerald-100 ml-auto border border-emerald-500/30"
                    : "bg-[#0A0A0B] text-zinc-200 border border-white/10"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1">
                  <span className="flex items-center gap-1">
                    {msg.sender === "user" ? (
                      <User className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Bot className="w-3 h-3 text-emerald-400" />
                    )}
                    {msg.sender === "user" ? "You" : "RAG Assistant"}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>

                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

                {msg.citedChunks && msg.citedChunks.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-white/10 text-[10px] text-zinc-400 font-mono space-y-1">
                    <div className="font-semibold text-emerald-400">Cited RAG Memory Chunks:</div>
                    {msg.citedChunks.map((c) => (
                      <div key={c.id} className="truncate text-zinc-300">
                        • [{c.sourceTitle}]: {c.text.substring(0, 60)}...
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isAsking && (
              <div className="p-3 rounded-xl text-xs bg-[#0A0A0B] border border-white/10 text-zinc-400 flex items-center gap-2">
                <Cpu className="w-4 h-4 animate-spin text-emerald-400" />
                <span className="font-mono text-[11px]">Searching vector embeddings and generating answer...</span>
              </div>
            )}
          </div>

          {/* Chat Input Form */}
          <form onSubmit={handleSendChat} className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask a question over indexed RAG memory..."
              className="flex-1 bg-[#0A0A0B] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!chatInput.trim() || isAsking}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-black font-bold transition-colors disabled:opacity-50 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
