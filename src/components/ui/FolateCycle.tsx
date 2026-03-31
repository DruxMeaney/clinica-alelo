"use client";
import { useState } from "react";

interface CycleNode {
  id: string;
  label: string;
  sublabel?: string;
  x: number;
  y: number;
  r: number;
  type: "metabolite" | "gene" | "cofactor" | "output";
  color: string;
  description: string;
  clinical?: string;
  mexicanData?: string;
}

const CYCLE_NODES: CycleNode[] = [
  /* ── Main cycle metabolites ─────────────────────────── */
  {
    id: "folate", label: "Folato", sublabel: "Dieta / B9", type: "metabolite",
    x: 330, y: 44, r: 28, color: "#84cc16",
    description: "Folato (vitamina B9) procedente de la dieta o suplementos. En vegetales verdes, legumbres, frutas cítricas. El ácido fólico (forma sintética) requiere conversión a THF antes de entrar al ciclo funcional.",
    clinical: "Deficiencia de folato causa anemia megaloblástica y aumenta el riesgo de defectos del tubo neural. La suplementación periconcepcional con ácido fólico reduce en >50% los defectos de tubo neural.",
    mexicanData: "Los defectos de tubo neural tienen actualmente una incidencia de ~3–4 por 10,000 nacidos vivos en México (datos post-fortificación 2005–2021); históricamente fue de 7–14 por 10,000 antes de la implementación de la fortificación obligatoria con ácido fólico. La alta frecuencia de MTHFR C677T en México amplifica la importancia de una ingesta adecuada de folato.",
  },
  {
    id: "dhf", label: "DHF", sublabel: "Dihidrofolato", type: "metabolite",
    x: 540, y: 120, r: 24, color: "#65a30d",
    description: "Dihidrofolato (DHF). Forma oxidada del folato. La enzima DHFR (dihidrofolato reductasa) lo convierte a THF, requiriendo NADPH como cofactor reductor.",
    clinical: "DHFR es el diana del metotrexato (MTX). MTX inhibe DHFR → acumula DHF → bloquea la síntesis de purinas y pirimidinas. Variantes genéticas de DHFR y transportadores (SLC19A1) modulan la respuesta y toxicidad al MTX.",
  },
  {
    id: "thf", label: "THF", sublabel: "Tetrahidrofolato", type: "metabolite",
    x: 580, y: 230, r: 26, color: "#22c55e",
    description: "Tetrahidrofolato (THF). Forma reducida activa del folato. Actúa como transportador de unidades de carbono en múltiples reacciones biosintéticas: síntesis de nucleótidos (purinas, timidina) y metilación.",
  },
  {
    id: "metylene_thf", label: "5,10-metilén-THF", sublabel: "Intermedio clave", type: "metabolite",
    x: 520, y: 340, r: 26, color: "#16a34a",
    description: "5,10-Metilén-THF. Intermedio crítico. Puede derivarse hacia:\n1) Síntesis de timidilato (dTMP) — esencial para replicación del ADN\n2) Conversión a 5-metil-THF vía MTHFR — para re-metilación de homocisteína\n3) Síntesis de purinas",
  },
  {
    id: "methyl_thf", label: "5-metil-THF", sublabel: "Donador de metilo", type: "metabolite",
    x: 320, y: 390, r: 26, color: "#15803d",
    description: "5-Metil-THF. Producto de la reacción de MTHFR. Dona su grupo metilo a la homocisteína (vía MTR + vitamina B12) para regenerar metionina. Esta es la única reacción que puede regenerar THF desde 5-metil-THF.",
    clinical: "La trampa del folato: si la vitamina B12 está ausente, 5-metil-THF se acumula sin poder donar su metilo → todo el folato queda 'atrapado' como 5-metil-THF → deficiencia funcional de folato a pesar de niveles séricos normales.",
  },
  {
    id: "homocysteine", label: "Homocisteína", sublabel: "Factor de riesgo CV", type: "metabolite",
    x: 110, y: 330, r: 28, color: "#ef4444",
    description: "Homocisteína. Aminoácido azufrado no esencial en la dieta. Se forma por desmetilación de metionina. Sus niveles elevados (hiperhomocisteinemia >15 µmol/L) se asocian con aterosclerosis, trombosis venosa, disfunción endotelial y deterioro cognitivo.",
    clinical: "Hiperhomocisteinemia: leve 15-30 µmol/L (MTHFR, déficit B12/B9), moderada 30-100, severa >100 (CBS deficiencia, homocistinuria clásica). Tratamiento: L-metilfolato (5-MTHF) + B12 + B6.",
    mexicanData: "La alta frecuencia del genotipo TT de MTHFR C677T (~18-32% en mexicanos) combinada con ingesta insuficiente de B12 y folato resulta en hiperhomocisteinemia subclínica prevalente. Esto contribuye al riesgo cardiovascular y de deterioro cognitivo en la población.",
  },
  {
    id: "methionine", label: "Metionina", sublabel: "Aminoácido esencial", type: "metabolite",
    x: 100, y: 190, r: 24, color: "#3b82f6",
    description: "Metionina. Aminoácido esencial (de la dieta). Precursor de SAM. La re-metilación de homocisteína a metionina requiere: 5-metil-THF (donador de metilo) + MTR (enzima) + vitamina B12 (cofactor). También puede ser re-metilada por BHMT usando betaína (en hígado).",
  },
  {
    id: "sam", label: "SAM", sublabel: "S-Adenosilmetionina", type: "metabolite",
    x: 90, y: 90, r: 28, color: "#8b5cf6",
    description: "S-Adenosilmetionina (SAM). Donador universal de grupos metilo en la célula. Formado de metionina + ATP por MAT (metionina adenosiltransferasa). Participa en >200 reacciones de metilación.",
    clinical: "SAM es el donador de metilos para: metilación del ADN (silenciamiento genético), metilación de histonas (regulación epigenética), síntesis de neurotransmisores (dopamina, serotonina, norepinefrina, melatonina), síntesis de creatina, fosfolípidos, y mielina.",
  },
  {
    id: "sah", label: "SAH", sublabel: "S-Adenosilhomocisteína", type: "metabolite",
    x: 190, y: 50, r: 22, color: "#7c3aed",
    description: "S-Adenosilhomocisteína (SAH). Producto de las reacciones de metilación (SAM → SAH). Es un inhibidor competitivo de las metiltransferasas — su acumulación frena la metilación. SAHH lo hidroliza a homocisteína + adenosina.",
  },

  /* ── Genes / Enzymes ─────────────────────────────────── */
  {
    id: "MTHFR", label: "MTHFR", sublabel: "Gen clave", type: "gene",
    x: 435, y: 370, r: 26, color: "#e11d73",
    description: "Metilén-tetrahidrofolato reductasa. Cataliza la conversión irreversible de 5,10-metilén-THF a 5-metil-THF. Es el paso que 'canaliza' el folato hacia la re-metilación de homocisteína. Requiere FAD (riboflavina, B2) como cofactor.",
    clinical: "C677T (rs1801133): sustituye Ala→Val → reduce actividad enzimática ~30% (CT heterocigoto) a ~65% (TT homocigoto). A1298C (rs1801131): reduce actividad ~20-40%. Doble heterocigoto CT/AC: actividad ~50% reducida.",
    mexicanData: "MTHFR C677T es una de las variantes más frecuentes del genoma humano. En México:\n• Genotipo TT (~18-32% en mestizos, hasta ~40% en Otomí, Mixteco)\n• Genotipo CT (~40-45%)\nUno de los porcentajes más altos a nivel mundial. La combinación TT + ingesta baja de folato/B12 → hiperhomocisteinemia y riesgo aumentado de defectos de tubo neural, ECV y deterioro cognitivo.",
  },
  {
    id: "MTR", label: "MTR / MTRR", sublabel: "+ Vitamina B12", type: "gene",
    x: 215, y: 370, r: 24, color: "#0284c7",
    description: "MTR (Metionina Sintasa): re-metila homocisteína usando 5-metil-THF y B12 como cofactor. MTRR (Metionina Sintasa Reductasa): reactiva MTR oxidada. Variantes en ambos genes modulan los niveles de homocisteína y la eficiencia del ciclo de metilación.",
    clinical: "MTR A2756G (rs1805087) y MTRR A66G (rs1801394): polimorfismos frecuentes con efecto modesto. La deficiencia grave de MTR causa acidemia homocistínica. La deficiencia de B12 es la causa más común de disfunción de MTR.",
    mexicanData: "La deficiencia de B12 es especialmente relevante en México dado el consumo frecuente de dietas vegetarianas o semivegetarianas en poblaciones con recursos limitados. En adultos mayores, la malabsorción de B12 es frecuente.",
  },
  {
    id: "CBS", label: "CBS", sublabel: "+ Vitamina B6", type: "gene",
    x: 80, y: 430, r: 22, color: "#f59e0b",
    description: "Cistationina β-sintasa. Cataliza la primera reacción de la vía de transulfuración: homocisteína + serina → cistationina. Requiere piridoxal-5-fosfato (B6 activa) como cofactor. La cistationina γ-liasa (CTH) la convierte a cisteína.",
    clinical: "Mutaciones de CBS causan homocistinuria clásica (homocisteína >100 µmol/L). Tratamiento con B6 (en formas responsivas), metionina restringida, betaína. CBS es la ruta alternativa de eliminación de homocisteína cuando la re-metilación está saturada.",
    mexicanData: "Las variantes comunes de CBS tienen efecto leve sobre homocisteína. La deficiencia de B6 (piridoxina) puede afectar la vía de transulfuración, especialmente relevante en el contexto de alta prevalencia de MTHFR TT en México.",
  },

  /* ── Cofactors ───────────────────────────────────────── */
  {
    id: "B12", label: "B12", sublabel: "Cobalamina", type: "cofactor",
    x: 300, y: 290, r: 18, color: "#06b6d4",
    description: "Vitamina B12 (cobalamina). Cofactor esencial para MTR (metionina sintasa). Sin B12, MTR no puede funcionar → 5-metil-THF se acumula (trampa del folato) → homocisteína se eleva. También necesaria para metilmalonil-CoA mutasa (metabolismo de ácidos grasos de cadena impar).",
    clinical: "Deficiencia de B12 → anemia megaloblástica, neuropatía periférica, deterioro cognitivo, hiperhomocisteinemia. Causa principal de deficiencia: anemia perniciosa (anticuerpos anti-FI), malabsorción, dieta vegana sin suplementación.",
  },
  {
    id: "B6", label: "B6", sublabel: "Piridoxina", type: "cofactor",
    x: 165, y: 435, r: 16, color: "#f97316",
    description: "Vitamina B6 (piridoxina → piridoxal-5-fosfato activa). Cofactor de CBS. Su deficiencia reduce la vía de transulfuración y puede elevar levemente la homocisteína.",
  },

  /* ── Outputs ─────────────────────────────────────────── */
  {
    id: "methylation", label: "Metilación", sublabel: "ADN, histonas, neurotransmisores", type: "output",
    x: 90, y: 45, r: 20, color: "#d946ef",
    description: "Reacciones de metilación que dependen de SAM como donador:\n• Metilación del ADN (silenciamiento de genes, imprinting)\n• Metilación de histonas (regulación epigenética)\n• Síntesis de dopamina, serotonina, norepinefrina, melatonina\n• Síntesis de fosfolípidos (fosfatidilcolina)\n• Síntesis de creatina (consume ~70% de SAM en hígado)\n• Mielinización del sistema nervioso",
    clinical: "La capacidad de metilación (ratio SAM/SAH) es un marcador del estado epigenético global. Un ratio bajo se asocia con: hipometilación del ADN (activación de oncogenes), variabilidad en expresión génica, y manifestaciones neurológicas.",
    mexicanData: "La alta frecuencia de MTHFR TT en México implica una capacidad de metilación potencialmente reducida en una proporción significativa de la población — con implicaciones para riesgo cardiometabólico, neurológico y epigenético.",
  },
  {
    id: "dna_synth", label: "Síntesis de ADN", sublabel: "Timidilato / Purinas", type: "output",
    x: 640, y: 340, r: 20, color: "#f97316",
    description: "La síntesis de nucleótidos requiere folato:\n• Timidilato (dTMP): a partir de dUMP + 5,10-metilén-THF vía timidilato sintasa (TS)\n• Purinas (AMP, GMP): dos pasos de transferencia de formilo desde 10-formil-THF\nLa deficiencia de folato → errores de incorporación de uracilo → inestabilidad genómica → anemia megaloblástica.",
  },
];

