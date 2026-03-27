import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ancestría genética",
  description:
    "Línea complementaria de análisis de ancestría genética: haplogrupos, SNP informativos de ancestría y secuenciación reducida.",
};

export default function AncestriaPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-white via-gray-50 to-purple-50/30 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm font-medium text-[#8b2fa0] tracking-widest uppercase mb-4">
            Línea complementaria
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Ancestría genética
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            Una perspectiva complementaria de sofisticación científica.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          {/* Introducción */}
          <div className="p-8 rounded-2xl border border-gray-100 bg-white">
            <p className="text-gray-600 leading-relaxed mb-4">
              Clínica Alelo contempla la posibilidad de incorporar análisis de ancestría genética
              como línea complementaria, utilizando metodologías compatibles con su plataforma
              tecnológica. Esto incluye enfoques de secuenciación de representación reducida,
              paneles de SNP informativos de ancestría (AIMs), análisis de haplogrupos
              mitocondriales y del cromosoma Y, cuando resulte pertinente para el contexto
              clínico o investigativo del paciente.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Comprender la composición ancestral de un individuo puede aportar contexto relevante
              para la interpretación de frecuencias alélicas, la estratificación de riesgo y la
              comprensión de la historia poblacional que subyace a la diversidad genética mexicana.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-amber-100 bg-amber-50/50">
            <p className="text-sm text-amber-700">
              Esta línea se presenta como un complemento de sofisticación científica y no como
              entretenimiento genealógico superficial. Su implementación dependerá de la
              pertinencia clínica, la validación metodológica y el contexto de cada caso.
            </p>
          </div>

          {/* Metodologías */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Metodologías contempladas</h2>
            <div className="space-y-6">
              {/* Haplogrupos mitocondriales */}
              <div className="p-8 rounded-2xl border border-gray-100 bg-white">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Haplogrupos mitocondriales
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  El ADN mitocondrial (ADNmt) se hereda exclusivamente por vía materna y acumula
                  mutaciones a un ritmo relativamente constante, lo que lo convierte en un marcador
                  ideal para reconstruir linajes maternos. Los haplogrupos mitocondriales son grupos
                  de haplotipos que comparten un ancestro materno común y se clasifican en grandes
                  ramas (macrohaplogrupos) que reflejan migraciones humanas ancestrales.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  En la población mexicana, es frecuente encontrar haplogrupos de origen
                  amerindio (como A, B, C y D), así como haplogrupos de origen europeo y, en
                  menor proporción, africano, reflejando la historia de mestizaje del país.
                </p>
                <p className="text-sm text-gray-500">
                  La tecnología de lecturas largas de Oxford Nanopore permite secuenciar regiones
                  extensas del ADN mitocondrial, incluyendo la región control hipervariable, para
                  una asignación precisa de haplogrupos.
                </p>
              </div>

              {/* Haplogrupos del cromosoma Y */}
              <div className="p-8 rounded-2xl border border-gray-100 bg-white">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Haplogrupos del cromosoma Y
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  El cromosoma Y se transmite de padre a hijo sin recombinación (salvo en las
                  regiones pseudoautosómicas), lo que permite rastrear linajes paternos a lo largo
                  de generaciones. Los haplogrupos del cromosoma Y se definen por SNPs específicos
                  que identifican ramas del árbol filogenético masculino.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  En México, los haplogrupos del cromosoma Y muestran una proporción significativa
                  de linajes europeos (principalmente R1b y J2), junto con haplogrupos amerindios
                  (Q) y, en menor medida, africanos, como resultado de los patrones históricos de
                  migración y mestizaje.
                </p>
                <p className="text-sm text-gray-500">
                  Este análisis es aplicable exclusivamente a individuos con cromosoma Y y
                  complementa la información del ADN mitocondrial para una visión más completa
                  de la composición ancestral.
                </p>
              </div>

              {/* AIMs */}
              <div className="p-8 rounded-2xl border border-gray-100 bg-white">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  SNP informativos de ancestría (AIMs)
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Los AIMs (Ancestry Informative Markers) son un conjunto seleccionado de SNPs
                  cuyas frecuencias alélicas difieren significativamente entre poblaciones
                  ancestrales (por ejemplo, amerindia, europea y africana). Al analizar un panel
                  de AIMs, es posible estimar las proporciones de ancestría de un individuo,
                  expresadas como porcentajes de cada componente ancestral.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Esta estimación es particularmente relevante en la población mexicana, donde la
                  mezcla de ancestrías varía considerablemente según la región geográfica. Conocer
                  las proporciones de ancestría puede ser útil para contextualizar la interpretación
                  de variantes genéticas cuyas frecuencias y efectos difieren entre poblaciones.
                </p>
                <p className="text-sm text-gray-500">
                  Los paneles de AIMs pueden implementarse mediante enfoques de secuenciación
                  dirigida compatibles con la plataforma de Oxford Nanopore.
                </p>
              </div>

              {/* Secuenciación reducida */}
              <div className="p-8 rounded-2xl border border-gray-100 bg-white">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Secuenciación de representación reducida
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  La secuenciación de representación reducida (RRS, por sus siglas en inglés) es
                  una estrategia que permite analizar una fracción representativa del genoma en
                  lugar de la secuenciación completa, reduciendo costos y tiempo de procesamiento
                  sin sacrificar la capacidad de identificar variantes informativas.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Mediante la selección de regiones genómicas específicas &mdash;ya sea por
                  digestión enzimática, captura por hibridación o amplificación dirigida&mdash;
                  es posible genotipar miles de SNPs relevantes, incluyendo AIMs, variantes
                  clínicas y marcadores de haplogrupos, en una sola corrida de secuenciación.
                </p>
                <p className="text-sm text-gray-500">
                  Este enfoque es compatible con la tecnología Oxford Nanopore y permite integrar
                  el análisis de ancestría con el genotipado clínico en un mismo flujo de trabajo,
                  optimizando recursos y manteniendo la coherencia metodológica.
                </p>
              </div>
            </div>
          </div>

          {/* Relevancia clínica */}
          <div className="p-8 rounded-2xl bg-purple-50/50 border border-purple-200/50">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Relevancia clínica de la ancestría
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Más allá del interés personal por conocer los orígenes ancestrales, la información
              de ancestría genética tiene aplicaciones clínicas concretas:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <strong>Contextualización de frecuencias alélicas:</strong> una misma variante
                puede ser común en una población y rara en otra, lo que afecta su interpretación
                clínica.
              </li>
              <li>
                <strong>Ajuste de puntuaciones de riesgo poligénico:</strong> los modelos de
                riesgo genético desarrollados en una población pueden tener menor precisión en
                poblaciones con diferente composición ancestral.
              </li>
              <li>
                <strong>Farmacogenética poblacional:</strong> las frecuencias de metabolizadores
                lentos, intermedios y rápidos varían entre poblaciones, lo que puede influir en
                la respuesta a medicamentos.
              </li>
              <li>
                <strong>Investigación poblacional:</strong> la caracterización de la estructura
                ancestral contribuye a los estudios epidemiológicos y de asociación genómica.
              </li>
            </ul>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <Link
              href="/investigacion"
              className="px-6 py-3 bg-[#8b2fa0] text-white font-medium rounded-lg hover:bg-[#6b1d7b] transition-colors"
            >
              Más sobre nuestra ciencia
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
