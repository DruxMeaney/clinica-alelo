/**
 * Motor del Índice Alelo — Alineado con IndiceAlelo.pdf (metodología oficial)
 *
 * Implementa fielmente la formulación del documento:
 *
 *   Índice Alelo_g = Σ (P_ig × W_ig)
 *
 * donde:
 *   P_ig ∈ [0,1] = puntaje de genotipo (valor esperado del efecto)
 *   W_ig = peso clínico de la variante i en el módulo g
 *   ΣW_ig(riesgo) = 100 por módulo → el índice vive en escala 0–100
 *
 * Capas del modelo (sección 5 del PDF):
 *   G_i: genotipo teórico discreto (depende del modelo de herencia)
 *   r_i: proporción de lecturas variantes (k/n) del secuenciador
 *   P_i: estimación continua de G_i a partir de r_i y el modelo de herencia
 *
 * Tres modelos de herencia → función S(G):
 *   Aditivo/codominante: S(RR)=0, S(RV)=0.5, S(VV)=1
 *   Dominante:           S(RR)=0, S(RV)=1,   S(VV)=1
 *   Recesivo:            S(RR)=0, S(RV)=0,   S(VV)=1
 *
 * Estimación bayesiana (sección 6):
 *   k | (n, G) ~ Binomial(n, θ_G)
 *   θ_RR = ε, θ_RV = 0.5, θ_VV = 1 − ε
 *   P_i = Σ S(G) × Pr(G | k, n)  ← valor esperado del efecto
 *
 * Variantes riesgo/protectoras (sección 7):
 *   R_g = Σ (P_ig × W_ig) para variantes de riesgo, con ΣW_ig(riesgo) = 100
 *   B_g = Σ (P_ig × W_ig) para variantes protectoras (pesos independientes)
 *   Índice Alelo_g^(neto) = max(0, R_g − B_g)
 *
 * Guías internacionales consideradas:
 *   - ACMG 2023: PRS no es diagnóstico, es estimación probabilística de riesgo
 *   - eMERGE 2024: validación poblacional necesaria para uso clínico
 *   - CPIC: farmacogenética requiere diplotipos (limitación documentada en M6)
 */

// ─── Tipos ───────────────────────────────────────────────────────────

export type InheritanceModel = "aditivo" | "dominante" | "recesivo";

export interface SNVRecord {
  rsID: string;
  gene: string;
  wi: number;
  tipo: string;
  funcion: string;
  indice: number;
  category: string;
  alleleRef: string;
  alleleString: string;
  aleloInteres: string;
  inheritanceModel: InheritanceModel;
  altAlleles: Record<string, string>;
  freqAlt: Record<string, number>;
  pPrior: Record<string, number>;
  qPrior: Record<string, number>;
  hweAA: Record<string, number>;
  hweAa: Record<string, number>;
  hweaa: Record<string, number>;
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
  inheritanceModel: InheritanceModel;
  ref: string;
  alt: string;
  aleloInteres: string;
  // Función S(G) según modelo de herencia
  sRR: number;
  sRV: number;
  sVV: number;
  // Priors HWE
  prior0: number; // Pr(RR)
  prior1: number; // Pr(RV)
  prior2: number; // Pr(VV)
  priorSource: string;
  // Posterior Pr(G|k,n)
  post0: number;
  post1: number;
  post2: number;
  // Lecturas
  n: number | null;
  k: number | null;
  ri: number | null; // k/n — proporción observada
  // Pi = Σ S(G) × Pr(G|k,n)
  pi: number;
  aporte: number; // Pi × Wi
  // Modo
  modo: "HWE" | "BAYES" | "FALLBACK_HWE";
  log: string;
}

