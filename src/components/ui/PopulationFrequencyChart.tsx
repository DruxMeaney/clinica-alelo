"use client";
import { useState } from "react";

/**
 * Comparative allele frequency chart — gnomAD v4 + SIGMA / published literature
 *
 * Populations:
 *   AMR  — Latino / Admixed American (gnomAD: primarily Mexican + other LatAm)
 *   NFE  — Non-Finnish European
 *   EAS  — East Asian
 *   AFR  — African / African American
 *
 * Frequencies represent the risk / minor allele for each variant.
 * Sources: gnomAD v4, SIGMA (2014), Gómez-Díaz et al. (MTHFR México),
 *          CPIC population tables, published pharmacogenomics literature.
 */

interface Variant {
  gene: string;
  variant: string;
  service: string;
  serviceColor: string;
  description: string;
  amr: number;   // Latino / Mexican-predominant
  nfe: number;   // European
  eas: number;   // East Asian
  afr: number;   // African
  highlight?: boolean; // "Mexico-specific" flag
  note: string;  // allele/phenotype note
  source: string;
}

const VARIANTS: Variant[] = [
  {
    gene: "SLC16A11",
    variant: "rs13342692",
    service: "Cardiometabólico",
    serviceColor: "#e11d73",
    description: "Haplotipo de riesgo para diabetes tipo 2 específico de América Indígena. Descubierto por el consorcio SIGMA (2014). Transportador de piruvato en el retículo endoplásmico hepático.",
    amr: 29, nfe: 2, eas: 5, afr: 2,
    highlight: true,
    note: "Alelo de riesgo T (haplotipo 5-SNP)",
    source: "SIGMA 2014; gnomAD v4",
  },
  {
    gene: "MTHFR",
    variant: "C677T rs1801133",
    service: "Nutrigenómica",
    serviceColor: "#0284c7",
    description: "Variante que reduce la actividad de MTHFR ~30-65%. Eleva homocisteína y reduce disponibilidad de 5-metil-THF. México tiene una de las prevalencias mundiales más altas de genotipo TT.",
    amr: 48, nfe: 33, eas: 28, afr: 16,
    highlight: true,
    note: "Alelo T (variante 677T)",
    source: "Gómez-Díaz 2012; gnomAD v4; Wilcken et al. 2003",
  },
  {
    gene: "TCF7L2",
    variant: "rs7903146",
    service: "Cardiometabólico",
    serviceColor: "#e11d73",
    description: "El locus de riesgo genético más reproducido para diabetes tipo 2 a nivel mundial. Modula la señalización Wnt en células beta pancreáticas. Alta frecuencia en AMR y AFR vs EAS.",
    amr: 27, nfe: 30, eas: 6, afr: 30,
    note: "Alelo de riesgo T",
    source: "Grant et al. 2006; gnomAD v4; SIGMA 2014",
  },
  {
    gene: "CYP2C19",
    variant: "*17 rs12248560",
    service: "PGx",
    serviceColor: "#8b2fa0",
    description: "Alelo de función aumentada (Metabolizador Ultrarrápido). Los portadores activan clopidogrel más rápido — mayor efecto antiagregante y mayor riesgo de sangrado. Frecuencia contrastante entre EAS (raro) vs otras poblaciones.",
    amr: 20, nfe: 22, eas: 2, afr: 28,
    note: "Alelo *17 (UM — mayor actividad)",
    source: "CPIC CYP2C19; gnomAD v4",
  },
  {
    gene: "ACTN3",
    variant: "R577X rs1815739",
    service: "Rendimiento",
    serviceColor: "#059669",
    description: "El genotipo XX (homocigoto para el alelo stop) significa ausencia total de α-actinina-3 en fibras musculares de contracción rápida. Asociado con mayor rendimiento de resistencia, menor de potencia. Muy variable entre poblaciones.",
    amr: 42, nfe: 38, eas: 57, afr: 6,
    note: "Alelo X (577X — sin α-actinina-3)",
    source: "Yang et al. 2003; gnomAD v4",
  },
  {
    gene: "APOE",
    variant: "ε4 rs429358",
    service: "Cardiometabólico",
    serviceColor: "#e11d73",
    description: "El alelo ε4 de APOE eleva LDL ~10-20 mg/dL y es el factor genético de mayor impacto conocido para enfermedad de Alzheimer (RR ~3× en heterocigotos ε3/ε4; ~15× en homocigotos ε4/ε4). Mayor frecuencia en AFR, similar en AMR y NFE.",
    amr: 14, nfe: 15, eas: 9, afr: 23,
    note: "Alelo ε4 (Cys112Arg)",
    source: "Corder et al. 1993; gnomAD v4",
  },
];

