import Link from "next/link";

const footerNav = {
  clinica: [
    { label: "Nosotros", href: "/nosotros" },
    { label: "Servicios", href: "/nosotros#servicios" },
    { label: "Proceso clínico", href: "/proceso-clinico" },
    { label: "Equipo", href: "/equipo" },
    { label: "Contacto", href: "/contacto" },
  ],
  ciencia: [
    { label: "Índice Alelo", href: "/indice-alelo" },
    { label: "Vías metabólicas", href: "/vias-metabolicas" },
    { label: "Investigación", href: "/investigacion" },
    { label: "Genómica poblacional", href: "/genomica-poblacional" },
    { label: "Tecnología", href: "/tecnologia" },
    { label: "Ancestría", href: "/ancestria" },
  ],
  legal: [
    { label: "Ética y normatividad", href: "/etica-y-normatividad" },
    { label: "Aviso de privacidad", href: "/aviso-de-privacidad" },
    { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
  ],
};

export default function Footer() {
  return (
    <footer className="gradient-alelo-dark text-gray-300">
      {/* Vinculación científica */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-14 text-center">
          <p className="text-lg font-medium text-white mb-2">
            Vinculación científica e institucional
          </p>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto mb-6">
            Si representas a un hospital, centro de investigación, universidad o institución de salud
            y te interesa colaborar con Clínica Alelo, nos encantaría conocerte.
          </p>
          <Link
            href="/contacto"
            className="inline-flex px-6 py-3 border border-purple-400/40 text-purple-300 text-sm font-medium rounded-xl hover:bg-purple-500/10 hover:border-purple-400/60 transition-all"
          >
            Iniciar conversación
          </Link>
        </div>
      </div>

      {/* Navegación */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Marca */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <svg width="28" height="28" viewBox="0 0 120 120" className="text-[#a855f7]">
              <path d="M10 30 L10 110 L70 110 L70 70 L110 70 L110 10 L50 10 L50 30 Z" fill="currentColor"/>
              <rect x="30" y="30" width="30" height="30" fill="#0a0a12"/>
            </svg>
            <span className="text-white font-semibold" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>alelo</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Medicina genómica preventiva para la población mexicana.
            Investigación, atención clínica y generación de conocimiento.
          </p>
        </div>

        {/* Clínica */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Clínica</h4>
          <ul className="space-y-2">
            {footerNav.clinica.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-gray-400 hover:text-purple-300 transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Ciencia */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Ciencia</h4>
          <ul className="space-y-2">
            {footerNav.ciencia.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-gray-400 hover:text-purple-300 transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal + Bases de datos */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Legal y ética</h4>
          <ul className="space-y-2">
            {footerNav.legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-gray-400 hover:text-purple-300 transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <h4 className="text-white text-sm font-semibold mt-8 mb-4">Bases de datos</h4>
          <ul className="space-y-2">
            {[
              { label: "dbSNP (NCBI)", href: "https://www.ncbi.nlm.nih.gov/snp/" },
              { label: "ClinVar (NCBI)", href: "https://www.ncbi.nlm.nih.gov/clinvar/" },
              { label: "gnomAD", href: "https://gnomad.broadinstitute.org/" },
              { label: "PharmGKB", href: "https://www.pharmgkb.org/" },
            ].map((db) => (
              <li key={db.label}>
                <a href={db.href} target="_blank" rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-purple-300 transition-colors">
                  {db.label} &rarr;
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Clínica Alelo. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-500 text-center max-w-lg">
            La información contenida en este sitio tiene carácter informativo y no constituye
            consejo médico. Consulte siempre a un profesional de la salud.
          </p>
        </div>
      </div>
    </footer>
  );
}
