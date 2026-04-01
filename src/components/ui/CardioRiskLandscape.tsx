"use client";
import { useState, useEffect } from "react";

// Gene variants plotted by:
//   x = Genetic Risk Score (0-100): derived from GWAS effect sizes and allele frequencies
//   y = Clinical Impact (0-100): how actionable/significant the variant is clinically
interface GenePoint {
  id: string;
  gene: string;
  rsid: string;
  trait: string;
  x: number;   // Genetic load (0–100)
  y: number;   // Clinical relevance (0–100)
  r: number;   // Dot size = relative evidence strength
  color: string;
  type: "risk" | "protective" | "mixed";
  desc: string;
}

const GENES: GenePoint[] = [
  {
    id: "pcsk9", gene: "PCSK9", rsid: "rs11591147",
    trait: "LDL-colesterol",
    x: 18, y: 88, r: 9, color: "#10b981", type: "protective",
    desc: "Variante de pérdida de función. Reduce LDL ~30%. Evidencia GWAS: p=3×10⁻²⁵⁷. Protectora cardiovascular.",
  },
  {
    id: "apoe4", gene: "APOE ε4", rsid: "rs429358",
    trait: "Riesgo cardiovascular",
    x: 78, y: 90, r: 8, color: "#e11d73", type: "risk",
    desc: "Alelo ε4: OR 1.4–3.7 para enfermedad coronaria. Eleva LDL y reduce HDL. Alta penetrancia clínica.",
  },
  {
    id: "tcf7l2", gene: "TCF7L2", rsid: "rs7903146",
    trait: "Diabetes tipo 2",
    x: 72, y: 78, r: 8, color: "#f59e0b", type: "risk",
    desc: "Mayor locus GWAS de T2D. OR ~1.35 por alelo T. Afecta secreción de insulina y señalización Wnt.",
  },
  {
    id: "slc16a11", gene: "SLC16A11", rsid: "rs13342232",
    trait: "DT2 — Población Mx",
    x: 65, y: 72, r: 7, color: "#e11d73", type: "risk",
    desc: "Variante de alta prevalencia en México (SIGMA 2014, Nature 506:97). OR ~1.17 para T2D. Haplótipo de 5 SNVs.",
  },
  {
    id: "ace", gene: "ACE I/D", rsid: "rs4646994",
    trait: "Hipertensión arterial",
    x: 55, y: 60, r: 6, color: "#8b2fa0", type: "mixed",
    desc: "Polimorfismo inserción/deleción. Alelo D: mayor actividad de ECA, presión arterial elevada y respuesta aeróbica.",
  },
  {
    id: "fto", gene: "FTO", rsid: "rs9939609",
    trait: "Obesidad / masa grasa",
    x: 62, y: 55, r: 7, color: "#f59e0b", type: "risk",
    desc: "Locus de obesidad más replicado globalmente. Alelo A: +0.4 kg/m² de IMC promedio. Efecto acumulable.",
  },
  {
    id: "apoe2", gene: "APOE ε2", rsid: "rs7412",
    trait: "Dislipidemias",
    x: 25, y: 55, r: 6, color: "#10b981", type: "protective",
    desc: "Alelo ε2: LDL reducido, HDL elevado. Reduce riesgo cardiovascular pero puede elevar triglicéridos.",
  },
  {
    id: "ldlr", gene: "LDLR", rsid: "rs5925 (común)",
    trait: "Hipercolesterolemia",
    x: 80, y: 82, r: 6, color: "#dc2626", type: "risk",
    desc: "Variantes patogénicas de LDLR causan hipercolesterolemia familiar. Evidencia diagnóstica de alta penetrancia.",
  },
  {
    id: "cetp", gene: "CETP", rsid: "rs708272",
    trait: "HDL-colesterol",
    x: 30, y: 48, r: 5, color: "#10b981", type: "protective",
    desc: "Variante Taq1B. Alelo B2: mayor HDL-C (~5 mg/dL). Asociado a menor riesgo de enfermedad coronaria.",
  },
  {
    id: "kcnj11", gene: "KCNJ11", rsid: "rs5219",
    trait: "Diabetes tipo 2",
    x: 58, y: 50, r: 5, color: "#f59e0b", type: "risk",
    desc: "Canal de potasio en células β. Variante E23K reduce secreción de insulina. OR ~1.14 para T2D.",
  },
  {
    id: "adrb1", gene: "ADRB1", rsid: "rs1801253",
    trait: "Hipertensión / respuesta a β-bloq.",
    x: 45, y: 65, r: 5, color: "#7c3aed", type: "mixed",
    desc: "Receptor β1-adrenérgico. Arg389Gly modula respuesta a β-bloqueadores. Relevante en farmacogenómica cardiovascular.",
  },
];