const POPULATIONS = [
  { key: "amr" as const, label: "Latino / Mexicano (AMR)", color: "#8b2fa0", textColor: "#fff" },
  { key: "nfe" as const, label: "Europeo (NFE)", color: "#64748b", textColor: "#fff" },
  { key: "eas" as const, label: "Asiático Oriental (EAS)", color: "#0284c7", textColor: "#fff" },
  { key: "afr" as const, label: "Africano (AFR)", color: "#d97706", textColor: "#fff" },
];

// SVG layout constants
const LEFT = 158;       // space for gene labels
const RIGHT_PAD = 18;
const TOP = 60;         // space for legend
const BAR_H = 9;
const BAR_GAP = 2;      // gap between bars within a group
const GROUP_GAP = 16;   // gap between variant groups
const MAX_PCT = 65;     // x-axis max %
const CHART_W = 680 - LEFT - RIGHT_PAD; // ~504px

function pctToX(pct: number): number {
  return LEFT + (pct / MAX_PCT) * CHART_W;
}

// Compute y positions for each variant group
function groupY(variantIdx: number): number {
  const groupH = 4 * BAR_H + 3 * BAR_GAP; // height of 4 bars
  const step = groupH + GROUP_GAP;
  return TOP + variantIdx * step;
}

function barY(variantIdx: number, popIdx: number): number {
  return groupY(variantIdx) + popIdx * (BAR_H + BAR_GAP);
}

const SVG_HEIGHT = TOP + VARIANTS.length * (4 * BAR_H + 3 * BAR_GAP + GROUP_GAP) - GROUP_GAP + 50;

