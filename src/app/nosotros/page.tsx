import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import GlowOrbs from "@/components/ui/GlowOrbs";

export const metadata: Metadata = {
  title: "Qué es Clínica Alelo",
  description:
    "Espacio innovador en México que conjuga la investigación genética de vanguardia con servicios clínicos orientados a la prevención y el mejoramiento de la calidad de vida.",
};

export default function NosotrosPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden gradient-alelo-dark py-20 md:py-24">
        <GlowOrbs />
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm font-medium text-[#8b2fa0] tracking-widest uppercase mb-4">
            Nosotros
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Qué es Clínica Alelo
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">
            Atención clínica e investigación genómica para una prevención más precisa en México.
          </p>
        </div>
      </section>

      {/* Descripción principal */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div>
            <p className="text-gray-700 leading-relaxed text-lg">
              Clínica Alelo es un espacio innovador en México que conjuga la investigación genética
              de vanguardia con servicios clínicos orientados a la prevención y al mejoramiento de
              la calidad de vida. Se propone como una empresa pionera que busca establecer un vínculo
              sólido entre la investigación y la práctica clínica, ofreciendo a las personas la
              posibilidad de conocer su perfil genético y traducirlo en estrategias de salud
              personalizadas.
            </p>
          </div>

          {/* Imagen decorativa */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-purple-500/10">
            <Image
              src="/images/dna-abstract.jpg"
              alt="Estructura de ADN — fundamento de la medicina genómica"
              width={1200}
              height={400}
              className="w-full h-56 md:h-72 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2d0a3e]/60 via-transparent to-[#2d0a3e]/60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white/80 text-sm font-medium tracking-wider uppercase">
                Genómica &middot; Clínica &middot; Investigación &middot; Prevención
              </p>
            </div>
          </div>

          {/* Diagrama de intersección */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contexto y justificación</h2>
              <p className="text-gray-600 leading-relaxed">
                Existe una marcada brecha entre la investigación genómica &mdash;que se suele
                llevar a cabo en centros especializados o laboratorios académicos&mdash; y la
                práctica clínica tradicional. El acceso a pruebas de secuenciación o genotipado
                con asesoría integral sigue siendo limitado para la mayoría de la población.
                Además, muchos equipos genómicos disponibles en el mercado están diseñados con fines
                estrictamente de investigación, lo que dificulta su incorporación en entornos
                clínicos convencionales.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Nuestra respuesta</h2>
              <p className="text-gray-600 leading-relaxed">
                Clínica Alelo democratiza el acceso a técnicas genómicas de alto nivel y contribuye
                a la construcción de un acervo científico que facilita la toma de decisiones clínicas
                más efectivas. Nuestro modelo integra prevención clínica, investigación traslacional
                y colaboración interinstitucional para ofrecer una atención integral y de alta calidad.
              </p>
            </div>
          </div>

          {/* Alcance y objetivos */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Alcance y objetivos</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-gray-100 bg-white">
                <div className="w-10 h-1 rounded-full bg-[#1B4965] mb-4" />
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  Atención clínica especializada y preventiva
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Identificar variantes genéticas asociadas a factores de riesgo cardiovascular
                    y canalizar hacia especialistas cuando sea pertinente.</li>
                  <li>Evaluar SNVs relacionadas con nutrigenómica para sugerir planes nutricionales
                    y suplementos específicos.</li>
                  <li>Analizar variantes vinculadas a la respuesta al ejercicio para recomendaciones
                    de entrenamiento individualizadas.</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl border border-gray-100 bg-white">
                <div className="w-10 h-1 rounded-full bg-[#8b2fa0] mb-4" />
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  Centro de investigación en genética poblacional
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Generar datos de prevalencia de SNVs en la población mexicana para análisis
                    epidemiológico.</li>
                  <li>Colaborar con instituciones académicas y de salud para la publicación de
                    hallazgos en revistas indexadas.</li>
                  <li>Realizar estudios GWAS para identificar asociaciones entre variantes genéticas
                    y fenotipos específicos.</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl border border-gray-100 bg-white">
                <div className="w-10 h-1 rounded-full bg-[#5C4D7D] mb-4" />
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  Cumplimiento normativo y calidad
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Apego a las Normas Oficiales Mexicanas y regulaciones locales.</li>
                  <li>Buenas Prácticas de Laboratorio (BPL) y Buenas Prácticas Clínicas (BPC).</li>
                  <li>Documentación rigurosa conforme a requisitos de COFEPRIS y entes reguladores.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Impacto esperado */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Impacto esperado</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: "Innovación en medicina personalizada",
                  desc: "La introducción de métodos de secuenciación y genotipado en un entorno clínico no hospitalario amplía el acceso a tecnologías biomédicas de última generación. El uso de información genómica para la prevención impulsa la medicina de precisión en México.",
                },
                {
                  title: "Fortalecimiento de la investigación nacional",
                  desc: "La recolección sistemática de datos sobre SNVs en genes vinculados a enfermedades cardiovasculares, nutrigenómica y rendimiento físico generará insumos valiosos para estudios epidemiológicos y colaboraciones con instituciones académicas.",
                },
                {
                  title: "Mejora de la calidad de vida",
                  desc: "Al ofrecer asesoría nutricional y de actividad física adaptada al perfil genético, se impulsa la adopción de estilos de vida saludables, potenciando la prevención y retrasando la aparición de enfermedades crónicas.",
                },
                {
                  title: "Desarrollo económico y tecnológico",
                  desc: "La constitución de un centro que integre investigación genómica y atención clínica fomenta la generación de empleos en biotecnología y promueve la colaboración público-privada para el desarrollo de tecnologías emergentes.",
                },
              ].map((item) => (
                <div key={item.title} className="p-6 rounded-2xl border border-gray-100 bg-white">
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recolección de datos */}
          <div className="p-8 rounded-2xl bg-purple-50/50 border border-purple-200/50">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Recolección de datos y estudios poblacionales
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Como parte de su compromiso con la investigación, Clínica Alelo recopila de forma
              sistemática y segura toda la información obtenida en las evaluaciones clínicas y
              genéticas, depositándola en un portal privado al cual cada paciente puede acceder
              confidencialmente. Una vez alcanzado un número de participantes estadísticamente
              representativo, se llevarán a cabo estudios de genética de poblaciones &mdash;incluyendo
              GWAS&mdash; para identificar asociaciones entre variantes genéticas y fenotipos
              específicos, enriqueciendo la comprensión de la medicina de precisión.
            </p>
          </div>

          {/* CTA */}
          <div className="pt-8 border-t border-gray-100 flex flex-wrap gap-4">
            <Link
              href="/servicios"
              className="px-6 py-3 bg-[#8b2fa0] text-white font-medium rounded-lg hover:bg-[#6b1d7b] transition-colors"
            >
              Ver nuestros servicios
            </Link>
            <Link
              href="/por-que-alelo"
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-[#8b2fa0] hover:text-[#8b2fa0] transition-colors"
            >
              ¿Por qué existe Alelo?
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
