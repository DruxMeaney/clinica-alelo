/**
 * Motor del Índice Alelo — Traducción fiel de appCompleta_v7.py
 *
 * Preserva la lógica original:
 * - Priors HWE por población
 * - Actualización bayesiana con lecturas (k/n)
 * - Mezcla por cobertura (shrinkage)
 * - Modos HWE / BAYES / AUTO
 * - Módulos 1-7 con distinción riesgo/protectora
 * - Módulo 3 con polaridad invertida
 *
 * Mejoras respecto al original:
 * - Tipado estricto con TypeScript
 * - Estado encapsulado (sin globales mutables)
 * - Normalización opcional a escala 0-100
 * - Funciones puras y testeables
 */

// ─── Tipos ───────────────────────────────────────────────────────────

export interface SNVRecord {
  rsID: string;
  gene: string;
  wi: number;
  tipo: string; // "Riesgo" | "Protectora" | etc.
  funcion: string;
  indice: number; // módulo 1-7
  category: string;
  alleleRef: string;
  alleleString: string;
  aleloInteres: string;
  altAlleles: Record<string, string>; // por población
  freqAlt: Record<string, number>;   // Freq_ALT por población
  pPrior: Record<string, number>;    // p_prior_ALT por población
  qPrior: Record<string, number>;    // q_prior_ALT por población
  hweAA: Record<string, number>;     // P_HWE_AA_ALT por población
  hweAa: Record<string, number>;     // P_HWE_Aa_ALT por población
  hweaa: Record<string, number>;     // P_HWE_aa_ALT por población
  oddsRatio?: string;
  ci95?: string;
  pubmedID?: string;
}

export interface SNVReading {
  rsID: string;
  n: number;
  k: number;
}

export interface SNVResult {
  rsID: string;
  gene: string;
  wi: number;
  tipo: string;
  esProtectora: boolean;
  modulo: number;
  // Alelos
  ref: string;
  alt: string;
  aleloInteres: string;
  // Priors HWE
  prior0: number;
  prior1: number;
  prior2: number;
  priorSource: string;
  // Posterior (si hay lecturas)
  post0: number;
  post1: number;
  post2: number;
  // Lecturas
  n: number | null;
  k: number | null;
  // Pi y aporte
  pi: number;
  piFinal: number;
  aporte: number;
  // Modo
  modo: "HWE" | "BAYES" | "FALLBACK_HWE";
  log: string;
}

export interface ModuleResult {
  modulo: number;
  nombre: string;
  riesgoTotal: number;
  protectoraTotal: number;
  indice: number;
  indiceNormalizado: number; // 0-100
  maxTeoricoRiesgo: number;
  maxTeoricoProtectora: number;
  snvResults: SNVResult[];
  snvCount: number;
  snvRiesgoCount: number;
  snvProtectoraCount: number;
}

export interface PatientProfile {
  nombre: string;
  codigo: string;
  poblacion: string;
  modo: "AUTO" | "BAYES" | "HWE";
  epsilon: number;
  n0: number;
  mezclaCobertura: boolean;
  fallbackHW: boolean;
  modules: ModuleResult[];
}

export type Poblacion = "General" | "Europea" | "Americana" | "Latinoamericana" | "Mexicana";

// ─── Constantes ──────────────────────────────────────────────────────

export const MODULOS: Record<number, string> = {
  1: "Regulación del peso y obesidad",
  2: "Diabetes tipo 2",
  3: "Respuesta al ejercicio y composición muscular",
  4: "Salud cardiovascular",
  5: "Nutrigenómica y micronutrientes",
  6: "Farmacogenética y respuesta a fármacos",
  7: "Tendencias de bienestar y salud general",
};

const S0 = 0.0;
const S1 = 0.5;
const S2 = 1.0;

export const POBLACIONES: Poblacion[] = [
  "General", "Europea", "Americana", "Latinoamericana", "Mexicana"
];

// ─── Funciones auxiliares ────────────────────────────────────────────

