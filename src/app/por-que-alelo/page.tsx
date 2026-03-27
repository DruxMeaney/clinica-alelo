import type { Metadata } from "next";
import Link from "next/link";
import GlowOrbs from "@/components/ui/GlowOrbs";

export const metadata: Metadata = {
  title: "Por qué existe Clínica Alelo",
  description:
    "La brecha entre investigación genómica y práctica clínica en México, y la necesidad de herramientas contextualizadas.",
};

export default function PorQueAleloPage() {
  return (
    <>
      <section className="relative overflow-hidden gradient-alelo-dark py-20 md:py-24">
        <GlowOrbs />
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm font-medium text-[#8b2fa0] tracking-widest uppercase mb-4">Contexto</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Por qué existe Clínica Alelo
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">
            Un problema real de salud pública, una respuesta genómica.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          {/* La brecha */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">La brecha genómica en México</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              La atención médica basada en la genómica está transformando la forma en que concebimos
              la prevención, el diagnóstico y el tratamiento de múltiples patologías, especialmente
              aquellas de origen multifactorial como las enfermedades cardiovasculares.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Sin embargo, existe una marcada brecha entre la investigación genómica &mdash;que se
              suele llevar a cabo en centros especializados o laboratorios académicos&mdash; y la
              práctica clínica tradicional. Si bien algunos grandes hospitales han incorporado
              departamentos de genética, el acceso a pruebas de secuenciación o genotipado con
              asesoría integral sigue siendo limitado para la mayoría de la población.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Además, muchos equipos genómicos disponibles en el mercado están diseñados con fines
              estrictamente de investigación, lo que dificulta su incorporación en entornos clínicos
              convencionales.
            </p>
          </div>

          {/* Contexto epidemiológico */}
          <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contexto epidemiológico
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              México enfrenta una alta carga de enfermedades cardiometabólicas: obesidad, diabetes
              tipo 2, hipertensión, dislipidemias y enfermedad cardiovascular. Estas patologías de
              origen multifactorial requieren herramientas clínicas más precisas, preventivas y
              contextualizadas para una población con gran diversidad genética y una historia
              poblacional compleja.
            </p>
            <p className="text-gray-600 leading-relaxed">
              La identificación temprana de variantes genéticas permite diseñar estrategias que
              reduzcan la probabilidad de desarrollar estas enfermedades crónicas. La integración
              de pruebas genéticas con la evaluación médica tradicional refina el diagnóstico y
              personaliza tratamientos farmacológicos, recomendaciones nutricionales y prescripciones
              de ejercicio.
            </p>
          </div>

          {/* Diversidad genética */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Diversidad genética mexicana
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              La población mexicana presenta una mezcla compleja de ancestrías y frecuencias
              alélicas distintas a las de poblaciones europeas u otras cohortes internacionales.
              Extrapolar hallazgos sin contexto local puede ser insuficiente o incluso engañoso.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Clínica Alelo busca construir herramientas que tengan mayor pertinencia biológica y
              clínica para México, verificando la relevancia poblacional de cada variante genética
              mediante fuentes como el 1000 Genomes Project y bases de datos como Ensembl.
            </p>
          </div>

          {/* Nuestra respuesta */}
          <div className="p-8 rounded-2xl bg-purple-50/50 border border-purple-200/50">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              La respuesta de Clínica Alelo
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Clínica Alelo se plantea como el vínculo entre la investigación genómica y la práctica
              clínica, ofreciendo a las personas la posibilidad de conocer su perfil genético en
              tres grandes áreas: predisposición a enfermedades cardiovasculares, nutrigenómica y
              metabolismo de nutrientes, y genética de la respuesta al ejercicio físico.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Este abordaje promueve la salud individual y colectiva a través de la prevención
              personalizada, la recolección de datos epidemiológicos y la implementación de
              protocolos clínicos e investigativos bajo rigor científico reconocido internacionalmente.
            </p>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <Link
              href="/indice-alelo"
              className="px-6 py-3 bg-[#8b2fa0] text-white font-medium rounded-lg hover:bg-[#6b1d7b] transition-colors"
            >
              Conoce el Índice Alelo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
