export type AgentName = 
  | 'Planner Agent' 
  | 'Search & Scraper Agent' 
  | 'RAG Memory Agent' 
  | 'Gap Analyzer Agent' 
  | 'Synthesis Agent';

export type StepType = 
  | 'planner' 
  | 'search' 
  | 'rag_memory' 
  | 'gap_analysis' 
  | 'synthesis' 
  | 'completed' 
  | 'failed';

export interface SourceItem {
  id: string;
  url: string;
  title: string;
  snippet: string;
  domain: string;
  relevanceScore: number;
  retrievedAt: string;
}

export interface VectorChunk {
  id: string;
  sourceId: string;
  sourceTitle: string;
  sourceUrl: string;
  text: string;
  vectorId: string;
  similarityScore: number;
  category: string;
  snippet?: string;
}

export interface GapItem {
  id: string;
  description: string;
  missingAspect: string;
  subqueryToResolve: string;
  isResolved: boolean;
  resolvedInIteration?: number;
}

export interface AgentThought {
  id: string;
  agent: AgentName;
  timestamp: string;
  message: string;
  details?: string;
  type?: 'info' | 'search' | 'vector' | 'gap' | 'success' | 'warning';
}

export interface LangGraphNodeState {
  id: string;
  name: string;
  agent: AgentName;
  description: string;
  status: 'idle' | 'running' | 'completed' | 'looping' | 'failed';
  executionTimeMs?: number;
  inputsCount?: number;
  outputsCount?: number;
}

export interface ResearchSession {
  id: string;
  topic: string;
  depth: number;
  maxIterations: number;
  mode: 'langgraph_autonomous' | 'direct_rag';
  status: 'idle' | 'running' | 'completed' | 'failed';
  currentStep: StepType;
  iteration: number;
  subqueries: string[];
  sources: SourceItem[];
  ragMemoryChunks: VectorChunk[];
  knowledgeGaps: GapItem[];
  thoughts: AgentThought[];
  reportMarkdown: string;
  nodeStates: LangGraphNodeState[];
  startTime: string;
  endTime?: string;
  stats: {
    totalSearchesPerformed: number;
    sourcesProcessed: number;
    chunksIndexed: number;
    gapsIdentified: number;
    gapsResolved: number;
    deduplicatedCount: number;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  citedChunks?: VectorChunk[];
}