/** Determina si una variante es protectora */
export function esProtectora(tipo: string): boolean {
  if (!tipo) return false;
  const t = tipo.trim().toLowerCase();
  return t.startsWith("p") && (t.includes("prote") || t === "protectora" || t === "protective");
}

/** Log-gamma para cálculo binomial */
function lgamma(x: number): number {
  // Stirling's approximation + Lanczos coefficients
  if (x <= 0) return 0;
  const g = 7;
  const c = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  let sum = c[0];
  for (let i = 1; i < g + 2; i++) {
    sum += c[i] / (x + i - 1);
  }
  const t = x + g - 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (x - 0.5) * Math.log(t) - t + Math.log(sum);
}

/** Log de PMF binomial */
function logBinomPmf(k: number, n: number, p: number): number {
  const pSafe = Math.max(1e-15, Math.min(1 - 1e-15, p));
  if (k === 0 && n === 0) return 0;
  return (
    lgamma(n + 1) - lgamma(k + 1) - lgamma(n - k + 1) +
    k * Math.log(pSafe) + (n - k) * Math.log(1 - pSafe)
  );
}

/** Log-sum-exp para estabilidad numérica */
function logSumExp(a: number, b: number, c: number): number {
  const mx = Math.max(a, b, c);
  if (!isFinite(mx)) return -Infinity;
  return mx + Math.log(Math.exp(a - mx) + Math.exp(b - mx) + Math.exp(c - mx));
}

// ─── Motor de cálculo ────────────────────────────────────────────────

/**
 * Resuelve priors HWE para un SNV dado una población.
 * Prioridad: columnas HWE directas > derivar de p_prior > uniforme 1/3
 */
export function resolverPriors(
  snv: SNVRecord,
  pop: string
): { p0: number; p1: number; p2: number; source: string } {
  // 1. Columnas HWE directas
  const aa = snv.hweaa[pop]; // P(G=0) = aa homozigoto ref
  const Aa = snv.hweAa[pop]; // P(G=1) = heterozigoto
  const AA = snv.hweAA[pop]; // P(G=2) = AA homozigoto alt

  if (isFinite(aa) && isFinite(Aa) && isFinite(AA) && (aa + Aa + AA) > 0.001) {
    const sum = aa + Aa + AA;
    return { p0: aa / sum, p1: Aa / sum, p2: AA / sum, source: `HWE_${pop}` };
  }

  // Fallback a General
  if (pop !== "General") {
    const aaG = snv.hweaa["General"];
    const AaG = snv.hweAa["General"];
    const AAG = snv.hweAA["General"];
    if (isFinite(aaG) && isFinite(AaG) && isFinite(AAG) && (aaG + AaG + AAG) > 0.001) {
      const sum = aaG + AaG + AAG;
      return { p0: aaG / sum, p1: AaG / sum, p2: AAG / sum, source: "HWE_General(fallback)" };
    }
  }

  // 2. Derivar de p_prior
  let q = snv.pPrior[pop];
  if (!isFinite(q) || q <= 0 || q >= 1) {
    q = snv.pPrior["General"];
  }
  if (!isFinite(q) || q <= 0 || q >= 1) {
    q = snv.freqAlt[pop];
  }
  if (!isFinite(q) || q <= 0 || q >= 1) {
    q = snv.freqAlt["General"];
  }

  if (isFinite(q) && q > 0 && q < 1) {
    const p = 1 - q;
    return { p0: p * p, p1: 2 * p * q, p2: q * q, source: `HW_derivado(q=${q.toFixed(4)})` };
  }

  // 3. Uniforme
  return { p0: 1 / 3, p1: 1 / 3, p2: 1 / 3, source: "uniforme(sin datos)" };
}

/**
 * Inversión de priors cuando el alelo de interés es REF (no ALT).
 * En ese caso, G=0 (0 copias de ALT) = 2 copias de REF = máxima expresión.
 */