interface CycleEdge {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
  color?: string;
  curved?: boolean;
}

const EDGES: CycleEdge[] = [
  { from: "folate", to: "dhf", label: "DHFR", color: "#84cc16" },
  { from: "dhf", to: "thf", label: "DHFR+NADPH", color: "#22c55e" },
  { from: "thf", to: "metylene_thf", label: "SHMT2", color: "#16a34a" },
  { from: "metylene_thf", to: "methyl_thf", label: "MTHFR*", color: "#e11d73" },
  { from: "methyl_thf", to: "homocysteine", label: "MTR+B12", color: "#0284c7", dashed: true },
  { from: "homocysteine", to: "methionine", label: "MTR+B12", color: "#3b82f6" },
  { from: "methionine", to: "sam", label: "MAT", color: "#8b5cf6" },
  { from: "sam", to: "sah", label: "Metiltransferasas", color: "#7c3aed" },
  { from: "sah", to: "homocysteine", label: "SAHH", color: "#ef4444" },
  { from: "homocysteine", to: "CBS", label: "Transulfuración", dashed: true, color: "#f59e0b" },
  { from: "sam", to: "methylation", label: "Metilación", dashed: true, color: "#d946ef" },
  { from: "metylene_thf", to: "dna_synth", label: "TS/GART", dashed: true, color: "#f97316" },
  { from: "B12", to: "methionine", dashed: true, color: "#06b6d4" },
];

