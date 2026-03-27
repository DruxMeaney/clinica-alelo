// ============================================================
// Design Tokens — Paleta y constantes de diseño
// ============================================================

export const COLORS = {
  // Primarios
  verdeProfundo: "#2D6A4F",
  azulPetroleo: "#1B4965",
  grisGrafito: "#374151",

  // Acentos
  verdeLuminoso: "#52B788",
  azulClaro: "#5390D9",

  // Neutros
  blanco: "#FFFFFF",
  grisMuyClaro: "#F9FAFB",
  grisClaro: "#E5E7EB",
  grisMedio: "#9CA3AF",
  negro: "#111827",

  // Módulos del Índice Alelo
  moduloPeso: "#2D6A4F",
  moduloDiabetes: "#1B4965",
  moduloDeportivo: "#3A7D44",
  moduloCardiovascular: "#9B2226",
  moduloNutrigenomica: "#606C38",
  moduloFarmacogenetica: "#5C4D7D",
  moduloBienestar: "#BC6C25",

  // Semánticos
  error: "#DC2626",
  warning: "#F59E0B",
  success: "#16A34A",
  info: "#2563EB",
} as const;

export const TYPOGRAPHY = {
  fontFamily: {
    heading: '"Inter", "system-ui", sans-serif',
    body: '"Inter", "system-ui", sans-serif',
    mono: '"JetBrains Mono", "Fira Code", monospace',
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
  },
} as const;

export const SPACING = {
  sectionPaddingY: "6rem",
  containerMaxWidth: "1280px",
  containerPadding: "1.5rem",
} as const;

/**
 * RECOMENDACIONES VISUALES (referencia para diseño):
 *
 * - Fondo claro con secciones alternadas en tonos suaves
 * - Acentos en verdes profundos, azul petróleo, gris grafito
 * - Detalles luminosos inspirados en secuencias genéticas
 * - Diagramas sutiles, líneas finas, visualizaciones tipo red
 * - Patrones inspirados en ADN, mapas de datos, capas translúcidas
 * - Fotografía clínica no estereotipada
 * - Íconos limpios, esquemas moleculares discretos
 * - Nada de estética de laboratorio antiguo
 * - Nada de banco de imágenes genérico con sonrisas falsas
 */
