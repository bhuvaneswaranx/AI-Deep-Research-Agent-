import { ResearchSession } from "../types";

export const SAMPLE_RESEARCHES: ResearchSession[] = [
  {
    id: "session-solid-state-batteries",
    topic: "Solid-State Battery Electrolytes: Sulfide vs Oxide Commercial Benchmarks & 2026 Production Timelines",
    depth: 3,
    maxIterations: 3,
    mode: "langgraph_autonomous",
    status: "completed",
    currentStep: "completed",
    iteration: 3,
    subqueries: [
      "Solid-state battery sulfide vs oxide electrolyte ionic conductivity energy density benchmarks 2026",
      "QuantumScape Toyota CATL solid state battery manufacturing scale dendrite prevention solutions",
      "Solid state lithium battery thermal stability cycle life degradation metrics commercial EVs"
    ],
    sources: [
      {
        id: "src-1",
        title: "Nature Energy: Next-Gen Sulfide Solid-State Electrolytes and Interfacial Stability",
        url: "https://www.nature.com/articles/s41560-025-01822-x",
        snippet: "Sulfide-based solid electrolytes demonstrate room-temperature ionic conductivity reaching >12 mS/cm, exceeding liquid electrolytes. Interface resistance at the cathode-electrolyte boundary remains the primary challenge.",
        domain: "nature.com",
        relevanceScore: 0.98,
        retrievedAt: "08:12:05"
      },
      {
        id: "src-2",
        title: "IEEE Spectrum: QuantumScape QSE-5 Anodeless Cells Commercial Validation Metrics",
        url: "https://spectrum.ieee.org/quantumscape-solid-state-battery-benchmark-2026",
        snippet: "QuantumScape's QSE-5 anodeless solid-state lithium metal cells achieved >800 Wh/L energy density with 15-minute 10-80% fast charging over 1,000 discharge cycles under test conditions.",
        domain: "ieee.org",
        relevanceScore: 0.95,
        retrievedAt: "08:12:12"
      },
      {
        id: "src-3",
        title: "Journal of Power Sources: Oxide (LLZO) vs Sulfide (LPS) Mechanical Ductility & Scalability",
        url: "https://www.sciencedirect.com/science/article/pii/S037877532500142",
        snippet: "Garnet-type oxide LLZO features superior chemical stability in air but requires high-temperature sintering (>1050°C), whereas sulfide LPS is soft and easily cold-pressed but yields toxic H2S when exposed to ambient humidity.",
        domain: "sciencedirect.com",
        relevanceScore: 0.92,
        retrievedAt: "08:12:19"
      },
      {
        id: "src-4",
        title: "Automotive News Tech: Toyota & Idemitsu Kosan Solid-State Pilot Line Status 2026",
        url: "https://www.autonews.com/technology/toyota-idemitsu-solid-state-battery-production-2026",
        snippet: "Toyota and Idemitsu Kosan completed commissioning of a 100 MWh pilot line for sulfide solid electrolytes targeting high-volume EV integration by 2027-2028 with 1,200 km range.",
        domain: "autonews.com",
        relevanceScore: 0.89,
        retrievedAt: "08:12:28"
      }
    ],
    ragMemoryChunks: [
      {
        id: "vec-101",
        sourceId: "src-1",
        sourceTitle: "Nature Energy: Next-Gen Sulfide Solid-State Electrolytes",
        sourceUrl: "https://www.nature.com/articles/s41560-025-01822-x",
        text: "Sulfide-based solid electrolytes (e.g., Li10GeP212 and Li6PS5Cl argyrodites) deliver exceptional ionic conductivity (10-25 mS/cm at 25°C). However, moisture sensitivity creates severe processing constraints requiring ultra-dry dry-room atmospheres (<0.5% relative humidity).",
        vectorId: "0xa81f02",
        similarityScore: 0.96,
        category: "Ionic Transport Mechanisms"
      },
      {
        id: "vec-102",
        sourceId: "src-2",
        sourceTitle: "IEEE Spectrum: QuantumScape QSE-5 Anodeless Cells",
        sourceUrl: "https://spectrum.ieee.org/quantumscape-solid-state-battery-benchmark-2026",
        text: "QuantumScape utilizes a proprietary ceramic oxide separator that prevents lithium dendrite penetration even at high current densities (>10 mA/cm2). The anodeless cell architecture eliminates the traditional graphite or silicon anode manufacturing cost.",
        vectorId: "0xb43c91",
        similarityScore: 0.94,
        category: "Dendrite Mitigation"
      },
      {
        id: "vec-103",
        sourceId: "src-3",
        sourceTitle: "Journal of Power Sources: Oxide vs Sulfide Mechanical Ductility",
        sourceUrl: "https://www.sciencedirect.com/science/article/pii/S037877532500142",
        text: "Oxide-based garnet LLZO (Li7La3Zr2O12) features an ultra-wide electrochemical window (>5.0V vs Li/Li+) and high shear modulus (60 GPa). Sintering ceramic sheets thinner than 20 micrometers without pinhole defects remains the core manufacturing bottleneck.",
        vectorId: "0xc10e44",
        similarityScore: 0.91,
        category: "Material Synthesis & Rheology"
      },
      {
        id: "vec-104",
        sourceId: "src-4",
        sourceTitle: "Automotive News Tech: Toyota Pilot Line",
        sourceUrl: "https://www.autonews.com/technology/toyota-idemitsu-solid-state-battery-production-2026",
        snippet: "Pilot plant validation confirms 1,000 cycles with 85% capacity retention at 1C discharge rates, supporting 10-minute 10-80% DC fast charging without cell swelling.",
        text: "Pilot plant roll-to-roll co-coating testing confirms 1,000 cycles with 85% capacity retention at 1C discharge rates, supporting 10-minute 10-80% DC fast charging without volumetric expansion or cell swelling.",
        vectorId: "0xd991fa",
        similarityScore: 0.88,
        category: "Industrial Scalability"
      }
    ],
    knowledgeGaps: [
      {
        id: "gap-1",
        description: "Exact cost comparison per kWh between liquid electrolyte NMC-811 vs sulfide solid-state cells at pilot scale.",
        missingAspect: "Economic Analysis & Cost Parity",
        subqueryToResolve: "solid state battery cost per kWh pilot production comparison liquid lithium ion 2026",
        isResolved: true,
        resolvedInIteration: 2
      },
      {
        id: "gap-2",
        description: "Low-temperature (-20°C to 0°C) ionic conductivity degradation curves for ceramic oxide separators.",
        missingAspect: "Sub-Zero Thermal Operating Envelope",
        subqueryToResolve: "LLZO ceramic separator ionic conductivity negative 20 degrees Celsius battery performance",
        isResolved: true,
        resolvedInIteration: 3
      }
    ],
    thoughts: [
      {
        id: "t-1",
        agent: "Planner Agent",
        timestamp: "08:12:00",
        message: "Decomposed research request into 3 target sub-queries across material chemistry, manufacturing scalability, and performance benchmarks.",
        type: "info"
      },
      {
        id: "t-2",
        agent: "Search & Scraper Agent",
        timestamp: "08:12:05",
        message: "Retrieved 14 primary technical literature sources from Nature Energy, IEEE Spectrum, and ScienceDirect.",
        type: "search"
      },
      {
        id: "t-3",
        agent: "RAG Memory Agent",
        timestamp: "08:12:15",
        message: "Constructed vector embeddings for 24 text chunks. Filtered 6 redundant duplicate news press releases.",
        type: "vector"
      },
      {
        id: "t-4",
        agent: "Gap Analyzer Agent",
        timestamp: "08:12:22",
        message: "Identified knowledge gap in sub-zero operational metrics. Triggered iteration 2 targeted search.",
        type: "gap"
      },
      {
        id: "t-5",
        agent: "Synthesis Agent",
        timestamp: "08:12:35",
        message: "Cross-referenced all verified sources and generated publication-grade Markdown report with full citation links.",
        type: "success"
      }
    ],
    reportMarkdown: `# Solid-State Battery Electrolytes: Sulfide vs Oxide Commercial Benchmarks & 2026 Production Timelines

## Executive Summary
Solid-state battery (SSB) technology represents a paradigm shift in energy storage, promising energy densities exceeding **800–1,000 Wh/L**, 15-minute ultra-fast charging capabilities, and intrinsic safety by eliminating flammable organic liquid solvents. 

In 2026, the global race has consolidated into two primary solid electrolyte chemistry pathways:
1. **Sulfide-based Systems** (e.g., $Li_{10}GeP_2S_{12}$ and Argyrodites $Li_6PS_5Cl$) – Favored by **Toyota, Idemitsu Kosan, CATL, and Samsung SDI** due to superior room-temperature ionic conductivity ($>12\\text{ mS/cm}$) and grain-boundary mechanical cold-pressability.
2. **Oxide-based Systems** (e.g., Garnet $Li_7La_3Zr_2O_{12}$ LLZO & NASICON structures) – Favored by **QuantumScape** and **Prologium** for superior electrochemical stability ($>5.0\\text{V}$ window) and zero dendrite penetration under high pressure.

---

## Technical Benchmarks & Comparison Matrix

| Metric / Parameter | Sulfide Electrolytes ($Li_6PS_5Cl$) | Oxide Electrolytes (LLZO Garnet) | Conventional Liquid ($LiPF_6$ in EC/DMC) |
| :--- | :--- | :--- | :--- |
| **Ionic Conductivity (25°C)** | $10 - 25\\text{ mS/cm}$ | $0.5 - 2.0\\text{ mS/cm}$ | $10 - 12\\text{ mS/cm}$ |
| **Volumetric Energy Density** | $850 - 950\\text{ Wh/L}$ | $800 - 900\\text{ Wh/L}$ | $650 - 720\\text{ Wh/L}$ |
| **Fast Charge Rate (10-80%)** | $12 - 15\\text{ min}$ | $15 - 20\\text{ min}$ | $20 - 35\\text{ min}$ |
| **Air / Moisture Stability** | ❌ Reaction yields toxic $H_2S$ gas | ✅ Chemical stability in air | ⚠️ Hydrolyzes to $HF$ acid |
| **Cold Pressability / Sintering** | ✅ Cold press ($300-400\\text{ MPa}$) | ❌ High-temp sintering ($1050^\circ\\text{C}$) | ✅ Liquid wetting |
| **Dendrite Resistance** | Moderate (soft mechanical modulus) | Extreme (Hard shear modulus $60\\text{ GPa}$) | Poor |

---

## Detailed Chemistry & Engineering Analysis

### 1. Sulfide Electrolytes ($Li_6PS_5Cl$)
Sulfide compounds exhibit soft, ductile mechanical properties that allow solid particles to coalesce seamlessly under high pressure ($300-400\\text{ MPa}$) without high-temperature sintering. This dramatically simplifies electrode slurry integration. 

* **Primary Challenge:** Sulfides react rapidly with trace moisture ($H_2O$), producing hazardous hydrogen sulfide ($H_2S$) gas. Pilot facilities require ultra-stringent dry-room environments with dew points lower than **$-50^\circ\\text{C}$**.

### 2. Ceramic Oxide Separators (QuantumScape QSE-5)
Oxides offer an extremely wide electrochemical stability window ($0-5\\text{ V vs Li/Li}^+$), enabling direct pairing with high-voltage cathodes like NMC-811 and high-capacity pure Lithium metal anodes ($3,860\\text{ mAh/g}$). 

* **Primary Challenge:** Manufacturing flexible, pinhole-free ceramic separators below **$20\\,\\mu\\text{m}$** thickness at scale requires continuous ceramic tape casting and high-temperature kiln sintering with high yield rates.

---

## 2026 Commercialization Roadmap & Pilot Line Milestones

1. **Toyota & Idemitsu Kosan:** Commissioned a $100\\text{ MWh}$ pilot production facility in Chiba, Japan. Validating roll-to-roll sulfide electrolyte sheet coatings for vehicle integration in 2027–2028.
2. **QuantumScape (QSE-5):** Delivered B-sample cell shipments to automotive OEM partners featuring $800\\text{ Wh/L}$ energy density and 1,000+ retention cycles.
3. **CATL (All-Solid-State Division):** Announced 2027 target for small-batch luxury EV solid-state battery packs.

---

## RAG Knowledge Gap Analysis & Resolution

* **Gap 1 (Cost Parity):** Current pilot-scale solid electrolyte raw materials ($Li_2S$) cost roughly $300/kg. Scale up to 10 GWh capacity is projected to reduce costs down to $25/kg by 2030, approaching parity with liquid separator stacks.
* **Gap 2 (Low Temperature):** At $-20^\circ\text{C}$, sulfide conductivity drops to $\sim 1.5\text{ mS/cm}$, requiring internal resistive heating pulse management during cold starts.

---

## Referenced Sources & Grounded Literature
* [[1] Nature Energy: Next-Gen Sulfide Solid-State Electrolytes](https://www.nature.com/articles/s41560-025-01822-x)
* [[2] IEEE Spectrum: QuantumScape QSE-5 Cell Benchmarks](https://spectrum.ieee.org/quantumscape-solid-state-battery-benchmark-2026)
* [[3] Journal of Power Sources: Oxide vs Sulfide Rheology](https://www.sciencedirect.com/science/article/pii/S037877532500142)
* [[4] Automotive News Tech: Toyota Pilot Line](https://www.autonews.com/technology/toyota-idemitsu-solid-state-battery-production-2026)
`,
    nodeStates: [
      { id: "planner", name: "Planner Agent", agent: "Planner Agent", description: "Query Decomposition & Search Strategy", status: "completed", executionTimeMs: 120, inputsCount: 1, outputsCount: 3 },
      { id: "search", name: "Search & Scraper", agent: "Search & Scraper Agent", description: "Google Search Grounding & Web Extraction", status: "completed", executionTimeMs: 1450, inputsCount: 3, outputsCount: 14 },
      { id: "rag_memory", name: "RAG Vector Store", agent: "RAG Memory Agent", description: "Chunking, Vector Embeddings & Deduplication", status: "completed", executionTimeMs: 620, inputsCount: 14, outputsCount: 24 },
      { id: "gap_analysis", name: "Gap Analyzer", agent: "Gap Analyzer Agent", description: "Knowledge Gap Detection & Iterative Edge Loop", status: "completed", executionTimeMs: 810, inputsCount: 24, outputsCount: 2 },
      { id: "synthesis", name: "Report Synthesizer", agent: "Synthesis Agent", description: "Markdown Generation & Citation Linking", status: "completed", executionTimeMs: 2300, inputsCount: 24, outputsCount: 1 }
    ],
    startTime: "2026-07-23T08:12:00Z",
    endTime: "2026-07-23T08:12:35Z",
    stats: {
      totalSearchesPerformed: 7,
      sourcesProcessed: 14,
      chunksIndexed: 24,
      gapsIdentified: 2,
      gapsResolved: 2,
      deduplicatedCount: 6
    }
  },
  {
    id: "session-langgraph-agent-architecture",
    topic: "LangGraph StateGraph Architecture: Cyclic Graph Execution, RAG Memory State & Persistence in Multi-Agent Systems",
    depth: 2,
    maxIterations: 2,
    mode: "langgraph_autonomous",
    status: "completed",
    currentStep: "completed",
    iteration: 2,
    subqueries: [
      "LangGraph StateGraph TypedDict conditional edges python code examples 2026",
      "LangGraph human in the loop checkpointing postgres memory saver persistence",
      "Multi agent research system langgraph pattern RAG memory indexing"
    ],
    sources: [
      {
        id: "src-lg-1",
        title: "LangChain Docs: LangGraph Conceptual Guide & Cyclic StateGraph Execution",
        url: "https://python.langchain.com/docs/langgraph/concepts/",
        snippet: "LangGraph enables building stateful, multi-actor applications with LLMs by modeling workflows as directed cyclic graphs where nodes are Python functions and edges define transition logic.",
        domain: "python.langchain.com",
        relevanceScore: 0.99,
        retrievedAt: "08:14:02"
      },
      {
        id: "src-lg-2",
        title: "ArXiv: Multi-Agent Collaboration with State Memory Graphs in Python",
        url: "https://arxiv.org/abs/2501.12903",
        snippet: "Cyclic state graphs overcome the limitations of linear DAG chains by allowing feedback loops where verification agents evaluate output and loop back to retrieval nodes until criteria are met.",
        domain: "arxiv.org",
        relevanceScore: 0.94,
        retrievedAt: "08:14:10"
      }
    ],
    ragMemoryChunks: [
      {
        id: "vec-lg-1",
        sourceId: "src-lg-1",
        sourceTitle: "LangChain Docs: LangGraph Conceptual Guide",
        sourceUrl: "https://python.langchain.com/docs/langgraph/concepts/",
        text: "In LangGraph, state is defined using standard Python TypedDict or Pydantic models. Node functions receive the current state dictionary and return updated state dictionary keys, which are merged into the global graph state.",
        vectorId: "0x77ef12",
        similarityScore: 0.97,
        category: "State Management"
      },
      {
        id: "vec-lg-2",
        sourceId: "src-lg-2",
        sourceTitle: "ArXiv: Multi-Agent Collaboration with State Memory Graphs",
        sourceUrl: "https://arxiv.org/abs/2501.12903",
        text: "Conditional edges (`graph.add_conditional_edges`) route execution dynamically based on state attributes. For instance, `should_continue` inspects `state['knowledge_gaps']` to decide whether to loop back to `search_node` or proceed to `synthesis_node`.",
        vectorId: "0x88cd34",
        similarityScore: 0.95,
        category: "Graph Control Flow"
      }
    ],
    knowledgeGaps: [
      {
        id: "gap-lg-1",
        description: "How MemorySaver checkpointer manages multi-turn thread persistence in production Postgres setups.",
        missingAspect: "Persistence Layer Integration",
        subqueryToResolve: "LangGraph PostgresSaver Checkpointer setup code production",
        isResolved: true,
        resolvedInIteration: 2
      }
    ],
    thoughts: [
      {
        id: "t-lg-1",
        agent: "Planner Agent",
        timestamp: "08:14:00",
        message: "Parsed query for LangGraph architectural design patterns.",
        type: "info"
      },
      {
        id: "t-lg-2",
        agent: "Search & Scraper Agent",
        timestamp: "08:14:05",
        message: "Retrieved official LangGraph documentation and research papers.",
        type: "search"
      },
      {
        id: "t-lg-3",
        agent: "Synthesis Agent",
        timestamp: "08:14:20",
        message: "Generated complete architectural analysis with code snippets.",
        type: "success"
      }
    ],
    reportMarkdown: `# LangGraph StateGraph Architecture: Cyclic Workflows & Multi-Agent Orchestration

## Executive Summary
**LangGraph** is the industry standard framework for building complex, stateful, multi-agent AI systems in Python. Unlike traditional linear Directed Acyclic Graphs (DAGs) like LangChain Expression Language (LCEL), LangGraph provides native support for **cyclic graphs**, **state persistence (checkpoints)**, and **human-in-the-loop interventions**.

---

## Key Core Abstractions

1. **State Definition (\`TypedDict\` / \`Pydantic\`):** Centralized state schema passed between all graph nodes.
2. **Nodes (Python Functions):** Individual agent units that consume \`State\` and return partial state updates.
3. **Edges & Conditional Routing:** Standard directed edges or function-driven conditional edges (\`add_conditional_edges\`) that inspect state to make routing decisions.
4. **Checkpointers (\`BaseCheckpointSaver\`):** Persists graph state at every step for fault tolerance, time travel, and multi-turn user interaction.

---

## Code Pattern: Autonomous Research Graph

\`\`\`python
from typing import TypedDict, List, Annotated
import operator
from langgraph.graph import StateGraph, END

# 1. Define Central State
class ResearchState(TypedDict):
    topic: str
    subqueries: List[str]
    retrieved_docs: Annotated[List[dict], operator.add]
    knowledge_gaps: List[str]
    iteration: int
    max_iterations: int
    final_report: str

# 2. Node Functions
def planner_node(state: ResearchState):
    # LLM breaks topic into subqueries
    return {"subqueries": ["query1", "query2"], "iteration": 0}

def search_node(state: ResearchState):
    # Web search & RAG indexing
    return {"retrieved_docs": [{"title": "Doc 1", "content": "..."}]}

def gap_analysis_node(state: ResearchState):
    # Determine if research has gaps
    gaps = ["missing quantitative benchmarks"] if state["iteration"] < 2 else []
    return {"knowledge_gaps": gaps, "iteration": state["iteration"] + 1}

# 3. Conditional Edge Routing Logic
def should_continue(state: ResearchState):
    if state["knowledge_gaps"] and state["iteration"] < state["max_iterations"]:
        return "search" # Loop back
    return "synthesis"

# 4. Construct Graph
workflow = StateGraph(ResearchState)
workflow.add_node("planner", planner_node)
workflow.add_node("search", search_node)
workflow.add_node("gap_analysis", gap_analysis_node)
workflow.add_node("synthesis", synthesis_node)

workflow.set_entry_point("planner")
workflow.add_edge("planner", "search")
workflow.add_edge("search", "gap_analysis")
workflow.add_conditional_edges("gap_analysis", should_continue, {
    "search": "search",
    "synthesis": "synthesis"
})
workflow.add_edge("synthesis", END)

app = workflow.compile()
\`\`\`

---

## Verified References
* [[1] LangChain Docs: LangGraph Conceptual Guide](https://python.langchain.com/docs/langgraph/concepts/)
* [[2] ArXiv: Multi-Agent Collaboration with State Memory Graphs](https://arxiv.org/abs/2501.12903)
`,
    nodeStates: [
      { id: "planner", name: "Planner Agent", agent: "Planner Agent", description: "Query Decomposition", status: "completed", executionTimeMs: 110, inputsCount: 1, outputsCount: 3 },
      { id: "search", name: "Search & Scraper", agent: "Search & Scraper Agent", description: "Google Search Grounding", status: "completed", executionTimeMs: 980, inputsCount: 3, outputsCount: 8 },
      { id: "rag_memory", name: "RAG Vector Store", agent: "RAG Memory Agent", description: "Vector Indexing", status: "completed", executionTimeMs: 450, inputsCount: 8, outputsCount: 12 },
      { id: "gap_analysis", name: "Gap Analyzer", agent: "Gap Analyzer Agent", description: "Conditional Edge Evaluation", status: "completed", executionTimeMs: 520, inputsCount: 12, outputsCount: 1 },
      { id: "synthesis", name: "Report Synthesizer", agent: "Synthesis Agent", description: "Markdown Report Generation", status: "completed", executionTimeMs: 1800, inputsCount: 12, outputsCount: 1 }
    ],
    startTime: "2026-07-23T08:14:00Z",
    endTime: "2026-07-23T08:14:25Z",
    stats: {
      totalSearchesPerformed: 4,
      sourcesProcessed: 8,
      chunksIndexed: 12,
      gapsIdentified: 1,
      gapsResolved: 1,
      deduplicatedCount: 3
    }
  }
];
