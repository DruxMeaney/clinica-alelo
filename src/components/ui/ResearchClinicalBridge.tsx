"use client";
import { useState } from "react";

// Left side: research / bioinformatics world
const LEFT_NODES = [
  { label: "GWAS",              y: 50,  desc: "Genome-Wide Association Studies — millones de variantes en grandes cohortes" },
  { label: "Bioinformática",    y: 105, desc: "Análisis computacional: anotación, filtrado e interpretación de variantes" },
  { label: "Bases de datos",    y: 160, desc: "gnomAD · GWAS Catalog · ClinVar · SNPnexus · Reactome" },
  { label: "Genómica pobl.",    y: 215, desc: "Frecuencias alélicas en población mexicana — datos SIGMA, 1000G, HapMap" },
  { label: "Farmacogenómica",   y: 270, desc: "CPIC y PharmGKB — guías de implementación clínica basadas en evidencia" },
];

// Right side: clinical / patient world
const RIGHT_NODES = [
  { label: "Consulta médica",   y: 50,  desc: "Evaluación clínica integral con contexto genómico" },
  { label: "Reporte genómico",  y: 105, desc: "Resultados interpretados, accesibles y accionables" },
  { label: "Plan preventivo",   y: 160, desc: "Estrategias de salud basadas en perfil genético individual" },
  { label: "Seguimiento",       y: 215, desc: "Monitoreo clínico periódico y ajuste dinámico del plan" },
  { label: "Investigación Mx",  y: 270, desc: "Contribución activa al acervo científico de genómica mexicana" },
];

// Bezier curve paths connecting left→right through the center bridge
const PARTICLE_PATHS = [
  "M 130 50  C 260 50,  380 160, 510 50",
  "M 130 105 C 270 80,  380 160, 510 105",
  "M 130 160 C 270 160, 380 160, 510 160",
  "M 130 215 C 270 240, 380 160, 510 215",
  "M 130 270 C 260 270, 380 160, 510 270",
];

// Each particle: which path, initial delay
const PARTICLES = [
  ...PARTICLE_PATHS.map((p, i) => ({ path: p, delay: `${i * 0.5}s`,      dur: "3.2s" })),
  ...PARTICLE_PATHS.map((p, i) => ({ path: p, delay: `${i * 0.5 + 1.6}s`, dur: "3.2s" })),
  ...PARTICLE_PATHS.map((p, i) => ({ path: p, delay: `${i * 0.5 + 0.8}s`, dur: "4s"   })),
];

