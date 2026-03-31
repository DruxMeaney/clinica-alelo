import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import GlowOrbs from "@/components/ui/GlowOrbs";
import GeneNetwork from "@/components/ui/GeneNetwork";

export const metadata: Metadata = {
  title: "Ciencia — Clínica Alelo",
  description:
    "Fundamento científico, metodología del Índice Alelo, genómica poblacional, tecnología de secuenciación y análisis funcional del panel de 94 SNVs.",
};

export default function CienciaPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden gradient-alelo-dark py-24 md:py-32">
        <GlowOrbs />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-xs font-medium text-purple-300 tracking-wider uppercase">
              Ciencia e investigación
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight max-w-3xl">
            La genómica como herramienta de prevención clínica
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl leading-relaxed">
            94 variantes genéticas. 57 genes. 7 módulos clínicos. Un modelo probabilístico
            que integra secuenciación de nueva generación, genética de poblaciones y
            modelos de herencia para estimar riesgo cardiometabólico en población mexicana.
          </p>
        </div>
      </section>

      {/* Visión del proyecto */}
      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3 space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Por qué existe este proyecto</h2>
              <p className="text-gray-600 leading-relaxed">
                En 2023, las enfermedades del corazón y la diabetes mellitus representaron el 37%
                de las defunciones registradas en México. La carga cardiometabólica del país es una
                de las más altas del continente, y la brecha entre la investigación genómica y la
                práctica clínica preventiva sigue siendo profunda.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Clínica Alelo nace para cerrar esa brecha. No como un laboratorio de secuenciación
                aislado, sino como un modelo integrado que conecta la evaluación genómica con la
                historia clínica, el estilo de vida y el contexto poblacional de cada paciente.
              </p>
              <p className="text-gray-600 leading-relaxed">
                El proyecto se estructura en tres ejes de intervención personalizada:
                <strong> nutrición</strong> (alimentos y suplementos según perfil metabólico genético),
                <strong> ejercicio</strong> (fuerza, resistencia o HIIT según perfiles musculares y energéticos) y
                <strong> hábitos</strong> (sueño, estrés y exposición ambiental vinculados a marcadores de
                inflamación, detoxificación y regulación hormonal).
              </p>
            </div>
            <div className="lg:col-span-2 space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <p className="text-3xl font-bold text-[#8b2fa0]">94</p>
                <p className="text-sm text-gray-500">variantes genéticas analizadas</p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <p className="text-3xl font-bold text-[#8b2fa0]">57</p>
                <p className="text-sm text-gray-500">genes distribuidos en 7 módulos</p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <p className="text-3xl font-bold text-[#8b2fa0]">5</p>
                <p className="text-sm text-gray-500">poblaciones de referencia (HWE)</p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <p className="text-3xl font-bold text-[#8b2fa0]">3</p>
                <p className="text-sm text-gray-500">modelos de herencia (aditivo, dominante, recesivo)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Red de convergencia genética */}
      <section className="py-20 bg-[#0a0a12]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Red de convergencia genética</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Los 94 SNVs del panel no operan de manera aislada. El análisis de enriquecimiento funcional
              revela 7 clusters interconectados a través de rutas metabólicas compartidas.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Fuentes: STRING-db, KEGG, Reactome, Gene Ontology
            </p>
          </div>

          <GeneNetwork className="max-w-4xl mx-auto" />

          {/* Clusters descriptivos */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {[
              { name: "Metabolismo lipídico", genes: "APOE, LDLR, PCSK9, CETP, LPA", pathway: "KEGG: Metabolismo del colesterol" },
              { name: "Eje diabético", genes: "TCF7L2, SLC16A11, PPARG, FTO", pathway: "KEGG: Diabetes mellitus tipo 2" },
              { name: "Farmacogenética", genes: "CYP2C19, CYP2D6, CYP3A4, CYP1A2", pathway: "KEGG: Metabolismo de xenobióticos" },
              { name: "Biología vascular", genes: "VEGFA, NOS3, IL6, TNF", pathway: "Reactome: VEGFA-VEGFR2" },
            ].map((c) => (
              <div key={c.name} className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <h4 className="text-sm font-semibold text-white mb-1">{c.name}</h4>
                <p className="text-xs text-purple-400 font-mono mb-2">{c.genes}</p>
                <p className="text-[10px] text-gray-500">{c.pathway}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Anotación funcional - imágenes del proyecto */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Anotación funcional del panel</h2>
          <p className="text-gray-600 mb-10 max-w-2xl">
            Cada variante fue anotada contra Ensembl y RefSeq para clasificar su impacto funcional.
            La mayoría son variantes codificantes no sinónimas con efecto directo sobre la estructura proteica.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
              <Image src="/images/snv-sunburst.png" alt="Clasificación funcional de variantes — distribución por tipo de impacto genómico"
                width={500} height={500} className="w-full rounded-xl" />
              <p className="text-xs text-gray-500 mt-3 text-center">
                Distribución de 94 SNVs por clasificación funcional y tipo de impacto
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
              <Image src="/images/snv-radial.png" alt="Distribución cromosómica de variantes del panel genómico"
                width={500} height={500} className="w-full rounded-xl" />
              <p className="text-xs text-gray-500 mt-3 text-center">
                Distribución por categoría funcional y frecuencia alélica
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Índice Alelo */}
      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">El Índice Alelo</h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Un sistema de integración genómica que convierte la información de múltiples variantes
            en puntajes modulares interpretables, expresados en una escala de 0 a 100.
          </p>

          <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm mb-8">
            <div className="text-center mb-6">
              <p className="text-lg font-mono text-[#8b2fa0]">
                Índice Alelo<sub>g</sub> = &Sigma; (P<sub>i</sub> &times; W<sub>i</sub>)
              </p>
              <p className="text-xs text-gray-500 mt-2">
                donde P<sub>i</sub> = &Sigma; S(G) &times; Pr(G | k, n) &nbsp;&nbsp;y&nbsp;&nbsp; &Sigma;W<sub>i</sub><sup>(riesgo)</sup> = 100
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">P<sub>i</sub> — Puntaje de genotipo</h4>
                <p className="text-gray-500">
                  Valor esperado del efecto genético, calculado mediante inferencia bayesiana
                  a partir de las lecturas de secuenciación y el modelo de herencia de cada variante.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">W<sub>i</sub> — Peso clínico</h4>
                <p className="text-gray-500">
                  Asignado según magnitud del efecto (odds ratio), robustez de la evidencia
                  y grado de accionabilidad clínica. Los pesos se normalizan a 100 por módulo.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">S(G) — Modelo de herencia</h4>
                <p className="text-gray-500">
                  Traduce genotipo a nivel de efecto: aditivo (0, 0.5, 1), dominante (0, 1, 1)
                  o recesivo (0, 0, 1). Determina cómo el heterocigoto contribuye al puntaje.
                </p>
              </div>
            </div>
          </div>

          {/* 7 módulos */}
          <h3 className="text-xl font-bold text-gray-900 mb-6">Los siete módulos</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { n: 1, name: "Regulación del peso", snvs: 7, genes: "FTO, BDNF, ADRB3, PPARG", abbr: "IGOME" },
              { n: 2, name: "Diabetes tipo 2", snvs: 22, genes: "SLC16A11, TCF7L2, CDKAL1, IGF2BP2", abbr: "SLC16A11" },
              { n: 3, name: "Respuesta al ejercicio", snvs: 11, genes: "ACTN3, ACE, PPARGC1A, MSTN", abbr: "IGRF" },
              { n: 4, name: "Salud cardiovascular", snvs: 22, genes: "APOE, LDLR, PCSK9, ACE, NOS3", abbr: "IGSC" },
              { n: 5, name: "Nutrigenómica", snvs: 13, genes: "MTHFR, VDR, SOD1, SOD2, MTOR", abbr: "IGNM" },
              { n: 6, name: "Farmacogenética", snvs: 13, genes: "CYP2C19, CYP2D6, CYP3A4", abbr: "PGx" },
              { n: 7, name: "Bienestar general", snvs: 6, genes: "CLOCK, PER2, DRD2, FKBP5", abbr: "WELL" },
            ].map((m) => (
              <div key={m.n} className="p-4 rounded-xl bg-white border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-[#8b2fa0] bg-purple-50 px-2 py-0.5 rounded">M{m.n}</span>
                  <span className="text-[10px] text-gray-400">{m.abbr}</span>
                </div>
                <h4 className="text-sm font-semibold text-gray-900">{m.name}</h4>
                <p className="text-xs text-gray-400 mt-1">{m.snvs} variantes</p>
                <p className="text-[10px] text-purple-500 font-mono mt-2">{m.genes}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tecnología */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Plataforma tecnológica</h2>

          <div className="grid lg:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Secuenciación de nueva generación</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Utilizamos tecnología Oxford Nanopore para la secuenciación de paneles dirigidos.
                Para cada variante y cada individuo se obtienen dos valores: el número de lecturas
                que contienen el alelo variante (k) y el total de lecturas que cubren esa posición (n).
              </p>
              <p className="text-gray-600 leading-relaxed">
                La proporción r = k/n es la señal primaria del secuenciador. El modelo bayesiano
                traduce esta señal ruidosa en probabilidades de genotipo, considerando tanto la
                evidencia experimental como las frecuencias poblacionales.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-purple-500/10">
              <Image src="/images/sequencing-lab.jpg" alt="Laboratorio de secuenciación genómica"
                width={600} height={400} className="w-full h-72 object-cover" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1 relative rounded-2xl overflow-hidden shadow-xl shadow-purple-500/10">
              <Image src="/images/bioinformatics.jpg" alt="Análisis bioinformático"
                width={600} height={400} className="w-full h-72 object-cover" />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Análisis bioinformático</h3>
              <p className="text-gray-600 leading-relaxed">
                El pipeline bioinformático incluye alineamiento al genoma de referencia,
                llamado de variantes, anotación funcional contra Ensembl y RefSeq, y contraste
                con bases de datos genómicas (ClinVar, gnomAD, 1000 Genomes, ALFA).
                Cada variante se clasifica según criterios adaptados del marco ACMG/AMP.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Genómica poblacional */}
      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Genómica poblacional</h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            La población mexicana presenta una composición genética compleja, resultado de la
            convergencia de ancestrías indígena americana, europea y africana. Las frecuencias
            alélicas de muchas variantes difieren significativamente de las reportadas en cohortes
            europeas, lo que hace necesario construir herramientas con pertinencia local.
          </p>

          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">El caso SLC16A11</h3>
            <p className="text-gray-600 leading-relaxed">
              El gen SLC16A11 contiene un haplotipo de riesgo para diabetes tipo 2 con frecuencia
              significativamente más alta en poblaciones mexicanas y latinoamericanas que en
              poblaciones europeas o asiáticas. Este hallazgo, identificado por la iniciativa SIGMA
              (Slim Initiative in Genomic Medicine for the Americas), explica parte de la prevalencia
              elevada de diabetes en México y es un ejemplo concreto de por qué la extrapolación
              directa de hallazgos internacionales puede ser insuficiente.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              El módulo 2 del Índice Alelo incluye 18 variantes del locus SLC16A11 (17p13),
              correspondientes al set creíble al 99% identificado por SIGMA.
            </p>
          </div>

          {/* Flujo clínico */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <Image src="/images/flujo-clinico.png" alt="Flujo de trabajo clínico de Clínica Alelo — desde recepción hasta seguimiento"
              width={1200} height={600} className="w-full" />
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">
            Flujo de trabajo clínico: 9 etapas desde la recepción hasta el seguimiento e investigación continua
          </p>
        </div>
      </section>

      {/* Gene network image del proyecto */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Red de genes por rutas metabólicas compartidas</h2>
          <p className="text-gray-600 mb-8">
            Visualización de la conectividad entre los genes del panel, donde cada arista representa
            la pertenencia compartida a una ruta metabólica. Los nodos centrales (PPARG, PPARGC1A, APOE)
            son los genes hub con mayor número de conexiones.
          </p>
          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white p-4">
            <Image src="/images/gene-network.png" alt="Red de genes basada en rutas metabólicas compartidas — panel Alelo"
              width={1200} height={800} className="w-full rounded-xl" />
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">
            Generado con Plotly. Escala de color indica número de conexiones por gen.
          </p>
        </div>
      </section>

      {/* Ancestría */}
      <section className="py-16 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Línea complementaria: ancestría genética</h3>
          <p className="text-gray-600 leading-relaxed max-w-3xl">
            Clínica Alelo contempla la incorporación futura de análisis de ancestría genética
            mediante metodologías compatibles con su plataforma tecnológica, incluyendo
            haplogrupos mitocondriales, haplogrupos del cromosoma Y y SNPs informativos de ancestría (AIMs).
            Esta línea se entiende como complemento de sofisticación científica, no como
            herramienta genealógica recreativa.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Construimos herramientas con pertinencia biológica para México
          </h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Si eres investigador, médico o institución interesada en genómica clínica preventiva,
            nos interesa conocer tu perspectiva.
          </p>
          <Link href="/contacto"
            className="px-8 py-3 gradient-alelo text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all">
            Contactar
          </Link>
        </div>
      </section>
    </>
  );
}
