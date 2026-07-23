import React, { useState } from "react";
import { Code2, Copy, Check, Terminal, FileCode, Layers, Sparkles } from "lucide-react";
import { PYTHON_LANGGRAPH_CODE } from "../data/pythonLangGraphCode";

export const PythonCodeViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PYTHON_LANGGRAPH_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Code Header Bar */}
      <div className="bg-[#0F0F12] border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.15)]">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-zinc-100 flex items-center gap-2 uppercase font-mono tracking-wide">
              Python LangGraph Architecture Reference
            </h2>
            <p className="text-xs text-zinc-400">
              Executable Python code implementation of the autonomous multi-agent research graph
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-lg bg-amber-950/60 text-amber-300 border border-amber-500/30 text-[10px] font-mono tracking-wider uppercase">
            Python 3.11 • LangGraph • Gemini SDK
          </span>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-200 border border-white/10 transition-colors shadow-lg"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-amber-400" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Explanatory Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0F0F12] border border-white/10 p-4 rounded-xl text-xs space-y-1">
          <div className="font-semibold text-zinc-200 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider">
            <Layers className="w-4 h-4 text-emerald-400" /> 1. TypedDict State
          </div>
          <p className="text-zinc-400 text-[11px] leading-relaxed">
            Central state dictionary schema holding topics, vector chunks, sources, and knowledge gaps across node invocations.
          </p>
        </div>

        <div className="bg-[#0F0F12] border border-white/10 p-4 rounded-xl text-xs space-y-1">
          <div className="font-semibold text-zinc-200 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider">
            <Terminal className="w-4 h-4 text-emerald-400" /> 2. Grounded Web Search
          </div>
          <p className="text-zinc-400 text-[11px] leading-relaxed">
            Uses Google Search grounding via the Gemini SDK to fetch real-time web context and extract grounding metadata.
          </p>
        </div>

        <div className="bg-[#0F0F12] border border-white/10 p-4 rounded-xl text-xs space-y-1">
          <div className="font-semibold text-zinc-200 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" /> 3. Feedback Loop
          </div>
          <p className="text-zinc-400 text-[11px] leading-relaxed">
            The <code className="text-amber-300 font-mono">should_continue</code> conditional edge checks knowledge gaps and loops back to search until criteria are met.
          </p>
        </div>
      </div>

      {/* Main Code View Canvas */}
      <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl p-6 shadow-2xl relative">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-white/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-amber-400" />
            <span>deep_research_agent_langgraph.py</span>
          </div>
          <span>UTF-8</span>
        </div>

        <pre className="text-xs font-mono text-zinc-300 bg-[#0F0F12] p-5 rounded-xl overflow-x-auto whitespace-pre leading-relaxed border border-white/10">
          {PYTHON_LANGGRAPH_CODE}
        </pre>
      </div>
    </div>
  );
};