function invertirSiNecesario(
  p0: number, p1: number, p2: number,
  aleloInteres: string, alleleRef: string
): { p0: number; p1: number; p2: number; invertido: boolean } {
  if (aleloInteres && alleleRef &&
      aleloInteres.toUpperCase() === alleleRef.toUpperCase()) {
    return { p0: p2, p1, p2: p0, invertido: true };
  }
  return { p0, p1, p2, invertido: false };
}

/**
 * Actualización bayesiana: posterior P(G|k,n)
 */
export function posteriorBayes(
  k: number, n: number,
  p0: number, p1: number, p2: number,
  eps: number
): { post0: number; post1: number; post2: number; logEvidence: number } {
  const epsC = Math.max(1e-6, Math.min(0.49, eps));
  const theta0 = epsC;
  const theta1 = 0.5;
  const theta2 = 1 - epsC;

  const logL0 = logBinomPmf(k, n, theta0) + Math.log(Math.max(1e-30, p0));
  const logL1 = logBinomPmf(k, n, theta1) + Math.log(Math.max(1e-30, p1));
  const logL2 = logBinomPmf(k, n, theta2) + Math.log(Math.max(1e-30, p2));

  const logZ = logSumExp(logL0, logL1, logL2);

  return {
    post0: Math.exp(logL0 - logZ),
    post1: Math.exp(logL1 - logZ),
    post2: Math.exp(logL2 - logZ),
    logEvidence: logZ,
  };
}

/** Pi = dosaje esperado */
export function calcularPi(p0: number, p1: number, p2: number): number {
  return S0 * p0 + S1 * p1 + S2 * p2;
}

/**
 * Calcula el resultado completo para un SNV.
 */
export function calcularSNV(
  snv: SNVRecord,
  reading: SNVReading | null,
  pop: string,
  modo: "AUTO" | "BAYES" | "HWE",
  eps: number,
  n0: number,
  mezclaCobertura: boolean,
  fallbackHW: boolean
): SNVResult {
  // Resolver priors
  const priors = resolverPriors(snv, pop);
  const altPop = snv.altAlleles[pop] || snv.altAlleles["General"] || "";
  const aleloInt = snv.aleloInteres || altPop;

  // Invertir si el alelo de interés es REF
  const inv = invertirSiNecesario(priors.p0, priors.p1, priors.p2, aleloInt, snv.alleleRef);

  let { p0, p1, p2 } = inv;
  let post0 = p0, post1 = p1, post2 = p2;
  let pi: number;
  let piFinal: number;
  let modoUsado: "HWE" | "BAYES" | "FALLBACK_HWE" = "HWE";
  let log = `Priors: ${priors.source}`;
  if (inv.invertido) log += " [invertido]";

  const hasReading = reading !== null && reading.n > 0 && reading.k >= 0 && reading.k <= reading.n;
  const useBayes = modo === "BAYES" || (modo === "AUTO" && hasReading);

  if (useBayes && hasReading) {
    const posterior = posteriorBayes(reading!.k, reading!.n, p0, p1, p2, eps);
    post0 = posterior.post0;
    post1 = posterior.post1;
    post2 = posterior.post2;
    pi = calcularPi(post0, post1, post2);

    if (mezclaCobertura && reading!.n > 0) {
      const piCont = reading!.k / reading!.n;
      const w = reading!.n / (reading!.n + n0);
      piFinal = w * piCont + (1 - w) * pi;
      log += ` | BAYES+mezcla(w=${w.toFixed(3)})`;
    } else {
      piFinal = pi;
      log += " | BAYES puro";
    }
    modoUsado = "BAYES";
  } else if (useBayes && !hasReading && fallbackHW) {
    pi = calcularPi(p0, p1, p2);
    piFinal = pi;
    modoUsado = "FALLBACK_HWE";
    log += " | Fallback HWE (sin lecturas)";
  } else {
    pi = calcularPi(p0, p1, p2);
    piFinal = pi;
    modoUsado = "HWE";
    log += " | HWE";
  }

  const protectora = esProtectora(snv.tipo);
  const aporte = piFinal * snv.wi;

  return {
    rsID: snv.rsID,
    gene: snv.gene,
    wi: snv.wi,
    tipo: snv.tipo,
    esProtectora: protectora,
    modulo: snv.indice,
    ref: snv.alleleRef,
    alt: altPop,
    aleloInteres: aleloInt,
    prior0: p0,
    prior1: p1,
    prior2: p2,
    priorSource: priors.source,
    post0,
    post1,
    post2,
    n: reading?.n ?? null,
    k: reading?.k ?? null,
    pi,
    piFinal,
    aporte,
    modo: modoUsado,
    log,
  };
}

