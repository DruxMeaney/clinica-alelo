import type { Metadata } from "next";
import Link from "next/link";
import GlowOrbs from "@/components/ui/GlowOrbs";
import CYP450Pathway from "@/components/ui/CYP450Pathway";
import LipidPathway from "@/components/ui/LipidPathway";
import FolateCycle from "@/components/ui/FolateCycle";

export const metadata: Metadata = {
  title: "Vías metabólicas y fundamento científico",
  description:
    "Sistema CYP450, metabolismo lipídico y ciclo del folato: las vías moleculares que conectan genética, farmacología y riesgo cardiometabólico en la práctica clínica.",
};

const EVIDENCE_GENES = [
  { gene: "CYP2D6", service: "PGx", cpic: "A", pharmgkb: "1A", variants: "*4, *5, *10, *41", clinical: "Opioides, tamoxifeno, antidepresivos, antipsicóticos", mexican: "PM ~7-10% (similar europeo); *10 frecuente en mestizos" },
  { gene: "CYP2C19", service: "PGx", cpic: "A", pharmgkb: "1A", variants: "*2, *3, *17", clinical: "Clopidogrel, IBPs, SSRIs, voriconazol", mexican: "UM *17 ~5-7%; PM ~3-5%; relevante en cardiopatía isquémica" },
  { gene: "CYP2C9", service: "PGx", cpic: "A", pharmgkb: "1A", variants: "*2, *3", clinical: "Warfarina (S), AINEs, antidiabéticos orales", mexican: "*3 ~2-4% (menor que europeos); crucial en anticoagulación" },
  { gene: "CYP3A4/5", service: "PGx", cpic: "A", pharmgkb: "1A", variants: "*22, CYP3A5*3", clinical: ">50% de fármacos: estatinas, inmunosupresores, BZD", mexican: "CYP3A5*3 ~83-92% (no expresor); relevante en trasplante" },
  { gene: "SLCO1B1", service: "PGx", cpic: "A", pharmgkb: "1A", variants: "*5 rs4149056", clinical: "Simvastatina — miopatía; atorvastatina", mexican: "*5 ~14-17% en mestizos; alta prevalencia uso de estatinas" },
  { gene: "UGT1A1", service: "PGx", cpic: "A", pharmgkb: "1A", variants: "*28, *6", clinical: "Irinotecán, belinostat, nilotinib", mexican: "*28 ~40% frecuencia; síndrome Gilbert frecuente" },
  { gene: "TPMT/NUDT15", service: "PGx", cpic: "A", pharmgkb: "1A", variants: "*3C, NUDT15*3", clinical: "Azatioprina, 6-MP, tioguanina", mexican: "NUDT15*3 ~5-8% (mayor que europeos); riesgo mielosupresión" },
  { gene: "DPYD", service: "PGx", cpic: "A", pharmgkb: "1A", variants: "*2A, rs67376798", clinical: "5-Fluorouracilo, capecitabina", mexican: "IM ~7-10%; alta carga de cáncer GI en México" },
  { gene: "VKORC1", service: "PGx", cpic: "A", pharmgkb: "1A", variants: "-1639G>A rs9923231", clinical: "Warfarina (dosis), acenocumarol", mexican: "Alelo A sensible ~37% latinoamericanos" },
  { gene: "MTHFR", service: "Nutrigenómica", cpic: "B", pharmgkb: "2A", variants: "C677T, A1298C", clinical: "Homocisteína, folato activo, defectos tubo neural", mexican: "TT ~18-32%: uno de los más altos mundialmente" },
  { gene: "APOE", service: "Cardiometabólico", cpic: "—", pharmgkb: "1A", variants: "ε2/ε3/ε4 (rs429358, rs7412)", clinical: "LDL, riesgo CV, riesgo Alzheimer", mexican: "ε4 ~14-18%; contexto de resistencia a insulina amplifica riesgo" },
  { gene: "PCSK9", service: "Cardiometabólico", cpic: "—", pharmgkb: "2A", variants: "GOF / LOF variants", clinical: "LDL: diagnóstico HF; diana de evolocumab", mexican: "HF subdiagnosticada; variantes GOF en LDL >190 mg/dL" },
  { gene: "SLC16A11", service: "Cardiometabólico", cpic: "—", pharmgkb: "2A", variants: "rs13342692 (haplotipo de riesgo)", clinical: "Diabetes tipo 2, diacilgliceroles hepáticos, resistencia insulina", mexican: "~29% mestizos, ~50% indígenas: el variante T2D más específico de América" },
  { gene: "ACTN3", service: "Rendimiento", cpic: "—", pharmgkb: "—", variants: "R577X rs1815739", clinical: "Fuerza muscular, velocidad vs resistencia", mexican: "XX ~18-25% en mestizos; influye en tipo de fibra muscular" },
  { gene: "ACE I/D", service: "Cardiometabólico / Rendimiento", cpic: "—", pharmgkb: "2B", variants: "rs4646994 (I/D)", clinical: "HTA, respuesta a IECA, rendimiento aeróbico", mexican: "Alelo I ~50% en mestizos; DD asociado a HTA y respuesta al ejercicio" },
];

