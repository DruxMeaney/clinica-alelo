"use client";
import { useEffect, useState } from "react";

// Gene names shown as nucleotide-like markers along the flow path
const GENE_MARKERS = [
  "Consulta",
  "PCSK9",
  "Muestra",
  "TCF7L2",
  "Secuencia",
  "MTHFR",
  "Análisis",
  "CYP2C19",
  "Reporte",
  "ACTN3",
];

export default function ProcesoGenomicViz() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setOffset((prev) => (prev + 0.6) % 60);
    }, 40);
    return () => clearInterval(id);
  }, []);

  const W = 680, H = 72;
  const stepW = W / (GENE_MARKERS.length - 1);
  const yMain = 36;

  // Undulating path through all nodes
  const pathD = GENE_MARKERS.map((_, i) => {
    const x = i * stepW;
    const y = yMain + (i % 2 === 0 ? -8 : 8);
    return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");

  return (
    <div className="w-full overflow-hidden" style={{ height: H }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="procGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"   stopColor="#8b2fa0" />
            <stop offset="50%"  stopColor="#e11d73" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>

        {/* Animated flow path */}
        <path
          d={pathD}
          fill="none"
          stroke="url(#procGrad)"
          strokeWidth="1.5"
          strokeDasharray="10 6"
          strokeDashoffset={-offset}
          opacity="0.5"
        />

        {/* Nodes */}
        {GENE_MARKERS.map((label, i) => {
          const x = i * stepW;
          const y = yMain + (i % 2 === 0 ? -8 : 8);
          const isGene = !["Consulta", "Muestra", "Secuencia", "Análisis", "Reporte"].includes(label);
          const color = isGene ? "#e11d73" : "#8b2fa0";

          return (
            <g key={i}>
              {/* Glow */}
              <circle cx={x} cy={y} r={isGene ? 7 : 9} fill={color} opacity="0.08" />
              {/* Dot */}
              <circle cx={x} cy={y} r={isGene ? 3 : 4.5} fill={color} opacity="0.85" />
              {/* Label */}
              <text
                x={x}
                y={i % 2 === 0 ? y - 13 : y + 16}
                textAnchor="middle"
                fontSize={isGene ? 7.5 : 8.5}
                fontWeight={isGene ? "400" : "600"}
                fill={color}
                opacity={isGene ? 0.65 : 0.9}
                fontStyle={isGene ? "italic" : "normal"}
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
