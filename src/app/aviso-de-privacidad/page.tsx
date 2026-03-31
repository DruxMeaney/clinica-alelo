import type { Metadata } from "next";
import GlowOrbs from "@/components/ui/GlowOrbs";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description: "Aviso de privacidad integral de Clínica Alelo conforme a la LFPDPPP y normativa mexicana vigente.",
};

const SECTIONS = [
  {
    title: "I. Identidad y domicilio del responsable",
    content: `Clínica Alelo (en adelante "Clínica Alelo" o "el Responsable") es responsable del
      tratamiento de sus datos personales conforme a la Ley Federal de Protección de Datos
      Personales en Posesión de los Particulares (LFPDPPP) y demás disposiciones aplicables.`,
  },
  {
    title: "II. Datos personales que se recaban",
    content: `Para la prestación de nuestros servicios clínicos, de investigación y de comunicación,
      podemos recabar las siguientes categorías de datos personales:`,
    list: [
      "Datos de identificación: nombre completo, fecha de nacimiento, sexo, CURP.",
      "Datos de contacto: correo electrónico, teléfono, domicilio.",
      "Datos clínicos y de salud: historia clínica, antecedentes familiares, resultados de laboratorio, hallazgos médicos.",
      "Datos genómicos: secuencias de ADN, variantes genéticas (SNVs), perfiles genómicos obtenidos mediante secuenciación de nueva generación.",
      "Datos de estilo de vida: hábitos alimentarios, actividad física, consumo de suplementos y fármacos.",
    ],
    note: "Los datos genómicos y de salud son considerados datos personales sensibles conforme al artículo 3, fracción VI de la LFPDPPP, y reciben el más alto nivel de protección.",
  },
  {
    title: "III. Finalidades del tratamiento",
    content: "Sus datos personales serán utilizados para las siguientes finalidades:",
    subsections: [
      {
        subtitle: "Finalidades primarias (necesarias para la relación clínica):",
        list: [
          "Prestación de servicios médicos, genómicos y de atención clínica.",
          "Elaboración de historia clínica y expediente médico conforme a la NOM-004-SSA3-2012.",
          "Análisis genómico, interpretación de variantes y generación del Índice Alelo.",
          "Comunicación de resultados, recomendaciones preventivas y seguimiento clínico.",
          "Coordinación con especialistas y laboratorios cuando sea clínicamente pertinente.",
          "Facturación y gestión administrativa.",
        ],
      },
      {
        subtitle: "Finalidades secundarias (sujetas a consentimiento expreso):",
        list: [
          "Uso de datos anonimizados en estudios de genómica poblacional y epidemiológica.",
          "Publicación de hallazgos científicos (siempre con datos disociados e irreversiblemente anonimizados).",
          "Envío de información educativa sobre genómica y salud preventiva.",
          "Colaboración con instituciones académicas en proyectos de investigación.",
        ],
      },
    ],
  },
  {
    title: "IV. Transferencia de datos",
    content: `Clínica Alelo no transferirá sus datos personales sensibles (genómicos y de salud) a
      terceros sin su consentimiento expreso, salvo en los casos previstos por el artículo 37 de
      la LFPDPPP:`,
    list: [
      "Cuando sea necesario por virtud de un contrato celebrado o por celebrar en interés del titular.",
      "Cuando exista una situación de emergencia que potencialmente pueda dañar a un individuo.",
      "Cuando sea requerido por autoridad competente mediante mandato legal.",
      "Cuando la transferencia sea precautoria para la protección del interés público.",
    ],
    note: "Los laboratorios y especialistas que participen en el proceso clínico actuarán como encargados del tratamiento y están obligados a observar las mismas medidas de confidencialidad que Clínica Alelo.",
  },
  {
    title: "V. Medidas de seguridad",
    content: `Clínica Alelo implementa medidas técnicas, administrativas y físicas para proteger sus
      datos personales contra pérdida, destrucción, alteración, acceso no autorizado o
      tratamiento no permitido, en cumplimiento con las Recomendaciones del INAI y las mejores
      prácticas internacionales:`,
    list: [
      "Cifrado de datos en tránsito y en reposo.",
      "Control de acceso basado en roles y principio de mínimo privilegio.",
      "Trazabilidad y auditoría de accesos a expedientes.",
      "Protocolos de respuesta ante incidentes de seguridad.",
      "Cumplimiento con la NOM-004-SSA3-2012 para el manejo de expedientes clínicos.",
    ],
  },
  {
    title: "VI. Derechos ARCO",
    content: `Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse (derechos ARCO) al
      tratamiento de sus datos personales. Para ejercer estos derechos, puede presentar una
      solicitud que contenga:`,
    list: [
      "Nombre y correo electrónico del titular.",
      "Descripción clara del derecho que desea ejercer y los datos sobre los que se ejercerá.",
      "Documentos que acrediten su identidad o representación legal.",
    ],
    note: "Clínica Alelo responderá su solicitud en un plazo máximo de 20 días hábiles, conforme al artículo 32 de la LFPDPPP. En caso de ser procedente, se hará efectivo el derecho dentro de los 15 días hábiles siguientes.",
  },
  {
    title: "VII. Revocación del consentimiento",
    content: `Usted puede revocar en cualquier momento el consentimiento que haya otorgado para el
      tratamiento de sus datos personales. Sin embargo, la revocación no tendrá efectos
      retroactivos y no será posible cuando el tratamiento sea necesario para el cumplimiento de
      obligaciones legales o la protección de su salud.`,
  },
  {
    title: "VIII. Consentimiento informado genómico",
    content: `Dado el carácter sensible y la naturaleza permanente de la información genómica,
      Clínica Alelo aplica un proceso de consentimiento informado específico que incluye:`,
    list: [
      "Explicación detallada del alcance, beneficios y limitaciones del análisis genómico.",
      "Información sobre los posibles hallazgos y sus implicaciones clínicas.",
      "Opciones sobre el uso de datos para investigación y la posibilidad de retiro.",
      "Aclaración sobre la naturaleza hereditaria de la información genética y sus implicaciones familiares.",
      "Firma de documento de consentimiento conforme a la normativa mexicana y estándares bioéticos internacionales.",
    ],
  },
  {
    title: "IX. Uso de tecnologías de rastreo",
    content: `Este sitio web puede utilizar tecnologías de rastreo (cookies y similares) para mejorar
      la experiencia del usuario, analizar el tráfico web y medir el desempeño del sitio. No se
      utilizan estas tecnologías para recopilar información genómica o de salud. Puede configurar
      su navegador para bloquear estas tecnologías.`,
  },
  {
    title: "X. Modificaciones al aviso de privacidad",
    content: `Clínica Alelo se reserva el derecho de modificar este aviso de privacidad en cualquier
      momento para adaptarse a cambios legislativos, jurisprudenciales o en la operación de la
      clínica. Las modificaciones serán notificadas a través de este sitio web y, cuando sea
      materialmente relevante, mediante comunicación directa.`,
  },
];

