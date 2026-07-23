import React, { useState } from "react";
import {
  Brain,
  Search,
  Database,
  HelpCircle,
  FileCheck2,
  RefreshCw,
  Zap,
  ArrowRight,
  Info,
  CheckCircle2,
  Clock,
  Code,
} from "lucide-react";
import { ResearchSession } from "../types";

interface LangGraphVisualizerProps {
  session: ResearchSession | null;
}

export const LangGraphVisualizer: React.FC<LangGraphVisualizerProps> = ({ session }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("planner");

  if (!session) {
    return (
      <div className="p-8 text-center text-zinc-400 bg-[#0F0F12] rounded-2xl border border-white/10 font-mono text-xs">
        No active research session loaded. Start a new task to inspect the LangGraph state machine.
      </div>
    );
  }

  const nodes = session.nodeStates || [];
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const getNodeIcon = (nodeId: string) => {
    switch (nodeId) {
      case "planner":
        return <Brain className="w-5 h-5 text-emerald-400" />;
      case "search":
        return <Search className="w-5 h-5 text-emerald-400" />;
      case "rag_memory":
        return <Database className="w-5 h-5 text-emerald-400" />;
      case "gap_analysis":
        return <HelpCircle className="w-5 h-5 text-amber-400" />;
      case "synthesis":
        return <FileCheck2 className="w-5 h-5 text-emerald-400" />;
      default:
        return <Zap className="w-5 h-5 text-zinc-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-[#0F0F12] border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded text-[10px] font-mono tracking-widest uppercase bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5" /> LangGraph StateGraph
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                Iteration {session.iteration} of {session.maxIterations}
              </span>
            </div>
            <h2 className="text-base font-semibold text-zinc-100 mt-1.5 tracking-wide">
              Autonomous Multi-Agent Orchestration Architecture
            </h2>
            <p className="text-xs text-zinc-400 max-w-2xl mt-0.5 leading-relaxed">
              LangGraph manages state passing, search tools, and dynamic conditional edge loops across 5 specialized LLM agents.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#0A0A0B] p-3 rounded-xl border border-white/10 text-xs font-mono">
            <div>
              <div className="text-zinc-500 text-[10px] uppercase">Graph Executions</div>
              <div className="text-sm font-bold text-emerald-400">
                {session.stats.totalSearchesPerformed + 4} Nodes
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <div className="text-zinc-500 text-[10px] uppercase">Memory Store</div>
              <div className="text-sm font-bold text-emerald-400">
                {session.ragMemoryChunks.length} Chunks
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <div className="text-zinc-500 text-[10px] uppercase">Gaps Resolved</div>
              <div className="text-sm font-bold text-amber-400">
                {session.stats.gapsResolved}/{session.stats.gapsIdentified}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Visual Graph Canvas */}
      <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-x-auto">
        <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-6 flex items-center justify-between">
          <span>LangGraph Node State Machine &amp; Conditional Edges</span>
          <span className="text-[10px] text-emerald-400">
            Click any node to inspect runtime state variables
          </span>
        </div>

        {/* Node Flow Representation */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 min-w-[850px] relative py-4">
          
          {/* Node 1: Planner */}
          <div
            onClick={() => setSelectedNodeId("planner")}
            className={`cursor-pointer transition-all p-4 rounded-xl border w-48 text-left relative ${
              selectedNodeId === "planner"
                ? "bg-emerald-950/30 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] scale-105"
                : "bg-[#0F0F12] border-white/10 hover:border-emerald-500/30"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30">
                {getNodeIcon("planner")}
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                Completed
              </span>
            </div>
            <div className="font-semibold text-xs text-zinc-100">Planner Agent</div>
            <div className="text-[11px] text-zinc-400 mt-0.5 truncate">Query Decomposition</div>
            <div className="text-[10px] text-zinc-500 font-mono mt-2 flex items-center justify-between">
              <span>{session.subqueries.length} subqueries</span>
              <span>120ms</span>
            </div>
          </div>

          <ArrowRight className="w-5 h-5 text-zinc-600 shrink-0 hidden lg:block" />

          {/* Node 2: Search & Scraper */}
          <div
            onClick={() => setSelectedNodeId("search")}
            className={`cursor-pointer transition-all p-4 rounded-xl border w-48 text-left relative ${
              selectedNodeId === "search"
                ? "bg-emerald-950/30 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] scale-105"
                : "bg-[#0F0F12] border-white/10 hover:border-emerald-500/30"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30">
                {getNodeIcon("search")}
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                Completed
              </span>
            </div>
            <div className="font-semibold text-xs text-zinc-100">Search &amp; Scraper</div>
            <div className="text-[11px] text-zinc-400 mt-0.5 truncate">Web Grounding</div>
            <div className="text-[10px] text-zinc-500 font-mono mt-2 flex items-center justify-between">
              <span>{session.sources.length} sources</span>
              <span>1.45s</span>
            </div>
          </div>

          <ArrowRight className="w-5 h-5 text-zinc-600 shrink-0 hidden lg:block" />

          {/* Node 3: RAG Memory */}
          <div
            onClick={() => setSelectedNodeId("rag_memory")}
            className={`cursor-pointer transition-all p-4 rounded-xl border w-48 text-left relative ${
              selectedNodeId === "rag_memory"
                ? "bg-emerald-950/30 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] scale-105"
                : "bg-[#0F0F12] border-white/10 hover:border-emerald-500/30"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30">
                {getNodeIcon("rag_memory")}
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                Completed
              </span>
            </div>
            <div className="font-semibold text-xs text-zinc-100">RAG Vector Store</div>
            <div className="text-[11px] text-zinc-400 mt-0.5 truncate">Embedding &amp; Deduplication</div>
            <div className="text-[10px] text-zinc-500 font-mono mt-2 flex items-center justify-between">
              <span>{session.ragMemoryChunks.length} chunks</span>
              <span>620ms</span>
            </div>
          </div>

          <ArrowRight className="w-5 h-5 text-zinc-600 shrink-0 hidden lg:block" />

          {/* Node 4: Gap Analyzer (Conditional Edge Node) */}
          <div
            onClick={() => setSelectedNodeId("gap_analysis")}
            className={`cursor-pointer transition-all p-4 rounded-xl border w-48 text-left relative ${
              selectedNodeId === "gap_analysis"
                ? "bg-amber-950/30 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)] scale-105"
                : "bg-[#0F0F12] border-white/10 hover:border-amber-500/30"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-amber-950/60 border border-amber-500/30">
                {getNodeIcon("gap_analysis")}
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <RefreshCw className="w-2.5 h-2.5 animate-spin" /> Conditional
              </span>
            </div>
            <div className="font-semibold text-xs text-zinc-100">Gap Analyzer</div>
            <div className="text-[11px] text-zinc-400 mt-0.5 truncate">Completeness Evaluation</div>
            <div className="text-[10px] text-zinc-500 font-mono mt-2 flex items-center justify-between">
              <span>{session.knowledgeGaps.length} gaps</span>
              <span>810ms</span>
            </div>

            {/* Loopback Arrow Overlay Indicator */}
            <div className="mt-2 pt-1 border-t border-white/10 flex items-center gap-1 text-[9px] text-amber-400/90 font-mono">
              <span>If gaps &gt; 0 ➔ Loop back to Search</span>
            </div>
          </div>

          <ArrowRight className="w-5 h-5 text-zinc-600 shrink-0 hidden lg:block" />

          {/* Node 5: Report Synthesis */}
          <div
            onClick={() => setSelectedNodeId("synthesis")}
            className={`cursor-pointer transition-all p-4 rounded-xl border w-48 text-left relative ${
              selectedNodeId === "synthesis"
                ? "bg-emerald-950/30 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] scale-105"
                : "bg-[#0F0F12] border-white/10 hover:border-emerald-500/30"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30">
                {getNodeIcon("synthesis")}
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                Completed
              </span>
            </div>
            <div className="font-semibold text-xs text-zinc-100">Synthesis Agent</div>
            <div className="text-[11px] text-zinc-400 mt-0.5 truncate">Markdown Synthesis</div>
            <div className="text-[10px] text-zinc-500 font-mono mt-2 flex items-center justify-between">
              <span>Full Report</span>
              <span>2.30s</span>
            </div>
          </div>

        </div>
      </div>

      {/* Selected Node Details & State Inspector Panel */}
      {selectedNode && (
        <div className="bg-[#0F0F12] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                {getNodeIcon(selectedNode.id)}
              </div>
              <div>
                <h3 className="font-semibold text-sm text-zinc-100 flex items-center gap-2">
                  {selectedNode.name}
                  <span className="text-xs font-mono font-normal text-zinc-400">
                    ({selectedNode.agent})
                  </span>
                </h3>
                <p className="text-xs text-zinc-400">{selectedNode.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-zinc-400 bg-[#0A0A0B] px-3 py-1.5 rounded-lg border border-white/10">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Execution Time: {selectedNode.executionTimeMs || 450}ms</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Status: Completed</span>
              </div>
            </div>
          </div>

          {/* Runtime Context Variables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#0A0A0B] p-4 rounded-xl border border-white/10 font-mono">
              <div className="text-zinc-400 font-semibold mb-2 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                <Info className="w-3.5 h-3.5 text-emerald-400" /> Node Input State Variables
              </div>
              <pre className="text-zinc-300 text-[11px] overflow-x-auto whitespace-pre-wrap leading-relaxed">
{JSON.stringify(
  {
    topic: session.topic,
    current_iteration: session.iteration,
    max_depth: session.maxIterations,
    active_subqueries: session.subqueries,
  },
  null,
  2
)}
              </pre>
            </div>

            <div className="bg-[#0A0A0B] p-4 rounded-xl border border-white/10 font-mono">
              <div className="text-zinc-400 font-semibold mb-2 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                <Info className="w-3.5 h-3.5 text-emerald-400" /> Node Output State Mutators
              </div>
              <pre className="text-zinc-300 text-[11px] overflow-x-auto whitespace-pre-wrap leading-relaxed">
{JSON.stringify(
  {
    retrieved_sources_count: session.sources.length,
    vector_memory_chunks: session.ragMemoryChunks.length,
    knowledge_gaps: session.knowledgeGaps,
  },
  null,
  2
)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
