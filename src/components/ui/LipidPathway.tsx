"use client";
import { useState } from "react";

interface LipidNode {
  id: string;
  label: string;
  sublabel?: string;
  type: "lipoprotein" | "organ" | "gene" | "molecule";
  x: number;
  y: number;
  r: number;
  color: string;
  description: string;
  clinicalNote?: string;
  mexicanData?: string;
}

const NODES: LipidNode[] = [
  /* ── Organs ─── */
  {
    id: "intestine", label: "Intestino", sublabel: "Absorción", type: "organ",
    x: 60, y: 220, r: 36, color: "#64748b",
    description: "Sitio de absorción de colesterol y grasas dietarias. Los quilomicrones se ensamblan en enterocitos y entran a la circulación linfática (no portal directo).",
  },
  {
    id: "liver", label: "Hígado", sublabel: "Central", type: "organ",
    x: 430, y: 200, r: 50, color: "#7c3aed",
    description: "El hígado es el principal regulador del metabolismo lipídico. Sintetiza VLDL, capta quilomicrones remanentes y LDL vía LDLR, y controla la síntesis de colesterol vía HMGCR (diana de estatinas).",
  },
  {
    id: "periphery", label: "Tejidos", sublabel: "Periféricos", type: "organ",
    x: 720, y: 200, r: 32, color: "#0284c7",
    description: "Adipocitos, músculo y otros tejidos captan ácidos grasos libres vía LPL (en capilares). Captan LDL mediante LDLR periférico para sus necesidades de colesterol.",
  },

  /* ── Lipoproteins ─── */
  {
    id: "chylomicron", label: "Quilomicrón", sublabel: "TG-rico", type: "lipoprotein",
    x: 170, y: 130, r: 28, color: "#f59e0b",
    description: "Lipoproteína más grande. Transporta triglicéridos y colesterol absorbidos del intestino hacia tejidos periféricos. ApoB-48 es su apoproteína estructural. LPL (cofactor: ApoC-II, ApoA-V) hidroliza sus TG.",
  },
  {
    id: "remnant", label: "Remanente", sublabel: "de Quilomicrón", type: "lipoprotein",
    x: 310, y: 110, r: 24, color: "#d97706",
    description: "Tras la hidrólisis de TG por LPL, el quilomicrón se convierte en remanente enriquecido en colesterol. El hígado lo capta vía ApoE (receptor LRP1 y LDLR). El genotipo ApoE modula esta captación.",
  },
  {
    id: "vldl", label: "VLDL", sublabel: "Hepático", type: "lipoprotein",
    x: 320, y: 300, r: 26, color: "#8b5cf6",
    description: "Very Low Density Lipoprotein. Sintetizado en hígado para exportar TG endógenos. ApoB-100 es su apoproteína. PCSK9 interactúa con LDLR que capta sus remanentes (IDL y LDL).",
  },
  {
    id: "idl", label: "IDL", sublabel: "Intermedia", type: "lipoprotein",
    x: 480, y: 340, r: 20, color: "#7c3aed",
    description: "Intermediate Density Lipoprotein. Producto de la hidrólisis parcial de VLDL por LPL. Puede ser captado por el hígado o convertido a LDL (con mayor densidad y menor TG).",
  },
  {
    id: "ldl", label: "LDL", sublabel: "Aterogénico", type: "lipoprotein",
    x: 620, y: 300, r: 26, color: "#e11d73",
    description: "Low Density Lipoprotein. Principal transportador de colesterol. LDL elevado es el principal factor causal de aterosclerosis. El LDLR lo capta y PCSK9 controla la disponibilidad de LDLR.",
  },
  {
    id: "hdl", label: "HDL", sublabel: "Cardioprotector", type: "lipoprotein",
    x: 600, y: 100, r: 24, color: "#10b981",
    description: "High Density Lipoprotein. Transporte reverso de colesterol desde tejidos periféricos al hígado. ApoA-I es su proteína principal. CETP transfiere ésteres de colesterol de HDL a LDL/VLDL. HDL bajo es factor de riesgo CV independiente.",
  },

  /* ── Genes / Enzymes ─── */
  {
    id: "LPL", label: "LPL", type: "gene",
    x: 220, y: 220, r: 22, color: "#06b6d4",
    description: "Lipoproteína Lipasa. Enzima anclada en capilares que hidroliza los TG de quilomicrones y VLDL, liberando ácidos grasos para los tejidos. Requiere ApoC-II como cofactor y es activada por APOA5.",
    clinicalNote: "Variantes de LPL (Asn291Ser, Asp9Asn) se asocian con hipertrigliceridemia. Deficiencia completa de LPL causa hiperquilomicronemia severa y pancreatitis.",
    mexicanData: "Variantes de LPL contribuyen a la alta prevalencia de hipertrigliceridemia en México (~37% de adultos). La hipertrigliceridemia es el dislipidemias más frecuente en población mestiza.",
  },
  {
    id: "APOE", label: "APOE", type: "gene",
    x: 360, y: 160, r: 22, color: "#818cf8",
    description: "Apolipoproteína E. Ligando para receptores hepáticos (LDLR, LRP1) en quilomicrones remanentes y VLDL. Los tres alelos principales (ε2, ε3, ε4) tienen diferente afinidad de unión: ε2 < ε3 < ε4.",
    clinicalNote: "APOE ε4 eleva LDL ~10-20 mg/dL y duplica el riesgo de enfermedad de Alzheimer. APOE ε2 se asocia con disbetalipoproteinemia tipo III cuando es homocigoto.",
    mexicanData: "Frecuencia del alelo ε4 ~14-18% en mestizos mexicanos. El contexto de resistencia a insulina frecuente en México potencia el riesgo CV de APOE ε4.",
  },
  {
    id: "HMGCR", label: "HMGCR", type: "gene",
    x: 430, y: 135, r: 22, color: "#f59e0b",
    description: "HMG-CoA Reductasa. Enzima limitante de velocidad en la síntesis de colesterol endógeno (vía del mevalonato). Es la diana farmacológica de las estatinas (lovastatina, atorvastatina, rosuvastatina).",
    clinicalNote: "Variantes genéticas de HMGCR modulan la respuesta a estatinas. Rs17238484 (haplotipos H2) se asocia con menor reducción de LDL (~3-5 mg/dL) con estatinas.",
    mexicanData: "La alta carga de dislipidemias en México hace de HMGCR un gen de alta relevancia clínica. Las estatinas son la primera línea de tratamiento en riesgo cardiometabólico.",
  },
  {
    id: "PCSK9", label: "PCSK9", type: "gene",
    x: 540, y: 240, r: 22, color: "#ef4444",
    description: "Proprotein Convertase Subtilisin/Kexin type 9. Se une al LDLR en la superficie hepática y lo dirige a degradación lisosomal — reduciendo el número de receptores disponibles para captar LDL.",
    clinicalNote: "Variantes de ganancia de función (GOF) en PCSK9 causan hipercolesterolemia familiar. Variantes de pérdida de función (LOF) reducen LDL 30-40% de forma natural. Los inhibidores de PCSK9 (evolocumab, alirocumab) imitan el efecto LOF.",
    mexicanData: "Variantes de PCSK9 son relevantes en el diagnóstico molecular de hipercolesterolemia familiar, subdiagnosticada en México. Evaluación clave en pacientes con LDL >190 mg/dL o historia familiar de ECV prematura.",
  },
  {
    id: "LDLR", label: "LDLR", type: "gene",
    x: 620, y: 200, r: 22, color: "#f43f5e",
    description: "Receptor de LDL. Captura LDL circulante del plasma y lo internaliza para su catabolismo. PCSK9 reduce la disponibilidad de LDLR al marcarlo para degradación. Mutaciones de pérdida de función causan hipercolesterolemia familiar.",
    clinicalNote: "Más de 2,000 mutaciones de LDLR son patogénicas. La hipercolesterolemia familiar heterocigota (LDLR+/-) afecta 1 en 200-300 personas — la enfermedad monogénica más frecuente del metabolismo lipídico.",
    mexicanData: "Se estima que >200,000 mexicanos tienen hipercolesterolemia familiar (HF), pero <5% está diagnosticado. El genotipado de LDLR + APOB + PCSK9 permite el diagnóstico molecular de HF.",
  },
  {
    id: "CETP", label: "CETP", type: "gene",
    x: 610, y: 190, r: 20, color: "#10b981",
    description: "Cholesteryl Ester Transfer Protein. Transfiere ésteres de colesterol desde HDL a VLDL/LDL, a cambio de triglicéridos. La inhibición de CETP eleva HDL significativamente.",
    clinicalNote: "Variantes de CETP (TaqIB rs708272) modulan los niveles de HDL. El alelo B2 se asocia con mayor HDL y menor actividad de CETP. Los inhibidores de CETP (anacetrapib) mostraron reducción de eventos CV en ensayos.",
    mexicanData: "Variantes de CETP contribuyen al bajo HDL característico de la dislipidemia aterogénica en México (patrón: TG alto + HDL bajo + LDL normal pero denso).",
  },
  {
    id: "APOA5", label: "APOA5", type: "gene",
    x: 200, y: 300, r: 18, color: "#06b6d4",
    description: "Apolipoproteína A-V. Activa LPL e inhibe la producción hepática de VLDL. Es un potente regulador de los triglicéridos plasmáticos — variantes de pérdida de función causan hipertrigliceridemia severa.",
    clinicalNote: "La variante rs662799 (-1131T>C) en el promotor de APOA5 se asocia con TG elevados ~20-30 mg/dL en heterocigotos y es un factor genético común de hipertrigliceridemia.",
    mexicanData: "El alelo -1131C de APOA5 tiene ~20-25% de frecuencia en mestizos mexicanos, contribuyendo a la alta prevalencia de hipertrigliceridemia. Frecuencia aún mayor en algunas poblaciones indígenas.",
  },
  {
    id: "SLC16A11", label: "SLC16A11", type: "gene",
    x: 430, y: 280, r: 18, color: "#8b5cf6",
    description: "Transportador de monocarboxilatos (MCT11). Transporta piruvato en la membrana del RE hepático. Su rol en metabolismo lipídico es a través de la regulación del metabolismo de lípidos intrahepáticos y diacilgliceroles.",
    clinicalNote: "Variante rs13342692 aumenta concentración de diacilgliceroles y acilcarnitinas en el hígado, incrementando resistencia a insulina y riesgo de diabetes tipo 2.",
    mexicanData: "HALLAZGO FUNDACIONAL para México: el alelo de riesgo de SLC16A11 tiene ~29% de frecuencia en mestizos mexicanos y ~50% en algunas poblaciones indígenas — vs ~2% en europeos. Es el factor genético de T2D más específico de América indígena, descubierto en el estudio SIGMA (2014). Relevancia directa para el servicio Alelo-Cardiometabólico.",
  },
];