function getNodeById(id: string) { return CYCLE_NODES.find(n => n.id === id); }

export default function FolateCycle() {
  const [selected, setSelected] = useState<string>("MTHFR");
  const node = CYCLE_NODES.find(n => n.id === selected)!;

  return (
    <div className="space-y-0">
      {/* SVG */}
      <div className="rounded-2xl overflow-hidden bg-[#0a0818] border border-white/5">
        <svg viewBox="0 0 710 490" width="100%" preserveAspectRatio="xMidYMid meet" className="block">
          <defs>
            <marker id="arr-folate" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
              <polygon points="0 0, 6 2.5, 0 5" fill="#4b5563" />
            </marker>
          </defs>

          {/* Background sections */}
          <rect x="0" y="0" width="710" height="490" rx="16" fill="#0a0818" />
          {/* Cycle area hint */}
          <ellipse cx="340" cy="250" rx="240" ry="200" fill="none" stroke="#1e1b2e" strokeWidth="1" strokeDasharray="4,4" />
          <text x="340" y="255" textAnchor="middle" fill="#2a2550" fontSize="60" fontWeight="900" fontFamily="system-ui" style={{ userSelect: "none" }}>
            CH₃
          </text>

          {/* Edges */}
          {EDGES.map(e => {
            const from = getNodeById(e.from);
            const to = getNodeById(e.to);
            if (!from || !to) return null;
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const ux = dx / dist;
            const uy = dy / dist;
            const x1 = from.x + ux * (from.r + 2);
            const y1 = from.y + uy * (from.r + 2);
            const x2 = to.x - ux * (to.r + 8);
            const y2 = to.y - uy * (to.r + 8);
            const mx = (x1 + x2) / 2;
            const my = (y1 + y2) / 2;
            const ec = e.color ?? "#4b5563";
            return (
              <g key={`${e.from}-${e.to}`}>
                <line x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={ec} strokeWidth="1.5"
                  strokeDasharray={e.dashed ? "4,3" : undefined}
                  strokeOpacity="0.75"
                  markerEnd="url(#arr-folate)"
                />
                {e.label && (
                  <text x={mx} y={my - 5} textAnchor="middle" fill={ec} fontSize="7" fontFamily="system-ui" fontWeight="600" fillOpacity="0.9">
                    {e.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* MTHFR asterisk label */}
          <text x="470" y="395" fill="#e11d73" fontSize="7" fontFamily="system-ui" fontStyle="italic">
            * Reducido en MTHFR C677T
          </text>

          {/* Nodes */}
          {CYCLE_NODES.map(n => {
            const isSel = n.id === selected;
            const strokeW = n.type === "gene" ? 2.5 : 1.5;
            return (
              <g key={n.id} style={{ cursor: "pointer" }} onClick={() => setSelected(n.id)}>
                {isSel && <circle cx={n.x} cy={n.y} r={n.r + 9} fill={n.color} fillOpacity="0.2" />}
                <circle cx={n.x} cy={n.y} r={n.r}
                  fill={isSel ? n.color : "#13102a"}
                  stroke={n.color}
                  strokeWidth={isSel ? 0 : strokeW}
                  strokeDasharray={n.type === "cofactor" ? "3,2" : undefined}
                />
                <text x={n.x} y={n.y + (n.sublabel ? -4 : 1)}
                  textAnchor="middle" dominantBaseline="middle"
                  fill={isSel ? (["#f59e0b","#84cc16","#65a30d"].includes(n.color) ? "#111" : "#fff") : n.color}
                  fontSize={n.r >= 26 ? "9" : "8"} fontWeight="700" fontFamily="system-ui"
                >
                  {n.label}
                </text>
                {n.sublabel && (
                  <text x={n.x} y={n.y + (n.r >= 24 ? 9 : 8)} textAnchor="middle"
                    fill={isSel ? "#e5e7eb" : "#6b7280"}
                    fontSize="6.5" fontFamily="system-ui"
                  >
                    {n.sublabel.length > 14 ? n.sublabel.slice(0, 13) + "…" : n.sublabel}
                  </text>
                )}
              </g>
            );
          })}

          {/* Legend */}
          <g transform="translate(12,464)">
            <circle cx="6" cy="6" r="5" fill="#13102a" stroke="#22c55e" strokeWidth="1.5" />
            <text x="14" y="9" fill="#9ca3af" fontSize="7" fontFamily="system-ui">Metabolito</text>
            <circle cx="80" cy="6" r="5" fill="#13102a" stroke="#e11d73" strokeWidth="2.5" />
            <text x="88" y="9" fill="#9ca3af" fontSize="7" fontFamily="system-ui">Gen / Enzima</text>
            <circle cx="155" cy="6" r="5" fill="#13102a" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3,2" />
            <text x="163" y="9" fill="#9ca3af" fontSize="7" fontFamily="system-ui">Cofactor vitamínico</text>
            <circle cx="255" cy="6" r="5" fill="#13102a" stroke="#d946ef" strokeWidth="1.5" />
            <text x="263" y="9" fill="#9ca3af" fontSize="7" fontFamily="system-ui">Producto / Salida</text>
          </g>
        </svg>
      </div>

      {/* Detail panel */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden" style={{ borderTop: `3px solid ${node.color}` }}>
        {/* Node selector */}
        <div className="flex flex-wrap gap-1.5 p-4 bg-gray-50 border-b border-gray-100">
          <p className="w-full text-xs text-gray-400 font-medium mb-1">Selecciona un nodo para ver detalles:</p>
          {CYCLE_NODES.filter(n => n.type === "gene").map(n => (
            <button key={n.id} onClick={() => setSelected(n.id)}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
              style={selected === n.id ? { backgroundColor: n.color, color: "#fff" } : { backgroundColor: "#f3f4f6", color: "#6b7280" }}
            >
              {n.id}
            </button>
          ))}
          {CYCLE_NODES.filter(n => n.type !== "gene").map(n => (
            <button key={n.id} onClick={() => setSelected(n.id)}
              className="px-2 py-0.5 rounded border text-xs transition-all"
              style={selected === n.id ? { borderColor: n.color, backgroundColor: n.color + "22", color: "#374151" } : { borderColor: "#e5e7eb", color: "#9ca3af" }}
            >
              {n.label}
            </button>
          ))}
        </div>

        <div className="p-5 grid md:grid-cols-3 gap-5">
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{node.label}</h3>
              {node.sublabel && <p className="text-xs text-gray-400">{node.sublabel}</p>}
              <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500">
                {node.type === "gene" ? "Gen / Enzima" : node.type === "cofactor" ? "Cofactor vitamínico" : node.type === "output" ? "Producto funcional" : "Metabolito"}
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">{node.description}</p>
          </div>
          <div>
            {node.clinical && (
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-xs font-semibold text-gray-600 mb-1">Relevancia clínica</p>
                <p className="text-xs text-gray-600 leading-relaxed">{node.clinical}</p>
              </div>
            )}
          </div>
          <div>
            {node.mexicanData && (
              <div className="p-3 rounded-xl border-l-2 bg-purple-50/40 whitespace-pre-line" style={{ borderColor: node.color }}>
                <p className="text-xs font-semibold text-gray-600 mb-1">Dato en población mexicana</p>
                <p className="text-xs text-gray-700 leading-relaxed">{node.mexicanData}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
