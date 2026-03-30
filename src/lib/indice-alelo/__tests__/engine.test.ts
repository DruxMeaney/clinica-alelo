/**
 * Tests numéricos del motor del Índice Alelo.
 *
 * Verifican que la implementación produce resultados matemáticamente
 * correctos para casos conocidos.
 *
 * Ejecutar con: npx tsx src/lib/indice-alelo/__tests__/engine.test.ts
 */

import {
  posteriorBayes,
  calcularPi,
  getScoreFunction,
  resolverPriors,
  calcularSNV,
  type SNVRecord,
  type SNVReading,
} from "../engine";

// ─── Helpers ─────────────────────────────────────────────────────────

function assertClose(actual: number, expected: number, tolerance: number, label: string) {
  const diff = Math.abs(actual - expected);
  if (diff > tolerance) {
    console.error(`FAIL: ${label} — expected ${expected}, got ${actual} (diff ${diff})`);
    process.exit(1);
  } else {
    console.log(`  OK: ${label} = ${actual.toFixed(6)} (expected ~${expected})`);
  }
}

// ─── Test 1: Posterior bayesiano con lecturas claras ──────────────────

console.log("\n=== Test 1: Posterior con k=0, n=100 (homocigoto referencia) ===");
{
  // Con k=0 de 100 lecturas, casi seguro es RR
  const { postRR, postRV, postVV } = posteriorBayes(0, 100, 1/3, 1/3, 1/3, 0.01);
  assertClose(postRR, 1.0, 0.01, "Pr(RR|k=0,n=100)");
  assertClose(postRV, 0.0, 0.01, "Pr(RV|k=0,n=100)");
  assertClose(postVV, 0.0, 0.01, "Pr(VV|k=0,n=100)");
}

console.log("\n=== Test 2: Posterior con k=50, n=100 (heterocigoto) ===");
{
  const { postRR, postRV, postVV } = posteriorBayes(50, 100, 1/3, 1/3, 1/3, 0.01);
  assertClose(postRV, 1.0, 0.01, "Pr(RV|k=50,n=100)");
  assertClose(postRR, 0.0, 0.01, "Pr(RR|k=50,n=100)");
  assertClose(postVV, 0.0, 0.01, "Pr(VV|k=50,n=100)");
}

console.log("\n=== Test 3: Posterior con k=100, n=100 (homocigoto variante) ===");
{
  const { postRR, postRV, postVV } = posteriorBayes(100, 100, 1/3, 1/3, 1/3, 0.01);
  assertClose(postVV, 1.0, 0.01, "Pr(VV|k=100,n=100)");
  assertClose(postRR, 0.0, 0.01, "Pr(RR|k=100,n=100)");
  assertClose(postRV, 0.0, 0.01, "Pr(RV|k=100,n=100)");
}

// ─── Test 4: Pi con modelos de herencia ──────────────────────────────

console.log("\n=== Test 4: Pi según modelo de herencia ===");
{
  // Aditivo: heterocigoto → Pi = 0.5
  const piAdit = calcularPi(0, 1, 0, "aditivo");
  assertClose(piAdit, 0.5, 0.001, "Pi(RV, aditivo)");

  // Dominante: heterocigoto → Pi = 1.0
  const piDom = calcularPi(0, 1, 0, "dominante");
  assertClose(piDom, 1.0, 0.001, "Pi(RV, dominante)");

  // Recesivo: heterocigoto → Pi = 0.0
  const piRec = calcularPi(0, 1, 0, "recesivo");
  assertClose(piRec, 0.0, 0.001, "Pi(RV, recesivo)");

  // Todos los modelos: homocigoto variante → Pi = 1.0
  assertClose(calcularPi(0, 0, 1, "aditivo"), 1.0, 0.001, "Pi(VV, aditivo)");
  assertClose(calcularPi(0, 0, 1, "dominante"), 1.0, 0.001, "Pi(VV, dominante)");
  assertClose(calcularPi(0, 0, 1, "recesivo"), 1.0, 0.001, "Pi(VV, recesivo)");

  // Todos los modelos: homocigoto referencia → Pi = 0.0
  assertClose(calcularPi(1, 0, 0, "aditivo"), 0.0, 0.001, "Pi(RR, aditivo)");
  assertClose(calcularPi(1, 0, 0, "dominante"), 0.0, 0.001, "Pi(RR, dominante)");
  assertClose(calcularPi(1, 0, 0, "recesivo"), 0.0, 0.001, "Pi(RR, recesivo)");
}

