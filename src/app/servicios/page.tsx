import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import GlowOrbs from "@/components/ui/GlowOrbs";

export const metadata: Metadata = {
  title: "Servicios clínicos y genómicos",
  description:
    "Tres pilares: riesgo cardiovascular, nutrigenómica y genética de la respuesta al ejercicio.",
};

export default function ServiciosPage() {
  return (
    <>
      <section className="relative overflow-hidden gradient-alelo-dark py-20 md:py-24">
        <GlowOrbs />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
            <span className="text-xs font-medium text-purple-300 tracking-wider uppercase">Servicios</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Servicios clínicos y genómicos
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">
            Tres pilares de atención personalizada basados en tu perfil genético.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-6 space-y-16">
          {/* Pilar 1: Cardiovascular */}
          <div className="grid md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-2">
              <div className="relative rounded-2xl overflow-hidden mb-6 shadow-lg shadow-purple-500/10">
                <Image src="/images/cardiovascular.jpg" alt="Salud cardiovascular" width={400} height={250} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="w-14 h-1 rounded-full bg-[#8b2fa0] mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Riesgo cardiovascular
              </h2>
              <p className="text-sm text-gray-500">Pilar 1</p>
            </div>
            <div className="md:col-span-3 space-y-4">
              <p className="text-gray-600 leading-relaxed">
                Identificamos variantes genéticas (SNVs) asociadas a factores de riesgo cardiovascular,
                con el fin de canalizar a los pacientes hacia especialistas (cardiólogos, internistas)
                cuando sea pertinente. Evaluamos la predisposición genética a patologías como
                hipertensión, dislipidemias y enfermedad coronaria.
              </p>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Genes representativos</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>
                    <strong>APOE</strong> &mdash; Variantes &epsilon;2, &epsilon;3 y &epsilon;4
                    (rs429358, rs7412) asociadas con dislipidemias y riesgo coronario.
                  </li>
                  <li>
                    <strong>ACE</strong> &mdash; Polimorfismo I/D (rs4646994) relacionado con presión
                    arterial y función cardiovascular.
                  </li>
                  <li>
                    <strong>PCSK9</strong> &mdash; Variante rs11591147 que influye sobre los niveles
                    de LDL-colesterol y el riesgo de enfermedad coronaria.
                  </li>
                </ul>
              </div>
              <p className="text-sm text-gray-500">
                Si se detectan riesgos elevados, se remite al paciente con especialistas
                y se integran los hallazgos en el abordaje terapéutico.
              </p>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Pilar 2: Nutrigenómica */}
          <div className="grid md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-2">
              <div className="relative rounded-2xl overflow-hidden mb-6 shadow-lg shadow-purple-500/10">
                <Image src="/images/nutrition.jpg" alt="Nutrigenómica y alimentación" width={400} height={250} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="w-14 h-1 rounded-full bg-[#8b5cf6] mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Nutrigenómica
              </h2>
              <p className="text-sm text-gray-500">Pilar 2</p>
            </div>
            <div className="md:col-span-3 space-y-4">
              <p className="text-gray-600 leading-relaxed">
                Evaluamos SNVs relacionados con la nutrigenómica para sugerir planes nutricionales
                y suplementos específicos, en coordinación con profesionales en nutrición y farmacia.
                La nutrigenómica examina cómo los genes modulan la respuesta a nutrientes específicos
                o a distintos patrones dietarios, abriendo la posibilidad de desarrollar planes de
                alimentación altamente personalizados.
              </p>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Genes representativos</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>
                    <strong>FTO</strong> &mdash; Variante rs9939609, fuertemente vinculada con
                    mayor masa grasa y alteración en la regulación energética.
                  </li>
                  <li>
                    <strong>MTHFR</strong> &mdash; Variantes C677T (rs1801133) y A1298C, relacionadas
                    con la conversión de folato a sus formas activas y los niveles de homocisteína.
                  </li>
                </ul>
              </div>
              <p className="text-sm text-gray-500">
                Estas variantes permiten personalizar la dieta y optimizar la suplementación,
                contrarrestando alteraciones metabólicas y minimizando riesgos asociados a
                deficiencias nutricionales.
              </p>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Pilar 3: Ejercicio */}
          <div className="grid md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-2">
              <div className="relative rounded-2xl overflow-hidden mb-6 shadow-lg shadow-purple-500/10">
                <Image src="/images/exercise.jpg" alt="Respuesta al ejercicio y rendimiento" width={400} height={250} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="w-14 h-1 rounded-full bg-[#e11d73] mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Respuesta al ejercicio
              </h2>
              <p className="text-sm text-gray-500">Pilar 3</p>
            </div>
            <div className="md:col-span-3 space-y-4">
              <p className="text-gray-600 leading-relaxed">
                Analizamos variantes de genes vinculados a la respuesta al ejercicio, facilitando
                recomendaciones de entrenamiento y acondicionamiento físico individualizadas.
                La genética de la actividad física profundiza en la influencia de variantes
                genéticas sobre la capacidad aeróbica, la fuerza muscular y la resistencia.
              </p>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Genes representativos</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>
                    <strong>ACTN3</strong> &mdash; Variante R577X (rs1815739), determina la presencia
                    de &alpha;-actinina-3 en fibras musculares de tipo rápido. Vinculada con
                    diferencias en fuerza, potencia y capacidad de sprint.
                  </li>
                  <li>
                    <strong>ACE</strong> &mdash; El polimorfismo I/D también influye en resistencia
                    aeróbica e hipertrofia muscular, siendo clave en la planificación del entrenamiento.
                  </li>
                </ul>
              </div>
              <p className="text-sm text-gray-500">
                Esta información ayuda a establecer rutinas de ejercicio personalizadas, orientadas
                a maximizar beneficios y reducir el riesgo de sobreentrenamiento o lesiones.
              </p>
            </div>
          </div>

          {/* Servicios complementarios */}
          <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Servicios complementarios</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Suplementación específica</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Un equipo conjunto de farmacología y nutrición diseña planes de suplementación
                  que compensen las carencias nutrimentales o fortalezcan rutas metabólicas
                  detectadas en la secuenciación.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Coordinación con especialistas</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Si los hallazgos requieren evaluación adicional, se refiere al paciente con
                  cardiólogos, endocrinólogos u otros subespecialistas, compartiendo documentación
                  genética y clínica para un seguimiento coordinado.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Estudios de laboratorio complementarios</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Se solicitan pruebas adicionales (química sanguínea, perfil de lípidos, marcadores
                  vitamínicos) en laboratorios certificados para complementar la evaluación genética
                  con una visión global del estado de salud.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Medicina personalizada integral</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  La correlación entre datos genómicos, parámetros clínicos y estudios complementarios
                  permite proponer cambios precisos en la dieta, el ejercicio y los estilos de vida,
                  con seguimiento continuo y ajuste dinámico.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 flex flex-wrap gap-4">
            <Link
              href="/contacto"
              className="px-6 py-3 bg-[#8b2fa0] text-white font-medium rounded-lg hover:bg-[#6b1d7b] transition-colors"
            >
              Agenda una consulta
            </Link>
            <Link
              href="/indice-alelo"
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-[#8b2fa0] hover:text-[#8b2fa0] transition-colors"
            >
              Conoce el Índice Alelo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
