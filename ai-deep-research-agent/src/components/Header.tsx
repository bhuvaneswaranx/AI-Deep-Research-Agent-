import React from "react";
import {
  Bot,
  BrainCircuit,
  Database,
  Code2,
  PlusCircle,
  FileText,
  Sparkles,
  Layers,
  ChevronDown,
} from "lucide-react";
import { ResearchSession } from "../types";

interface HeaderProps {
  currentSession: ResearchSession | null;
  sessions: ResearchSession[];
  onSelectSession: (session: ResearchSession) => void;
  onOpenNewResearch: () => void;
  activeTab: "report" | "visualizer" | "rag" | "code" | "thoughts";
  setActiveTab: (tab: "report" | "visualizer" | "rag" | "code" | "thoughts") => void;
  isExecuting: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentSession,
  sessions,
  onSelectSession,
  onOpenNewResearch,
  activeTab,
  setActiveTab,
  isExecuting,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0F0F12] border-b border-white/10 text-zinc-100 shadow-2xl backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]"></span>
                <h1 className="font-semibold text-sm tracking-wider uppercase text-zinc-100">
                  Aether Deep Research
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest text-emerald-400 uppercase">
                  LangGraph • Gemini • RAG
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 hidden md:block tracking-wide">
                Autonomous Multi-Agent Search, Gap Analysis &amp; Report Synthesis
              </p>
            </div>
          </div>

          {/* Session Selector Dropdown */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="relative group">
              <button className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 border border-white/10 transition-all max-w-xs truncate">
                <Layers className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">
                  {currentSession ? currentSession.topic : "Select Research Context"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400 shrink-0 ml-1" />
              </button>

              <div className="absolute right-0 top-full mt-1.5 w-96 bg-[#0F0F12] border border-white/10 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50">
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 px-2 py-1">
                  Active &amp; Saved Research Runs
                </div>
                <div className="space-y-1 max-h-64 overflow-y-auto mt-1 pr-1">
                  {sessions.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => onSelectSession(s)}
                      className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors flex items-start gap-2.5 ${
                        currentSession?.id === s.id
                          ? "bg-emerald-950/40 text-emerald-200 border border-emerald-500/30"
                          : "hover:bg-white/5 text-zinc-300"
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="truncate">
                        <div className="font-medium truncate">{s.topic}</div>
                        <div className="text-[10px] font-mono text-zinc-400 flex items-center gap-2 mt-0.5">
                          <span>{s.ragMemoryChunks.length} chunks</span>
                          <span>•</span>
                          <span>{s.sources.length} sources</span>
                          <span>•</span>
                          <span className="text-emerald-400 uppercase">{s.status}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Button: Run New Research */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenNewResearch}
              disabled={isExecuting}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] ${
                isExecuting
                  ? "bg-zinc-800 cursor-not-allowed text-zinc-500 border border-white/5"
                  : "bg-emerald-600 hover:bg-emerald-500 text-black active:scale-95"
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isExecuting ? "Executing..." : "New Research"}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 border-t border-white/5 pt-1 overflow-x-auto no-scrollbar font-mono text-xs">
          <button
            onClick={() => setActiveTab("report")}
            className={`flex items-center gap-2 px-3.5 py-2 border-b-2 transition-all ${
              activeTab === "report"
                ? "border-emerald-400 text-emerald-400 bg-emerald-950/20 font-medium"
                : "border-transparent text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Markdown Report</span>
          </button>

          <button
            onClick={() => setActiveTab("visualizer")}
            className={`flex items-center gap-2 px-3.5 py-2 border-b-2 transition-all ${
              activeTab === "visualizer"
                ? "border-emerald-400 text-emerald-400 bg-emerald-950/20 font-medium"
                : "border-transparent text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>LangGraph Visualizer</span>
            {currentSession?.nodeStates?.some((n) => n.status === "running") && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("rag")}
            className={`flex items-center gap-2 px-3.5 py-2 border-b-2 transition-all ${
              activeTab === "rag"
                ? "border-emerald-400 text-emerald-400 bg-emerald-950/20 font-medium"
                : "border-transparent text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>RAG Memory Store</span>
            <span className="px-1.5 py-0.2 text-[10px] bg-white/5 border border-white/10 text-emerald-300 rounded font-mono">
              {currentSession?.ragMemoryChunks?.length || 0}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("thoughts")}
            className={`flex items-center gap-2 px-3.5 py-2 border-b-2 transition-all ${
              activeTab === "thoughts"
                ? "border-emerald-400 text-emerald-400 bg-emerald-950/20 font-medium"
                : "border-transparent text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Agent Thoughts &amp; Timeline</span>
            <span className="px-1.5 py-0.2 text-[10px] bg-white/5 border border-white/10 text-zinc-300 rounded font-mono">
              {currentSession?.thoughts?.length || 0}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-2 px-3.5 py-2 border-b-2 transition-all ${
              activeTab === "code"
                ? "border-emerald-400 text-emerald-400 bg-emerald-950/20 font-medium"
                : "border-transparent text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Python / LangGraph Code</span>
          </button>
        </div>
      </div>
    </header>
  );
};