/**
 * Calcula el índice de un módulo completo.
 */
export function calcularModulo(
  snvs: SNVRecord[],
  readings: Map<string, SNVReading>,
  moduloNum: number,
  pop: string,
  modo: "AUTO" | "BAYES" | "HWE",
  eps: number,
  n0: number,
  mezclaCobertura: boolean,
  fallbackHW: boolean
): ModuleResult {
  const moduloSNVs = snvs.filter(s => s.indice === moduloNum);
  const results: SNVResult[] = [];
  let riesgoTotal = 0;
  let protectoraTotal = 0;
  let maxRiesgo = 0;
  let maxProtectora = 0;

  for (const snv of moduloSNVs) {
    const reading = readings.get(snv.rsID) ?? null;
    const result = calcularSNV(snv, reading, pop, modo, eps, n0, mezclaCobertura, fallbackHW);
    results.push(result);

    if (result.esProtectora) {
      protectoraTotal += result.aporte;
      maxProtectora += snv.wi; // máximo teórico: Pi=1 * Wi
    } else {
      riesgoTotal += result.aporte;
      maxRiesgo += snv.wi;
    }
  }

  // Módulo 3: polaridad invertida (protectora - riesgo)
  const indiceRaw = moduloNum === 3
    ? Math.max(0, protectoraTotal - riesgoTotal)
    : Math.max(0, riesgoTotal - protectoraTotal);

  // Normalización a 0-100
  const maxTeorico = moduloNum === 3 ? maxProtectora : maxRiesgo;
  const indiceNormalizado = maxTeorico > 0
    ? Math.min(100, (indiceRaw / maxTeorico) * 100)
    : 0;

  return {
    modulo: moduloNum,
    nombre: MODULOS[moduloNum] || `Módulo ${moduloNum}`,
    riesgoTotal,
    protectoraTotal,
    indice: indiceRaw,
    indiceNormalizado,
    maxTeoricoRiesgo: maxRiesgo,
    maxTeoricoProtectora: maxProtectora,
    snvResults: results,
    snvCount: moduloSNVs.length,
    snvRiesgoCount: results.filter(r => !r.esProtectora).length,
    snvProtectoraCount: results.filter(r => r.esProtectora).length,
  };
}

/**
 * Calcula todos los módulos para un paciente.
 */
export function calcularPerfil(
  snvs: SNVRecord[],
  readings: Map<string, SNVReading>,
  config: {
    nombre: string;
    codigo: string;
    poblacion: string;
    modo: "AUTO" | "BAYES" | "HWE";
    epsilon: number;
    n0: number;
    mezclaCobertura: boolean;
    fallbackHW: boolean;
  }
): PatientProfile {
  const modules: ModuleResult[] = [];

  for (let m = 1; m <= 7; m++) {
    modules.push(
      calcularModulo(
        snvs, readings, m,
        config.poblacion, config.modo, config.epsilon, config.n0,
        config.mezclaCobertura, config.fallbackHW
      )
    );
  }

  return {
    nombre: config.nombre,
    codigo: config.codigo,
    poblacion: config.poblacion,
    modo: config.modo,
    epsilon: config.epsilon,
    n0: config.n0,
    mezclaCobertura: config.mezclaCobertura,
    fallbackHW: config.fallbackHW,
    modules,
  };
}
