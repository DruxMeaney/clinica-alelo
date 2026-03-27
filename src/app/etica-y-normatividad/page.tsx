import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ética, normatividad y protección de datos",
  description:
    "Cumplimiento de normas mexicanas, BPL, BPC, consentimiento informado y protección de datos genéticos.",
};

export default function EticaPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-white via-gray-50 to-purple-50/30 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm font-medium text-[#8b2fa0] tracking-widest uppercase mb-4">
            Ética y normatividad
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Ética, normatividad y protección de datos
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            Compromiso con la confidencialidad, las buenas prácticas y el cumplimiento regulatorio.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div>
            <p className="text-gray-700 leading-relaxed text-lg">
              El diseño de Clínica Alelo contempla un cumplimiento estricto de la normatividad
              mexicana, así como la adopción de lineamientos internacionales para laboratorios
              clínicos e investigación biomédica. La confianza se construye con transparencia,
              rigor y responsabilidad.
            </p>
          </div>

          {/* Marco normativo */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Marco normativo y regulatorio</h2>
            <div className="space-y-4">
              {[
                {
                  title: "NOM-004-SSA3-2012",
                  desc: "Regulación del expediente clínico. Establece lineamientos sobre la elaboración, integración, uso y resguardo de la información clínica de los pacientes.",
                },
                {
                  title: "Buenas Prácticas de Laboratorio (BPL)",
                  desc: "Principios de organización y funcionamiento que garantizan la confiabilidad, trazabilidad y reproducibilidad de los datos obtenidos en los procesos de ensayo y genotipado.",
                },
                {
                  title: "Buenas Prácticas Clínicas (BPC / GCP)",
                  desc: "Conjunto de normas éticas y científicas que rigen la planificación, ejecución y notificación de estudios clínicos.",
                },
                {
                  title: "NOM-087-ECOL-SSA1-2002",
                  desc: "Norma para el manejo de residuos peligrosos biológico-infecciosos, necesaria para la operación segura del laboratorio y la protección del personal y del medio ambiente.",
                },
                {
                  title: "COFEPRIS",
                  desc: "Documentación rigurosa de los procesos a fin de cumplir con los requisitos de la Comisión Federal para la Protección contra Riesgos Sanitarios y otros entes reguladores.",
                },
              ].map((norm) => (
                <div key={norm.title} className="p-6 rounded-2xl border border-gray-100 bg-white">
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{norm.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{norm.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Compromisos éticos */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Compromisos éticos</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Consentimiento informado",
                  desc: "El paciente firma conforme a la NOM-004-SSA3-2012 y otras normas vigentes, garantizando la protección de los datos personales y el entendimiento pleno de los propósitos clínicos e investigativos.",
                },
                {
                  title: "Confidencialidad",
                  desc: "Toda la información genómica se maneja bajo estricta confidencialidad. Los datos no se comparten con terceros sin autorización expresa del paciente.",
                },
                {
                  title: "Trazabilidad de muestras",
                  desc: "La trazabilidad y seguridad del material biológico son estrictamente vigiladas para evitar errores o contaminaciones que afecten la confiabilidad del estudio.",
                },
                {
                  title: "Protección de datos personales",
                  desc: "Cumplimiento del marco regulatorio mexicano aplicable en materia de protección de datos personales y datos sensibles de salud.",
                },
                {
                  title: "Integración al expediente clínico",
                  desc: "Los resultados se integran de manera cuidadosa y ordenada al expediente del paciente, siguiendo los lineamientos de la NOM-004-SSA3-2012.",
                },
                {
                  title: "Portal privado del paciente",
                  desc: "La información obtenida se deposita en un portal privado al cual cada paciente puede acceder confidencialmente.",
                },
              ].map((item) => (
                <div key={item.title} className="p-5 rounded-xl border border-gray-100 bg-white">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <Link
              href="/equipo"
              className="px-6 py-3 bg-[#8b2fa0] text-white font-medium rounded-lg hover:bg-[#6b1d7b] transition-colors"
            >
              Conoce nuestro equipo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
