"use client";
import { useState } from "react";

interface GeneNode {
  id: string;
  gene: string;
  rsid: string;
  desc: string;
  cx: number;
  cy: number;
  cluster: 0 | 1 | 2;
  delay: string;
}

const NODES: GeneNode[] = [
  // Cluster 0 — Prevención personalizada (purple)
  { id: "pcsk9",   gene: "PCSK9",    rsid: "rs11591147", desc: "Regula el receptor LDL. Variante de pérdida de función confiere protección cardiovascular significativa.",             cx: 108, cy: 95,  cluster: 0, delay: "0s"    },
  { id: "apoe",    gene: "APOE",     rsid: "rs429358",   desc: "Metabolismo lipídico y riesgo cardiovascular. Alelo ε4 modifica riesgo de Alzheimer y dislipidemias.",              cx: 178, cy: 52,  cluster: 0, delay: "0.5s"  },
  { id: "tcf7l2",  gene: "TCF7L2",   rsid: "rs7903146",  desc: "Gen de susceptibilidad a DT2 más replicado globalmente. Señalización Wnt en célula β pancreática.",                cx: 155, cy: 148, cluster: 0, delay: "1s"    },
  // Cluster 1 — Contexto mexicano (fuchsia)
  { id: "slc16a11",gene: "SLC16A11", rsid: "rs13342232", desc: "Transportador de piruvato mitocondrial. Variante de riesgo para DT2 con alta prevalencia en México (SIGMA 2014).", cx: 345, cy: 62,  cluster: 1, delay: "0.3s"  },
  { id: "fto",     gene: "FTO",      rsid: "rs9939609",  desc: "Masa grasa y obesidad. El locus GWAS de obesidad más replicado a nivel global.",                                   cx: 400, cy: 138, cluster: 1, delay: "0.8s"  },
  { id: "hnf1a",   gene: "HNF1A",   rsid: "rs1800961",  desc: "Factor de transcripción hepático. Variante con efecto diferencial en metabolismo de carbohidratos.",               cx: 292, cy: 145, cluster: 1, delay: "1.3s"  },
  // Cluster 2 — Investigación y clínica (violet)
  { id: "mthfr",   gene: "MTHFR",    rsid: "rs1801133",  desc: "Metabolismo del folato. C677T reduce actividad enzimática ~70%. Relevante en embarazo e hiperhomocisteinemia.",     cx: 560, cy: 82,  cluster: 2, delay: "0.2s"  },
  { id: "cyp2c19", gene: "CYP2C19",  rsid: "rs4244285",  desc: "Metabolismo de clopidogrel y antidepresivos. Fenotipo Poor Metabolizer reduce respuesta antiplaquetaria.",          cx: 630, cy: 152, cluster: 2, delay: "0.7s"  },
  { id: "actn3",   gene: "ACTN3",    rsid: "rs1815739",  desc: "α-Actinina-3 en fibras musculares rápidas. Variante R577X determina perfil de potencia vs. resistencia.",           cx: 508, cy: 155, cluster: 2, delay: "1.2s"  },
];

const CLUSTER_COLORS: Record<0|1|2, string> = { 0: "#8b2fa0", 1: "#e11d73", 2: "#7c3aed" };
const CLUSTER_LABELS: Record<0|1|2, string> = {
  0: "Prevención personalizada",
  1: "Contexto mexicano",
  2: "Investigación y clínica",
};

const EDGES: [number, number][] = [
  [0,1],[1,2],[0,2],
  [3,4],[4,5],[3,5],
  [6,7],[7,8],[6,8],
];