export default function ResearchClinicalBridge() {
  const [hoveredLeft,  setHoveredLeft]  = useState<number | null>(null);
  const [hoveredRight, setHoveredRight] = useState<number | null>(null);
  const activeTooltip =
    hoveredLeft  !== null ? { node: LEFT_NODES[hoveredLeft],   side: "left"  as const } :
    hoveredRight !== null ? { node: RIGHT_NODES[hoveredRight], side: "right" as const } :
    null;

  return (
    <div className="relative w-full select-none" style={{ height: 330 }}>
      <style>{`
        @keyframes bridgeFlow {
          0%   { offset-distance: 0%;   opacity: 0; }
          8%   { opacity: 1; }
          88%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        .bridge-particle {
          offset-rotate: 0deg;
          animation: bridgeFlow var(--dur) ease-in-out var(--delay) infinite;
        }
        @keyframes bridgePulse {
          0%, 100% { r: 18; opacity: 0.15; }
          50%       { r: 26; opacity: 0.25; }
        }
        @keyframes nodeFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-4px); }
        }
        .bridge-node { animation: nodeFloat 3s ease-in-out infinite; }
      `}</style>

      <svg viewBox="0 0 640 330" className="w-full h-full" style={{ overflow: "visible" }}>
        <defs>
          {PARTICLE_PATHS.map((d, i) => (
            <path key={i} id={`bp${i}`} d={d} />
          ))}
          <linearGradient id="bridgeGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"   stopColor="#8b2fa0" />
            <stop offset="50%"  stopColor="#c026d3" />
            <stop offset="100%" stopColor="#e11d73" />
          </linearGradient>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#8b2fa0" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8b2fa0" stopOpacity="0"   />
          </radialGradient>
        </defs>

        {/* Background faint grid */}
        {Array.from({ length: 18 }).map((_, i) => (
          <circle key={i}
            cx={(i % 6) * 115 + 50} cy={Math.floor(i / 6) * 100 + 55}
            r="1.5" fill="#8b2fa018" />
        ))}

        {/* Section labels */}
        <text x="75"  y="20" textAnchor="middle" fontSize="9"  fontWeight="700" fill="#8b2fa0" opacity="0.6" letterSpacing="1.5">
          INVESTIGACIÓN
        </text>
        <text x="320" y="20" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#c026d3" opacity="0.7" letterSpacing="1.5">
          CLÍNICA ALELO
        </text>
        <text x="565" y="20" textAnchor="middle" fontSize="9"  fontWeight="700" fill="#e11d73" opacity="0.6" letterSpacing="1.5">
          PRÁCTICA CLÍNICA
        </text>

        {/* Center bridge glow */}
        <circle cx="320" cy="160" r="52" fill="url(#centerGlow)" />
        <circle cx="320" cy="160" r="18" fill="#8b2fa0" opacity="0.15">
          <animate attributeName="r"       values="18;26;18" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.15;0.25;0.15" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="320" cy="160" r="8" fill="#8b2fa0" opacity="0.7" />
        <text x="320" y="195" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#c026d3" opacity="0.8" letterSpacing="1">
          ALELO
        </text>

        {/* Bezier background paths (faint) */}
        {PARTICLE_PATHS.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="url(#bridgeGrad)" strokeWidth="0.7" opacity="0.12" />
        ))}

        {/* Animated particles */}
        {PARTICLES.map((p, i) => {
          const pathIdx = i % PARTICLE_PATHS.length;
          return (
            <circle
              key={i}
              r="3"
              fill="url(#bridgeGrad)"
              className="bridge-particle"
              style={{
                ["--dur" as string]: p.dur,
                ["--delay" as string]: p.delay,
                offsetPath: `path("${PARTICLE_PATHS[pathIdx]}")`,
              }}
            />
          );
        })}

        {/* LEFT nodes */}
        {LEFT_NODES.map((n, i) => {
          const isHov = hoveredLeft === i;
          return (
            <g
              key={i}
              className="bridge-node"
              style={{ animationDelay: `${i * 0.4}s`, cursor: "pointer", transformOrigin: `75px ${n.y}px` }}
              onMouseEnter={() => setHoveredLeft(i)}
              onMouseLeave={() => setHoveredLeft(null)}
            >
              <circle cx="75" cy={n.y} r={isHov ? 18 : 13} fill="#8b2fa0" opacity={isHov ? 0.18 : 0.1} style={{ transition: "all 0.2s" }} />
              <circle cx="75" cy={n.y} r={isHov ? 6 : 4.5} fill="#8b2fa0" opacity={isHov ? 1 : 0.75} style={{ transition: "all 0.2s" }} />
              <text x="75" y={n.y + 17} textAnchor="middle" fontSize={isHov ? 9.5 : 8.5} fontWeight={isHov ? "700" : "500"} fill="#8b2fa0" opacity={isHov ? 1 : 0.75}>
                {n.label}
              </text>
            </g>
          );
        })}

        {/* RIGHT nodes */}
        {RIGHT_NODES.map((n, i) => {
          const isHov = hoveredRight === i;
          return (
            <g
              key={i}
              className="bridge-node"
              style={{ animationDelay: `${i * 0.4 + 0.2}s`, cursor: "pointer", transformOrigin: `565px ${n.y}px` }}
              onMouseEnter={() => setHoveredRight(i)}
              onMouseLeave={() => setHoveredRight(null)}
            >
              <circle cx="565" cy={n.y} r={isHov ? 18 : 13} fill="#e11d73" opacity={isHov ? 0.18 : 0.1} style={{ transition: "all 0.2s" }} />
              <circle cx="565" cy={n.y} r={isHov ? 6 : 4.5} fill="#e11d73" opacity={isHov ? 1 : 0.75} style={{ transition: "all 0.2s" }} />
              <text x="565" y={n.y + 17} textAnchor="middle" fontSize={isHov ? 9.5 : 8.5} fontWeight={isHov ? "700" : "500"} fill="#e11d73" opacity={isHov ? 1 : 0.75}>
                {n.label}
              </text>
            </g>
          );
        })}

        {/* Vertical dividers */}
        <line x1="140" y1="30" x2="140" y2="295" stroke="#8b2fa015" strokeWidth="1" strokeDasharray="3 6" />
        <line x1="500" y1="30" x2="500" y2="295" stroke="#e11d7315" strokeWidth="1" strokeDasharray="3 6" />
      </svg>

      {/* Tooltip */}
      {activeTooltip && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-20 w-72"
        >
          <div
            className="rounded-xl px-4 py-2.5 text-xs shadow-2xl text-center"
            style={{
              background: "#0a0818",
              border: `1px solid ${activeTooltip.side === "left" ? "#8b2fa050" : "#e11d7350"}`,
            }}
          >
            <div className="font-bold mb-0.5" style={{ color: activeTooltip.side === "left" ? "#c084fc" : "#fb7185" }}>
              {activeTooltip.node.label}
            </div>
            <div className="text-gray-300 leading-relaxed">{activeTooltip.node.desc}</div>
          </div>
        </div>
      )}
    </div>
  );
}
