import type { Metadata } from "next";
import Link from "next/link";
import GlowOrbs from "@/components/ui/GlowOrbs";
import { FAQS } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description: "Respuestas claras sobre genómica, el Índice Alelo, nuestro proceso y la protección de datos.",
};

const CATEGORY_LABELS: Record<string, string> = {
  general: "General",
  genetica: "Genética y variantes",
  "indice-alelo": "Índice Alelo",
  proceso: "Proceso de atención",
  etica: "Ética y datos",
  tecnologia: "Tecnología",
};

export default function PreguntasFrecuentesPage() {
  const categories = [...new Set(FAQS.map((f) => f.category))];

  return (
    <>
      <section className="relative overflow-hidden gradient-alelo-dark py-20 md:py-24">
        <GlowOrbs />
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm font-medium text-[#8b2fa0] tracking-widest uppercase mb-4">FAQ</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Preguntas frecuentes
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">
            Respuestas claras sobre genómica, el Índice Alelo y nuestro proceso.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          {categories.map((cat) => (
            <div key={cat}>
              <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-100">
                {CATEGORY_LABELS[cat] || cat}
              </h2>
              <div className="space-y-4">
                {FAQS.filter((f) => f.category === cat).map((faq) => (
                  <details key={faq.question} className="group rounded-2xl border border-gray-100 bg-white">
                    <summary className="px-6 py-4 cursor-pointer text-gray-900 font-medium text-sm hover:text-[#8b2fa0] transition-colors list-none flex justify-between items-center">
                      {faq.question}
                      <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-4">
                      {faq.answer ? (
                        <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                      ) : (
                        <p className="text-sm text-amber-500 italic">Respuesta en desarrollo.</p>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center pt-8 border-t border-gray-100">
            <p className="text-gray-600 mb-4">¿Tienes más preguntas?</p>
            <Link
              href="/contacto"
              className="px-6 py-3 bg-[#8b2fa0] text-white font-medium rounded-lg hover:bg-[#6b1d7b] transition-colors"
            >
              Escríbenos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
