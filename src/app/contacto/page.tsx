import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Agenda una consulta, vincula tu institución o contáctanos para más información.",
};

export default function ContactoPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-white via-gray-50 to-purple-50/30 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm font-medium text-[#8b2fa0] tracking-widest uppercase mb-4">
            Contacto
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Contacto y vinculación
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            Para pacientes, profesionales de la salud, instituciones e investigadores.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Formulario */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Envíanos un mensaje</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#8b2fa0] focus:ring-1 focus:ring-[#8b2fa0] outline-none transition-colors"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#8b2fa0] focus:ring-1 focus:ring-[#8b2fa0] outline-none transition-colors"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Perfil</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#8b2fa0] focus:ring-1 focus:ring-[#8b2fa0] outline-none transition-colors text-gray-600">
                    <option value="">Selecciona una opción</option>
                    <option value="paciente">Paciente potencial</option>
                    <option value="medico">Médico / profesional de la salud</option>
                    <option value="institucion">Institución / hospital / universidad</option>
                    <option value="investigador">Investigador</option>
                    <option value="inversionista">Inversionista / colaborador estratégico</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#8b2fa0] focus:ring-1 focus:ring-[#8b2fa0] outline-none transition-colors resize-none"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#8b2fa0] text-white font-medium rounded-lg hover:bg-[#6b1d7b] transition-colors"
                >
                  Enviar mensaje
                </button>
                <p className="text-xs text-gray-400 text-center">
                  Al enviar este formulario, aceptas nuestro aviso de privacidad.
                </p>
              </form>
            </div>

            {/* Info de contacto */}
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de contacto</h3>
                <div className="space-y-4 text-sm text-gray-600">
                  <div className="p-4 rounded-xl bg-gray-50">
                    <p className="font-medium text-gray-900">Correo electrónico</p>
                    <p className="text-gray-500">POR DEFINIR</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50">
                    <p className="font-medium text-gray-900">Teléfono</p>
                    <p className="text-gray-500">POR DEFINIR</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50">
                    <p className="font-medium text-gray-900">Ubicación</p>
                    <p className="text-gray-500">POR DEFINIR — Ciudad, Estado, México</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vinculación institucional</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Si representas a un hospital, centro de investigación, universidad u otra
                  institución y te interesa establecer una colaboración científica o clínica
                  con Clínica Alelo, selecciona el perfil correspondiente en el formulario
                  y cuéntanos sobre tu interés.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Horario de atención</h3>
                <p className="text-sm text-gray-500">POR DEFINIR</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
