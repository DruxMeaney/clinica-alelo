"use client";

import { useState } from "react";
import Link from "next/link";
import GlowOrbs from "@/components/ui/GlowOrbs";
import GeneNetwork from "@/components/ui/GeneNetwork";
import PopulationFrequencyChart from "@/components/ui/PopulationFrequencyChart";
import ScienceNav from "@/components/ui/ScienceNav";
import GWASChart from "@/components/ui/GWASChart";
import ReactomeEnrichment from "@/components/ui/ReactomeEnrichment";

/* ─── Functional impact mini-chart (PolyPhen / SIFT / ClinVar) ─── */
type FuncRow = { gene: string; variant: string; polyphen: string; sift: string; clinvar: string; note: string };

const FUNCTIONAL_DATA: FuncRow[] = [
  { gene: "PCSK9",    variant: "rs11591147",  polyphen: "Benigno",    sift: "Tolerado",  clinvar: "P/LP",      note: "LOF — reduce LDL 30–40%" },
  { gene: "APOE",     variant: "rs429358",    polyphen: "Posiblemente dañino", sift: "Dañino", clinvar: "P/LP", note: "ε4 → riesgo CV y Alzheimer" },
  { gene: "MTHFR",    variant: "rs1801133",   polyphen: "Benigno",    sift: "Tolerado",  clinvar: "VUS/B",     note: "Reduce actividad enzimática 35–70%" },
  { gene: "TCF7L2",   variant: "rs7903146",   polyphen: "N/A (UTR)",  sift: "N/A",       clinvar: "P/LP",      note: "Mayor OR conocido para T2D: 1.4" },
  { gene: "SLC16A11", variant: "rs13342232",  polyphen: "Dañino",     sift: "Dañino",    clinvar: "P/LP",      note: "Haplotipo SIGMA, alto AMR" },
  { gene: "CYP2C19",  variant: "rs4244285",   polyphen: "Posiblemente dañino", sift: "Dañino", clinvar: "P/LP", note: "*2 — metabolizador pobre clopidogrel" },
  { gene: "CYP2D6",   variant: "rs3892097",   polyphen: "Dañino",     sift: "Dañino",    clinvar: "P/LP",      note: "*4 — afecta >50 fármacos" },
  { gene: "LDLR",     variant: "rs28942078",  polyphen: "Probablemente dañino", sift: "Dañino", clinvar: "P/LP", note: "Hipercolesterolemia familiar" },
  { gene: "ACTN3",    variant: "rs1815739",   polyphen: "Dañino",     sift: "Dañino",    clinvar: "Benigno",   note: "R577X — afecta fibra tipo II" },
  { gene: "FTO",      variant: "rs9939609",   polyphen: "N/A (intrónico)", sift: "N/A",  clinvar: "P/LP",      note: "OR 1.67 por alelo A para obesidad" },
];

const CLINVAR_COLOR: Record<string, string> = {
  "P/LP":     "#e11d73",
  "VUS/B":    "#7c3aed",
  "Benigno":  "#6b7280",
};

/* ─── Alelo Index modules ─── */
const MODULES = [
  { n: 1, name: "Regulación del peso",   snvs: 7,  genes: "FTO, BDNF, ADRB3, PPARG",         color: "#8b2fa0" },
  { n: 2, name: "Diabetes tipo 2",        snvs: 22, genes: "SLC16A11, TCF7L2, CDKAL1, IGF2BP2",color: "#e11d73" },
  { n: 3, name: "Respuesta al ejercicio", snvs: 11, genes: "ACTN3, ACE, PPARGC1A, MSTN",       color: "#7c3aed" },
  { n: 4, name: "Salud cardiovascular",   snvs: 22, genes: "APOE, LDLR, PCSK9, ACE, NOS3",    color: "#0284c7" },
  { n: 5, name: "Nutrigenómica",          snvs: 13, genes: "MTHFR, VDR, SOD1, SOD2",          color: "#059669" },
  { n: 6, name: "Farmacogenética",        snvs: 13, genes: "CYP2C19, CYP2D6, CYP3A4",         color: "#d97706" },
  { n: 7, name: "Bienestar general",      snvs:  6, genes: "CLOCK, PER2, DRD2, FKBP5",        color: "#64748b" },
];