export interface ModuleResult {
  modulo: number;
  nombre: string;
  riesgoTotal: number;     // R_g: Σ(Pi × Wi) para riesgo
  protectoraTotal: number; // B_g: Σ(Pi × Wi) para protectoras
  indice: number;          // max(0, R_g − B_g) o max(0, B_g − R_g) para M3
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

export const POBLACIONES: Poblacion[] = [
  "General", "Europea", "Americana", "Latinoamericana", "Mexicana"
];

// ─── Funciones S(G): traducción genotipo → efecto ────────────────────

/**
 * Devuelve los puntajes S(RR), S(RV), S(VV) según el modelo de herencia.
 * Esta es la pieza central que diferencia la interpretación del efecto genético.
 * (IndiceAlelo.pdf, sección 5.0.1)
 */
export function getScoreFunction(model: InheritanceModel): { sRR: number; sRV: number; sVV: number } {
  switch (model) {
    case "dominante":
      return { sRR: 0, sRV: 1, sVV: 1 };
    case "recesivo":
      return { sRR: 0, sRV: 0, sVV: 1 };
    case "aditivo":
    default:
      return { sRR: 0, sRV: 0.5, sVV: 1 };
  }
}

// ─── Funciones auxiliares ────────────────────────────────────────────

export function esProtectora(tipo: string): boolean {
  if (!tipo) return false;
  const t = tipo.trim().toLowerCase();
  return t === "protectora" || t === "protective" || t.startsWith("protec");
}

function lgamma(x: number): number {
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

function logBinomPmf(k: number, n: number, p: number): number {
  const pSafe = Math.max(1e-15, Math.min(1 - 1e-15, p));
  if (k === 0 && n === 0) return 0;
  return (
    lgamma(n + 1) - lgamma(k + 1) - lgamma(n - k + 1) +
    k * Math.log(pSafe) + (n - k) * Math.log(1 - pSafe)
  );
}

function logSumExp(a: number, b: number, c: number): number {
  const mx = Math.max(a, b, c);
  if (!isFinite(mx)) return -Infinity;
  return mx + Math.log(Math.exp(a - mx) + Math.exp(b - mx) + Math.exp(c - mx));
}

// ─── Resolución de priors HWE ────────────────────────────────────────

/**
 * Resuelve Pr(RR), Pr(RV), Pr(VV) usando frecuencias de Hardy-Weinberg.
 * Cascada: HWE directo por población → General → derivar de p_prior → uniforme.
 */
export function resolverPriors(
  snv: SNVRecord,
  pop: string
): { pRR: number; pRV: number; pVV: number; source: string } {
  // 1. Columnas HWE directas para la población
  const aa = snv.hweaa[pop];
  const Aa = snv.hweAa[pop];
  const AA = snv.hweAA[pop];

  if (isFinite(aa) && isFinite(Aa) && isFinite(AA) && (aa + Aa + AA) > 0.001) {
    const sum = aa + Aa + AA;
    return { pRR: aa / sum, pRV: Aa / sum, pVV: AA / sum, source: `HWE_${pop}` };
  }

  // Fallback a General
  if (pop !== "General") {
    const aaG = snv.hweaa["General"];
    const AaG = snv.hweAa["General"];
    const AAG = snv.hweAA["General"];
    if (isFinite(aaG) && isFinite(AaG) && isFinite(AAG) && (aaG + AaG + AAG) > 0.001) {
      const sum = aaG + AaG + AAG;
      return { pRR: aaG / sum, pRV: AaG / sum, pVV: AAG / sum, source: "HWE_General(fallback)" };
    }
  }

  // 2. Derivar de p_prior (frecuencia alélica)
  let q = snv.pPrior[pop];
  if (!isFinite(q) || q <= 0 || q >= 1) q = snv.pPrior["General"];
  if (!isFinite(q) || q <= 0 || q >= 1) q = snv.freqAlt[pop];
  if (!isFinite(q) || q <= 0 || q >= 1) q = snv.freqAlt["General"];

  if (isFinite(q) && q > 0 && q < 1) {
    const p = 1 - q;
    // HWE: Pr(RR) = p², Pr(RV) = 2pq, Pr(VV) = q²
    return { pRR: p * p, pRV: 2 * p * q, pVV: q * q, source: `HW_derivado(q=${q.toFixed(4)})` };
  }

  // 3. Priori neutral (uniforme 1/3)
  return { pRR: 1 / 3, pRV: 1 / 3, pVV: 1 / 3, source: "uniforme(sin datos)" };
}

// ─── Posterior bayesiano ─────────────────────────────────────────────

/**
 * Pr(G | k, n) ∝ Pr(G) × Pr(k | n, G)
 * donde Pr(k | n, G) = Binomial(k; n, θ_G)
 * con θ_RR = ε, θ_RV = 0.5, θ_VV = 1 − ε
 * (IndiceAlelo.pdf, sección 6)
 */
export function posteriorBayes(
  k: number, n: number,
  pRR: number, pRV: number, pVV: number,
  eps: number
): { postRR: number; postRV: number; postVV: number } {
  const epsC = Math.max(1e-6, Math.min(0.49, eps));
  const thetaRR = epsC;
  const thetaRV = 0.5;
  const thetaVV = 1 - epsC;

  const logPostRR = logBinomPmf(k, n, thetaRR) + Math.log(Math.max(1e-30, pRR));
  const logPostRV = logBinomPmf(k, n, thetaRV) + Math.log(Math.max(1e-30, pRV));
  const logPostVV = logBinomPmf(k, n, thetaVV) + Math.log(Math.max(1e-30, pVV));

  const logZ = logSumExp(logPostRR, logPostRV, logPostVV);

  return {
    postRR: Math.exp(logPostRR - logZ),
    postRV: Math.exp(logPostRV - logZ),
    postVV: Math.exp(logPostVV - logZ),
  };
}

/**
 * Calcula Pi = Σ S(G) × Pr(G | datos)
 * Esto es el valor esperado del efecto, considerando tanto el modelo de herencia
 * como la incertidumbre del genotipo.
 * (IndiceAlelo.pdf, sección 6, definición clave)
 */
export function calcularPi(
  postRR: number, postRV: number, postVV: number,
  model: InheritanceModel
): number {
  const { sRR, sRV, sVV } = getScoreFunction(model);
  return sRR * postRR + sRV * postRV + sVV * postVV;
}

// ─── Motor principal ─────────────────────────────────────────────────

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
  const priors = resolverPriors(snv, pop);
  const altPop = snv.altAlleles[pop] || snv.altAlleles["General"] || "";
  const aleloInt = snv.aleloInteres || altPop;
  const model = snv.inheritanceModel || "aditivo";
  const { sRR, sRV, sVV } = getScoreFunction(model);

  // Invertir priors si el alelo de interés es REF
  let { pRR, pRV, pVV } = priors;
  let invertido = false;
  if (aleloInt && snv.alleleRef && aleloInt.toUpperCase() === snv.alleleRef.toUpperCase()) {
    [pRR, pVV] = [pVV, pRR];
    invertido = true;
  }

  let postRR = pRR, postRV = pRV, postVV = pVV;
  let pi: number;
  let modoUsado: "HWE" | "BAYES" | "FALLBACK_HWE" = "HWE";
  let log = `Priors: ${priors.source} | Modelo: ${model}`;
  if (invertido) log += " [invertido]";

  const hasReading = reading !== null && reading.n > 0 && reading.k >= 0 && reading.k <= reading.n;
  const useBayes = modo === "BAYES" || (modo === "AUTO" && hasReading);

  if (useBayes && hasReading) {
    const post = posteriorBayes(reading!.k, reading!.n, pRR, pRV, pVV, eps);
    postRR = post.postRR;
    postRV = post.postRV;
    postVV = post.postVV;

    // Pi = Σ S(G) × Pr(G|k,n)  — valor esperado del efecto (ecuación central del PDF)
    pi = calcularPi(postRR, postRV, postVV, model);
    log += " | BAYES";

    // Nota metodológica: NO mezclamos con k/n crudo.
    // El posterior bayesiano ya incorpora la evidencia de las lecturas.
    // Mezclar con r=k/n sería doble-contar los datos.
    // Si la cobertura es baja, el posterior naturalmente se acerca a los priors.
    // Si la cobertura es alta, el posterior converge al MLE.
    // Esto es exactamente el comportamiento deseado de un estimador bayesiano.

    modoUsado = "BAYES";
  } else if (useBayes && !hasReading && fallbackHW) {
    pi = calcularPi(pRR, pRV, pVV, model);
    modoUsado = "FALLBACK_HWE";
    log += " | Fallback HWE";
  } else {
    pi = calcularPi(pRR, pRV, pVV, model);
    modoUsado = "HWE";
    log += " | HWE";
  }

  const protectora = esProtectora(snv.tipo);
  const aporte = pi * snv.wi;

  return {
    rsID: snv.rsID,
    gene: snv.gene,
    wi: snv.wi,
    tipo: snv.tipo,
    esProtectora: protectora,
    modulo: snv.indice,
    inheritanceModel: model,
    ref: snv.alleleRef,
    alt: altPop,
    aleloInteres: aleloInt,
    sRR, sRV, sVV,
    prior0: pRR,
    prior1: pRV,
    prior2: pVV,
    priorSource: priors.source,
    post0: postRR,
    post1: postRV,
    post2: postVV,
    n: reading?.n ?? null,
    k: reading?.k ?? null,
    ri: hasReading ? reading!.k / reading!.n : null,
    pi,
    aporte,
    modo: modoUsado,
    log,
  };
}

/**
 * Calcula el índice de un módulo completo.
 *
 * Según IndiceAlelo.pdf sección 7:
 *   R_g = Σ(Pi × Wi) para variantes de riesgo
 *   B_g = Σ(Pi × Wi) para variantes protectoras
 *   Índice bruto = max(0, R_g − B_g)  [o B_g − R_g para módulo 3]
 *
 * Normalización dinámica:
 *   El PDF requiere ΣWi(riesgo) = 100 para garantizar escala 0-100.
 *   Si los pesos originales no suman exactamente 100, normalizamos:
 *     Índice = (Índice_bruto / ΣWi_dominante) × 100
 *   donde ΣWi_dominante = ΣWi_riesgo (o ΣWi_protectora para M3).
 *   Esto preserva las proporciones relativas entre variantes.
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
  let sumWiRiesgo = 0;
  let sumWiProtectora = 0;

  for (const snv of moduloSNVs) {
    const reading = readings.get(snv.rsID) ?? null;
    const result = calcularSNV(snv, reading, pop, modo, eps, n0, mezclaCobertura, fallbackHW);
    results.push(result);

    if (result.esProtectora) {
      protectoraTotal += result.aporte;
      sumWiProtectora += snv.wi;
    } else {
      riesgoTotal += result.aporte;
      sumWiRiesgo += snv.wi;
    }
  }

  // Módulo 3: polaridad invertida (beneficio − riesgo)
  const indiceBruto = moduloNum === 3
    ? Math.max(0, protectoraTotal - riesgoTotal)
    : Math.max(0, riesgoTotal - protectoraTotal);

  // Normalización a escala 0-100
  // ΣWi_dominante es la suma de pesos del grupo que define el máximo teórico
  const sumWiDominante = moduloNum === 3 ? sumWiProtectora : sumWiRiesgo;
  const indice = sumWiDominante > 0
    ? (indiceBruto / sumWiDominante) * 100
    : 0;

  return {
    modulo: moduloNum,
    nombre: MODULOS[moduloNum] || `Módulo ${moduloNum}`,
    riesgoTotal,
    protectoraTotal,
    indice,
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