export default function GeneClusterViz() {
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredNode = NODES.find((n) => n.id === hovered) ?? null;

  return (
    <div className="relative w-full select-none" style={{ height: 210 }}>
      <style>{`
        @keyframes gcFloat {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-7px); }
        }
        @keyframes gcDash {
          to { stroke-dashoffset: -24; }
        }
        .gc-node { animation: gcFloat 3.4s ease-in-out infinite; }
        .gc-edge { animation: gcDash 2.2s linear infinite; }
      `}</style>

      <svg viewBox="0 0 720 210" className="w-full h-full" style={{ overflow: "visible" }}>
        {/* Subtle background dots */}
        {Array.from({ length: 24 }).map((_, i) => (
          <circle
            key={i}
            cx={(i % 8) * 90 + 45}
            cy={Math.floor(i / 8) * 80 + 30}
            r={1.2}
            fill="#8b2fa015"
          />
        ))}

        {/* Cluster labels */}
        {([0, 1, 2] as const).map((ci) => {
          const xs: Record<0|1|2, number> = { 0: 148, 1: 346, 2: 566 };
          return (
            <text
              key={ci}
              x={xs[ci]}
              y={22}
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="600"
              fill={CLUSTER_COLORS[ci]}
              opacity="0.65"
              letterSpacing="0.8"
            >
              {CLUSTER_LABELS[ci].toUpperCase()}
            </text>
          );
        })}

        {/* Separator lines between clusters */}
        {[240, 468].map((x) => (
          <line key={x} x1={x} y1={30} x2={x} y2={190} stroke="#8b2fa010" strokeWidth="1" strokeDasharray="3 6" />
        ))}

        {/* Edges */}
        {EDGES.map(([a, b], i) => {
          const na = NODES[a], nb = NODES[b];
          const highlight = hovered === na.id || hovered === nb.id;
          return (
            <line
              key={i}
              x1={na.cx} y1={na.cy}
              x2={nb.cx} y2={nb.cy}
              stroke={CLUSTER_COLORS[na.cluster]}
              strokeWidth={highlight ? 1.5 : 0.8}
              strokeDasharray="5 5"
              opacity={highlight ? 0.55 : 0.18}
              className="gc-edge"
            />
          );
        })}

        {/* Nodes */}
        {NODES.map((n) => {
          const isHov = hovered === n.id;
          const color = CLUSTER_COLORS[n.cluster];
          return (
            <g
              key={n.id}
              className="gc-node"
              style={{
                animationDelay: n.delay,
                cursor: "pointer",
                transformOrigin: `${n.cx}px ${n.cy}px`,
              }}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Outer glow */}
              <circle
                cx={n.cx} cy={n.cy}
                r={isHov ? 20 : 14}
                fill={color + (isHov ? "1a" : "0d")}
                stroke={color}
                strokeWidth={isHov ? 1.5 : 0.6}
                style={{ transition: "all 0.2s ease" }}
              />
              {/* Core */}
              <circle
                cx={n.cx} cy={n.cy}
                r={isHov ? 7 : 5}
                fill={color}
                opacity={isHov ? 1 : 0.85}
                style={{ transition: "all 0.2s ease" }}
              />
              {/* Gene name */}
              <text
                x={n.cx} y={n.cy + 26}
                textAnchor="middle"
                fontSize={isHov ? 10.5 : 9}
                fontWeight={isHov ? "700" : "500"}
                fill={color}
                style={{ transition: "font-size 0.15s ease" }}
              >
                {n.gene}
              </text>
              {/* rsid */}
              <text
                x={n.cx} y={n.cy + 36}
                textAnchor="middle"
                fontSize="7"
                fill={color}
                opacity="0.55"
              >
                {n.rsid}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredNode && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            left: `${(hoveredNode.cx / 720) * 100}%`,
            bottom: hoveredNode.cy > 110 ? "auto" : 0,
            top: hoveredNode.cy > 110 ? 0 : "auto",
            transform: "translateX(-50%)",
            maxWidth: 230,
          }}
        >
          <div
            className="rounded-xl px-3 py-2.5 shadow-2xl text-xs"
            style={{ background: "#0a0818", border: `1px solid ${CLUSTER_COLORS[hoveredNode.cluster]}40` }}
          >
            <div className="font-bold mb-0.5" style={{ color: CLUSTER_COLORS[hoveredNode.cluster] }}>
              {hoveredNode.gene}
            </div>
            <div className="text-gray-500 mb-1 font-mono">{hoveredNode.rsid}</div>
            <div className="text-gray-300 leading-relaxed">{hoveredNode.desc}</div>
          </div>
        </div>
      )}
    </div>
  );
}