const SECTION_STYLE = { scrollMarginTop: "56px" } as React.CSSProperties;

export default function CienciaPage() {
  const [activeFunc, setActiveFunc] = useState<string | null>(null);

  return (
    <>
      {/* ── HERO ── */}
      <section id="science-hero" className="relative overflow-hidden gradient-alelo-dark py-28 md:py-36">
        <GlowOrbs />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-xs font-medium text-purple-300 tracking-wider uppercase">
              Historia científica — 7 secciones
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight max-w-3xl leading-tight">
            De la variante al diagnóstico:<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e11d73] to-[#7c3aed]">
              la genómica clínica de México
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl leading-relaxed">
            94 variantes genéticas seleccionadas por evidencia robusta de GWAS, validadas
            funcionalmente, calibradas a frecuencias poblacionales mexicanas, e integradas en un
            modelo probabilístico que convierte señales moleculares en orientación clínica accionable.
          </p>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-gray-400">
            {[
              ["94", "SNVs analizadas"],
              ["57", "genes, 7 módulos"],
              ["5", "poblaciones de referencia"],
              ["3", "modelos de herencia"],
            ].map(([n, l]) => (
              <div key={l} className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">{n}</span>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STICKY NAV ── */}
      <ScienceNav />

      {/* ══════════════════════════════════════════════════════════
          01 — CONTEXTO
      ══════════════════════════════════════════════════════════ */}
      <section id="contexto" style={SECTION_STYLE} className="py-20 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-[#8b2fa0] bg-purple-50 px-2 py-1 rounded-full">01</span>
            <h2 className="text-3xl font-bold text-gray-900">El problema: la brecha genómica en México</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start mt-8">
            <div className="lg:col-span-2 space-y-5 text-gray-600 leading-relaxed">
              <p>
                En 2023, las enfermedades del corazón y la diabetes mellitus representaron el <strong className="text-gray-900">37%
                de las defunciones</strong> registradas en México —más de 220,000 muertes anuales. La carga
                cardiometabólica del país es una de las más altas del continente, y la brecha entre la
                investigación genómica y la práctica clínica preventiva sigue siendo profunda.
              </p>
              <p>
                La mayor parte de los estudios de asociación del genoma completo (GWAS) publicados se han
                realizado en cohortes de ascendencia europea. Extrapolar esos hallazgos directamente a
                la población mexicana —de composición genética indígena, europea y africana mezclada— puede
                ser metodológicamente inadecuado y clínicamente irrelevante.
              </p>
              <p>
                El caso paradigmático es <strong className="text-gray-900">SLC16A11</strong>: un haplotipo de riesgo para diabetes tipo 2
                identificado por la iniciativa SIGMA (Slim Initiative in Genomic Medicine for the Americas)
                con frecuencia ~30% en población mexicana, frente a &lt;2% en poblaciones europeas. Un riesgo
                invisible para las herramientas construidas solo con cohortes europeas.
              </p>
              <p>
                Clínica Alelo responde a este vacío con un panel diseñado para —y calibrado en—
                la población mexicana, integrando datos de <em>1000 Genomes</em>, <em>HapMap</em>,
                <em>gnomAD v4</em> y la cohorte SIGMA.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { val: "37%", desc: "de muertes en México por causas cardiometabólicas (2023)", color: "#e11d73" },
                { val: "~30%", desc: "frecuencia del haplotipo SLC16A11 en mexicanos vs. <2% en europeos", color: "#8b2fa0" },
                { val: ">95%", desc: "de GWAS publicados en cohortes europeas (diversidad insuficiente)", color: "#7c3aed" },
              ].map(({ val, desc, color }) => (
                <div key={val} className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
                  <p className="text-3xl font-bold mb-1" style={{ color }}>{val}</p>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          02 — PANEL
      ══════════════════════════════════════════════════════════ */}
      <section id="panel" style={SECTION_STYLE} className="py-20 bg-[#0a0818]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-[#e11d73] bg-pink-900/30 px-2 py-1 rounded-full">02</span>
            <h2 className="text-3xl font-bold text-white">El panel genómico: 94 variantes con evidencia sólida</h2>
          </div>

          <p className="text-gray-400 max-w-3xl mt-4 leading-relaxed mb-10">
            No todas las variantes genéticas tienen igual peso clínico. Para conformar el panel se
            aplicaron criterios estrictos de selección: evidencia GWAS con significancia a nivel
            genómico (p &lt; 5×10⁻⁸), relevancia fenotípica documentada en bases de datos curadas
            (GWAS Catalog, ClinVar, PharmGKB), y representación adecuada en poblaciones amerindias
            y mestizas. El resultado es un conjunto de 94 SNVs con cobertura en los principales
            ejes de riesgo cardiometabólico, farmacogenómico y nutricional.
          </p>

          {/* Criterios de selección */}
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {[
              { title: "Criterio GWAS", body: "p-value ≤ 5×10⁻⁸ en al menos un estudio de cohorte grande (N>10,000). Preferencia por estudios que incluyen poblaciones amerindias." },
              { title: "Accionabilidad clínica", body: "Variante asociada a riesgo modificable mediante dieta, ejercicio, fármaco o seguimiento médico específico. Priorizadas con CPIC nivel A–B o ClinVar P/LP." },
              { title: "Calibración poblacional", body: "Frecuencia alélica disponible en AMR (1000G) o MEX (HapMap). Variantes monomórficas o de frecuencia <1% en la población diana fueron excluidas." },
            ].map(({ title, body }) => (
              <div key={title} className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <h4 className="text-sm font-semibold text-white mb-2">{title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          {/* GWAS Chart */}
          <h3 className="text-lg font-semibold text-white mb-2">
            Asociaciones GWAS — panel Alelo
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Magnitud de asociación (-log₁₀ p) para variantes clave del panel. Datos de GWAS Catalog + archivo gwas_SNV1.txt.
            La línea vertical indica el umbral de significancia genómica estándar (p = 5×10⁻⁸).
          </p>
          <GWASChart />

          <p className="text-xs text-gray-600 mt-4">
            Fuentes: GWAS Catalog (EMBL-EBI / NHGRI), SIGMA 2014, bases de datos propias analisisBD/.
            Valores extremos (PCSK9 p≈3×10⁻²⁵⁷, TCF7L2 p≈2×10⁻¹⁷⁶) se muestran truncados con marcador ▶▶.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          03 — FUNCIÓN
      ══════════════════════════════════════════════════════════ */}
      <section id="funcion" style={SECTION_STYLE} className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-[#7c3aed] bg-violet-50 px-2 py-1 rounded-full">03</span>
            <h2 className="text-3xl font-bold text-gray-900">Impacto funcional: ¿qué hace cada variante?</h2>
          </div>

          <div className="mt-4 space-y-5 text-gray-600 leading-relaxed max-w-3xl mb-10">
            <p>
              Una asociación estadística no implica mecanismo biológico. Por eso, cada variante del
              panel fue anotada funcionalmente con herramientas in silico: <strong>PolyPhen-2</strong>
              (predicción de daño estructural a proteína), <strong>SIFT</strong> (tolerancia evolutiva),
              y contraste contra la base de datos <strong>ClinVar</strong> (clasificación clínica P/LP/VUS/B).
            </p>
            <p>
              No todas las variantes con fuerte asociación GWAS tienen impacto proteico directo: muchas
              son no sinónimas, intrónicas o en UTR, e influyen mediante regulación de la expresión génica
              en lugar de cambiar la secuencia aminoacídica. Esta anotación diferencial justifica la
              asignación de pesos heterogéneos en el Índice Alelo.
            </p>
          </div>

          {/* Tabla funcional interactiva */}
          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Gen</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Variante</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">PolyPhen-2</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">SIFT</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">ClinVar</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Nota clínica</th>
                </tr>
              </thead>
              <tbody>
                {FUNCTIONAL_DATA.map((row) => (
                  <tr
                    key={row.variant}
                    onClick={() => setActiveFunc(activeFunc === row.variant ? null : row.variant)}
                    className={`border-b border-gray-50 cursor-pointer transition-colors ${
                      activeFunc === row.variant ? "bg-purple-50" : "hover:bg-gray-50/60"
                    }`}
                  >
                    <td className="px-4 py-3 font-mono text-[#8b2fa0] font-semibold">{row.gene}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{row.variant}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{row.polyphen}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{row.sift}</td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs font-mono px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: CLINVAR_COLOR[row.clinvar] ?? "#6b7280" }}
                      >
                        {row.clinvar}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            P/LP = Patogénico / Probablemente patogénico · VUS = Variante de significado incierto · B = Benigno.
            Fuentes: ClinVar (NCBI), PolyPhen-2 (Harvard), SIFT (JCVI). Haz clic en una fila para resaltarla.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          04 — POBLACIÓN
      ══════════════════════════════════════════════════════════ */}
      <section id="poblacion" style={SECTION_STYLE} className="py-20 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-[#0284c7] bg-sky-50 px-2 py-1 rounded-full">04</span>
            <h2 className="text-3xl font-bold text-gray-900">Base poblacional: por qué importa el origen</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 mt-6 mb-10">
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p>
                Las frecuencias alélicas —la proporción de individuos en una población que porta
                una variante— determinan directamente la sensibilidad del panel. Una variante con
                frecuencia 30% en México pero 2% en Europa tiene un perfil de riesgo clínico
                completamente distinto en cada contexto.
              </p>
              <p>
                El panel Alelo utiliza como referencia de calibración datos de <strong>1000 Genomes
                Phase 3</strong> (columna AMR: ancestría mixta americana, n=347), <strong>HapMap Phase 3</strong>
                (columna MEX: mexicanos de Los Angeles, n=86), y la cohorte <strong>SIGMA 2014</strong>
                (mexicanos de Ciudad de México y Monterrey, n&gt;3,000).
              </p>
              <p>
                Para MTHFR rs1801133, la frecuencia del alelo T en mexicanos oscila entre 42–47%
                según la cohorte (versus ~30% en europeos), lo que implica que ~18–22% de la
                población mexicana es homocigoto TT, con reducción de actividad enzimática del 70%.
                Este porcentaje es casi el doble que en cohortes europeas, justificando estrategias
                de suplementación con metilfolato en nuestro contexto.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { gene: "MTHFR rs1801133", mex: "42–47%", eur: "~30%", note: "Homocigoto TT: 18–22% en México vs. ~9% en Europa" },
                { gene: "SLC16A11 haplotipo", mex: "~30%", eur: "<2%", note: "Invisible en herramientas calibradas solo para europeos" },
                { gene: "APOE ε4", mex: "~12%", eur: "~14%", note: "Frecuencias similares; riesgo CV/neurodegenerativo compartido" },
                { gene: "TCF7L2 rs7903146", mex: "~28%", eur: "~30%", note: "Frecuencias comparables; OR T2D 1.4 bien conservado" },
              ].map(({ gene, mex, eur, note }) => (
                <div key={gene} className="p-4 rounded-xl bg-white border border-gray-100">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-mono text-sm font-semibold text-[#8b2fa0]">{gene}</span>
                  </div>
                  <div className="flex gap-4 text-xs mb-2">
                    <span className="text-gray-500">Mexicanos: <strong className="text-[#e11d73]">{mex}</strong></span>
                    <span className="text-gray-400">Europeos: {eur}</span>
                  </div>
                  <p className="text-[11px] text-gray-400 italic">{note}</p>
                </div>
              ))}
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Frecuencias comparadas en 4 poblaciones globales
          </h3>
          <p className="text-sm text-gray-500 mb-4 max-w-2xl">
            Variantes clave del panel con frecuencia del alelo de riesgo por población.
            Datos: gnomAD v4 + SIGMA 2014. Haz clic en cada variante para ver detalles.
          </p>
          <PopulationFrequencyChart />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          05 — REDES
      ══════════════════════════════════════════════════════════ */}
      <section id="redes" style={SECTION_STYLE} className="py-20 bg-[#0a0818]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-[#059669] bg-emerald-900/30 px-2 py-1 rounded-full">05</span>
            <h2 className="text-3xl font-bold text-white">Redes biológicas: los genes no actúan solos</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 mt-6 mb-12">
            <p className="text-gray-400 leading-relaxed">
              Los 94 SNVs del panel no son marcadores independientes. El análisis de enriquecimiento
              en rutas metabólicas (Reactome) revela que convergen en un conjunto acotado de procesos
              biológicos: metabolismo lipídico, señalización insulínica, metabolismo de ácidos grasos
              y respuesta inflamatoria. Esta convergencia valida la coherencia biológica del panel y
              permite interpretar los resultados como un sistema integrado, no como una colección de
              riesgos aislados.
            </p>
            <p className="text-gray-400 leading-relaxed">
              La red de convergencia genética muestra los 7 clusters del panel y sus conexiones por
              rutas metabólicas compartidas (STRING-db, KEGG, Reactome). Los nodos centrales
              —PPARG, PPARGC1A, APOE— son genes hub con mayor número de conexiones, lo que los
              convierte en dianas con efecto pleiotrópico relevante para intervenciones multimodales.
            </p>
          </div>

          {/* Reactome enrichment */}
          <h3 className="text-lg font-semibold text-white mb-2">
            Enriquecimiento en rutas metabólicas — Reactome
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Análisis de enriquecimiento de Fisher para las 94 variantes del panel contra la base de datos Reactome.
            Datos del archivo pathway_SNV1.txt. Línea vertical: umbral p=0.05 (-log₁₀=1.30).
          </p>
          <ReactomeEnrichment />

          {/* Gene network */}
          <div className="mt-16">
            <h3 className="text-lg font-semibold text-white mb-2">
              Red de convergencia genética
            </h3>
            <p className="text-sm text-gray-500 mb-6 max-w-2xl">
              Conectividad entre genes del panel por pertenencia a rutas metabólicas compartidas.
              Los nodos centrales (PPARG, APOE, PPARGC1A) representan los mayores hubs de conectividad.
              Fuentes: STRING-db, KEGG, Reactome, Gene Ontology.
            </p>
            <GeneNetwork className="max-w-4xl mx-auto" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
              {[
                { name: "Metabolismo lipídico", genes: "APOE, LDLR, PCSK9, CETP, LPA", pathway: "KEGG: Metabolismo del colesterol" },
                { name: "Eje diabético",         genes: "TCF7L2, SLC16A11, PPARG, FTO",  pathway: "KEGG: Diabetes mellitus tipo 2" },
                { name: "Farmacogenética",       genes: "CYP2C19, CYP2D6, CYP3A4",       pathway: "KEGG: Metabolismo de xenobióticos" },
                { name: "Biología vascular",     genes: "VEGFA, NOS3, IL6, TNF",          pathway: "Reactome: VEGFA-VEGFR2" },
              ].map((c) => (
                <div key={c.name} className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <h4 className="text-sm font-semibold text-white mb-1">{c.name}</h4>
                  <p className="text-xs text-purple-400 font-mono mb-2">{c.genes}</p>
                  <p className="text-[10px] text-gray-500">{c.pathway}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          06 — MODELO
      ══════════════════════════════════════════════════════════ */}
      <section id="modelo" style={SECTION_STYLE} className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-[#d97706] bg-amber-50 px-2 py-1 rounded-full">06</span>
            <h2 className="text-3xl font-bold text-gray-900">El Índice Alelo: de variantes a puntaje clínico</h2>
          </div>

          <div className="mt-6 space-y-5 text-gray-600 leading-relaxed max-w-3xl mb-10">
            <p>
              El reto de la genómica clínica no es identificar variantes, sino traducirlas a una
              recomendación que el médico y el paciente puedan entender y actuar. El Índice Alelo
              resuelve esto combinando tres elementos: el <strong>efecto del genotipo</strong> (modelo
              de herencia), la <strong>robustez de la evidencia</strong> (peso clínico), y la
              <strong> incertidumbre de la secuenciación</strong> (inferencia bayesiana sobre las
              lecturas NGS).
            </p>
          </div>

          {/* Fórmula */}
          <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 mb-10">
            <p className="text-center text-xl font-mono text-[#8b2fa0] mb-3">
              Índice Alelo<sub>g</sub> = &Sigma;ᵢ (Pᵢ × Wᵢ)
            </p>
            <p className="text-center text-sm text-gray-500 mb-8">
              donde Pᵢ = &Sigma;ₗ S(G) × Pr(G | k, n) &nbsp;&nbsp;y&nbsp;&nbsp; &Sigma;Wᵢ<sup>(riesgo)</sup> = 100 por módulo
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              {[
                {
                  term: "Pᵢ — Puntaje de genotipo",
                  body: "Valor esperado del efecto genético, calculado mediante inferencia bayesiana a partir de las lecturas de secuenciación (k lecturas variantes / n lecturas totales) y el modelo de herencia de cada variante.",
                },
                {
                  term: "Wᵢ — Peso clínico",
                  body: "Asignado según magnitud del efecto (odds ratio de GWAS), robustez de la evidencia (nivel CPIC o PharmGKB) y grado de accionabilidad clínica. Los pesos se normalizan a 100 dentro de cada módulo.",
                },
                {
                  term: "S(G) — Modelo de herencia",
                  body: "Traduce el genotipo a nivel de efecto: aditivo (0, 0.5, 1), dominante (0, 1, 1) o recesivo (0, 0, 1). Determina cómo contribuye el estado heterocigoto al puntaje final.",
                },
              ].map(({ term, body }) => (
                <div key={term}>
                  <h4 className="font-semibold text-gray-900 mb-2">{term}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Módulos */}
          <h3 className="text-xl font-bold text-gray-900 mb-6">Los 7 módulos clínicos</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MODULES.map((m) => (
              <div
                key={m.n}
                className="p-4 rounded-xl bg-white border border-gray-100 hover:shadow-md transition-all"
                style={{ borderLeftWidth: 3, borderLeftColor: m.color }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded text-white"
                    style={{ backgroundColor: m.color }}
                  >
                    M{m.n}
                  </span>
                  <span className="text-xs text-gray-400">{m.snvs} variantes</span>
                </div>
                <h4 className="text-sm font-semibold text-gray-900">{m.name}</h4>
                <p className="text-[10px] font-mono mt-2 text-gray-400">{m.genes}</p>
              </div>
            ))}
          </div>

          {/* Tecnología NGS */}
          <div className="mt-14 p-6 rounded-2xl bg-gray-50 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tecnología de secuenciación</h3>
            <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-600 leading-relaxed">
              <div>
                <p>
                  Se utiliza tecnología <strong>Oxford Nanopore</strong> para la secuenciación de
                  paneles dirigidos. Para cada variante e individuo se obtienen dos valores: el número
                  de lecturas con el alelo variante (<em>k</em>) y el total de lecturas que cubren esa
                  posición (<em>n</em>). La proporción r = k/n es la señal primaria del secuenciador.
                </p>
              </div>
              <div>
                <p>
                  El pipeline bioinformático incluye alineamiento al genoma de referencia GRCh38,
                  llamado de variantes, anotación funcional contra Ensembl y RefSeq, y contraste
                  con ClinVar, gnomAD v4, 1000 Genomes y PharmVar. Cada variante se clasifica según
                  criterios adaptados del marco <strong>ACMG/AMP 2015</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          07 — CONCLUSIÓN
      ══════════════════════════════════════════════════════════ */}
      <section id="conclusion" style={SECTION_STYLE} className="py-20 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded-full">07</span>
            <h2 className="text-3xl font-bold text-gray-900">Conclusión honesta: lo que sabemos y lo que aún falta</h2>
          </div>

          <div className="mt-6 grid lg:grid-cols-2 gap-10">
            {/* Lo que la evidencia sostiene */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#059669] inline-block"></span>
                Lo que la evidencia actual sostiene
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                {[
                  "Las 94 variantes del panel tienen asociación GWAS robusta (p < 5×10⁻⁸) con fenotipos clínicos relevantes en al menos una cohorte de gran escala.",
                  "Varias variantes (SLC16A11, MTHFR) muestran frecuencias significativamente distintas en población mexicana versus europea, justificando calibración local.",
                  "El análisis de enriquecimiento Reactome revela convergencia biológica estadísticamente significativa en rutas de metabolismo lipídico y señalización insulínica.",
                  "El marco ACMG/AMP + CPIC proporciona una base de clasificación reproducible para la traducción clínica de variantes farmacogenómicas.",
                  "Los modelos de herencia (aditivo/dominante/recesivo) son biológicamente pertinentes y están respaldados por estudios funcionales específicos para cada variante.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#059669] mt-0.5 shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Limitaciones y validaciones pendientes */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#d97706] inline-block"></span>
                Limitaciones y validaciones pendientes
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                {[
                  "El Índice Alelo no ha sido validado prospectivamente en una cohorte mexicana de seguimiento longitudinal — su utilidad predictiva individual requiere confirmación clínica.",
                  "Los pesos clínicos (Wᵢ) son asignaciones a priori basadas en ORs de GWAS; no reflejan efectos de interacción gen-gen ni interacciones gen-ambiente cuantificadas en nuestra población.",
                  "La cohorte SIGMA (empleada para frecuencias de SLC16A11) tiene n~3,000, adecuada para frecuencias generales pero insuficiente para estratificación por estado, etnia o nivel socioeconómico.",
                  "Las predicciones PolyPhen-2/SIFT son herramientas in silico con tasas de error conocidas (~20–30%); no reemplazan estudios funcionales experimentales.",
                  "La ancestría genética de cada paciente no se determina individualmente; el panel asume mezcla mestiza promedio, lo que puede introducir sesgo en individuos con alta ancestría indígena o europea.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#d97706] mt-0.5 shrink-0">⚠</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Closing statement */}
          <div className="mt-12 p-6 rounded-2xl bg-white border-l-4 border-[#8b2fa0] shadow-sm">
            <p className="text-gray-700 leading-relaxed">
              La genómica clínica preventiva no es predictiva en el sentido determinista. Es
              <strong> probabilística y contextual</strong>: identifica perfiles de riesgo diferencial
              que, combinados con historia clínica, estilo de vida y seguimiento médico, permiten
              intervenciones más tempranas y más precisas que las estrategias poblacionales genéricas.
              Clínica Alelo opera dentro de esos límites, con la transparencia que exige la práctica
              clínica responsable.
            </p>
          </div>

          {/* Línea de ancestría futura */}
          <div className="mt-8 p-5 rounded-2xl bg-gray-50 border border-gray-100 text-sm text-gray-500">
            <strong className="text-gray-700">Línea de desarrollo futura:</strong> análisis de ancestría
            genética individual mediante haplogrupos mitocondriales, haplogrupos del cromosoma Y y SNPs
            informativos de ancestría (AIMs). Esta línea aportará calibración personalizada de frecuencias
            poblacionales para cada paciente, elevando la resolución del Índice Alelo.
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Construimos herramientas con pertinencia biológica para México
          </h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Si eres investigador, médico o institución interesada en genómica clínica preventiva,
            nos interesa conocer tu perspectiva.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contacto"
              className="px-8 py-3 gradient-alelo text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
            >
              Contactar
            </Link>
            <Link
              href="/vias-metabolicas"
              className="px-8 py-3 border border-[#8b2fa0] text-[#8b2fa0] font-medium rounded-xl hover:bg-purple-50 transition-all"
            >
              Explorar vías metabólicas
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