const DATABASES = [
  { name: "CPIC", url: "https://cpicpgx.org", description: "Clinical Pharmacogenetics Implementation Consortium. Guías farmacogenómicas basadas en evidencia con recomendaciones de dosificación por genotipo.", badge: "Guías Nivel A-D", color: "#16a34a" },
  { name: "PharmGKB", url: "https://pharmgkb.org", description: "Pharmacogenomics Knowledge Base. Base de datos curada de asociaciones gen-fármaco, rutas farmacogenómicas y literatura anotada.", badge: "Evidence 1A-4", color: "#7c3aed" },
  { name: "ClinVar", url: "https://ncbi.nlm.nih.gov/clinvar", description: "Base de datos del NCBI para variantes genéticas con significancia clínica documentada (Patogénica, Benigna, VUS, etc.).", badge: "ACMG/AMP", color: "#0284c7" },
  { name: "gnomAD", url: "https://gnomad.broadinstitute.org", description: "Genome Aggregation Database. Frecuencias alélicas poblacionales en >730,000 exomas y genomas de múltiples poblaciones incluyendo Latino/Admixed American.", badge: "v4 >730k", color: "#0891b2" },
  { name: "PharmVar", url: "https://pharmvar.org", description: "Pharmacogene Variation Consortium. Nomenclatura oficial de alelos estrella (*1, *2…) para genes farmacogenómicos (CYP2D6, CYP2C19, etc.).", badge: "Star alleles", color: "#e11d73" },
  { name: "OMIM", url: "https://omim.org", description: "Online Mendelian Inheritance in Man. Catálogo de genes y fenotipos genéticos, incluyendo herencia monogénica relevante para enfermedades del metabolismo.", badge: "Mendelian", color: "#f59e0b" },
  { name: "Reactome", url: "https://reactome.org", description: "Base de datos curada de rutas biológicas y reacciones moleculares. Fuente para diagramas de vías del ciclo del folato, metabolismo lipídico y farmacología.", badge: "Pathways", color: "#8b5cf6" },
  { name: "SIGMA / SIGMA2", url: "https://www.broadinstitute.org/sigma-type-2-diabetes-consortium", description: "Slim Initiative for Genomic Medicine for the Diseases of the Americas. Consorcio que identificó SLC16A11 y otros factores genéticos específicos de diabetes tipo 2 en México.", badge: "T2D México", color: "#dc2626" },
];

const SERVICE_COLOR: Record<string, string> = {
  "PGx": "#8b2fa0",
  "Nutrigenómica": "#0284c7",
  "Cardiometabólico": "#e11d73",
  "Rendimiento": "#059669",
  "Cardiometabólico / Rendimiento": "#7c3aed",
};

function PharmGKBBadge({ level }: { level: string }) {
  if (level === "—") return <span className="text-gray-400 text-xs">—</span>;
  const color = level === "1A" ? "#16a34a" : level === "2A" ? "#0284c7" : level === "2B" ? "#6b7280" : "#9ca3af";
  return <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: color + "20", color }}>{level}</span>;
}

function CPICBadge({ level }: { level: string }) {
  if (level === "—") return <span className="text-gray-400 text-xs">—</span>;
  const color = level === "A" ? "#16a34a" : "#0284c7";
  return <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: color + "20", color }}>CPIC {level}</span>;
}

