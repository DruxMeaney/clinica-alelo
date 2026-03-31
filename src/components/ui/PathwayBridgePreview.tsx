"use client";
import { useState } from "react";
import Link from "next/link";

/* ─── Mini SVG: Sistema CYP450 ─────────────────────────────────────────── */
function CYP450Mini() {
  return (
    <svg viewBox="0 0 220 80" className="w-full" aria-hidden="true">
      <defs>
        <marker id="pb-arr-c" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
          <polygon points="0 0, 6 2.5, 0 5" fill="#6b7280" />
        </marker>
        <radialGradient id="pb-glow-c" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background label */}
      <text x="110" y="9" textAnchor="middle" fill="#7c3aed" fontSize="6" fontWeight="600" letterSpacing="1">
        ENZIMAS · FASE I · FASE II · TRANSPORTADORES
      </text>

      {/* Fármaco pill */}
      <rect x="4" y="25" width="28" height="18" rx="9" fill="#7c3aed" fillOpacity="0.75" />
      <text x="18" y="37.5" textAnchor="middle" fill="white" fontSize="5.5" fontWeight="700">Drug</text>

      {/* Arrow drug → enzyme */}
      <line x1="33" y1="34" x2="46" y2="34" stroke="#6b7280" strokeWidth="1.2" markerEnd="url(#pb-arr-c)" />

      {/* CYP2D6 */}
      <circle cx="60" cy="34" r="12" fill="url(#pb-glow-c)" />
      <circle cx="60" cy="34" r="10" fill="#1e1040" stroke="#a855f7" strokeWidth="1.2" />
      <text x="60" y="32" textAnchor="middle" fill="#d8b4fe" fontSize="4.5" fontWeight="700">CYP</text>
      <text x="60" y="39" textAnchor="middle" fill="#d8b4fe" fontSize="4" fontWeight="500">2D6</text>

      {/* Arrow */}
      <line x1="71" y1="34" x2="82" y2="34" stroke="#6b7280" strokeWidth="1" markerEnd="url(#pb-arr-c)" />

      {/* CYP2C19 */}
      <circle cx="95" cy="34" r="10" fill="#1e1040" stroke="#8b2fa0" strokeWidth="1.2" />
      <text x="95" y="32" textAnchor="middle" fill="#d8b4fe" fontSize="4.5" fontWeight="700">CYP</text>
      <text x="95" y="39" textAnchor="middle" fill="#d8b4fe" fontSize="4" fontWeight="500">2C19</text>

      {/* Arrow */}
      <line x1="106" y1="34" x2="117" y2="34" stroke="#6b7280" strokeWidth="1" markerEnd="url(#pb-arr-c)" />

      {/* CYP3A4 */}
      <circle cx="130" cy="34" r="10" fill="#1e1040" stroke="#6d28d9" strokeWidth="1.2" />
      <text x="130" y="32" textAnchor="middle" fill="#d8b4fe" fontSize="4.5" fontWeight="700">CYP</text>
      <text x="130" y="39" textAnchor="middle" fill="#d8b4fe" fontSize="4" fontWeight="500">3A4</text>

      {/* Arrow */}
      <line x1="141" y1="34" x2="152" y2="34" stroke="#6b7280" strokeWidth="1" markerEnd="url(#pb-arr-c)" />

      {/* UGT1A1 (Fase II) */}
      <circle cx="165" cy="34" r="10" fill="#1e1040" stroke="#059669" strokeWidth="1.2" />
      <text x="165" y="32" textAnchor="middle" fill="#6ee7b7" fontSize="4.5" fontWeight="700">UGT</text>
      <text x="165" y="39" textAnchor="middle" fill="#6ee7b7" fontSize="4" fontWeight="500">1A1</text>

      {/* Arrow out */}
      <line x1="176" y1="34" x2="187" y2="34" stroke="#6b7280" strokeWidth="1" markerEnd="url(#pb-arr-c)" />

      {/* Metabolito pill */}
      <rect x="188" y="25" width="28" height="18" rx="9" fill="#374151" fillOpacity="0.9" />
      <text x="202" y="36" textAnchor="middle" fill="#9ca3af" fontSize="4.5" fontWeight="600">Met.</text>

      {/* Bottom note */}
      <text x="110" y="73" textAnchor="middle" fill="#4b5563" fontSize="5.5">
        SLCO1B1 · ABCB1 · VKORC1 · TPMT · DPYD
      </text>
    </svg>
  );
}

