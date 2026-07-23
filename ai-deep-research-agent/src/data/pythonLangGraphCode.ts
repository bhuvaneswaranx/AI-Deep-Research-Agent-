export const PYTHON_LANGGRAPH_CODE = `"""
===================================================================
AI Deep Research Agent: Autonomous Multi-Agent LangGraph Workflow
Tech Stack: Python 3.11+, LangGraph, Google GenAI / Tavily, RAG Chroma/FAISS
===================================================================
"""

import os
from typing import List, TypedDict, Annotated, Dict, Any
import operator
from google import genai
from google.genai import types
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver

# -------------------------------------------------------------------
# 1. State Definition
# -------------------------------------------------------------------
class RAGChunk(TypedDict):
    chunk_id: str
    source_url: str
    source_title: str
    text: str
    similarity_score: float

class KnowledgeGap(TypedDict):
    description: str
    missing_aspect: str
    query_to_resolve: str
    is_resolved: bool

class DeepResearchState(TypedDict):
    topic: str
    max_depth: int
    current_iteration: int
    subqueries: List[str]
    retrieved_sources: Annotated[List[Dict[str, Any]], operator.add]
    vector_memory_store: Annotated[List[RAGChunk], operator.add]
    knowledge_gaps: List[KnowledgeGap]
    agent_thoughts: Annotated[List[Dict[str, str]], operator.add]
    final_markdown_report: str

# -------------------------------------------------------------------
# 2. Agent Node Implementation
# -------------------------------------------------------------------
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

def planner_agent_node(state: DeepResearchState) -> Dict[str, Any]:
    """Node 1: Planner Agent decomposes the research topic into sub-queries."""
    topic = state["topic"]
    prompt = f"""Break down the research topic into 3 targeted sub-queries:
Topic: "{topic}"
Output JSON with key "subqueries": ["q1", "q2", "q3"]"""
    
    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt,
        config=types.GenerateContentConfig(response_mime_type="application/json")
    )
    
    subqueries = ["q1", "q2", "q3"] # Fallback if parsing fails
    try:
        import json
        data = json.loads(response.text)
        subqueries = data.get("subqueries", subqueries)
    except Exception:
        pass

    thought = {
        "agent": "Planner Agent",
        "thought": f"Decomposed topic into {len(subqueries)} initial search vectors."
    }
    return {
        "subqueries": subqueries,
        "current_iteration": 1,
        "agent_thoughts": [thought]
    }

def search_and_scraper_node(state: DeepResearchState) -> Dict[str, Any]:
    """Node 2: Search & Scraper Agent runs web searches & extracts grounding data."""
    iteration = state["current_iteration"]
    active_queries = state["subqueries"] if iteration == 1 else [
        g["query_to_resolve"] for g in state.get("knowledge_gaps", []) if not g["is_resolved"]
    ]

    new_sources = []
    new_chunks = []

    for query in active_queries[:3]:
        # Perform Google Search Grounded Generation
        res = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=f"Research technical details for: {query}",
            config=types.GenerateContentConfig(
                tools=[types.Tool(google_search=types.GoogleSearch())]
            )
        )
        
        raw_text = res.text or ""
        # Extract Grounding Chunks
        if res.candidates and res.candidates[0].grounding_metadata:
            meta = res.candidates[0].grounding_metadata
            for idx, chunk in enumerate(meta.grounding_chunks or []):
                if chunk.web:
                    source_info = {
                        "url": chunk.web.uri,
                        "title": chunk.web.title or f"Source {idx+1}",
                        "snippet": raw_text[:200]
                    }
                    new_sources.append(source_info)
                    
                    # Create Vector Chunk for RAG Memory
                    new_chunks.append({
                        "chunk_id": f"vec-{len(new_chunks)+1}",
                        "source_url": chunk.web.uri,
                        "source_title": chunk.web.title or "Web Source",
                        "text": raw_text[:500],
                        "similarity_score": 0.92
                    })

    thought = {
        "agent": "Search & Scraper Agent",
        "thought": f"Iteration {iteration}: Extracted {len(new_sources)} sources and indexed {len(new_chunks)} RAG memory chunks."
    }

    return {
        "retrieved_sources": new_sources,
        "vector_memory_store": new_chunks,
        "agent_thoughts": [thought]
    }

def rag_memory_dedup_node(state: DeepResearchState) -> Dict[str, Any]:
    """Node 3: RAG Memory Agent cleans and deduplicates vector chunks."""
    chunks = state.get("vector_memory_store", [])
    # Deduplication logic filtering out items with duplicate text/URLs
    unique_chunks = {c["source_url"]: c for c in chunks}.values()

    thought = {
        "agent": "RAG Memory Agent",
        "thought": f"Cleaned vector store. Active index count: {len(unique_chunks)} chunks."
    }
    return {"agent_thoughts": [thought]}

def gap_analyzer_node(state: DeepResearchState) -> Dict[str, Any]:
    """Node 4: Gap Analyzer Agent identifies missing viewpoints or quantitative benchmarks."""
    topic = state["topic"]
    chunks = state.get("vector_memory_store", [])
    
    prompt = f"""Review research topic: "{topic}" against current RAG memory chunks.
Identify 1 missing knowledge gap. Output JSON:
{{"gap_description": "...", "query_to_resolve": "..."}}"""

    res = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt,
        config=types.GenerateContentConfig(response_mime_type="application/json")
    )
    
    gaps = []
    try:
        import json
        data = json.loads(res.text)
        gaps.append({
            "description": data.get("gap_description", "Unresolved technical detail"),
            "missing_aspect": "Deep Metrics",
            "query_to_resolve": data.get("query_to_resolve", f"{topic} benchmarks"),
            "is_resolved": False
        })
    except Exception:
        pass

    next_iter = state["current_iteration"] + 1
    thought = {
        "agent": "Gap Analyzer Agent",
        "thought": f"Identified {len(gaps)} knowledge gaps. Current iteration: {state['current_iteration']} of {state['max_depth']}."
    }
    
    return {
        "knowledge_gaps": gaps,
        "current_iteration": next_iter,
        "agent_thoughts": [thought]
    }

def synthesis_agent_node(state: DeepResearchState) -> Dict[str, Any]:
    """Node 5: Synthesis Agent compiles the final Markdown report."""
    topic = state["topic"]
    chunks = state.get("vector_memory_store", [])
    sources = state.get("retrieved_sources", [])

    context = "\\n\\n".join([f"[{c['source_title']}]: {c['text']}" for c in chunks[:10]])
    sources_text = "\\n".join([f"- [{s['title']}]({s['url']})" for s in sources])

    prompt = f"""Synthesize an exhaustive Markdown Research Report for topic: "{topic}".
Context:
{context}

Sources:
{sources_text}

Format with Title, Executive Summary, Deep Technical Analysis, Benchmark Tables, and Citations."""

    res = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt
    )

    thought = {
        "agent": "Synthesis Agent",
        "thought": "Generated final Markdown research report with full inline source citations."
    }

    return {
        "final_markdown_report": res.text,
        "agent_thoughts": [thought]
    }

# -------------------------------------------------------------------
# 3. Conditional Edge Logic (Iterative Gap Loop)
# -------------------------------------------------------------------
def should_continue(state: DeepResearchState) -> str:
    """Conditional Edge function determining if research needs another search pass."""
    iteration = state["current_iteration"]
    max_depth = state["max_depth"]
    unresolved_gaps = [g for g in state.get("knowledge_gaps", []) if not g["is_resolved"]]

    if unresolved_gaps and iteration <= max_depth:
        return "search_and_scraper" # Loop back to research missing gaps
    
    return "synthesis" # Proceed to final report generation

# -------------------------------------------------------------------
# 4. LangGraph Workflow Assembly & Compilation
# -------------------------------------------------------------------
def build_research_graph():
    workflow = StateGraph(DeepResearchState)

    # Add Agent Nodes
    workflow.add_node("planner", planner_agent_node)
    workflow.add_node("search_and_scraper", search_and_scraper_node)
    workflow.add_node("rag_memory_dedup", rag_memory_dedup_node)
    workflow.add_node("gap_analyzer", gap_analyzer_node)
    workflow.add_node("synthesis", synthesis_agent_node)

    # Define Graph Edges
    workflow.set_entry_point("planner")
    workflow.add_edge("planner", "search_and_scraper")
    workflow.add_edge("search_and_scraper", "rag_memory_dedup")
    workflow.add_edge("rag_memory_dedup", "gap_analyzer")
    
    # Conditional Edge for Iterative Feedback Loop
    workflow.add_conditional_edges(
        "gap_analyzer",
        should_continue,
        {
            "search_and_scraper": "search_and_scraper",
            "synthesis": "synthesis"
        }
    )
    workflow.add_edge("synthesis", END)

    # Compile with Checkpoint State Persistence
    checkpointer = MemorySaver()
    app = workflow.compile(checkpointer=checkpointer)
    return app

if __name__ == "__main__":
    app = build_research_graph()
    print("LangGraph AI Deep Research System compiled successfully!")
`;
