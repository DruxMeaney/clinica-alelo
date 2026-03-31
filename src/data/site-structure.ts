// ============================================================
// Estructura del sitio — Mapa y secciones
// ============================================================

import { SiteSection } from "@/types";

/**
 * CONCEPTO RECTOR:
 * "Traducir el genoma en decisiones de salud para México."
 *
 * TONO DE MARCA:
 * Científicamente sólido, institucionalmente ambicioso,
 * humanamente cercano. Ni frío ni sensacionalista.
 * Voz de quien investiga, atiende y construye conocimiento.
 */

export const SITE_METADATA = {
  title: "Clínica Alelo — Medicina Genómica Preventiva",
  description:
    "Clínica de investigación genómica y atención clínica personalizada enfocada en la prevención cardiometabólica, nutrigenómica y respuesta al ejercicio para la población mexicana.",
  keywords: [
    "medicina genómica",
    "genómica preventiva",
    "clínica genómica México",
    "Índice Alelo",
    "SNV",
    "variantes genéticas",
    "riesgo cardiometabólico",
    "nutrigenómica",
    "farmacogenética",
    "secuenciación",
    "Oxford Nanopore",
    "medicina personalizada",
    "población mexicana",
  ],
  locale: "es-MX",
  url: "https://clinicaalelo.com", // Por confirmar
};

/** Navegación principal */
export const MAIN_NAV = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Servicios", href: "/servicios" },
  { label: "Ciencia", href: "/ciencia" },
  { label: "Vías metabólicas", href: "/vias-metabolicas" },
  { label: "Equipo", href: "/equipo" },
  { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
  { label: "Área clínica", href: "/clinica" },
];