/* ─── Mini SVG: Metabolismo Lipídico ────────────────────────────────────── */
function LipidMini() {
  return (
    <svg viewBox="0 0 220 90" className="w-full" aria-hidden="true">
      <defs>
        <marker id="pb-arr-l" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
          <polygon points="0 0, 6 2.5, 0 5" fill="#6b7280" />
        </marker>
        <marker id="pb-arr-l2" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
          <polygon points="0 0, 6 2.5, 0 5" fill="#e11d73" fillOpacity="0.7" />
        </marker>
      </defs>

      {/* Background label */}
      <text x="110" y="9" textAnchor="middle" fill="#e11d73" fontSize="6" fontWeight="600" letterSpacing="1">
        SÍNTESIS · TRANSPORTE · CAPTACIÓN
      </text>

      {/* Hígado (top center) */}
      <circle cx="110" cy="35" r="18" fill="#1a0a12" stroke="#e11d73" strokeWidth="1.5" />
      <text x="110" y="33" textAnchor="middle" fill="#f9a8d4" fontSize="5.5" fontWeight="700">HÍGADO</text>
      <text x="110" y="41" textAnchor="middle" fill="#6b7280" fontSize="4">HMGCR · LDLR</text>

      {/* Intestino (bottom-left) */}
      <circle cx="45" cy="72" r="16" fill="#1a0a12" stroke="#7c3aed" strokeWidth="1.2" />
      <text x="45" y="71" textAnchor="middle" fill="#c4b5fd" fontSize="5" fontWeight="700">INTESTINO</text>
      <text x="45" y="78" textAnchor="middle" fill="#6b7280" fontSize="4">APOB · MTTP</text>

      {/* Tejidos (bottom-right) */}
      <circle cx="175" cy="72" r="16" fill="#1a0a12" stroke="#0284c7" strokeWidth="1.2" />
      <text x="175" y="71" textAnchor="middle" fill="#7dd3fc" fontSize="5" fontWeight="700">TEJIDOS</text>
      <text x="175" y="78" textAnchor="middle" fill="#6b7280" fontSize="4">LPL · CETP</text>

      {/* Arrow: Intestino → Hígado (Quilomicrones) */}
      <line x1="61" y1="61" x2="93" y2="45" stroke="#7c3aed" strokeWidth="1.2" strokeOpacity="0.7" markerEnd="url(#pb-arr-l)" />
      <text x="68" y="50" fill="#8b5cf6" fontSize="4.5" textAnchor="middle">CM</text>

      {/* Arrow: Hígado → Tejidos (LDL) */}
      <line x1="128" y1="45" x2="159" y2="61" stroke="#e11d73" strokeWidth="1.5" markerEnd="url(#pb-arr-l2)" />
      <text x="153" y="50" fill="#f472b6" fontSize="4.5" textAnchor="middle">LDL</text>

      {/* Arrow: Tejidos → Hígado (HDL, dashed) */}
      <line x1="160" y1="63" x2="128" y2="40" stroke="#059669" strokeWidth="1" strokeDasharray="3,2" markerEnd="url(#pb-arr-l)" />
      <text x="147" y="55" fill="#34d399" fontSize="4.5" textAnchor="middle">HDL</text>

      {/* PCSK9 + APOE callout */}
      <text x="110" y="86" textAnchor="middle" fill="#4b5563" fontSize="5.5">
        PCSK9 · APOE · SLC16A11 · LPA · GCKR
      </text>
    </svg>
  );
}

