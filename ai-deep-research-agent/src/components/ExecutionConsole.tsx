import React from "react";
import {
  Brain,
  Search,
  Database,
  HelpCircle,
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  Terminal,
  ExternalLink,
} from "lucide-react";
import { ResearchSession, AgentThought } from "../types";

interface ExecutionConsoleProps {
  session: ResearchSession | null;
}

export const ExecutionConsole: React.FC<ExecutionConsoleProps> = ({ session }) => {
  if (!session) {
    return (
      <div className="p-8 text-center text-zinc-400 bg-[#0F0F12] rounded-2xl border border-white/10 font-mono text-xs">
        No active research session loaded.
      </div>
    );
  }

  const thoughts = session.thoughts || [];

  const getAgentBadge = (agentName: string) => {
    switch (agentName) {
      case "Planner Agent":
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <Brain className="w-3 h-3 text-emerald-400" /> Planner
          </span>
        );
      case "Search & Scraper Agent":
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <Search className="w-3 h-3 text-emerald-400" /> Search &amp; Scraper
          </span>
        );
      case "RAG Memory Agent":
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <Database className="w-3 h-3 text-emerald-400" /> RAG Memory
          </span>
        );
      case "Gap Analyzer Agent":
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-amber-950/60 text-amber-400 border border-amber-500/30 flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-amber-400" /> Gap Analyzer
          </span>
        );
      case "Synthesis Agent":
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <FileCheck2 className="w-3 h-3 text-emerald-400" /> Synthesis
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-white/5 text-zinc-300 border border-white/10">
            {agentName}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Console Header */}
      <div className="bg-[#0F0F12] border border-white/10 rounded-2xl p-5 shadow-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-zinc-100 flex items-center gap-2 tracking-wide uppercase font-mono">
              Agent Execution Stream &amp; Reasoning Log
            </h2>
            <p className="text-xs text-zinc-400">
              Chronological agent thoughts, tool calls, search grounding events, and gap analysis
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-lg bg-[#0A0A0B] text-zinc-300 border border-white/10">
            {thoughts.length} Event Logs
          </span>
        </div>
      </div>

      {/* Subqueries Execution Vector Cards */}
      <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl p-5 shadow-2xl space-y-3">
        <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center justify-between">
          <span>Decomposed Research Vectors ({session.subqueries.length})</span>
          <span className="text-[10px] text-emerald-400">Search Grounded</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {session.subqueries.map((q, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-[#0F0F12] border border-white/10 text-xs text-zinc-200 flex items-start gap-2.5"
            >
              <span className="w-5 h-5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="line-clamp-2 leading-relaxed">{q}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
        <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
          Timeline &amp; Event Stream
        </div>

        <div className="relative pl-6 border-l border-white/10 space-y-6">
          {thoughts.map((t: AgentThought, idx: number) => (
            <div key={t.id || idx} className="relative group">
              {/* Timeline Node Bullet */}
              <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] ring-4 ring-[#0A0A0B]" />

              <div className="bg-[#0F0F12] border border-white/10 rounded-xl p-4 space-y-2 hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {getAgentBadge(t.agent)}
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {t.timestamp}
                    </span>
                  </div>

                  {t.type === "success" && (
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 uppercase">
                      <CheckCircle2 className="w-3 h-3" /> Step Completed
                    </span>
                  )}
                  {t.type === "warning" && (
                    <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1 uppercase">
                      <AlertTriangle className="w-3 h-3" /> Warning
                    </span>
                  )}
                </div>

                <div className="text-xs font-semibold text-zinc-100">{t.message}</div>

                {t.details && (
                  <pre className="text-[11px] font-mono text-zinc-300 bg-[#0A0A0B] p-2.5 rounded-lg border border-white/10 whitespace-pre-wrap overflow-x-auto leading-relaxed">
                    {t.details}
                  </pre>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grounded Sources Grid */}
      <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl p-5 shadow-2xl space-y-3">
        <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center justify-between">
          <span>Retrieved Web Sources ({session.sources.length})</span>
          <span className="text-[10px] text-emerald-400">Verified URLs</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {session.sources.map((s) => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-[#0F0F12] hover:bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-all text-xs group block"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="font-semibold text-zinc-200 group-hover:text-emerald-300 line-clamp-1">
                  {s.title}
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 shrink-0 mt-0.5" />
              </div>
              <p className="text-[11px] text-zinc-400 line-clamp-2 mt-1 leading-relaxed">{s.snippet}</p>
              <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono mt-2 pt-2 border-t border-white/5">
                <span className="text-emerald-400">{s.domain}</span>
                <span>Relevance: {(s.relevanceScore * 100).toFixed(0)}%</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
