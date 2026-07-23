import React, { useState } from "react";
import Markdown from "react-markdown";
import {
  FileText,
  Copy,
  Check,
  Download,
  BookOpen,
  Sparkles,
  ExternalLink,
  Layers,
} from "lucide-react";
import { ResearchSession } from "../types";

interface ReportViewerProps {
  session: ResearchSession | null;
}

export const ReportViewer: React.FC<ReportViewerProps> = ({ session }) => {
  const [copied, setCopied] = useState(false);
  const [activeView, setActiveView] = useState<"rendered" | "raw" | "citations">("rendered");

  if (!session) {
    return (
      <div className="p-12 text-center text-zinc-400 bg-[#0F0F12] rounded-2xl border border-white/10 space-y-3 shadow-2xl">
        <FileText className="w-10 h-10 text-zinc-600 mx-auto" />
        <div className="text-sm font-mono tracking-widest uppercase text-zinc-300">No Research Report Loaded</div>
        <p className="text-xs text-zinc-500 max-w-md mx-auto">
          Start a new autonomous deep research task or select an active research context from the top navigation.
        </p>
      </div>
    );
  }

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(session.reportMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([session.reportMarkdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${session.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-research-report.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(session, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${session.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-audit-log.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Report Action Control Bar */}
      <div className="bg-[#0F0F12] border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left Status & Topic info */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Autonomously Synthesized Analysis</span>
            <h2 className="text-sm font-semibold text-zinc-100 line-clamp-1">{session.topic}</h2>
            <div className="flex items-center gap-2 text-[10px] text-zinc-400 mt-0.5 font-mono">
              <span>{session.sources.length} Sources</span>
              <span>•</span>
              <span>{session.ragMemoryChunks.length} RAG Chunks</span>
              <span>•</span>
              <span className="text-emerald-400 uppercase">LangGraph Verified</span>
            </div>
          </div>
        </div>

        {/* View Switcher & Export Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-[#0A0A0B] p-1 rounded-xl border border-white/10 text-xs font-mono">
            <button
              onClick={() => setActiveView("rendered")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeView === "rendered"
                  ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 font-medium"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Rendered
            </button>
            <button
              onClick={() => setActiveView("raw")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeView === "raw"
                  ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 font-medium"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Raw MD
            </button>
            <button
              onClick={() => setActiveView("citations")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeView === "citations"
                  ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 font-medium"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Citations ({session.sources.length})
            </button>
          </div>

          <button
            onClick={handleCopyMarkdown}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 transition-colors text-xs font-mono flex items-center gap-1.5"
            title="Copy Markdown"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span className="hidden md:inline">{copied ? "Copied" : "Copy"}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 transition-colors text-xs font-mono flex items-center gap-1.5"
            title="Download .md File"
          >
            <Download className="w-4 h-4" />
            <span className="hidden md:inline">Download .md</span>
          </button>

          <button
            onClick={handleDownloadJSON}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 transition-colors text-xs font-mono flex items-center gap-1.5"
            title="Export JSON Audit Log"
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span className="hidden lg:inline">JSON Log</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeView === "rendered" && (
        <div className="bg-[#0F0F12] border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl space-y-6">
          <div className="prose prose-invert max-w-none text-zinc-200 leading-relaxed text-sm prose-headings:text-zinc-100 prose-headings:font-light prose-h1:font-serif prose-h1:italic prose-h1:text-3xl prose-h2:font-mono prose-h2:text-xs prose-h2:uppercase prose-h2:tracking-widest prose-h2:text-emerald-400 prose-a:text-emerald-400 prose-code:font-mono prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:border prose-code:border-white/10">
            <Markdown>{session.reportMarkdown}</Markdown>
          </div>
        </div>
      )}

      {activeView === "raw" && (
        <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl p-6 shadow-2xl">
          <pre className="text-xs font-mono text-zinc-300 bg-[#0F0F12] p-4 rounded-xl overflow-x-auto whitespace-pre-wrap leading-relaxed border border-white/10">
            {session.reportMarkdown}
          </pre>
        </div>
      )}

      {activeView === "citations" && (
        <div className="bg-[#0F0F12] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Grounded Research Citations ({session.sources.length})
          </h3>

          <div className="space-y-3">
            {session.sources.map((s, idx) => (
              <div
                key={s.id || idx}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start justify-between gap-4 hover:border-emerald-500/40 transition-colors"
              >
                <div>
                  <div className="font-semibold text-xs text-zinc-100 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono text-[10px] border border-emerald-500/30">
                      [{idx + 1}]
                    </span>
                    <span>{s.title}</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">{s.snippet}</p>
                  <div className="text-[10px] font-mono text-emerald-400 mt-2">{s.domain}</div>
                </div>

                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-emerald-950 hover:text-emerald-300 text-xs font-mono text-zinc-300 border border-white/10 transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <span>Visit Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