/* ─── Mini SVG: Ciclo del Folato ────────────────────────────────────────── */
function FolateMini() {
  return (
    <svg viewBox="0 0 220 90" className="w-full" aria-hidden="true">
      <defs>
        <marker id="pb-arr-f" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
          <polygon points="0 0, 6 2.5, 0 5" fill="#6b7280" />
        </marker>
        <marker id="pb-arr-f2" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
          <polygon points="0 0, 6 2.5, 0 5" fill="#059669" />
        </marker>
        <filter id="pb-glow-f">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <text x="110" y="9" textAnchor="middle" fill="#059669" fontSize="6" fontWeight="600" letterSpacing="1">
        METILACIÓN · SÍNTESIS ADN · HOMOCISTEÍNA
      </text>

      {/* Cycle nodes — hexagon layout */}
      {/* Top: Folato */}
      <circle cx="110" cy="28" r="11" fill="#0a2a1a" stroke="#059669" strokeWidth="1.2" />
      <text x="110" y="31.5" textAnchor="middle" fill="#6ee7b7" fontSize="5.5" fontWeight="700">Folato</text>

      {/* Right-top: DHF */}
      <circle cx="165" cy="44" r="9" fill="#0a2a1a" stroke="#047857" strokeWidth="1" />
      <text x="165" y="47.5" textAnchor="middle" fill="#6ee7b7" fontSize="5">DHF</text>

      {/* Right-bottom: THF */}
      <circle cx="165" cy="66" r="9" fill="#0a2a1a" stroke="#047857" strokeWidth="1" />
      <text x="165" y="69.5" textAnchor="middle" fill="#6ee7b7" fontSize="5">THF</text>

      {/* MTHFR step (highlighted) — between THF and 5mTHF */}
      <rect x="117" y="60" width="32" height="14" rx="4" fill="#1a0a0a" stroke="#f59e0b" strokeWidth="1.5" filter="url(#pb-glow-f)" />
      <text x="133" y="65.5" textAnchor="middle" fill="#fbbf24" fontSize="5" fontWeight="700">MTHFR</text>
      <text x="133" y="72" textAnchor="middle" fill="#f59e0b" fontSize="3.5">C677T ★</text>

      {/* Left-bottom: 5-mTHF */}
      <circle cx="55" cy="66" r="11" fill="#0a2a1a" stroke="#059669" strokeWidth="1.2" />
      <text x="55" y="64" textAnchor="middle" fill="#6ee7b7" fontSize="4.5" fontWeight="700">5-mTHF</text>
      <text x="55" y="70" textAnchor="middle" fill="#34d399" fontSize="4">donador CH₃</text>

      {/* Left-top: Homocisteína */}
      <circle cx="55" cy="44" r="11" fill="#1a0a0a" stroke="#e11d73" strokeWidth="1.2" />
      <text x="55" y="42" textAnchor="middle" fill="#f9a8d4" fontSize="4" fontWeight="700">Homo-</text>
      <text x="55" y="48" textAnchor="middle" fill="#f9a8d4" fontSize="4" fontWeight="700">cisteína</text>

      {/* Arrows (cycle) */}
      <line x1="122" y1="28" x2="155" y2="40" stroke="#6b7280" strokeWidth="1" markerEnd="url(#pb-arr-f)" />
      <line x1="165" y1="54" x2="165" y2="56" stroke="#6b7280" strokeWidth="1" markerEnd="url(#pb-arr-f)" />
      <line x1="116" y1="67" x2="67" y2="67" stroke="#059669" strokeWidth="1.2" markerEnd="url(#pb-arr-f2)" />
      <line x1="55" y1="54" x2="55" y2="52" stroke="#6b7280" strokeWidth="1" markerEnd="url(#pb-arr-f)" />
      <line x1="67" y1="41" x2="99" y2="29" stroke="#6b7280" strokeWidth="1" markerEnd="url(#pb-arr-f)" />

      {/* Bottom note */}
      <text x="110" y="85" textAnchor="middle" fill="#4b5563" fontSize="5.5">
        MTR · MTRR · CBS · B12 · B6
      </text>
    </svg>
  );
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const PATHWAYS = [
  {
    id: "cyp450",
    title: "Sistema CYP450",
    subtitle: "Farmacogenómica de precisión",
    description:
      "El sistema enzimático que convierte fármacos en metabolitos activos o inactivos. Las variantes en CYP2D6, CYP2C19 y CYP3A4 definen el fenotipo metabolizador individual y determinan si un fármaco actúa, falla o resulta tóxico.",
    genes: ["CYP2D6", "CYP2C19", "CYP3A4", "SLCO1B1"],
    module: "M6 — Farmacogenética",
    stat: ">50% de los fármacos prescritos dependen de CYP3A4/5",
    color: "#8b2fa0",
    mini: CYP450Mini,
    anchor: "cyp450",
  },
  {
    id: "lipid",
    title: "Metabolismo lipídico",
    subtitle: "Riesgo cardiometabólico",
    description:
      "La red lipoproteinaria que conecta absorción intestinal, síntesis hepática y captación periférica. PCSK9, APOE y SLC16A11 son los nodos regulatorios con mayor relevancia para la población mexicana.",
    genes: ["PCSK9", "APOE", "SLC16A11", "LDLR"],
    module: "M4 — Cardiovascular",
    stat: "~29% de mestizos porta el haplotipo de riesgo SLC16A11",
    color: "#e11d73",
    mini: LipidMini,
    anchor: "lipido",
  },
  {
    id: "folate",
    title: "Ciclo del folato",
    subtitle: "Nutrigenómica y epigenética",
    description:
      "El circuito metabólico que integra la vitamina B9 en la síntesis de ADN y la metilación epigenética. MTHFR C677T, con genotipo TT en ~18-32% de mexicanos, es su regulador genético central.",
    genes: ["MTHFR", "MTR", "MTRR", "CBS"],
    module: "M5 — Nutrigenómica",
    stat: "~18-32% de mexicanos son homocigotos TT en MTHFR",
    color: "#059669",
    mini: FolateMini,
    anchor: "folato",
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function PathwayBridgePreview() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* 3 preview cards */}
      <div className="grid md:grid-cols-3 gap-5">
        {PATHWAYS.map((pw) => {
          const MiniSVG = pw.mini;
          const isHov = hovered === pw.id;
          return (
            <div
              key={pw.id}
              onMouseEnter={() => setHovered(pw.id)}
              onMouseLeave={() => setHovered(null)}
              className="rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col"
              style={{
                backgroundColor: "#0d0920",
                borderColor: isHov ? pw.color : "rgba(255,255,255,0.07)",
                boxShadow: isHov ? `0 0 32px ${pw.color}35` : "none",
                transform: isHov ? "translateY(-2px)" : "translateY(0)",
              }}
            >
              {/* SVG area */}
              <div
                className="px-4 pt-4 pb-2 transition-all duration-300"
                style={{ borderBottom: `1px solid rgba(255,255,255,0.05)` }}
              >
                <MiniSVG />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                {/* Module badge */}
                <span
                  className="self-start text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: `${pw.color}22`, color: pw.color }}
                >
                  {pw.module}
                </span>

                {/* Title */}
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">{pw.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{pw.subtitle}</p>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-400 leading-relaxed flex-1">{pw.description}</p>

                {/* Gene chips */}
                <div className="flex flex-wrap gap-1.5">
                  {pw.genes.map((g) => (
                    <span
                      key={g}
                      className="text-[10px] font-mono px-2 py-0.5 rounded"
                      style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "#9ca3af" }}
                    >
                      {g}
                    </span>
                  ))}
                </div>

                {/* Stat callout */}
                <div
                  className="flex items-start gap-2 p-2.5 rounded-lg text-[11px] leading-snug"
                  style={{ backgroundColor: `${pw.color}12`, borderLeft: `2px solid ${pw.color}` }}
                >
                  <span style={{ color: pw.color }} className="shrink-0 mt-0.5">→</span>
                  <span className="text-gray-300">{pw.stat}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA principal */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl"
        style={{ background: "linear-gradient(135deg, rgba(139,47,160,0.12) 0%, rgba(5,150,105,0.10) 50%, rgba(225,29,115,0.10) 100%)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="text-center sm:text-left">
          <p className="text-white font-semibold text-sm">
            Explora la maquinaria molecular completa
          </p>
          <p className="text-gray-400 text-xs mt-0.5">
            Diagramas interactivos · Datos en población mexicana · Evidencia CPIC, PharmGKB y Reactome
          </p>
        </div>
        <a
          href="/vias-metabolicas"
          className="group flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm text-white whitespace-nowrap transition-all duration-200 shrink-0"
          style={{ background: "linear-gradient(135deg, #8b2fa0, #7c3aed)", boxShadow: "0 0 24px rgba(139,47,160,0.4)" }}
        >
          Abrir vías metabólicas
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </div>
  );
}