// ─── Test 5: Pi integrado (posterior × S(G)) ─────────────────────────

console.log("\n=== Test 5: Pi integrado (Bayes + modelo herencia) ===");
{
  // k=50, n=100 con prior uniforme → posterior ≈ (0, 1, 0) → Pi depende del modelo
  const post = posteriorBayes(50, 100, 1/3, 1/3, 1/3, 0.01);

  const piAdit = calcularPi(post.postRR, post.postRV, post.postVV, "aditivo");
  assertClose(piAdit, 0.5, 0.05, "Pi integrado(k=50,n=100, aditivo) ≈ 0.5");

  const piDom = calcularPi(post.postRR, post.postRV, post.postVV, "dominante");
  assertClose(piDom, 1.0, 0.05, "Pi integrado(k=50,n=100, dominante) ≈ 1.0");

  const piRec = calcularPi(post.postRR, post.postRV, post.postVV, "recesivo");
  assertClose(piRec, 0.0, 0.05, "Pi integrado(k=50,n=100, recesivo) ≈ 0.0");
}

// ─── Test 6: Efecto de la cobertura baja ─────────────────────────────

console.log("\n=== Test 6: Cobertura baja vs alta ===");
{
  // Con cobertura baja (n=3), el posterior debería acercarse a los priors
  const postLow = posteriorBayes(1, 3, 0.25, 0.50, 0.25, 0.01);
  // Con cobertura alta (n=300), debería dominar los datos
  const postHigh = posteriorBayes(150, 300, 0.25, 0.50, 0.25, 0.01);

  console.log(`  Low cov (k=1/3):  RR=${postLow.postRR.toFixed(4)}, RV=${postLow.postRV.toFixed(4)}, VV=${postLow.postVV.toFixed(4)}`);
  console.log(`  High cov (k=150/300): RR=${postHigh.postRR.toFixed(4)}, RV=${postHigh.postRV.toFixed(4)}, VV=${postHigh.postVV.toFixed(4)}`);

  // Con n=300 y k=150, debe ser casi seguro heterocigoto
  assertClose(postHigh.postRV, 1.0, 0.01, "Pr(RV|k=150,n=300) ≈ 1.0");

  // Con n=3, k=1 (r=0.33), hay más incertidumbre
  // El posterior no debería ser tan extremo
  const piLow = calcularPi(postLow.postRR, postLow.postRV, postLow.postVV, "aditivo");
  console.log(`  Pi aditivo (baja cov): ${piLow.toFixed(4)}`);
  // No debería ser exactamente 0.33 — el prior de RV=0.50 lo jala hacia 0.5
}

// ─── Test 7: Consistencia del posterior ──────────────────────────────

console.log("\n=== Test 7: Posterior siempre suma 1 ===");
{
  const testCases = [
    [0, 10], [5, 10], [10, 10],
    [0, 1], [1, 1],
    [3, 100], [97, 100],
    [0, 0], // edge case
  ];
  for (const [k, n] of testCases) {
    const { postRR, postRV, postVV } = posteriorBayes(k, n, 0.25, 0.50, 0.25, 0.01);
    const sum = postRR + postRV + postVV;
    assertClose(sum, 1.0, 0.001, `Σ posterior(k=${k},n=${n})`);
  }
}

console.log("\n=== TODOS LOS TESTS PASARON ===\n");
