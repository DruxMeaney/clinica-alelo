"use client";

import { useState } from "react";
import {
  posteriorBayes,
  calcularPi,
  getScoreFunction,
  type InheritanceModel,
} from "@/lib/indice-alelo/engine";

// ─── Simulador interactivo ───────────────────────────────────────────

function BayesSimulator() {
  const [k, setK] = useState(25);
  const [n, setN] = useState(50);
  const [eps, setEps] = useState(0.01);
  const [pRR, setPRR] = useState(0.436);
  const [pRV, setPRV] = useState(0.449);
  const [pVV, setPVV] = useState(0.116);
  const [model, setModel] = useState<InheritanceModel>("aditivo");

  const post = posteriorBayes(k, n, pRR, pRV, pVV, eps);
  const pi = calcularPi(post.postRR, post.postRV, post.postVV, model);
  const { sRR, sRV, sVV } = getScoreFunction(model);
  const ri = n > 0 ? k / n : 0;

  // Generar curva Pi vs r para el gráfico
  const curvePoints: { r: number; pi: number }[] = [];
  for (let rr = 0; rr <= 100; rr += 1) {
    const kSim = rr;
    const nSim = 100;
    const postSim = posteriorBayes(kSim, nSim, pRR, pRV, pVV, eps);
    const piSim = calcularPi(postSim.postRR, postSim.postRV, postSim.postVV, model);
    curvePoints.push({ r: rr / 100, pi: piSim });
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Simulador bayesiano interactivo</h3>
      <p className="text-sm text-gray-400">
        Modifica los parámetros para observar cómo el posterior y Pi cambian en tiempo real.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Controles */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Lecturas variantes k = {k} &nbsp;(de n = {n}) &nbsp;→&nbsp; r = {ri.toFixed(3)}
            </label>
            <input
              type="range" min="0" max={n} value={k}
              onChange={e => setK(parseInt(e.target.value))}
              className="w-full accent-purple-500"
            />
            <div className="flex gap-2 mt-1">
              <label className="text-xs text-gray-500">n =</label>
              <input type="number" min="1" max="1000" value={n}
                onChange={e => setN(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Modelo de herencia</label>
            <div className="flex gap-2">
              {(["aditivo", "dominante", "recesivo"] as const).map(m => (
                <button key={m} onClick={() => setModel(m)}
                  className={`px-3 py-1 rounded-lg text-xs transition ${
                    model === m ? "bg-purple-500/30 text-purple-300 border border-purple-500/40"
                                : "bg-white/5 text-gray-400 border border-white/10"
                  }`}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Priors HWE: Pr(RR)={pRR.toFixed(3)}, Pr(RV)={pRV.toFixed(3)}, Pr(VV)={pVV.toFixed(3)}
            </label>
            <div className="flex gap-2 items-center text-xs text-gray-500">
              <span>q =</span>
              <input type="range" min="1" max="99"
                value={Math.round(Math.sqrt(pVV) * 100)}
                onChange={e => {
                  const q = parseInt(e.target.value) / 100;
                  const p = 1 - q;
                  setPRR(p * p); setPRV(2 * p * q); setPVV(q * q);
                }}
                className="flex-1 accent-purple-500"
              />
              <span>{Math.sqrt(pVV).toFixed(2)}</span>
            </div>
          </div>

          <div className="text-xs text-gray-500">
            &epsilon; (error de secuenciación) = {eps}
          </div>
        </div>

        {/* Resultados */}
        <div className="space-y-4">
          {/* Barras de posterior */}
          <div>
            <p className="text-xs text-gray-400 mb-2">Probabilidad posterior Pr(G | k, n):</p>
            <div className="space-y-2">
              {[
                { label: "RR (hom. ref)", val: post.postRR, color: "bg-blue-500" },
                { label: "RV (heterocigoto)", val: post.postRV, color: "bg-purple-500" },
                { label: "VV (hom. var)", val: post.postVV, color: "bg-fuchsia-500" },
              ].map(({ label, val, color }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-500 w-24">{label}</span>
                  <div className="flex-1 h-4 rounded bg-white/5 overflow-hidden">
                    <div className={`h-full ${color} rounded transition-all duration-300`}
                      style={{ width: `${val * 100}%` }} />
                  </div>
                  <span className="text-xs font-mono text-gray-300 w-14 text-right">
                    {(val * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* S(G) y Pi */}
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <p className="text-xs text-gray-400 mb-2">Función S(G) [{model}]:</p>
            <div className="flex gap-4 text-xs font-mono">
              <span className="text-blue-400">S(RR)={sRR}</span>
              <span className="text-purple-400">S(RV)={sRV}</span>
              <span className="text-fuchsia-400">S(VV)={sVV}</span>
            </div>
            <div className="mt-3 p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <p className="text-xs text-gray-400">
                P<sub>i</sub> = S(RR)&times;Pr(RR|k,n) + S(RV)&times;Pr(RV|k,n) + S(VV)&times;Pr(VV|k,n)
              </p>
              <p className="text-xl font-bold font-mono text-purple-300 mt-1">
                P<sub>i</sub> = {pi.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Curva Pi vs r — gráfico ASCII mejorado */}
      <div>
        <p className="text-xs text-gray-400 mb-2">
          Curva P<sub>i</sub> vs r<sub>i</sub> (modelo {model}, n=100):
        </p>
        <div className="relative h-48 bg-white/[0.02] rounded-xl border border-white/5 overflow-hidden">
          {/* Eje Y labels */}
          <span className="absolute left-1 top-1 text-[9px] text-gray-600">1.0</span>
          <span className="absolute left-1 top-1/2 -translate-y-1/2 text-[9px] text-gray-600">0.5</span>
          <span className="absolute left-1 bottom-1 text-[9px] text-gray-600">0.0</span>
          {/* Eje X labels */}
          <span className="absolute bottom-1 left-8 text-[9px] text-gray-600">0</span>
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-gray-600">0.5</span>
          <span className="absolute bottom-1 right-2 text-[9px] text-gray-600">1.0</span>
          {/* Grid lines */}
          <div className="absolute left-8 right-2 top-1/2 h-px bg-white/5" />
          <div className="absolute left-1/2 top-4 bottom-4 w-px bg-white/5" />
          {/* Curva */}
          <svg className="absolute left-8 right-2 top-4 bottom-4" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="#a855f7"
              strokeWidth="0.8"
              points={curvePoints.map((p, i) => `${i},${100 - p.pi * 100}`).join(" ")}
            />
            {/* Punto actual */}
            <circle
              cx={ri * 100}
              cy={100 - pi * 100}
              r="2"
              fill="#f0abfc"
              stroke="#a855f7"
              strokeWidth="0.5"
            />
            {/* Línea diagonal de referencia (Pi = r) */}
            <line x1="0" y1="100" x2="100" y2="0" stroke="white" strokeWidth="0.3" strokeDasharray="2,2" opacity="0.2" />
          </svg>
          <span className="absolute right-3 top-5 text-[9px] text-gray-600">
            Pi vs r &nbsp;(---&nbsp;referencia lineal)
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Componente principal ────────────────────────────────────────────

export default function ModelDocumentation() {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { id: "vision", title: "Visión general" },
    { id: "capas", title: "Capas del modelo" },
    { id: "bayes", title: "Estimación bayesiana" },
    { id: "herencia", title: "Modelos de herencia" },
    { id: "indice", title: "Cálculo del índice" },
    { id: "simulador", title: "Simulador" },
    { id: "mejoras", title: "Propuestas de mejora" },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-white">
            Documentación del modelo matemático
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Índice Alelo — Fundamentación, ecuaciones y validación
          </p>
        </div>
      </div>

      {/* Navegación por secciones */}
      <div className="flex gap-1 mb-8 overflow-x-auto pb-2">
        {sections.map((s, i) => (
          <button key={s.id} onClick={() => setActiveSection(i)}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition ${
              activeSection === i
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                : "text-gray-400 hover:bg-white/5 border border-transparent"
            }`}>
            {s.title}
          </button>
        ))}
      </div>

      {/* ═══ Sección 0: Visión general ═══ */}
      {activeSection === 0 && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/5">
            <h3 className="text-lg font-semibold text-white mb-4">
              Definición formal del Índice Alelo
            </h3>
            <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20 text-center">
              <p className="text-lg font-mono text-purple-300">
                Índice Alelo<sub>g</sub> = &Sigma;<sub>i=1</sub><sup>n<sub>g</sub></sup> (P<sub>ig</sub> &times; W<sub>ig</sub>)
              </p>
              <p className="text-xs text-gray-400 mt-2">
                con &Sigma; W<sub>ig</sub><sup>(riesgo)</sup> = 100 &nbsp;&nbsp;y&nbsp;&nbsp; 0 &le; P<sub>ig</sub> &le; 1
              </p>
            </div>
            <div className="mt-4 space-y-2 text-sm text-gray-300">
              <p><strong className="text-purple-300">P<sub>ig</sub></strong> — puntaje de genotipo del individuo en la variante i del módulo g, normalizado en [0, 1].</p>
              <p><strong className="text-purple-300">W<sub>ig</sub></strong> — peso clínico asignado a la variante i en el módulo g, basado en magnitud del efecto, robustez de evidencia y accionabilidad clínica.</p>
              <p><strong className="text-purple-300">n<sub>g</sub></strong> — número total de variantes en el módulo.</p>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
              <p className="text-xs text-amber-300">
                Dado que &Sigma;W<sub>ig</sub><sup>(riesgo)</sup> = 100 y P<sub>ig</sub> &isin; [0, 1], el Índice Alelo se expresa
                directamente como porcentaje del riesgo teórico máximo: <strong>0 &le; Índice &le; 100</strong>.
              </p>
            </div>
          </div>

          {/* Interpretación clínica */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-2xl font-bold font-mono text-emerald-400">0 – 25</p>
              <p className="text-xs text-gray-400 mt-1">Baja carga genética relativa</p>
              <p className="text-xs text-gray-500 mt-2">La expresión global de las variantes de riesgo en este módulo es baja.</p>
            </div>
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <p className="text-2xl font-bold font-mono text-amber-400">25 – 60</p>
              <p className="text-xs text-gray-400 mt-1">Carga genética moderada</p>
              <p className="text-xs text-gray-500 mt-2">Presencia relevante de variantes asociadas al rasgo. Vigilancia y prevención recomendadas.</p>
            </div>
            <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
              <p className="text-2xl font-bold font-mono text-red-400">60 – 100</p>
              <p className="text-xs text-gray-400 mt-1">Alta carga genética relativa</p>
              <p className="text-xs text-gray-500 mt-2">Alta expresión de variantes de riesgo. Intervención personalizada prioritaria.</p>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Sección 1: Capas del modelo ═══ */}
      {activeSection === 1 && (
        <div className="space-y-6">
          <p className="text-sm text-gray-300">
            El modelo tiene tres capas conceptuales que van de lo teórico a lo experimental:
          </p>

          {/* Diagrama de flujo */}
          <div className="flex flex-col items-center gap-2">
            {[
              { label: "G_i", desc: "Genotipo teórico (discreto)", detail: "Definido por el modelo de herencia: S(RR), S(RV), S(VV)", color: "border-blue-500/30 bg-blue-500/5" },
              { label: "r_i = k/n", desc: "Proporción de lecturas (continuo)", detail: "Lo que el secuenciador mide: fracción de lecturas variantes", color: "border-purple-500/30 bg-purple-500/5" },
              { label: "P_i", desc: "Puntaje del efecto (continuo)", detail: "Pi = Σ S(G) × Pr(G|k,n) — valor esperado del efecto", color: "border-fuchsia-500/30 bg-fuchsia-500/5" },
            ].map((layer, i) => (
              <div key={i}>
                {i > 0 && <div className="w-px h-6 bg-white/10 mx-auto" />}
                <div className={`p-4 rounded-xl border ${layer.color} max-w-md w-full`}>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-mono text-white font-bold">{layer.label}</span>
                    <span className="text-sm text-gray-300">{layer.desc}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{layer.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
            <h4 className="text-sm font-semibold text-white mb-2">¿Por qué tres capas?</h4>
            <p className="text-sm text-gray-400">
              El secuenciador no dice &quot;este paciente es RR, RV o VV&quot;. Da una proporción r = k/n que puede tomar
              cualquier valor entre 0 y 1 debido a ruido, cobertura variable y artefactos técnicos.
              El modelo traduce esa señal ruidosa en una estimación probabilística del genotipo,
              y luego aplica el modelo de herencia para determinar el efecto esperado.
            </p>
          </div>
        </div>
      )}

      {/* ═══ Sección 2: Estimación bayesiana ═══ */}
      {activeSection === 2 && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/5">
            <h3 className="text-lg font-semibold text-white mb-4">Teorema de Bayes aplicado al genotipado</h3>

            <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20 text-center mb-4">
              <p className="font-mono text-purple-300">
                Pr(G | k, n) = Pr(G) &times; Pr(k | n, G) / &Sigma;<sub>H</sub> Pr(H) &times; Pr(k | n, H)
              </p>
            </div>

            <div className="space-y-4 text-sm text-gray-300">
              <div className="p-3 rounded-lg bg-white/[0.02]">
                <p className="font-semibold text-blue-300">Prior: Pr(G)</p>
                <p className="text-gray-400 mt-1">
                  Probabilidades de genotipo <em>antes</em> de ver las lecturas.
                  Se obtienen del equilibrio de Hardy-Weinberg usando frecuencias alélicas poblacionales.
                </p>
                <p className="font-mono text-xs text-gray-500 mt-1">
                  Si q = frecuencia del alelo variante: Pr(RR) = (1-q)², Pr(RV) = 2q(1-q), Pr(VV) = q²
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02]">
                <p className="font-semibold text-purple-300">Verosimilitud: Pr(k | n, G) = Binomial(k; n, &theta;<sub>G</sub>)</p>
                <p className="text-gray-400 mt-1">
                  Qué tan compatibles son las lecturas observadas con cada genotipo posible.
                </p>
                <div className="flex gap-4 mt-2 font-mono text-xs">
                  <span className="text-blue-400">&theta;<sub>RR</sub> = &epsilon; &asymp; 0.01</span>
                  <span className="text-purple-400">&theta;<sub>RV</sub> = 0.5</span>
                  <span className="text-fuchsia-400">&theta;<sub>VV</sub> = 1 &minus; &epsilon; &asymp; 0.99</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  El &epsilon; modela el error de secuenciación: incluso un homocigoto referencia puede tener ~1% de lecturas variantes por ruido.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02]">
                <p className="font-semibold text-fuchsia-300">Posterior: Pr(G | k, n)</p>
                <p className="text-gray-400 mt-1">
                  Probabilidad actualizada de cada genotipo <em>después</em> de ver las lecturas.
                  El posterior combina la información poblacional (prior) con la evidencia experimental (verosimilitud).
                </p>
              </div>
            </div>
          </div>

          {/* Propiedad de shrinkage */}
          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <h4 className="text-sm font-semibold text-amber-300 mb-2">Propiedad de shrinkage (contracción)</h4>
            <p className="text-sm text-gray-400">
              Con <strong>cobertura baja</strong> (pocas lecturas), el posterior se acerca a los priors poblacionales
              porque los datos son insuficientes para contradecirlos. Con <strong>cobertura alta</strong>,
              el posterior converge al estimador de máxima verosimilitud (MLE) porque los datos dominan.
              Esto es exactamente el comportamiento deseado: no se necesita un parche de mezcla por cobertura —
              el bayesiano ya lo hace naturalmente.
            </p>
          </div>
        </div>
      )}

      {/* ═══ Sección 3: Modelos de herencia ═══ */}
      {activeSection === 3 && (
        <div className="space-y-6">
          <p className="text-sm text-gray-300">
            No todas las variantes genéticas se expresan igual. La función S(G) traduce genotipo a nivel de efecto según el modelo de herencia:
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                model: "Aditivo / codominante",
                s: "S(RR)=0, S(RV)=0.5, S(VV)=1",
                desc: "El efecto es proporcional al número de copias del alelo variante. Una copia = efecto intermedio.",
                example: "FTO (rs9939609) — cada copia del alelo A incrementa el riesgo de obesidad de forma gradual.",
                color: "border-blue-500/20",
                barHeights: [0, 50, 100],
              },
              {
                model: "Dominante",
                s: "S(RR)=0, S(RV)=1, S(VV)=1",
                desc: "Basta una copia del alelo variante para expresar el efecto completo. Dos copias no añaden más.",
                example: "ADRB3 (rs4994) — una copia del alelo de riesgo ya activa el efecto sobre el metabolismo.",
                color: "border-purple-500/20",
                barHeights: [0, 100, 100],
              },
              {
                model: "Recesivo",
                s: "S(RR)=0, S(RV)=0, S(VV)=1",
                desc: "Se necesitan dos copias del alelo variante para que haya efecto. Un portador heterocigoto no manifiesta.",
                example: "BDNF (rs6265) — solo homocigotos Met/Met muestran el efecto sobre la saciedad.",
                color: "border-fuchsia-500/20",
                barHeights: [0, 0, 100],
              },
            ].map(({ model: m, s, desc, example, color, barHeights }) => (
              <div key={m} className={`p-4 rounded-xl bg-white/[0.03] border ${color}`}>
                <h4 className="text-sm font-semibold text-white mb-1">{m}</h4>
                <p className="font-mono text-xs text-gray-400">{s}</p>
                {/* Mini gráfico de barras */}
                <div className="flex items-end gap-2 h-16 mt-3 mb-2">
                  {["RR", "RV", "VV"].map((g, i) => (
                    <div key={g} className="flex-1 flex flex-col items-center">
                      <div className="w-full rounded-t bg-purple-500/40" style={{ height: `${barHeights[i] * 0.6}%` }} />
                      <span className="text-[9px] text-gray-500 mt-1">{g}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400">{desc}</p>
                <p className="text-[10px] text-gray-500 mt-2 italic">{example}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
            <h4 className="text-sm font-semibold text-white mb-2">¿Por qué importa?</h4>
            <p className="text-sm text-gray-400">
              Sin el modelo de herencia, trataríamos todas las variantes como aditivas.
              Pero un SNV recesivo como BDNF rs6265 con r=0.5 (heterocigoto) no debería contribuir al índice —
              el individuo es portador pero no expresa el fenotipo. Con el modelo recesivo, Pi queda cerca de 0.
              Con el modelo aditivo, Pi sería 0.5. Esa diferencia cambia la interpretación clínica.
            </p>
          </div>
        </div>
      )}

      {/* ═══ Sección 4: Cálculo del índice ═══ */}
      {activeSection === 4 && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/5">
            <h3 className="text-lg font-semibold text-white mb-4">Variantes de riesgo y protectoras</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                <p className="text-sm text-gray-300">
                  <strong className="text-red-400">R<sub>g</sub></strong> = &Sigma;<sub>i &isin; riesgo</sub> (P<sub>ig</sub> &times; W<sub>ig</sub>)
                  &nbsp;&nbsp;&nbsp; con &Sigma; W<sub>ig</sub><sup>(riesgo)</sup> = 100
                </p>
                <p className="text-xs text-gray-500 mt-1">Carga total de variantes de riesgo del módulo.</p>
              </div>
              <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                <p className="text-sm text-gray-300">
                  <strong className="text-emerald-400">B<sub>g</sub></strong> = &Sigma;<sub>j &isin; protectora</sub> (P<sub>jg</sub> &times; W<sub>jg</sub>)
                </p>
                <p className="text-xs text-gray-500 mt-1">Capacidad protectora: reduce el riesgo bruto sin generar valores negativos.</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/5 border border-purple-500/20">
                <p className="text-sm text-gray-300">
                  <strong className="text-purple-300">Índice Alelo<sub>g</sub><sup>(neto)</sup></strong> = max(0, R<sub>g</sub> &minus; B<sub>g</sub>)
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Índice final del módulo. Truncado en 0 para evitar valores negativos.
                  Para el módulo 3 (ejercicio), la polaridad se invierte: max(0, B<sub>g</sub> &minus; R<sub>g</sub>).
                </p>
              </div>
            </div>
          </div>

          {/* Flujo completo */}
          <div className="p-6 rounded-xl bg-white/[0.03] border border-white/5">
            <h4 className="text-sm font-semibold text-white mb-4">Pipeline completo por SNV</h4>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {[
                { step: "1", label: "Frecuencias HWE", desc: "Pr(RR), Pr(RV), Pr(VV)" },
                { step: "2", label: "Lecturas NGS", desc: "k/n por SNV" },
                { step: "3", label: "Posterior Bayes", desc: "Pr(G|k,n)" },
                { step: "4", label: "Modelo herencia", desc: "S(G)" },
                { step: "5", label: "Pi", desc: "= Σ S(G)×Pr(G|k,n)" },
                { step: "6", label: "Aporte", desc: "= Pi × Wi" },
                { step: "7", label: "Índice", desc: "max(0, R−B)" },
              ].map(({ step, label, desc }, i) => (
                <div key={step} className="flex items-center gap-2">
                  {i > 0 && <span className="text-gray-600">&rarr;</span>}
                  <div className="px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <span className="text-purple-400 font-bold">{step}.</span>{" "}
                    <span className="text-gray-300">{label}</span>
                    <p className="text-[10px] text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ Sección 5: Simulador ═══ */}
      {activeSection === 5 && <BayesSimulator />}

      {/* ═══ Sección 6: Propuestas de mejora ═══ */}
      {activeSection === 6 && (
        <div className="space-y-6">
          <p className="text-sm text-gray-300">
            Mejoras propuestas con base en la auditoría algorítmica y el contraste con guías internacionales.
          </p>

          {[
            {
              priority: "Implementada",
              color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
              title: "Modelos de herencia por variante",
              detail: "Cada SNV ahora tiene su modelo (aditivo/dominante/recesivo) asignado desde herencia_SNV_expandida.csv. Esto cambia la función S(G) y por tanto la interpretación de Pi. Ejemplo: rs6265 (BDNF) es recesivo → Pi ≈ 0 cuando es heterocigoto, a diferencia del modelo aditivo genérico que daría Pi ≈ 0.5.",
            },
            {
              priority: "Implementada",
              color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
              title: "Eliminación de la mezcla por cobertura",
              detail: "Se eliminó pi = w×r + (1-w)×pi_bayes porque doble-cuenta los datos. El posterior bayesiano ya tiene shrinkage natural: con baja cobertura confía en los priors, con alta cobertura converge al MLE. Verificado numéricamente con 30 tests.",
            },
            {
              priority: "Propuesta",
              color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
              title: "Intervalo de credibilidad para Pi",
              detail: "Actualmente Pi es un valor puntual. Se podría reportar un intervalo al 95% usando simulación del posterior (e.g., Pi ∈ [0.3, 0.7]) para comunicar mejor la incertidumbre, especialmente con cobertura baja. Esto alinearía con la recomendación ACMG 2023 de comunicar incertidumbre probabilística.",
            },
            {
              priority: "Propuesta",
              color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
              title: "Flag de calidad por SNV",
              detail: "Un indicador de confianza por variante basado en: (a) cobertura n, (b) diferencia entre posterior y prior (cuánto aprendieron los datos), (c) si los priors son poblacionales o fallback. Los SNVs con calidad baja podrían marcarse visualmente sin excluirlos del índice.",
            },
            {
              priority: "Propuesta",
              color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
              title: "Modelo específico para farmacogenética (M6)",
              detail: "Según las guías CPIC, la farmacogenómica requiere traducción diplotype → phenotype → recomendación de dosis. El modelo actual de suma ponderada es insuficiente para variantes CYP450. Se podría implementar una capa adicional que use la tabla de traducción CPIC para las variantes farmacogenéticas.",
            },
            {
              priority: "Futura",
              color: "text-gray-400 bg-white/5 border-white/10",
              title: "Validación con cohorte piloto mexicana",
              detail: "El eMERGE Network (2024) establece que todo PRS debe validarse en la población objetivo antes de uso clínico. Se recomienda comparar los índices calculados con fenotipos conocidos en una cohorte piloto mexicana para verificar calibración y discriminación.",
            },
          ].map((item, i) => (
            <div key={i} className={`p-4 rounded-xl border ${item.color}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.color}`}>
                  {item.priority}
                </span>
                <h4 className="text-sm font-semibold text-white">{item.title}</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