interface Edge {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
  color?: string;
}

const EDGES: Edge[] = [
  { from: "intestine", to: "chylomicron", label: "ApoB-48", color: "#f59e0b" },
  { from: "chylomicron", to: "remnant", label: "LPL ↓TG", color: "#06b6d4" },
  { from: "remnant", to: "liver", label: "APOE→LDLR", color: "#818cf8" },
  { from: "liver", to: "vldl", label: "ApoB-100", color: "#8b5cf6" },
  { from: "vldl", to: "idl", label: "LPL", color: "#06b6d4" },
  { from: "idl", to: "ldl", color: "#e11d73" },
  { from: "ldl", to: "periphery", label: "LDLR", color: "#e11d73" },
  { from: "ldl", to: "liver", label: "LDLR↑\nPCSK9↓", dashed: true, color: "#ef4444" },
  { from: "liver", to: "hdl", label: "ApoA-I", color: "#10b981" },
  { from: "hdl", to: "ldl", label: "CETP", dashed: true, color: "#10b981" },
  { from: "periphery", to: "hdl", label: "ABCA1", dashed: true, color: "#10b981" },
];

function getNodeById(id: string) { return NODES.find(n => n.id === id); }

export default function LipidPathway() {
  const [selected, setSelected] = useState<string>("PCSK9");
  const node = NODES.find(n => n.id === selected)!;

  return (
    <div className="space-y-0">
      {/* SVG */}
      <div className="rounded-2xl overflow-hidden bg-[#0a0818] border border-white/5">
        <svg viewBox="0 0 780 400" width="100%" preserveAspectRatio="xMidYMid meet" className="block">
          <defs>
            <marker id="arr-lipid" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
              <polygon points="0 0, 6 2.5, 0 5" fill="#4b5563" />
            </marker>
            <marker id="arr-lipid-em" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
              <polygon points="0 0, 6 2.5, 0 5" fill="#e11d73" />
            </marker>
            <filter id="glow-lipid">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Edges first (behind nodes) */}
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
                  strokeOpacity="0.7"
                  markerEnd="url(#arr-lipid)"
                />
                {e.label && (
                  <text x={mx} y={my - 5} textAnchor="middle" fill={ec} fontSize="7.5" fontFamily="system-ui" fontWeight="600" fillOpacity="0.9">
                    {e.label.split("\n").map((line, i) => (
                      <tspan key={i} x={mx} dy={i === 0 ? 0 : 10}>{line}</tspan>
                    ))}
                  </text>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {NODES.map(n => {
            const isSel = n.id === selected;
            const isGene = n.type === "gene";
            return (
              <g key={n.id} style={{ cursor: "pointer" }} onClick={() => setSelected(n.id)}>
                {isSel && <circle cx={n.x} cy={n.y} r={n.r + 8} fill={n.color} fillOpacity="0.2" />}
                <circle
                  cx={n.x} cy={n.y} r={n.r}
                  fill={isSel ? n.color : "#1a1535"}
                  stroke={n.color}
                  strokeWidth={isSel ? 0 : (isGene ? 2 : 1.5)}
                  strokeDasharray={isGene ? undefined : (n.type === "lipoprotein" ? "3,2" : undefined)}
                />
                <text x={n.x} y={n.y + 1} textAnchor="middle" dominantBaseline="middle"
                  fill={isSel ? (n.type === "gene" ? "#0f0b1e" : "#fff") : n.color}
                  fontSize={n.r > 30 ? "11" : n.r > 22 ? "9" : "8"}
                  fontWeight="700" fontFamily="system-ui"
                >
                  {n.label}
                </text>
                {n.sublabel && (
                  <text x={n.x} y={n.y + (n.r > 25 ? 14 : 11)} textAnchor="middle"
                    fill={isSel ? "#e5e7eb" : "#6b7280"}
                    fontSize="7" fontFamily="system-ui"
                  >
                    {n.sublabel}
                  </text>
                )}
              </g>
            );
          })}

          {/* Legend */}
          <g transform="translate(12, 355)">
            <circle cx="6" cy="6" r="5" fill="#1a1535" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="14" y="9" fill="#9ca3af" fontSize="7" fontFamily="system-ui">Lipoproteína</text>
            <circle cx="80" cy="6" r="5" fill="#1a1535" stroke="#06b6d4" strokeWidth="2" />
            <text x="88" y="9" fill="#9ca3af" fontSize="7" fontFamily="system-ui">Gen / Enzima</text>
            <circle cx="155" cy="6" r="5" fill="#1a1535" stroke="#64748b" strokeWidth="1.5" />
            <text x="163" y="9" fill="#9ca3af" fontSize="7" fontFamily="system-ui">Órgano</text>
            <line x1="220" y1="6" x2="240" y2="6" stroke="#4b5563" strokeWidth="1.5" strokeDasharray="3,2" />
            <text x="244" y="9" fill="#9ca3af" fontSize="7" fontFamily="system-ui">Flujo reverso / indirecto</text>
          </g>
        </svg>
      </div>

      {/* Detail panel */}
      <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden" style={{ borderTop: `3px solid ${node.color}` }}>
        {/* Node selector */}
        <div className="flex flex-wrap gap-1.5 p-4 bg-gray-50 border-b border-gray-100">
          <p className="w-full text-xs text-gray-400 font-medium mb-1">Genes clínicamente relevantes — selecciona para detalles:</p>
          {NODES.filter(n => n.type === "gene").map(n => (
            <button key={n.id} onClick={() => setSelected(n.id)}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
              style={selected === n.id ? { backgroundColor: n.color, color: n.color === "#f59e0b" ? "#111" : "#fff" } : { backgroundColor: "#f3f4f6", color: "#6b7280" }}
            >
              {n.id}
            </button>
          ))}
          {NODES.filter(n => n.type !== "gene").map(n => (
            <button key={n.id} onClick={() => setSelected(n.id)}
              className="px-2 py-0.5 rounded text-xs transition-all border"
              style={selected === n.id ? { borderColor: n.color, backgroundColor: n.color + "20", color: "#374151" } : { borderColor: "#e5e7eb", color: "#9ca3af" }}
            >
              {n.label}
            </button>
          ))}
        </div>

        <div className="p-5 grid md:grid-cols-3 gap-5">
          <div className="md:col-span-1 space-y-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{node.label}</h3>
              {node.sublabel && <p className="text-xs text-gray-400">{node.sublabel}</p>}
              <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500">
                {node.type === "gene" ? "Gen / Enzima" : node.type === "lipoprotein" ? "Lipoproteína" : "Órgano"}
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">{node.description}</p>
          </div>
          <div>
            {node.clinicalNote && (
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                <p className="text-xs font-semibold text-gray-600">Relevancia clínica</p>
                <p className="text-xs text-gray-600 leading-relaxed">{node.clinicalNote}</p>
              </div>
            )}
          </div>
          <div>
            {node.mexicanData && (
              <div className="p-3 rounded-xl border-l-2 bg-purple-50/40" style={{ borderColor: node.color }}>
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
