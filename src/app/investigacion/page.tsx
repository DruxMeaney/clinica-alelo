import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import GlowOrbs from "@/components/ui/GlowOrbs";

export const metadata: Metadata = {
  title: "Investigación",
  description:
    "Generación de conocimiento poblacional, bases de datos genómicas, publicaciones científicas y vinculación institucional.",
};

export default function InvestigacionPage() {
  return (
    <>
      <section className="relative overflow-hidden gradient-alelo-dark py-20 md:py-24">
        <GlowOrbs />
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm font-medium text-[#8b2fa0] tracking-widest uppercase mb-4">
            Investigación
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Investigación y generación de conocimiento
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">
            No solo atendemos. Investigamos, publicamos y construimos conocimiento
            para la medicina de precisión en México.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div>
            <p className="text-gray-700 leading-relaxed text-lg">
              Clínica Alelo no solo brinda servicios clínicos, sino que enfoca sus esfuerzos en la
              investigación a largo plazo sobre variantes genéticas relacionadas con la salud
              cardiovascular, la nutrigenómica y el rendimiento físico. La recolección sistemática
              de datos genéticos y epidemiológicos constituye uno de los pilares fundamentales del
              proyecto.
            </p>
          </div>

          {/* Imagen decorativa */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-purple-500/10">
            <Image
              src="/images/laboratory.jpg"
              alt="Laboratorio de investigación genómica"
              width={1200}
              height={400}
              className="w-full h-56 md:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Líneas de investigación */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Líneas de investigación</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: "Bases de datos genómicas contextualizadas",
                  desc: "Generación de datos de prevalencia de SNVs en la población mexicana para análisis epidemiológico, contribuyendo a comprender mejor la diversidad genética del país.",
                },
                {
                  title: "Estudios de asociación genómica (GWAS)",
                  desc: "Una vez alcanzado un número de participantes estadísticamente representativo, se llevarán a cabo estudios GWAS para identificar asociaciones entre variantes genéticas y fenotipos específicos.",
                },
                {
                  title: "Patrones poblacionales de riesgo",
                  desc: "Entender la frecuencia y distribución de los SNVs en diferentes regiones de México y su relación con factores como edad, sexo o comorbilidades.",
                },
                {
                  title: "Comparación de frecuencias alélicas",
                  desc: "Identificar diferencias significativas entre grupos étnicos, regiones geográficas o cohortes con distintos hábitos de vida, ampliando la perspectiva sobre la diversidad genética de la población.",
                },
                {
                  title: "Publicaciones científicas",
                  desc: "Publicación de hallazgos en revistas indexadas con revisión por pares, contribuyendo al avance de la ciencia genómica en México y posicionando a la clínica como referente en genómica traslacional.",
                },
                {
                  title: "Vinculación interinstitucional",
                  desc: "Colaboración con hospitales, centros de investigación, universidades e instituciones académicas de salud para la difusión de conocimiento y la creación de protocolos conjuntos.",
                },
              ].map((item) => (
                <div key={item.title} className="p-6 rounded-2xl border border-gray-100 bg-white">
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Metodología de selección de SNVs */}
          <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Metodología de selección de variantes
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              La selección de SNVs para los paneles genéticos se lleva a cabo de manera sistemática
              y rigurosa, siguiendo un proceso de cuatro fases:
            </p>
            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Revisión sistemática de la literatura",
                  desc: "Análisis de metaanálisis y estudios de asociación en PubMed, Scopus y Web of Science, priorizando investigaciones con rigor estadístico y muestras representativas (n ≥ 100, p < 0.05).",
                },
                {
                  step: "2",
                  title: "Recuperación masiva desde Ensembl",
                  desc: "Algoritmo en Python para conectarse a la API de Ensembl y descargar SNVs registradas en los genes preseleccionados, con información de anotación, frecuencia alélica y clasificación clínica. Volumen inicial de más de 12,000 registros.",
                },
                {
                  step: "3",
                  title: "Filtrado y depuración",
                  desc: "Eliminación de duplicados, homogeneización de nomenclatura, verificación cruzada con la literatura y priorización por asociación fenotípica clara y frecuencia en poblaciones latinoamericanas o mexicanas.",
                },
                {
                  step: "4",
                  title: "Priorización final y conformación de paneles",
                  desc: "Agrupación de las SNVs elegidas en paneles temáticos (cardiovascular, nutrigenómico, rendimiento físico), con actualización dinámica conforme surjan nuevas evidencias.",
                },
              ].map((phase) => (
                <div key={phase.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8b2fa0] text-white font-bold text-sm flex items-center justify-center">
                    {phase.step}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{phase.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estudio piloto */}
          <div className="p-8 rounded-2xl bg-purple-50/50 border border-purple-200/50">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Estudio piloto</h3>
            <p className="text-gray-600 leading-relaxed">
              El proyecto contempla un estudio piloto para validar su modelo de atención e
              investigación genómica, con énfasis en riesgo cardiometabólico, nutrigenómica y
              respuesta al ejercicio. Esto refuerza que la clínica no es solo una idea comercial
              sino una propuesta con vocación metodológica, validación y estructura científica.
            </p>
          </div>

          <div className="pt-8 border-t border-gray-100 flex flex-wrap gap-4">
            <Link
              href="/contacto"
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-[#8b2fa0] hover:text-[#8b2fa0] transition-colors"
            >
              Vinculación institucional
            </Link>
            <Link
              href="/genomica-poblacional"
              className="px-6 py-3 text-[#8b2fa0] font-medium hover:underline"
            >
              Genómica poblacional &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
