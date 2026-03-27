import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Genómica poblacional y SNV",
  description:
    "Variantes de un solo nucleótido, frecuencias alélicas y la importancia del contexto genético de México.",
};

export default function GenomicaPoblacionalPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-white via-gray-50 to-emerald-50/30 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm font-medium text-[#2D6A4F] tracking-widest uppercase mb-4">
            Genómica poblacional
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Genómica poblacional y SNV
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            Por qué importa el contexto genético de México.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          {/* SNVs */}
          <div className="p-8 rounded-2xl border border-gray-100 bg-white">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Qué son las variantes de un solo nucleótido?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Una SNV (Single Nucleotide Variant) es un cambio en una sola posición del ADN. El
              genoma humano contiene aproximadamente 3,200 millones de pares de bases, y las SNVs
              representan la forma más común de variación genética entre individuos. Cada persona
              porta millones de SNVs; la mayoría son neutras, pero algunas pueden influir en
              procesos biológicos como el metabolismo, la inflamación o la respuesta a fármacos.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Un elemento clave en la investigación genética son estas variantes, ya que condicionan
              la susceptibilidad a enfermedades, así como la efectividad de intervenciones
              nutricionales y de entrenamiento.
            </p>
          </div>

          {/* Mutación vs. variación */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-gray-100 bg-white">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Mutación</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>Alteración en la secuencia del ADN que ocurre con baja frecuencia en la población.</li>
                <li>Puede tener efectos perjudiciales, neutros o, en casos raros, beneficiosos.</li>
                <li>Cuando sucede en células germinales, puede transmitirse de generación en generación.</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl border border-[#2D6A4F]/20 bg-[#2D6A4F]/5">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Variación genética (polimorfismo)</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>Cambios en el ADN presentes en un porcentaje significativo de la población (generalmente superior al 1%).</li>
                <li>No necesariamente causan enfermedades por sí mismas, pero pueden modificar la propensión a ciertas condiciones.</li>
                <li>Determinan la respuesta a fármacos, nutrientes y ejercicio.</li>
              </ul>
              <p className="text-xs text-[#2D6A4F] mt-3 font-medium">
                En Clínica Alelo, el foco se centra en las variantes polimórficas con relevancia clínica reconocida.
              </p>
            </div>
          </div>

          {/* Frecuencias alélicas */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Frecuencias alélicas y diversidad poblacional
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Las frecuencias alélicas &mdash;es decir, qué tan común es una variante en un
              grupo&mdash; varían significativamente entre poblaciones. La población mexicana presenta
              una mezcla compleja de ancestrías que genera frecuencias distintas a las de poblaciones
              europeas, asiáticas o africanas.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Extrapolar hallazgos de otras poblaciones sin contexto local puede ser insuficiente o
              incluso engañoso para la práctica clínica en México. Por ello, se toman en cuenta
              fuentes como el 1000 Genomes Project y bases de datos como Ensembl para verificar la
              relevancia poblacional de cada SNV.
            </p>
          </div>

          {/* Importancia para México */}
          <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              ¿Por qué importa para México?
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] font-bold text-sm flex items-center justify-center">1</div>
                <p className="text-sm text-gray-600">
                  <strong>Patrones poblacionales de riesgo:</strong> Entender la frecuencia y
                  distribución de los SNVs en diferentes regiones de México y su relación con
                  factores como edad, sexo o comorbilidades.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] font-bold text-sm flex items-center justify-center">2</div>
                <p className="text-sm text-gray-600">
                  <strong>Comparación de frecuencias alélicas:</strong> Identificar diferencias
                  significativas entre grupos étnicos, regiones geográficas o cohortes con distintos
                  hábitos de vida.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] font-bold text-sm flex items-center justify-center">3</div>
                <p className="text-sm text-gray-600">
                  <strong>Medicina de precisión:</strong> Los hallazgos contribuyen a diseñar
                  estrategias preventivas y de intervención cada vez más individualizadas, mejorando
                  el control de factores de riesgo y optimizando las recomendaciones.
                </p>
              </div>
            </div>
          </div>

          {/* Selección de variantes */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Criterios de selección de variantes
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              En Clínica Alelo se incluyen únicamente SNVs que cumplan con los siguientes criterios:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Evidencia robusta",
                  desc: "Estudios originales o metaanálisis publicados en revistas indexadas con revisión por pares, con tamaño muestral que demuestre validez estadística (n ≥ 100, p < 0.05).",
                },
                {
                  title: "Relevancia clínica",
                  desc: "Asociaciones estadísticamente significativas con fenotipos de interés: obesidad, hipertensión, dislipidemias, respuesta al ejercicio.",
                },
                {
                  title: "Frecuencia poblacional",
                  desc: "Verificación de relevancia en poblaciones globales y, cuando disponible, en poblaciones latinoamericanas o específicamente mexicanas.",
                },
                {
                  title: "Factibilidad analítica",
                  desc: "Disponibilidad de técnicas validadas, confiabilidad del análisis y factibilidad de implementación en contexto clínico.",
                },
              ].map((c) => (
                <div key={c.title} className="p-4 rounded-xl border border-gray-100 bg-white">
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">{c.title}</h4>
                  <p className="text-xs text-gray-600">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <Link
              href="/tecnologia"
              className="px-6 py-3 bg-[#2D6A4F] text-white font-medium rounded-lg hover:bg-[#245A42] transition-colors"
            >
              Conoce nuestra tecnología
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
