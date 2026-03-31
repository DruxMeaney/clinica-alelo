"use client";

/**
 * Red de convergencia genética — 7 clusters funcionales del panel Alelo.
 * Basado en análisis de enriquecimiento funcional (STRING, KEGG, Reactome, GO).
 *
 * Fuentes:
 * - STRING-db.org: interacciones proteína-proteína
 * - KEGG hsa00982/hsa04614/hsa04930: rutas metabólicas
 * - Reactome R-HSA-4420097: señalización VEGFA-VEGFR2
 * - GO:0006805, GO:0008217, GO:0006629: procesos biológicos
 */

import { useState } from "react";

interface GeneNode {
  id: string;
  x: number;
  y: number;
  cluster: number;
  hub: boolean;
  modules: number[];
}

interface GeneEdge {
  from: string;
  to: string;
}

const CLUSTERS = [
  { id: 0, name: "Metabolismo lipídico", color: "#a855f7" },
  { id: 1, name: "Eje diabético", color: "#ec4899" },
  { id: 2, name: "Farmacogenética", color: "#06b6d4" },
  { id: 3, name: "Sistema RAS", color: "#f59e0b" },
  { id: 4, name: "Biología vascular", color: "#ef4444" },
  { id: 5, name: "Rendimiento muscular", color: "#10b981" },
  { id: 6, name: "Ritmo circadiano", color: "#8b5cf6" },
];

// Posiciones calculadas para layout circular por cluster
const NODES: GeneNode[] = [
  // Cluster 0: Lipid metabolism (center-left)
  { id: "APOE", x: 180, y: 200, cluster: 0, hub: true, modules: [4] },
  { id: "LDLR", x: 140, y: 160, cluster: 0, hub: false, modules: [4] },
  { id: "PCSK9", x: 140, y: 240, cluster: 0, hub: false, modules: [4] },
  { id: "CETP", x: 220, y: 155, cluster: 0, hub: false, modules: [4] },
  { id: "LPA", x: 220, y: 245, cluster: 0, hub: false, modules: [4] },
  { id: "FABP2", x: 110, y: 200, cluster: 0, hub: false, modules: [5] },
  // Cluster 1: Diabetes axis (top-center)
  { id: "TCF7L2", x: 400, y: 100, cluster: 1, hub: true, modules: [2] },
  { id: "SLC16A11", x: 350, y: 60, cluster: 1, hub: false, modules: [2] },
  { id: "PPARG", x: 340, y: 130, cluster: 1, hub: true, modules: [1] },
  { id: "FTO", x: 450, y: 60, cluster: 1, hub: true, modules: [1] },
  { id: "IGF2BP2", x: 460, y: 120, cluster: 1, hub: false, modules: [2] },
  { id: "SLC30A8", x: 380, y: 150, cluster: 1, hub: false, modules: [5] },
  { id: "GCKR", x: 430, y: 150, cluster: 1, hub: false, modules: [5] },
  // Cluster 2: Pharmacogenetics (right)
  { id: "CYP2C19", x: 680, y: 180, cluster: 2, hub: false, modules: [6] },
  { id: "CYP2D6", x: 720, y: 220, cluster: 2, hub: false, modules: [6] },
  { id: "CYP3A4", x: 680, y: 260, cluster: 2, hub: true, modules: [6] },
  { id: "CYP1A2", x: 720, y: 140, cluster: 2, hub: false, modules: [6] },
  { id: "ABCB1", x: 750, y: 180, cluster: 2, hub: false, modules: [6] },
  { id: "VKORC1", x: 650, y: 220, cluster: 2, hub: false, modules: [6] },
  // Cluster 3: RAS system (bottom-left)
  { id: "ACE", x: 200, y: 380, cluster: 3, hub: true, modules: [3, 4] },
  { id: "AGT", x: 150, y: 350, cluster: 3, hub: false, modules: [4] },
  { id: "AGTR1", x: 160, y: 420, cluster: 3, hub: false, modules: [4] },
  { id: "ADD1", x: 240, y: 420, cluster: 3, hub: false, modules: [4] },
  { id: "CYP11B2", x: 250, y: 350, cluster: 3, hub: false, modules: [4] },
  // Cluster 4: Vascular biology (center)
  { id: "VEGFA", x: 420, y: 280, cluster: 4, hub: true, modules: [3, 4] },
  { id: "NOS3", x: 360, y: 310, cluster: 4, hub: true, modules: [3, 4] },
  { id: "IL6", x: 470, y: 320, cluster: 4, hub: true, modules: [4] },
  { id: "TNF", x: 420, y: 350, cluster: 4, hub: true, modules: [4] },
  // Cluster 5: Exercise/muscle (bottom-center)
  { id: "ACTN3", x: 500, y: 430, cluster: 5, hub: false, modules: [3] },
  { id: "PPARGC1A", x: 440, y: 440, cluster: 5, hub: true, modules: [3] },
  { id: "MSTN", x: 560, y: 440, cluster: 5, hub: false, modules: [3] },
  { id: "UCP3", x: 480, y: 470, cluster: 5, hub: false, modules: [3] },
  { id: "ADRB2", x: 530, y: 470, cluster: 5, hub: false, modules: [3] },
  // Cluster 6: Circadian/neuro (top-right)
  { id: "CLOCK", x: 600, y: 70, cluster: 6, hub: false, modules: [7] },
  { id: "PER2", x: 560, y: 50, cluster: 6, hub: false, modules: [7] },
  { id: "DRD2", x: 640, y: 100, cluster: 6, hub: false, modules: [7] },
  { id: "MTHFR", x: 300, y: 260, cluster: 0, hub: true, modules: [4, 5] },
];