/** Todas las secciones del sitio con su esqueleto */
export const SITE_SECTIONS: SiteSection[] = [
  // ─── PÁGINA PRINCIPAL ───
  {
    id: "hero",
    slug: "/",
    title: "Tu genoma, interpretado para tu salud",
    subtitle:
      "Clínica de investigación genómica y atención personalizada para la prevención y el cuidado de la salud en México.",
    objective:
      "Captar la atención, transmitir la propuesta de valor y posicionar a Alelo como proyecto pionero.",
    keyMessage:
      "Alelo conecta investigación genómica, prevención clínica y ciencia de datos biológicos para la población mexicana.",
    contentStatus: "borrador",
    visualElement:
      "Animación sutil de secuencias genéticas / red molecular con paleta institucional. Fotografía clínica no estereotipada.",
    cta: { label: "Conoce nuestro enfoque", href: "/nosotros", variant: "primary" },
  },

  // ─── NOSOTROS / QUÉ ES CLÍNICA ALELO ───
  {
    id: "nosotros",
    slug: "/nosotros",
    title: "Qué es Clínica Alelo",
    subtitle: "Atención clínica e investigación genómica para una prevención más precisa.",
    objective:
      "Explicar la naturaleza de la clínica: clínica + investigación + prevención + contexto mexicano.",
    keyMessage:
      "Alelo cierra la brecha entre la investigación genómica y la práctica clínica en México.",
    contentStatus: "borrador",
    visualElement:
      "Diagrama de intersección: clínica – genómica – investigación – prevención. Fotografía del espacio o del equipo.",
    cta: { label: "Ver nuestros servicios", href: "/servicios", variant: "primary" },
  },

  // ─── POR QUÉ EXISTE ───
  {
    id: "por-que-alelo",
    slug: "/por-que-alelo",
    title: "Por qué existe Clínica Alelo",
    subtitle: "Un problema real de salud pública, una respuesta genómica.",
    objective:
      "Contextualizar la carga cardiometabólica en México y la necesidad de herramientas genómicas contextualizadas.",
    keyMessage:
      "México necesita herramientas clínicas más precisas, preventivas y contextualizadas para su diversidad genética.",
    contentStatus: "borrador",
    visualElement:
      "Datos epidemiológicos visualizados. Mapa de México con capas de diversidad genética.",
    cta: { label: "Conoce el Índice Alelo", href: "/indice-alelo", variant: "primary" },
  },

  // ─── SERVICIOS ───
  {
    id: "servicios",
    slug: "/servicios",
    title: "Servicios clínicos y genómicos",
    subtitle: "Tres pilares de atención personalizada.",
    objective:
      "Presentar los tres ejes iniciales: riesgo cardiometabólico, nutrigenómica, respuesta al ejercicio.",
    keyMessage:
      "Traducimos información genética en estrategias preventivas individualizadas y realistas.",
    contentStatus: "borrador",
    visualElement:
      "Tres tarjetas/módulos con íconos: corazón/metabolismo, nutrición, ejercicio.",
    cta: { label: "Agenda una consulta", href: "/contacto", variant: "primary" },
  },

  // ─── ÍNDICE ALELO ───
  {
    id: "indice-alelo",
    slug: "/indice-alelo",
    title: "Índice Alelo",
    subtitle: "Tu perfil genómico, traducido en módulos interpretables.",
    objective:
      "Explicar el sistema de integración genómica: 7 módulos, escala 0-100, variantes de riesgo y protectoras.",
    keyMessage:
      "El Índice Alelo convierte la complejidad genómica en información clínicamente útil.",
    contentStatus: "borrador",
    visualElement:
      "Visualización interactiva de 7 módulos. Gráficos de barras o radiales. Ejemplo visual de un perfil.",
    cta: { label: "Ver los siete módulos", href: "/indice-alelo#modulos", variant: "primary" },
  },

  // ─── INVESTIGACIÓN ───
  {
    id: "investigacion",
    slug: "/investigacion",
    title: "Investigación y generación de conocimiento",
    subtitle: "No solo atendemos. Investigamos.",
    objective:
      "Mostrar la dimensión de investigación: bases de datos, prevalencia, publicaciones, vinculación.",
    keyMessage:
      "Alelo genera conocimiento poblacional y contribuye a la medicina de precisión en México.",
    contentStatus: "borrador",
    visualElement:
      "Línea de tiempo de investigación. Logos de alianzas. Gráficas de datos poblacionales.",
    cta: { label: "Vinculación institucional", href: "/contacto", variant: "secondary" },
  },

  // ─── GENÓMICA POBLACIONAL ───
  {
    id: "genomica-poblacional",
    slug: "/genomica-poblacional",
    title: "Genómica poblacional y SNV",
    subtitle: "Por qué importa el contexto genético de México.",
    objective:
      "Explicar SNVs, frecuencias alélicas, diversidad poblacional mexicana y pertinencia clínica.",
    keyMessage:
      "La genómica sin contexto poblacional puede ser insuficiente o engañosa.",
    contentStatus: "borrador",
    visualElement:
      "Diagrama de frecuencias alélicas comparadas. Mapa de ancestrías. Esquema de ADN con variantes señaladas.",
    cta: { label: "Conoce nuestra tecnología", href: "/tecnologia", variant: "secondary" },
  },

  // ─── TECNOLOGÍA ───
  {
    id: "tecnologia",
    slug: "/tecnologia",
    title: "Tecnología y metodología",
    subtitle: "Secuenciación de nueva generación, análisis bioinformático e interpretación clínica.",
    objective:
      "Presentar la plataforma tecnológica: Oxford Nanopore, bioinformática, curación de evidencia.",
    keyMessage:
      "Infraestructura científica sólida para generar resultados confiables y trazables.",
    contentStatus: "borrador",
    visualElement:
      "Flujo tecnológico: muestra → secuenciación → análisis → interpretación. Fotografía de equipos.",
    cta: { label: "Ver el proceso clínico", href: "/proceso-clinico", variant: "secondary" },
  },

  // ─── ANCESTRÍA ───
  {
    id: "ancestria",
    slug: "/ancestria",
    title: "Ancestría genética",
    subtitle: "Una perspectiva complementaria de sofisticación científica.",
    objective:
      "Presentar con sobriedad la línea futura de análisis de ancestría.",
    keyMessage:
      "Metodologías de pertinencia científica, no entretenimiento genealógico superficial.",
    contentStatus: "borrador",
    visualElement:
      "Diagrama de haplogrupos. Mapa de migraciones ancestrales. Línea discreta, no prominente.",
    cta: { label: "Más sobre nuestra ciencia", href: "/investigacion", variant: "outline" },
  },

  // ─── PROCESO CLÍNICO ───
  {
    id: "proceso-clinico",
    slug: "/proceso-clinico",
    title: "Tu proceso de atención",
    subtitle: "Desde la consulta inicial hasta el seguimiento personalizado.",
    objective:
      "Mostrar el flujo clínico completo: recepción, consentimiento, muestra, análisis, resultados, seguimiento.",
    keyMessage:
      "Un proceso ordenado, ético y centrado en el paciente.",
    contentStatus: "borrador",
    visualElement:
      "Línea de tiempo horizontal o vertical con pasos numerados e íconos.",
    cta: { label: "Agenda tu cita", href: "/contacto", variant: "primary" },
  },

  // ─── ÉTICA Y NORMATIVIDAD ───
  {
    id: "etica-y-normatividad",
    slug: "/etica-y-normatividad",
    title: "Ética, normatividad y protección de datos",
    subtitle: "Compromiso con la confidencialidad y las buenas prácticas.",
    objective:
      "Comunicar compromisos éticos: consentimiento, confidencialidad, regulación mexicana, trazabilidad.",
    keyMessage:
      "La confianza se construye con transparencia, rigor y responsabilidad.",
    contentStatus: "borrador",
    visualElement:
      "Íconos de escudo, candado, documento. Diseño sobrio y confiable.",
    cta: { label: "Conoce nuestro equipo", href: "/equipo", variant: "outline" },
  },

  // ─── EQUIPO ───
  {
    id: "equipo",
    slug: "/equipo",
    title: "Equipo multidisciplinario",
    subtitle: "Clínica, laboratorio, bioinformática e investigación en un solo equipo.",
    objective:
      "Mostrar las disciplinas involucradas y la naturaleza interdisciplinaria.",
    keyMessage:
      "La interpretación genómica no recae en una sola disciplina.",
    contentStatus: "borrador",
    visualElement:
      "Tarjetas de equipo con disciplina, rol y fotografía. Red de conexiones entre disciplinas.",
    cta: { label: "Contáctanos", href: "/contacto", variant: "primary" },
  },

  // ─── PREGUNTAS FRECUENTES ───
  {
    id: "preguntas-frecuentes",
    slug: "/preguntas-frecuentes",
    title: "Preguntas frecuentes",
    subtitle: "Respuestas claras sobre genómica, el Índice Alelo y nuestro proceso.",
    objective:
      "Resolver dudas comunes con rigor y claridad.",
    keyMessage:
      "La genómica es compleja, pero sus beneficios deben ser comprensibles.",
    contentStatus: "borrador",
    visualElement: "Acordeón expandible, agrupado por categorías.",
    cta: { label: "¿Más preguntas? Escríbenos", href: "/contacto", variant: "secondary" },
  },

  // ─── CONTACTO ───
  {
    id: "contacto",
    slug: "/contacto",
    title: "Contacto y vinculación",
    subtitle: "Para pacientes, profesionales de la salud, instituciones e investigadores.",
    objective:
      "Facilitar agendamiento, consultas, alianzas y vinculación institucional.",
    keyMessage:
      "Alelo está abierto a la colaboración, la referencia clínica y la investigación conjunta.",
    contentStatus: "borrador",
    visualElement:
      "Formulario limpio. Datos de contacto. Mapa. Secciones diferenciadas por tipo de interlocutor.",
    cta: { label: "Enviar mensaje", href: "#form", variant: "primary" },
  },
];