export default function ViasMetabolicasPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden gradient-alelo-dark py-20 md:py-24">
        <GlowOrbs />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
            <span className="text-xs font-medium text-purple-300 tracking-wider uppercase">Fundamento Científico</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Vías metabólicas y bases moleculares
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl">
            Tres ejes moleculares conectan genética, farmacología y riesgo cardiometabólico.
            Diagramas interactivos con datos de CPIC, PharmGKB, gnomAD y estudios en población mexicana.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {["Sistema CYP450", "Metabolismo lipídico", "Ciclo del folato / metilación"].map(s => (
              <span key={s} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">{s}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-24">

        {/* ── Section 1: CYP450 ───────────────────────────────── */}
        <section>
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">1</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Metabolismo de fármacos — Sistema CYP450</h2>
              <p className="text-gray-500 mt-1 text-sm">Farmacogenómica · Enzimas de Fase I y Fase II · Transportadores</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-blue-50/40 border border-blue-100 mb-6">
            <p className="text-sm text-gray-700 leading-relaxed">
              Las enzimas del citocromo P450 y las de Fase II determinan la concentración activa de un fármaco en el organismo.
              Variantes genéticas en estos genes clasifican a cada persona en un <strong>fenotipo metabolizador</strong> (pobre, intermedio,
              normal, o ultrarrápido), lo que impacta directamente en la eficacia y toxicidad de cientos de medicamentos.
              El servicio <strong>Alelo-PGx</strong> traduce estos genotipos en recomendaciones clínicas basadas en guías CPIC.
            </p>
          </div>
          <CYP450Pathway />
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { stat: "~25%", label: "fármacos metabolizados por CYP2D6" },
              { stat: ">50%", label: "fármacos metabolizados por CYP3A4/5" },
              { stat: "CPIC A", label: "nivel máximo de evidencia para PGx" },
              { stat: "~7-10%", label: "de mexicanos son PM de CYP2D6" },
            ].map(s => (
              <div key={s.stat} className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-center">
                <p className="text-xl font-bold text-[#8b2fa0]">{s.stat}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 2: Lipid Pathway ────────────────────────── */}
        <section>
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 font-bold text-sm">2</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Metabolismo lipídico y riesgo cardiovascular</h2>
              <p className="text-gray-500 mt-1 text-sm">Servicio Alelo-Cardiometabólico · APOE, PCSK9, LDLR, HMGCR, SLC16A11</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-pink-50/40 border border-pink-100 mb-6">
            <p className="text-sm text-gray-700 leading-relaxed">
              La aterosclerosis y la dislipidemia tienen una base genética significativa. La red de genes que regula
              la síntesis, transporte y eliminación del colesterol y los triglicéridos determina el perfil lipídico
              individual. <strong>SLC16A11</strong>, descubierto por el Consorcio SIGMA en 2014, es el factor genético
              de riesgo para diabetes tipo 2 más específico de la población indígena americana —
              con frecuencia de alelo de riesgo de ~29% en mestizos mexicanos vs ~2% en europeos.
            </p>
          </div>
          <LipidPathway />
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { stat: "37%", label: "de adultos mexicanos con hipertrigliceridemia" },
              { stat: "~29%", label: "de mestizos con alelo de riesgo SLC16A11" },
              { stat: ">200k", label: "mexicanos con hipercolesterolemia familiar estimados" },
              { stat: "<5%", label: "de casos de HF diagnosticados en México" },
            ].map(s => (
              <div key={s.stat} className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-center">
                <p className="text-xl font-bold text-[#e11d73]">{s.stat}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 3: Folate Cycle ─────────────────────────── */}
        <section>
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm">3</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Ciclo del folato y capacidad de metilación</h2>
              <p className="text-gray-500 mt-1 text-sm">Nutrigenómica · MTHFR, MTR, CBS · Epigenética y homocisteína</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-green-50/40 border border-green-100 mb-6">
            <p className="text-sm text-gray-700 leading-relaxed">
              El ciclo del folato integra la vitamina B9 en la síntesis de ADN, la metilación epigenética y la
              regulación de la homocisteína. <strong>MTHFR C677T</strong> es la variante genética más frecuente del
              metabolismo de un carbono — y México tiene una de las prevalencias mundiales más altas (TT homocigoto
              ~18-32%), contribuyendo a defectos de tubo neural, riesgo cardiovascular y capacidad de metilación reducida.
              El tratamiento de elección es el <strong>L-metilfolato (5-MTHF)</strong>, que bypasea el bloqueo enzimático.
            </p>
          </div>
          <FolateCycle />
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { stat: "~18-32%", label: "de mexicanos con genotipo TT de MTHFR C677T" },
              { stat: "~40%", label: "TT en algunas poblaciones indígenas de México" },
              { stat: ">200", label: "reacciones de metilación dependen de SAM" },
              { stat: "7-14/10k", label: "nacidos vivos con defectos de tubo neural en México" },
            ].map(s => (
              <div key={s.stat} className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-center">
                <p className="text-xl font-bold text-[#16a34a]">{s.stat}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 4: Evidence Table ───────────────────────── */}
        <section>
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm">4</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Matriz de evidencia genómica</h2>
              <p className="text-gray-500 mt-1 text-sm">Todos los genes del panel Alelo con niveles de evidencia CPIC y PharmGKB</p>
            </div>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Gen</th>
                  <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Servicio</th>
                  <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">CPIC</th>
                  <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">PharmGKB</th>
                  <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Variantes clave</th>
                  <th className="text-left p-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Relevancia en México</th>
                </tr>
              </thead>
              <tbody>
                {EVIDENCE_GENES.map((row, i) => (
                  <tr key={row.gene} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="p-3">
                      <span className="font-mono font-bold text-gray-900 text-xs">{row.gene}</span>
                    </td>
                    <td className="p-3">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ backgroundColor: (SERVICE_COLOR[row.service] ?? "#8b2fa0") + "18", color: SERVICE_COLOR[row.service] ?? "#8b2fa0" }}
                      >
                        {row.service}
                      </span>
                    </td>
                    <td className="p-3"><CPICBadge level={row.cpic} /></td>
                    <td className="p-3"><PharmGKBBadge level={row.pharmgkb} /></td>
                    <td className="p-3 hidden md:table-cell">
                      <span className="text-xs text-gray-500 font-mono">{row.variants}</span>
                    </td>
                    <td className="p-3 hidden lg:table-cell">
                      <span className="text-xs text-gray-600">{row.mexican}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-400">
            <span><strong className="text-green-700">CPIC A</strong> — Recomendación de prescripción fuerte, evidencia alta</span>
            <span><strong className="text-blue-600">CPIC B</strong> — Recomendación moderada</span>
            <span><strong className="text-green-700">PharmGKB 1A</strong> — Asociación farmacogenómica de nivel máximo</span>
            <span><strong className="text-blue-600">PharmGKB 2A</strong> — Asociación moderada</span>
          </div>
        </section>

        {/* ── Section 5: Databases ────────────────────────────── */}
        <section>
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-bold text-sm">5</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Fuentes y bases de datos de referencia</h2>
              <p className="text-gray-500 mt-1 text-sm">Las interpretaciones de Alelo se basan en fuentes de acceso abierto con actualización continua</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DATABASES.map(db => (
              <div key={db.name} className="p-4 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 transition-colors space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">{db.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: db.color + "18", color: db.color }}
                  >
                    {db.badge}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{db.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-5 rounded-2xl bg-gray-50 border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Estándares de nomenclatura y clasificación</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-gray-600">
              <div>
                <strong>ACMG/AMP (2015, actualizado 2023):</strong> Marco estándar de 5 categorías para clasificación de variantes:
                Patogénica · Probablemente patogénica · VUS (Variante de significado incierto) · Probablemente benigna · Benigna.
                Alelo reporta variantes inesperadas de alta penetrancia bajo este marco cuando aplica.
              </div>
              <div>
                <strong>Nomenclatura estrella (PharmVar / CPIC):</strong> Los genes farmacogenómicos usan alelos estrella
                (*1 = función normal, *2, *3, etc.) para definir haplotipos funcionalmente relevantes.
                Las guías CPIC definen el fenotipo predicho (PM/IM/NM/UM) a partir del diplotipogenotipo observado.
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pt-4 border-t border-gray-100 flex flex-wrap gap-4">
          <Link href="/servicios" className="px-6 py-3 bg-[#8b2fa0] text-white font-medium rounded-lg hover:bg-[#6b1d7b] transition-colors">
            Ver servicios Alelo
          </Link>
          <Link href="/ciencia" className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-[#8b2fa0] hover:text-[#8b2fa0] transition-colors">
            Índice Alelo y panel genómico
          </Link>
          <Link href="/contacto" className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-[#8b2fa0] hover:text-[#8b2fa0] transition-colors">
            Agenda una consulta
          </Link>
        </section>
      </div>
    </>
  );
}
