import Link from "next/link";

const footerNav = {
  clinica: [
    { label: "Nosotros", href: "/nosotros" },
    { label: "Servicios", href: "/servicios" },
    { label: "Proceso clínico", href: "/proceso-clinico" },
    { label: "Equipo", href: "/equipo" },
    { label: "Contacto", href: "/contacto" },
  ],
  ciencia: [
    { label: "Índice Alelo", href: "/indice-alelo" },
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
    <footer className="bg-gray-900 text-gray-300">
      {/* Vinculación científica */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <p className="text-lg font-medium text-white mb-2">
            Vinculación científica e institucional
          </p>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto mb-6">
            Si representas a un hospital, centro de investigación, universidad o institución de salud
            y te interesa colaborar con Clínica Alelo, nos encantaría conocerte.
          </p>
          <Link
            href="/contacto"
            className="inline-flex px-6 py-3 border border-[#52B788] text-[#52B788] text-sm font-medium rounded-lg hover:bg-[#52B788] hover:text-white transition-colors"
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
            <div className="w-8 h-8 rounded-md bg-[#2D6A4F] flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-white font-semibold">Clínica Alelo</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Medicina genómica preventiva para la población mexicana.
            Investigación, atención clínica y generación de conocimiento.
          </p>
          {/* Redes — POR CONFIGURAR */}
          <div className="flex gap-4 mt-6">
            <span className="text-xs text-gray-500">[Redes sociales — por definir]</span>
          </div>
        </div>

        {/* Clínica */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Clínica</h4>
          <ul className="space-y-2">
            {footerNav.clinica.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-gray-400 hover:text-[#52B788] transition-colors">
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
                <Link href={item.href} className="text-sm text-gray-400 hover:text-[#52B788] transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Legal y ética</h4>
          <ul className="space-y-2">
            {footerNav.legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-gray-400 hover:text-[#52B788] transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Bases de datos */}
          <h4 className="text-white text-sm font-semibold mt-8 mb-4">Bases de datos</h4>
          <ul className="space-y-2">
            <li>
              <a href="https://www.ncbi.nlm.nih.gov/snp/" target="_blank" rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-[#52B788] transition-colors">
                dbSNP (NCBI) &rarr;
              </a>
            </li>
            <li>
              <a href="https://www.ncbi.nlm.nih.gov/clinvar/" target="_blank" rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-[#52B788] transition-colors">
                ClinVar (NCBI) &rarr;
              </a>
            </li>
            <li>
              <a href="https://gnomad.broadinstitute.org/" target="_blank" rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-[#52B788] transition-colors">
                gnomAD &rarr;
              </a>
            </li>
            <li>
              <a href="https://www.pharmgkb.org/" target="_blank" rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-[#52B788] transition-colors">
                PharmGKB &rarr;
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
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
