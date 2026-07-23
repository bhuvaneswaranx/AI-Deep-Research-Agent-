import React, { useState } from "react";
import { Header } from "./components/Header";
import { LangGraphVisualizer } from "./components/LangGraphVisualizer";
import { ResearchPlannerModal } from "./components/ResearchPlannerModal";
import { ExecutionConsole } from "./components/ExecutionConsole";
import { ReportViewer } from "./components/ReportViewer";
import { RagMemoryInspector } from "./components/RagMemoryInspector";
import { PythonCodeViewer } from "./components/PythonCodeViewer";
import { SAMPLE_RESEARCHES } from "./data/sampleResearches";
import { ResearchSession } from "./types";
import { Bot, RefreshCw, AlertCircle } from "lucide-react";

export default function App() {
  const [sessions, setSessions] = useState<ResearchSession[]>(SAMPLE_RESEARCHES);
  const [currentSession, setCurrentSession] = useState<ResearchSession | null>(
    SAMPLE_RESEARCHES[0] || null
  );
  const [activeTab, setActiveTab] = useState<"report" | "visualizer" | "rag" | "code" | "thoughts">("report");
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleStartResearch = async (
    topic: string,
    depth: number,
    mode: "langgraph_autonomous" | "direct_rag"
  ) => {
    setIsNewModalOpen(false);
    setIsExecuting(true);
    setErrorMessage(null);

    // Create temporary optimistic session
    const tempSession: ResearchSession = {
      id: `session-temp-${Date.now()}`,
      topic,
      depth,
      maxIterations: depth,
      mode,
      status: "running",
      currentStep: "planner",
      iteration: 1,
      subqueries: [topic],
      sources: [],
      ragMemoryChunks: [],
      knowledgeGaps: [],
      thoughts: [
        {
          id: `t-init-${Date.now()}`,
          agent: "Planner Agent",
          timestamp: new Date().toLocaleTimeString(),
          message: `Initializing research graph for: "${topic}"`,
          type: "info",
        },
      ],
      reportMarkdown: `# ${topic}\n\n*Agents are actively searching, indexing memory, and synthesizing research report...*`,
      nodeStates: [
        { id: "planner", name: "Planner Agent", agent: "Planner Agent", description: "Query Decomposition", status: "running" },
        { id: "search", name: "Search & Scraper", agent: "Search & Scraper Agent", description: "Google Grounding", status: "idle" },
        { id: "rag_memory", name: "RAG Memory Store", agent: "RAG Memory Agent", description: "Vector Indexing", status: "idle" },
        { id: "gap_analysis", name: "Gap Analyzer", agent: "Gap Analyzer Agent", description: "Gap Detection", status: "idle" },
        { id: "synthesis", name: "Report Synthesizer", agent: "Synthesis Agent", description: "Report Synthesis", status: "idle" },
      ],
      startTime: new Date().toISOString(),
      stats: {
        totalSearchesPerformed: 1,
        sourcesProcessed: 0,
        chunksIndexed: 0,
        gapsIdentified: 0,
        gapsResolved: 0,
        deduplicatedCount: 0,
      },
    };

    setCurrentSession(tempSession);
    setActiveTab("thoughts");

    try {
      const response = await fetch("/api/research/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, depth, mode }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || errData.error || "Failed to execute research");
      }

      const completedSession: ResearchSession = await response.json();

      // Formulate node states for completed session
      completedSession.nodeStates = [
        { id: "planner", name: "Planner Agent", agent: "Planner Agent", description: "Query Decomposition", status: "completed", executionTimeMs: 140 },
        { id: "search", name: "Search & Scraper", agent: "Search & Scraper Agent", description: "Google Grounding", status: "completed", executionTimeMs: 1200 },
        { id: "rag_memory", name: "RAG Memory Store", agent: "RAG Memory Agent", description: "Vector Indexing", status: "completed", executionTimeMs: 580 },
        { id: "gap_analysis", name: "Gap Analyzer", agent: "Gap Analyzer Agent", description: "Gap Detection", status: "completed", executionTimeMs: 710 },
        { id: "synthesis", name: "Report Synthesizer", agent: "Synthesis Agent", description: "Report Synthesis", status: "completed", executionTimeMs: 2100 },
      ];

      setSessions((prev) => [completedSession, ...prev]);
      setCurrentSession(completedSession);
      setActiveTab("report");
    } catch (err: any) {
      console.error("Research execution error:", err);
      setErrorMessage(err.message || "An error occurred during research execution.");
      
      if (tempSession) {
        tempSession.status = "failed";
        tempSession.currentStep = "failed";
      }
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-100 font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* App Header */}
      <Header
        currentSession={currentSession}
        sessions={sessions}
        onSelectSession={(s) => setCurrentSession(s)}
        onOpenNewResearch={() => setIsNewModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isExecuting={isExecuting}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Error Banner if any */}
        {errorMessage && (
          <div className="bg-rose-950/60 border border-rose-500/30 text-rose-200 p-4 rounded-2xl flex items-center justify-between gap-3 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-xs font-mono font-semibold underline hover:text-white"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Live Execution Status Indicator */}
        {isExecuting && (
          <div className="bg-[#0F0F12] border border-emerald-500/30 rounded-2xl p-4 shadow-[0_0_20px_rgba(16,185,129,0.1)] flex items-center justify-between gap-4 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                <RefreshCw className="w-5 h-5 animate-spin" />
              </div>
              <div>
                <div className="text-xs font-mono font-semibold text-zinc-100 flex items-center gap-2 uppercase tracking-wide">
                  <span>Autonomous Agents Active</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                    Live Web Search &amp; RAG
                  </span>
                </div>
                <div className="text-xs text-zinc-300 mt-0.5 line-clamp-1">
                  Researching topic: "{currentSession?.topic}"
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab("thoughts")}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-black text-xs font-mono font-bold transition-colors shrink-0 uppercase tracking-wider"
            >
              View Live Stream
            </button>
          </div>
        )}

        {/* Active Tab View Rendering */}
        {activeTab === "report" && <ReportViewer session={currentSession} />}
        {activeTab === "visualizer" && <LangGraphVisualizer session={currentSession} />}
        {activeTab === "rag" && <RagMemoryInspector session={currentSession} />}
        {activeTab === "thoughts" && <ExecutionConsole session={currentSession} />}
        {activeTab === "code" && <PythonCodeViewer />}

      </main>

      {/* New Research Configuration Modal */}
      <ResearchPlannerModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onStartResearch={handleStartResearch}
        isExecuting={isExecuting}
      />

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0A0A0B] py-8 text-xs text-zinc-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-emerald-400" />
            <span className="text-zinc-400 font-medium">AI Deep Research Agent Engine</span>
            <span>•</span>
            <span>Powered by Gemini &amp; LangGraph</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <span>RAG Vector Memory</span>
            <span>•</span>
            <span>Knowledge Gap Loop</span>
            <span>•</span>
            <span>Markdown Export</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