export default function PopulationFrequencyChart() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedVariant = VARIANTS.find(v => v.gene === selected);

  // x-axis tick marks
  const ticks = [0, 10, 20, 30, 40, 50, 60];

  return (
    <div className="rounded-2xl overflow-hidden bg-white border border-gray-100">

      {/* Chart */}
      <div className="bg-[#fafafa] px-2 py-4 border-b border-gray-100">
        <svg
          viewBox={`0 0 680 ${SVG_HEIGHT}`}
          width="100%"
          preserveAspectRatio="xMidYMid meet"
          className="block font-sans"
        >
          {/* Legend */}
          <g>
            {POPULATIONS.map((pop, i) => (
              <g key={pop.key} transform={`translate(${LEFT + i * 152}, 18)`}>
                <rect width="12" height="10" rx="2" fill={pop.color} />
                <text x="16" y="9" fontSize="9" fill="#4b5563" fontFamily="system-ui">{pop.label}</text>
              </g>
            ))}
          </g>

          {/* Source note */}
          <text x={LEFT} y={TOP - 4} fontSize="7.5" fill="#9ca3af" fontFamily="system-ui">
            Fuentes: gnomAD v4 · 1000 Genomes · HapMap Ph.3 · SIGMA 2014 · CPIC — vía SNPnexus (Oscanoa et al. 2020). Frecuencias alelo de riesgo (%).
          </text>

          {/* X-axis grid lines and labels */}
          {ticks.map(t => (
            <g key={t}>
              <line
                x1={pctToX(t)} y1={TOP - 2}
                x2={pctToX(t)} y2={SVG_HEIGHT - 28}
                stroke="#e5e7eb" strokeWidth="1"
              />
              <text x={pctToX(t)} y={SVG_HEIGHT - 16} textAnchor="middle" fontSize="8.5" fill="#9ca3af" fontFamily="system-ui">
                {t}%
              </text>
            </g>
          ))}

          {/* Variant groups */}
          {VARIANTS.map((v, vi) => {
            const isSelected = selected === v.gene;
            const gyCenter = groupY(vi) + (4 * BAR_H + 3 * BAR_GAP) / 2;

            return (
              <g
                key={v.gene}
                style={{ cursor: "pointer" }}
                onClick={() => setSelected(isSelected ? null : v.gene)}
              >
                {/* Group highlight on hover */}
                {isSelected && (
                  <rect
                    x={LEFT - 4} y={groupY(vi) - 3}
                    width={CHART_W + 4} height={4 * BAR_H + 3 * BAR_GAP + 6}
                    rx="4" fill="#8b2fa0" fillOpacity="0.06"
                  />
                )}

                {/* Gene label */}
                <text
                  x={LEFT - 8} y={gyCenter + 4}
                  textAnchor="end" fontSize="10" fontWeight="700"
                  fill={isSelected ? "#8b2fa0" : "#1f2937"}
                  fontFamily="system-ui"
                >
                  {v.gene}
                </text>
                <text
                  x={LEFT - 8} y={gyCenter + 15}
                  textAnchor="end" fontSize="7"
                  fill="#9ca3af" fontFamily="system-ui"
                >
                  {v.variant.length > 16 ? v.variant.slice(0, 15) + "…" : v.variant}
                </text>

                {/* Service badge */}
                <rect
                  x={4} y={gyCenter - 7} width="4" height="14"
                  rx="2" fill={v.serviceColor}
                />

                {/* Bars */}
                {POPULATIONS.map((pop, pi) => {
                  const freq = v[pop.key];
                  const y = barY(vi, pi);
                  const w = (freq / MAX_PCT) * CHART_W;
                  const isAmr = pop.key === "amr";
                  return (
                    <g key={pop.key}>
                      {/* Background track */}
                      <rect x={LEFT} y={y} width={CHART_W} height={BAR_H} fill="#f1f5f9" rx="2" />
                      {/* Value bar */}
                      <rect
                        x={LEFT} y={y} width={w} height={BAR_H}
                        fill={pop.color}
                        opacity={isAmr ? 1 : 0.7}
                        rx="2"
                      />
                      {/* Value label */}
                      {freq > 3 && (
                        <text
                          x={LEFT + w - 3} y={y + BAR_H - 2}
                          textAnchor="end" fontSize="7.5"
                          fill={w > 30 ? "#fff" : pop.color}
                          fontWeight={isAmr ? "700" : "400"}
                          fontFamily="system-ui"
                        >
                          {freq}%
                        </text>
                      )}
                      {freq <= 3 && (
                        <text
                          x={LEFT + w + 3} y={y + BAR_H - 2}
                          textAnchor="start" fontSize="7.5"
                          fill={pop.color}
                          fontFamily="system-ui"
                        >
                          {freq}%
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* AMR highlight arrow if it's the highest or highlight=true */}
                {v.highlight && (
                  <text
                    x={pctToX(v.amr) + 4} y={barY(vi, 0) + 7}
                    fontSize="9" fill="#8b2fa0" fontWeight="bold" fontFamily="system-ui"
                  >
                    ←
                  </text>
                )}
              </g>
            );
          })}

          {/* Axis base line */}
          <line x1={LEFT} y1={TOP - 2} x2={LEFT} y2={SVG_HEIGHT - 28} stroke="#e5e7eb" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Detail panel — selected variant */}
      {selectedVariant ? (
        <div className="p-5 grid md:grid-cols-3 gap-5 border-t border-gray-50" style={{ borderTop: `3px solid ${selectedVariant.serviceColor}` }}>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-gray-900">{selectedVariant.gene}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: selectedVariant.serviceColor + "18", color: selectedVariant.serviceColor }}>
                {selectedVariant.service}
              </span>
            </div>
            <p className="text-xs text-gray-400 font-mono">{selectedVariant.variant}</p>
            <p className="text-xs text-gray-500">{selectedVariant.note}</p>
            <p className="text-xs text-gray-400">Fuente: {selectedVariant.source}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 leading-relaxed">{selectedVariant.description}</p>
          </div>
          <div className="space-y-2">
            {POPULATIONS.map(pop => (
              <div key={pop.key} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: pop.color }} />
                <div className="flex-1 h-2 rounded bg-gray-100 overflow-hidden">
                  <div className="h-full rounded" style={{ width: `${(selectedVariant[pop.key] / MAX_PCT) * 100}%`, backgroundColor: pop.color }} />
                </div>
                <span className="text-xs font-mono w-8 text-right text-gray-600">{selectedVariant[pop.key]}%</span>
                <span className="text-xs text-gray-400 hidden sm:inline">{pop.label.split(" (")[0]}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center">Haz clic en cualquier variante para ver descripción clínica y fuentes</p>
        </div>
      )}
    </div>
  );
}