export default function AvisoDePrivacidadPage() {
  return (
    <>
      <section className="relative overflow-hidden gradient-alelo-dark py-20 md:py-24">
        <GlowOrbs />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <p className="text-sm font-medium text-[#8b2fa0] tracking-widest uppercase mb-4">
            Legal y ética
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Aviso de privacidad
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">
            Conforme a la Ley Federal de Protección de Datos Personales en Posesión de los
            Particulares (LFPDPPP) y demás normativa mexicana aplicable.
          </p>
          <p className="mt-3 text-sm text-gray-500">Última actualización: 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-10">
          {SECTIONS.map((section) => (
            <div key={section.title} className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 pb-2 border-b border-gray-100">
                {section.title}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">{section.content}</p>
              {section.list && (
                <ul className="space-y-1.5 ml-4">
                  {section.list.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 flex gap-2">
                      <span className="text-[#8b2fa0] mt-0.5 flex-shrink-0">›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {section.subsections?.map((sub) => (
                <div key={sub.subtitle} className="ml-2 space-y-2">
                  <p className="text-sm font-medium text-gray-700">{sub.subtitle}</p>
                  <ul className="space-y-1.5 ml-4">
                    {sub.list.map((item, i) => (
                      <li key={i} className="text-sm text-gray-600 flex gap-2">
                        <span className="text-[#8b2fa0] mt-0.5 flex-shrink-0">›</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {section.note && (
                <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-200/50">
                  <p className="text-xs text-gray-600 leading-relaxed italic">{section.note}</p>
                </div>
              )}
            </div>
          ))}

          <div className="pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Para ejercer sus derechos ARCO o presentar cualquier solicitud relacionada con el
              tratamiento de sus datos personales, contacte al responsable a través del formulario
              disponible en la sección de{" "}
              <a href="/contacto" className="text-[#8b2fa0] hover:underline">
                contacto
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
