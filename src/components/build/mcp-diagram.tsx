"use client";

import { useCallback, useState } from "react";
import {
  ReactFlow,
  type Node,
  type Edge,
  type NodeProps,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/base.css";

const NODE_DESCRIPTIONS: Record<string, string> = {
  openwebui: "Chat interface for non-technical users to interact with Claude",
  electron: "Desktop app with custom workflows and document processing",
  litellm: "API gateway running on ECS, routing requests across LLM providers",
  claude: "Anthropic Claude via AWS Bedrock for enterprise-grade AI",
  jira: "MCP server for project tracking and ticket management",
  confluence: "MCP server for knowledge base and documentation access",
  gitlab: "MCP server for code repository and CI/CD integration",
  sonarqube: "MCP server for code quality and security analysis",
  sonatype: "MCP server for dependency vulnerability scanning",
  slack: "MCP server for team notifications and workflow triggers",
};

function DiagramNode({ data }: NodeProps) {
  const [hovered, setHovered] = useState(false);
  const nodeData = data as { label: string; nodeId: string; variant: string };
  const isMcp = nodeData.variant === "mcp";
  const isGateway = nodeData.variant === "gateway";

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`
          rounded-lg border px-3 py-2 font-mono text-xs transition-all duration-200
          ${isGateway
            ? "border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 text-[var(--color-accent)] shadow-[0_0_12px_rgba(245,158,11,0.15)]"
            : isMcp
              ? "border-white/[0.12] bg-white/[0.04] text-[var(--color-muted)] hover:border-white/[0.2] hover:bg-white/[0.06]"
              : "border-white/[0.12] bg-white/[0.06] text-[var(--color-foreground)] hover:border-white/[0.2]"
          }
        `}
      >
        {nodeData.label}
      </div>

      {hovered && NODE_DESCRIPTIONS[nodeData.nodeId] && (
        <div className="absolute -top-10 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#1a1a1a] px-3 py-1.5 text-xs text-[var(--color-foreground)] shadow-lg ring-1 ring-white/[0.12]">
          {NODE_DESCRIPTIONS[nodeData.nodeId]}
          <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#1a1a1a] ring-1 ring-white/[0.12]" />
        </div>
      )}

      <Handle
        type="target"
        position={Position.Left}
        className="!h-1.5 !w-1.5 !border-0 !bg-white/20"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!h-1.5 !w-1.5 !border-0 !bg-white/20"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="!h-1.5 !w-1.5 !border-0 !bg-white/20"
      />
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className="!h-1.5 !w-1.5 !border-0 !bg-white/20"
      />
    </div>
  );
}

const nodeTypes = { diagram: DiagramNode };

const NODES: Node[] = [
  {
    id: "openwebui",
    type: "diagram",
    position: { x: 0, y: 40 },
    data: { label: "Open WebUI", nodeId: "openwebui", variant: "client" },
  },
  {
    id: "electron",
    type: "diagram",
    position: { x: 0, y: 120 },
    data: { label: "Electron App", nodeId: "electron", variant: "client" },
  },
  {
    id: "litellm",
    type: "diagram",
    position: { x: 220, y: 80 },
    data: { label: "LiteLLM (ECS)", nodeId: "litellm", variant: "gateway" },
  },
  {
    id: "claude",
    type: "diagram",
    position: { x: 440, y: 80 },
    data: { label: "Claude / Bedrock", nodeId: "claude", variant: "client" },
  },
  {
    id: "jira",
    type: "diagram",
    position: { x: 100, y: 220 },
    data: { label: "Jira", nodeId: "jira", variant: "mcp" },
  },
  {
    id: "confluence",
    type: "diagram",
    position: { x: 200, y: 220 },
    data: { label: "Confluence", nodeId: "confluence", variant: "mcp" },
  },
  {
    id: "gitlab",
    type: "diagram",
    position: { x: 300, y: 220 },
    data: { label: "GitLab", nodeId: "gitlab", variant: "mcp" },
  },
  {
    id: "sonarqube",
    type: "diagram",
    position: { x: 100, y: 280 },
    data: { label: "SonarQube", nodeId: "sonarqube", variant: "mcp" },
  },
  {
    id: "sonatype",
    type: "diagram",
    position: { x: 210, y: 280 },
    data: { label: "Sonatype", nodeId: "sonatype", variant: "mcp" },
  },
  {
    id: "slack",
    type: "diagram",
    position: { x: 320, y: 280 },
    data: { label: "Slack", nodeId: "slack", variant: "mcp" },
  },
];

const EDGES: Edge[] = [
  {
    id: "e-webui-litellm",
    source: "openwebui",
    target: "litellm",
    animated: true,
    style: { stroke: "rgba(245, 158, 11, 0.3)", strokeWidth: 1.5 },
  },
  {
    id: "e-electron-litellm",
    source: "electron",
    target: "litellm",
    animated: true,
    style: { stroke: "rgba(245, 158, 11, 0.3)", strokeWidth: 1.5 },
  },
  {
    id: "e-litellm-claude",
    source: "litellm",
    target: "claude",
    animated: true,
    style: { stroke: "rgba(245, 158, 11, 0.5)", strokeWidth: 2 },
  },
  {
    id: "e-litellm-jira",
    source: "litellm",
    sourceHandle: "bottom",
    target: "jira",
    targetHandle: "top",
    animated: true,
    style: { stroke: "rgba(255, 255, 255, 0.12)", strokeWidth: 1 },
  },
  {
    id: "e-litellm-confluence",
    source: "litellm",
    sourceHandle: "bottom",
    target: "confluence",
    targetHandle: "top",
    animated: true,
    style: { stroke: "rgba(255, 255, 255, 0.12)", strokeWidth: 1 },
  },
  {
    id: "e-litellm-gitlab",
    source: "litellm",
    sourceHandle: "bottom",
    target: "gitlab",
    targetHandle: "top",
    animated: true,
    style: { stroke: "rgba(255, 255, 255, 0.12)", strokeWidth: 1 },
  },
  {
    id: "e-litellm-sonarqube",
    source: "litellm",
    sourceHandle: "bottom",
    target: "sonarqube",
    targetHandle: "top",
    animated: true,
    style: { stroke: "rgba(255, 255, 255, 0.12)", strokeWidth: 1 },
  },
  {
    id: "e-litellm-sonatype",
    source: "litellm",
    sourceHandle: "bottom",
    target: "sonatype",
    targetHandle: "top",
    animated: true,
    style: { stroke: "rgba(255, 255, 255, 0.12)", strokeWidth: 1 },
  },
  {
    id: "e-litellm-slack",
    source: "litellm",
    sourceHandle: "bottom",
    target: "slack",
    targetHandle: "top",
    animated: true,
    style: { stroke: "rgba(255, 255, 255, 0.12)", strokeWidth: 1 },
  },
];

export function MCPDiagram() {
  const onInit = useCallback((instance: { fitView: () => void }) => {
    instance.fitView();
  }, []);

  return (
    <div className="h-[380px] w-full" style={{ background: "transparent" }}>
      <ReactFlow
        nodes={NODES}
        edges={EDGES}
        nodeTypes={nodeTypes}
        onInit={onInit}
        fitView
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
        style={{ background: "transparent" }}
      />
    </div>
  );
}