const W = 460, H = 320;
const PAD = { l: 52, r: 20, t: 20, b: 52 };
const plotW = W - PAD.l - PAD.r;
const plotH = H - PAD.t - PAD.b;
const toX = (v: number) => PAD.l + (v / 100) * plotW;
const toY = (v: number) => PAD.t + ((100 - v) / 100) * plotH;

const QUADRANTS = [
  { label: "Bajo riesgo",      x1: 0,  y1: 50, x2: 50, y2: 100, fill: "#10b98108" },
  { label: "Riesgo genético",  x1: 50, y1: 50, x2: 100,y2: 100, fill: "#f59e0b08" },
  { label: "Vigilancia",       x1: 0,  y1: 0,  x2: 50, y2: 50,  fill: "#8b2fa008" },
  { label: "Acción prioritaria",x1:50, y1: 0,  x2: 100,y2: 50,  fill: "#e11d7310" },
];

export default function CardioRiskLandscape() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { const t = setTimeout(() => setMounted(true), 200); return () => clearTimeout(t); }, []);

  const hovNode = GENES.find(g => g.id === hovered) ?? null;

  return (
    <div className="relative select-none" style={{ width: W, maxWidth: "100%" }}>
      <style>{`
        @keyframes crlDot {
          from { r: 0; opacity: 0; }
          to   { opacity: 1; }
        }
        .crl-dot { animation: crlDot 0.5s ease-out forwards; }
      `}</style>

      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <clipPath id="crlClip">
            <rect x={PAD.l} y={PAD.t} width={plotW} height={plotH} />
          </clipPath>
        </defs>

        {/* Quadrant backgrounds */}
        {QUADRANTS.map((q) => (
          <rect
            key={q.label}
            x={toX(q.x1)} y={toY(q.y2)}
            width={toX(q.x2) - toX(q.x1)}
            height={toY(q.y1) - toY(q.y2)}
            fill={q.fill}
          />
        ))}

        {/* Quadrant labels */}
        {QUADRANTS.map((q) => (
          <text
            key={q.label}
            x={(toX(q.x1) + toX(q.x2)) / 2}
            y={(toY(q.y1) + toY(q.y2)) / 2}
            textAnchor="middle" fontSize="8.5" fontWeight="600"
            fill={q.label === "Acción prioritaria" ? "#e11d73" : "#6b7280"}
            opacity={q.label === "Acción prioritaria" ? 0.6 : 0.4}
          >
            {q.label}
          </text>
        ))}

        {/* Grid lines */}
        {[25, 50, 75].map(v => (
          <g key={v}>
            <line x1={toX(v)} y1={PAD.t} x2={toX(v)} y2={PAD.t + plotH} stroke="#8b2fa015" strokeWidth="0.8" strokeDasharray="3 4" />
            <line x1={PAD.l} y1={toY(v)} x2={PAD.l + plotW} y2={toY(v)} stroke="#8b2fa015" strokeWidth="0.8" strokeDasharray="3 4" />
          </g>
        ))}

        {/* Quadrant dividers (bold) */}
        <line x1={toX(50)} y1={PAD.t} x2={toX(50)} y2={PAD.t + plotH} stroke="#8b2fa030" strokeWidth="1.2" />
        <line x1={PAD.l} y1={toY(50)} x2={PAD.l + plotW} y2={toY(50)} stroke="#8b2fa030" strokeWidth="1.2" />

        {/* Axes */}
        <line x1={PAD.l} y1={PAD.t + plotH} x2={PAD.l + plotW} y2={PAD.t + plotH} stroke="#8b2fa040" strokeWidth="1.2" />
        <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={PAD.t + plotH} stroke="#8b2fa040" strokeWidth="1.2" />

        {/* Axis labels */}
        <text x={PAD.l + plotW / 2} y={H - 8} textAnchor="middle" fontSize="9" fill="#6b7280">
          Carga genética de riesgo →
        </text>
        <text
          x={12} y={PAD.t + plotH / 2}
          textAnchor="middle" fontSize="9" fill="#6b7280"
          transform={`rotate(-90, 12, ${PAD.t + plotH / 2})`}
        >
          Relevancia clínica →
        </text>

        {/* Tick values */}
        {[0, 25, 50, 75, 100].map(v => (
          <g key={v}>
            <text x={toX(v)} y={PAD.t + plotH + 14} textAnchor="middle" fontSize="7" fill="#9ca3af">{v}</text>
            <text x={PAD.l - 8} y={toY(v) + 3} textAnchor="end" fontSize="7" fill="#9ca3af">{v}</text>
          </g>
        ))}

        {/* Gene dots */}
        <g clipPath="url(#crlClip)">
          {mounted && GENES.map((g, i) => {
            const isH = hovered === g.id;
            const x = toX(g.x), y = toY(g.y);
            return (
              <g
                key={g.id}
                onMouseEnter={() => setHovered(g.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Glow */}
                <circle cx={x} cy={y} r={isH ? g.r + 10 : g.r + 4} fill={g.color} opacity={isH ? 0.2 : 0.08} style={{ transition: "all 0.2s", animationDelay: `${i * 0.06}s` }} className="crl-dot" />
                {/* Core dot */}
                <circle cx={x} cy={y} r={isH ? g.r + 2 : g.r} fill={g.color} opacity={isH ? 1 : 0.75} style={{ transition: "all 0.2s" }} />
                {/* Type indicator ring */}
                {g.type === "protective" && (
                  <circle cx={x} cy={y} r={isH ? g.r + 4 : g.r + 2} fill="none" stroke={g.color} strokeWidth="1" opacity={isH ? 0.7 : 0.3} />
                )}
                {/* Gene label */}
                <text
                  x={x} y={y - g.r - 5}
                  textAnchor="middle" fontSize={isH ? 9 : 7.5}
                  fontWeight={isH ? "700" : "500"}
                  fill={g.color} opacity={isH ? 1 : 0.8}
                >
                  {g.gene}
                </text>
              </g>
            );
          })}
        </g>

        {/* Legend */}
        {[
          { label: "Protectora", color: "#10b981" },
          { label: "Riesgo",     color: "#e11d73"  },
          { label: "Mixta",      color: "#8b2fa0"  },
        ].map((leg, i) => (
          <g key={leg.label} transform={`translate(${PAD.l + 8 + i * 82}, ${H - 18})`}>
            <circle cx={0} cy={0} r={4} fill={leg.color} opacity="0.75" />
            <text x={8} y={4} fontSize="7.5" fill="#9ca3af">{leg.label}</text>
          </g>
        ))}
      </svg>

      {/* Hover tooltip */}
      {hovNode && (
        <div className="absolute top-4 right-4 pointer-events-none z-20 w-52">
          <div className="rounded-xl px-3 py-2.5 text-xs shadow-2xl"
            style={{ background: "#0a0818", border: `1px solid ${hovNode.color}50` }}
          >
            <div className="font-bold mb-0.5 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: hovNode.color }} />
              <span style={{ color: hovNode.color }}>{hovNode.gene}</span>
            </div>
            <div className="text-gray-500 font-mono text-[10px] mb-1">{hovNode.rsid}</div>
            <div className="text-gray-400 font-medium mb-1">{hovNode.trait}</div>
            <div className="text-gray-300 leading-relaxed">{hovNode.desc}</div>
          </div>
        </div>
      )}
    </div>
  );
}