const EDGES: GeneEdge[] = [
  // Lipid cluster internal
  { from: "APOE", to: "LDLR" }, { from: "APOE", to: "PCSK9" }, { from: "APOE", to: "CETP" },
  { from: "APOE", to: "LPA" }, { from: "LDLR", to: "PCSK9" }, { from: "APOE", to: "FABP2" },
  // Diabetes cluster
  { from: "TCF7L2", to: "SLC16A11" }, { from: "TCF7L2", to: "PPARG" }, { from: "FTO", to: "PPARG" },
  { from: "IGF2BP2", to: "TCF7L2" }, { from: "SLC30A8", to: "GCKR" },
  // Pharma cluster
  { from: "CYP2C19", to: "CYP2D6" }, { from: "CYP2C19", to: "CYP3A4" }, { from: "CYP3A4", to: "CYP2D6" },
  { from: "CYP1A2", to: "CYP2C19" }, { from: "ABCB1", to: "CYP3A4" }, { from: "VKORC1", to: "CYP2C19" },
  // RAS cluster
  { from: "ACE", to: "AGT" }, { from: "ACE", to: "AGTR1" }, { from: "AGT", to: "AGTR1" },
  { from: "ADD1", to: "ACE" }, { from: "CYP11B2", to: "AGT" },
  // Vascular
  { from: "VEGFA", to: "NOS3" }, { from: "IL6", to: "TNF" }, { from: "VEGFA", to: "IL6" },
  { from: "TNF", to: "NOS3" },
  // Exercise
  { from: "ACTN3", to: "PPARGC1A" }, { from: "MSTN", to: "ACTN3" }, { from: "UCP3", to: "PPARGC1A" },
  { from: "ADRB2", to: "PPARGC1A" },
  // Circadian
  { from: "CLOCK", to: "PER2" }, { from: "DRD2", to: "CLOCK" },
  // Cross-cluster bridges
  { from: "PPARG", to: "PPARGC1A" }, { from: "NOS3", to: "ACE" }, { from: "VEGFA", to: "ACE" },
  { from: "APOE", to: "IL6" }, { from: "MTHFR", to: "NOS3" }, { from: "MTHFR", to: "APOE" },
  { from: "TNF", to: "PPARG" }, { from: "IL6", to: "ACE" },
];

export default function GeneNetwork({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const nodeMap = new Map(NODES.map(n => [n.id, n]));

  const isConnected = (geneId: string) => {
    if (!hovered) return true;
    if (geneId === hovered) return true;
    return EDGES.some(e =>
      (e.from === hovered && e.to === geneId) || (e.to === hovered && e.from === geneId)
    );
  };

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 800 520" className="w-full h-auto">
        {/* Edges */}
        {EDGES.map((e, i) => {
          const from = nodeMap.get(e.from);
          const to = nodeMap.get(e.to);
          if (!from || !to) return null;
          const active = !hovered || isConnected(e.from) && isConnected(e.to);
          return (
            <line key={i}
              x1={from.x} y1={from.y} x2={to.x} y2={to.y}
              stroke={active ? "rgba(168,85,247,0.3)" : "rgba(168,85,247,0.05)"}
              strokeWidth={active ? 1 : 0.5}
              className="transition-all duration-300"
            />
          );
        })}

        {/* Nodes */}
        {NODES.map(node => {
          const cluster = CLUSTERS[node.cluster];
          const active = isConnected(node.id);
          const r = node.hub ? 18 : 12;
          return (
            <g key={node.id}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
              style={{ opacity: active ? 1 : 0.15, transition: "opacity 0.3s" }}
            >
              {/* Glow for hubs */}
              {node.hub && (
                <circle cx={node.x} cy={node.y} r={r + 6}
                  fill={cluster.color} opacity={0.1} />
              )}
              <circle cx={node.x} cy={node.y} r={r}
                fill={hovered === node.id ? cluster.color : "rgba(10,10,18,0.9)"}
                stroke={cluster.color}
                strokeWidth={node.hub ? 2 : 1}
              />
              <text x={node.x} y={node.y + 3}
                textAnchor="middle" fill="white"
                fontSize={node.hub ? 7 : 6} fontWeight={node.hub ? "bold" : "normal"}
                fontFamily="monospace"
              >
                {node.id}
              </text>
              {/* Module badges */}
              {node.modules.length > 1 && (
                <circle cx={node.x + r - 2} cy={node.y - r + 2} r={4}
                  fill="#f59e0b" stroke="#0a0a12" strokeWidth={1} />
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4 justify-center">
        {CLUSTERS.map(c => (
          <div key={c.id} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
            <span className="text-[10px] text-gray-400">{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
