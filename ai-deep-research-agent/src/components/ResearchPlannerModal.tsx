import React, { useState } from "react";
import {
  X,
  Sparkles,
  Sliders,
  Play,
  Layers,
  BrainCircuit,
  Zap,
} from "lucide-react";

interface ResearchPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartResearch: (topic: string, depth: number, mode: 'langgraph_autonomous' | 'direct_rag') => void;
  isExecuting: boolean;
}

export const ResearchPlannerModal: React.FC<ResearchPlannerModalProps> = ({
  isOpen,
  onClose,
  onStartResearch,
  isExecuting,
}) => {
  const [topic, setTopic] = useState("");
  const [depth, setDepth] = useState(2);
  const [mode, setMode] = useState<'langgraph_autonomous' | 'direct_rag'>("langgraph_autonomous");

  if (!isOpen) return null;

  const presets = [
    {
      title: "Solid-State Batteries 2026",
      topic: "Solid-State Battery Electrolytes: Sulfide vs Oxide Benchmarks, Commercial Validation & 2026 Pilot Line Timelines",
      depth: 3,
    },
    {
      title: "LangGraph Multi-Agent Architecture",
      topic: "LangGraph StateGraph Architecture: Cyclic Graph Routing, Checkpoint State Memory & Multi-Agent Collaboration Patterns",
      depth: 2,
    },
    {
      title: "Generative AI Agents in Enterprise Software",
      topic: "Generative AI Agents in Enterprise Software: Tool Calling Protocols, MCP Middleware & Autonomous Task Execution",
      depth: 2,
    },
    {
      title: "SpaceX Starship Orbital Mechanics",
      topic: "SpaceX Starship Super Heavy Launch System: Orbital Payload Capacity, Hot-Staging Mechanics & In-Space Refueling 2026",
      depth: 3,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onStartResearch(topic.trim(), depth, mode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0F0F12] border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden relative">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#0A0A0B]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-zinc-100 uppercase tracking-wide font-mono">Configure Autonomous Research Task</h3>
              <p className="text-xs text-zinc-400 font-sans">
                Deploy LangGraph multi-agent swarm with live Google Search grounding &amp; RAG memory
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Preset Chips */}
          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
              Fast Presets
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setTopic(p.topic);
                    setDepth(p.depth);
                  }}
                  className="text-left p-3 rounded-xl bg-[#0A0A0B] hover:bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-all text-xs group"
                >
                  <div className="font-semibold text-zinc-200 group-hover:text-emerald-400 flex items-center justify-between">
                    <span>{p.title}</span>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-[11px] text-zinc-400 truncate mt-0.5 font-sans">{p.topic}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Research Topic Textarea */}
          <div>
            <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
              Research Objective / Question
            </label>
            <textarea
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Conduct a comprehensive technical analysis on..."
              className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl p-3 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-all resize-none font-sans"
              required
            />
          </div>

          {/* Controls: Depth & Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#0A0A0B] p-4 rounded-xl border border-white/10">
            {/* Search Depth Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                <span className="text-zinc-300 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-emerald-400" /> Max Iteration Depth
                </span>
                <span className="text-emerald-400 font-bold">{depth} Iteration{depth > 1 ? "s" : ""}</span>
              </div>
              <input
                type="range"
                min="1"
                max="4"
                value={depth}
                onChange={(e) => setDepth(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-white/10 h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                <span>1 (Fast)</span>
                <span>2 (Standard)</span>
                <span>3 (Deep)</span>
                <span>4 (Exhaustive)</span>
              </div>
            </div>

            {/* Architecture Mode */}
            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" /> Agent Architecture Mode
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setMode("langgraph_autonomous")}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    mode === "langgraph_autonomous"
                      ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-300 font-semibold"
                      : "bg-[#0F0F12] border-white/10 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <div className="font-semibold text-[11px]">LangGraph Swarm</div>
                  <div className="text-[9px] text-zinc-400 font-sans">Cyclic Edge Loops</div>
                </button>

                <button
                  type="button"
                  onClick={() => setMode("direct_rag")}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    mode === "direct_rag"
                      ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-300 font-semibold"
                      : "bg-[#0F0F12] border-white/10 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <div className="font-semibold text-[11px]">Direct RAG</div>
                  <div className="text-[9px] text-zinc-400 font-sans">Single Pass Search</div>
                </button>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-mono text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isExecuting || !topic.trim()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold text-black bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] uppercase tracking-wider"
            >
              {isExecuting ? (
                <>
                  <Zap className="w-4 h-4 animate-spin" />
                  <span>Deploying Agents...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-black" />
                  <span>Execute Research Task</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
