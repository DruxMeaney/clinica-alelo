"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  MODULOS,
  POBLACIONES,
  calcularModulo,
  esProtectora,
  type SNVRecord,
  type SNVReading,
  type ModuleResult,
} from "@/lib/indice-alelo/engine";
import { parseSNVcsv, parseReadingsCSV, applyInheritanceModels } from "@/lib/indice-alelo/csv-parser";

// ─── Tipos UI ────────────────────────────────────────────────────────

interface ModuleState {
  readings: Map<string, SNVReading>;
  result: ModuleResult | null;
  calculated: boolean;
}

// ─── Componente principal ────────────────────────────────────────────

export default function ClinicaApp() {
  // Base de datos SNV
  const [snvDB, setSnvDB] = useState<SNVRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);

  // Paciente
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");

  // Configuración
  const [poblacion, setPoblacion] = useState("Mexicana");
  const [modo, setModo] = useState<"AUTO" | "BAYES" | "HWE">("AUTO");
  const [epsilon, setEpsilon] = useState(0.01);
  const [n0, setN0] = useState(30);
  const [mezclaCobertura, setMezclaCobertura] = useState(true);
  const [fallbackHW, setFallbackHW] = useState(true);

  // Estado por módulo
  const [moduleStates, setModuleStates] = useState<Record<number, ModuleState>>({});
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [view, setView] = useState<"modules" | "results">("modules");

  // Ref para input de archivo
  const fileInputRef = useRef<HTMLInputElement>(null);
  const readingsInputRef = useRef<HTMLInputElement>(null);

  // Cargar base de datos y modelos de herencia al montar
  useEffect(() => {
    Promise.all([
      fetch("/data/SNV_completa.csv").then(r => r.text()),
      fetch("/data/inheritance_models.json").then(r => r.json()).catch(() => ({})),
    ])
      .then(([csvText, inheritanceData]) => {
        let records = parseSNVcsv(csvText);
        if (records.length === 0) throw new Error("No se encontraron registros en el CSV");
        records = applyInheritanceModels(records, inheritanceData);
        setSnvDB(records);
        // Inicializar estados de módulos
        const states: Record<number, ModuleState> = {};
        for (let m = 1; m <= 7; m++) {
          states[m] = { readings: new Map(), result: null, calculated: false };
        }
        setModuleStates(states);
        setLoading(false);
      })
      .catch(err => {
        setDbError(err.message);
        setLoading(false);
      });
  }, []);

  // Función: calcular módulo
  const calcModule = useCallback((modNum: number, readings?: Map<string, SNVReading>) => {
    const state = moduleStates[modNum];
    if (!state) return;
    const rdgs = readings || state.readings;
    const result = calcularModulo(snvDB, rdgs, modNum, poblacion, modo, epsilon, n0, mezclaCobertura, fallbackHW);
    setModuleStates(prev => ({
      ...prev,
      [modNum]: { ...prev[modNum], readings: rdgs, result, calculated: true },
    }));
  }, [snvDB, poblacion, modo, epsilon, n0, mezclaCobertura, fallbackHW, moduleStates]);

  // Función: importar lecturas CSV para módulo activo
  const handleImportReadings = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || activeModule === null) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const readings = parseReadingsCSV(text);
      // Merge con lecturas existentes
      const merged = new Map(moduleStates[activeModule]?.readings || []);
      readings.forEach((v, k) => merged.set(k, v));
      setModuleStates(prev => ({
        ...prev,
        [activeModule]: { ...prev[activeModule], readings: merged, calculated: false, result: null },
      }));
    };
    reader.readAsText(file);
    e.target.value = "";
  }, [activeModule, moduleStates]);

  // Función: cargar base CSV personalizada
  const handleLoadCustomDB = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const records = parseSNVcsv(text);
      if (records.length > 0) {
        setSnvDB(records);
        // Reset todos los módulos
        const states: Record<number, ModuleState> = {};
        for (let m = 1; m <= 7; m++) {
          states[m] = { readings: new Map(), result: null, calculated: false };
        }
        setModuleStates(states);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }, []);

  // Función: actualizar lectura individual
  const updateReading = useCallback((modNum: number, rsID: string, field: "n" | "k", value: string) => {
    const numVal = parseInt(value, 10);
    setModuleStates(prev => {
      const state = { ...prev[modNum] };
      const readings = new Map(state.readings);
      const existing = readings.get(rsID) || { rsID, n: 0, k: 0 };
      readings.set(rsID, { ...existing, [field]: isNaN(numVal) ? 0 : numVal });
      return { ...prev, [modNum]: { ...state, readings, calculated: false, result: null } };
    });
  }, []);

  // Función: nuevo paciente
  const resetPaciente = useCallback(() => {
    setNombre("");
    setCodigo("");
    const states: Record<number, ModuleState> = {};
    for (let m = 1; m <= 7; m++) {
      states[m] = { readings: new Map(), result: null, calculated: false };
    }
    setModuleStates(states);
    setActiveModule(null);
    setView("modules");
  }, []);

  // Función: exportar resultados
  const exportResults = useCallback(() => {
    const rows: string[] = ["Módulo,Nombre,Índice (0-100),Riesgo Total,Protectora Total,SNVs"];
    for (let m = 1; m <= 7; m++) {
      const r = moduleStates[m]?.result;
      if (r) {
        rows.push(`${m},"${r.nombre}",${r.indice.toFixed(2)},${r.riesgoTotal.toFixed(4)},${r.protectoraTotal.toFixed(4)},${r.snvCount}`);
      }
    }
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${codigo || "paciente"}_${nombre || "sin_nombre"}_resumen.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [moduleStates, nombre, codigo]);

  // Función: exportar detalle completo
  const exportDetailedResults = useCallback(() => {
    const rows: string[] = ["Módulo,rsID,Gene,Tipo,Wi,n,k,Prior0,Prior1,Prior2,Post0,Post1,Post2,Pi,PiFinal,Aporte,Modo"];
    for (let m = 1; m <= 7; m++) {
      const r = moduleStates[m]?.result;
      if (!r) continue;
      for (const snv of r.snvResults) {
        rows.push([
          m, snv.rsID, snv.gene, snv.tipo, snv.wi, snv.n ?? "", snv.k ?? "",
          snv.prior0.toFixed(6), snv.prior1.toFixed(6), snv.prior2.toFixed(6),
          snv.post0.toFixed(6), snv.post1.toFixed(6), snv.post2.toFixed(6),
          snv.pi.toFixed(6), snv.pi.toFixed(6), snv.aporte.toFixed(6), snv.modo
        ].join(","));
      }
    }
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${codigo || "paciente"}_${nombre || "sin_nombre"}_detalle.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [moduleStates, nombre, codigo]);

  // ─── Renderizado ───────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen gradient-alelo-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-300">Cargando base de datos genómica...</p>
        </div>
      </div>
    );
  }

  if (dbError) {
    return (
      <div className="min-h-screen gradient-alelo-dark flex items-center justify-center p-6">
        <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-6 max-w-md">
          <h2 className="text-red-300 font-semibold mb-2">Error al cargar la base de datos</h2>
          <p className="text-red-200/70 text-sm">{dbError}</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg text-sm hover:bg-red-500/30 transition"
          >
            Cargar CSV manualmente
          </button>
          <input ref={fileInputRef} type="file" accept=".csv,.xlsx" className="hidden" onChange={handleLoadCustomDB} />
        </div>
      </div>
    );
  }

  const allCalculated = Object.values(moduleStates).every(s => s.calculated);
  const moduleSNVs = activeModule ? snvDB.filter(s => s.indice === activeModule) : [];

  return (
    <div className="min-h-screen bg-[#0a0a12] text-white">
      {/* ─── Top Bar ──────────────────────────────────────────── */}
      <header className="border-b border-white/5 bg-[#0a0a12]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg gradient-alelo flex items-center justify-center">
                <span className="text-xs font-bold text-white">IA</span>
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight">Índice Alelo</h1>
                <p className="text-[10px] text-gray-500">Herramienta de análisis postsecuenciación</p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs">
              {/* Paciente */}
              <input
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder="Nombre del paciente"
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs w-40 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
              />
              <input
                value={codigo}
                onChange={e => setCodigo(e.target.value)}
                placeholder="Código"
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs w-28 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
              />

              {/* Población */}
              <select
                value={poblacion}
                onChange={e => setPoblacion(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:ring-1 focus:ring-purple-500/50"
              >
                {POBLACIONES.map(p => <option key={p} value={p} className="bg-[#1a1a2e]">{p}</option>)}
              </select>

              {/* Modo */}
              <select
                value={modo}
                onChange={e => setModo(e.target.value as "AUTO" | "BAYES" | "HWE")}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:ring-1 focus:ring-purple-500/50"
              >
                <option value="AUTO" className="bg-[#1a1a2e]">AUTO</option>
                <option value="BAYES" className="bg-[#1a1a2e]">BAYES</option>
                <option value="HWE" className="bg-[#1a1a2e]">HWE</option>
              </select>

              <div className="h-4 w-px bg-white/10" />

              <button
                onClick={resetPaciente}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition text-xs"
              >
                Nuevo paciente
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition text-xs"
              >
                Cargar base CSV
              </button>
              <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={handleLoadCustomDB} />
            </div>
          </div>

          {/* Parámetros avanzados */}
          <details className="mt-2">
            <summary className="text-[10px] text-gray-500 cursor-pointer hover:text-gray-300 transition">
              Parámetros avanzados
            </summary>
            <div className="flex items-center gap-4 mt-2 flex-wrap text-xs">
              <label className="flex items-center gap-2 text-gray-400">
                &epsilon; =
                <input
                  type="number" step="0.001" min="0.001" max="0.49"
                  value={epsilon}
                  onChange={e => setEpsilon(parseFloat(e.target.value) || 0.01)}
                  className="w-16 px-2 py-1 rounded bg-white/5 border border-white/10 text-white text-xs"
                />
              </label>
              <label className="flex items-center gap-2 text-gray-400">
                N<sub>0</sub> =
                <input
                  type="number" step="1" min="1"
                  value={n0}
                  onChange={e => setN0(parseInt(e.target.value) || 30)}
                  className="w-16 px-2 py-1 rounded bg-white/5 border border-white/10 text-white text-xs"
                />
              </label>
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input
                  type="checkbox" checked={mezclaCobertura}
                  onChange={e => setMezclaCobertura(e.target.checked)}
                  className="accent-purple-500"
                />
                Mezcla por cobertura
              </label>
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input
                  type="checkbox" checked={fallbackHW}
                  onChange={e => setFallbackHW(e.target.checked)}
                  className="accent-purple-500"
                />
                Fallback HWE si faltan lecturas
              </label>
              <span className="text-gray-600">|</span>
              <span className="text-gray-500">{snvDB.length} SNVs cargadas</span>
            </div>
          </details>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto flex">
        {/* ─── Panel lateral: Módulos ──────────────────────────── */}
        <aside className="w-64 min-h-[calc(100vh-80px)] border-r border-white/5 p-4 flex-shrink-0">
          <div className="space-y-2 mb-6">
            <button
              onClick={() => { setActiveModule(null); setView("modules"); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs transition ${
                view === "modules" && !activeModule ? "bg-purple-500/20 text-purple-300" : "text-gray-400 hover:bg-white/5"
              }`}
            >
              Vista general
            </button>
            <button
              onClick={() => setView("results")}
              disabled={!allCalculated}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs transition ${
                view === "results" ? "bg-purple-500/20 text-purple-300" :
                allCalculated ? "text-gray-400 hover:bg-white/5" : "text-gray-600 cursor-not-allowed"
              }`}
            >
              Resultados del paciente
            </button>
          </div>

          <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 px-3">Módulos</p>

          <div className="space-y-1">
            {[1, 2, 3, 4, 5, 6, 7].map(m => {
              const state = moduleStates[m];
              const snvCount = snvDB.filter(s => s.indice === m).length;
              return (
                <button
                  key={m}
                  onClick={() => { setActiveModule(m); setView("modules"); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition group ${
                    activeModule === m ? "bg-purple-500/20 border border-purple-500/30" : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={activeModule === m ? "text-purple-300" : "text-gray-300"}>
                      {m}. {MODULOS[m]?.split(" ")[0]}
                    </span>
                    {state?.calculated ? (
                      <span className="text-[10px] font-mono text-emerald-400">
                        {state.result?.indice.toFixed(0)}
                      </span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-gray-600" />
                    )}
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5">{snvCount} SNVs</p>
                </button>
              );
            })}
          </div>

          {/* Acciones */}
          <div className="mt-6 space-y-2">
            <button
              onClick={exportResults}
              disabled={!Object.values(moduleStates).some(s => s.calculated)}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-400 hover:text-white hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Exportar resumen CSV
            </button>
            <button
              onClick={exportDetailedResults}
              disabled={!Object.values(moduleStates).some(s => s.calculated)}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-400 hover:text-white hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Exportar detalle completo
            </button>
          </div>
        </aside>

        {/* ─── Panel principal ─────────────────────────────────── */}
        <main className="flex-1 p-6 min-h-[calc(100vh-80px)] overflow-auto">
          {view === "results" ? (
            <ResultsView moduleStates={moduleStates} nombre={nombre} codigo={codigo} />
          ) : activeModule ? (
            <ModuleView
              key={activeModule}
              modNum={activeModule}
              snvs={moduleSNVs}
              state={moduleStates[activeModule]}
              poblacion={poblacion}
              onUpdateReading={(rsID, field, val) => updateReading(activeModule, rsID, field, val)}
              onCalculate={() => calcModule(activeModule)}
              onImportReadings={() => readingsInputRef.current?.click()}
            />
          ) : (
            <OverviewPanel moduleStates={moduleStates} snvDB={snvDB} onSelectModule={(m) => { setActiveModule(m); }} />
          )}
        </main>
      </div>

      {/* Input oculto para importar lecturas */}
      <input ref={readingsInputRef} type="file" accept=".csv" className="hidden" onChange={handleImportReadings} />
    </div>
  );
}

// ─── Sub-componentes ─────────────────────────────────────────────────

function OverviewPanel({ moduleStates, snvDB, onSelectModule }: {
  moduleStates: Record<number, ModuleState>;
  snvDB: SNVRecord[];
  onSelectModule: (m: number) => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-1">Panel de módulos</h2>
      <p className="text-sm text-gray-400 mb-6">
        Selecciona un módulo para ingresar lecturas de secuenciación y calcular el índice.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7].map(m => {
          const state = moduleStates[m];
          const snvCount = snvDB.filter(s => s.indice === m).length;
          const rCount = snvDB.filter(s => s.indice === m && !esProtectora(s.tipo)).length;
          const pCount = snvDB.filter(s => s.indice === m && esProtectora(s.tipo)).length;
          return (
            <button
              key={m}
              onClick={() => onSelectModule(m)}
              className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-purple-500/30 hover:bg-purple-500/5 transition text-left group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-gray-500">M{m}</span>
                {state?.calculated && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {state.result?.indice.toFixed(1)}
                  </span>
                )}
              </div>
              <h3 className="text-sm font-medium text-gray-200 group-hover:text-purple-300 transition mb-2">
                {MODULOS[m]}
              </h3>
              <div className="flex items-center gap-3 text-[10px] text-gray-500">
                <span>{snvCount} SNVs</span>
                <span className="text-red-400/60">{rCount} riesgo</span>
                <span className="text-emerald-400/60">{pCount} protectoras</span>
              </div>
              {state?.calculated && state.result && (
                <div className="mt-3">
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, state.result.indice)}%`,
                        background: state.result.indice > 60
                          ? "linear-gradient(90deg, #f59e0b, #ef4444)"
                          : state.result.indice > 30
                          ? "linear-gradient(90deg, #8b5cf6, #f59e0b)"
                          : "linear-gradient(90deg, #10b981, #8b5cf6)",
                      }}
                    />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ModuleView({ modNum, snvs, state, poblacion, onUpdateReading, onCalculate, onImportReadings }: {
  modNum: number;
  snvs: SNVRecord[];
  state: ModuleState;
  poblacion: string;
  onUpdateReading: (rsID: string, field: "n" | "k", val: string) => void;
  onCalculate: () => void;
  onImportReadings: () => void;
}) {
  const [expandedSNV, setExpandedSNV] = useState<string | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold">
            <span className="text-purple-400 font-mono mr-2">M{modNum}</span>
            {MODULOS[modNum]}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {snvs.length} variantes &middot;{" "}
            {snvs.filter(s => !esProtectora(s.tipo)).length} riesgo &middot;{" "}
            {snvs.filter(s => esProtectora(s.tipo)).length} protectoras
            {modNum === 3 && (
              <span className="text-amber-400 ml-2">(polaridad invertida: protectora &minus; riesgo)</span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onImportReadings}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-white/10 transition"
          >
            Importar lecturas CSV
          </button>
          <button
            onClick={onCalculate}
            className="px-4 py-1.5 rounded-lg gradient-alelo text-white text-xs font-medium hover:shadow-lg hover:shadow-purple-500/25 transition"
          >
            Calcular módulo
          </button>
        </div>
      </div>

      {/* Resultado del módulo */}
      {state.result && (
        <div className="mb-6 p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
          <div className="flex items-center gap-6 flex-wrap">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Índice normalizado</p>
              <p className="text-3xl font-bold font-mono text-purple-300">
                {state.result.indice.toFixed(1)}
                <span className="text-sm text-gray-500 ml-1">/ 100</span>
              </p>
            </div>
            <div className="h-12 w-px bg-white/10" />
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Índice bruto</p>
              <p className="text-lg font-mono text-gray-300">{state.result.indice.toFixed(4)}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Riesgo total</p>
              <p className="text-lg font-mono text-red-400/70">{state.result.riesgoTotal.toFixed(4)}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Protectora total</p>
              <p className="text-lg font-mono text-emerald-400/70">{state.result.protectoraTotal.toFixed(4)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tabla de SNVs */}
      <div className="overflow-x-auto rounded-xl border border-white/5">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-white/[0.02] text-gray-400">
              <th className="text-left px-3 py-2 font-medium">rsID</th>
              <th className="text-left px-3 py-2 font-medium">Gen</th>
              <th className="text-left px-3 py-2 font-medium">Tipo</th>
              <th className="text-center px-3 py-2 font-medium">Wi</th>
              <th className="text-left px-3 py-2 font-medium">REF</th>
              <th className="text-left px-3 py-2 font-medium">ALT ({poblacion})</th>
              <th className="text-center px-3 py-2 font-medium">n</th>
              <th className="text-center px-3 py-2 font-medium">k</th>
              {state.calculated && (
                <>
                  <th className="text-center px-3 py-2 font-medium">Pi</th>
                  <th className="text-center px-3 py-2 font-medium">Aporte</th>
                  <th className="text-center px-3 py-2 font-medium">Modo</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {snvs.map((snv, idx) => {
              const reading = state.readings.get(snv.rsID);
              const result = state.result?.snvResults.find(r => r.rsID === snv.rsID);
              const isProtec = esProtectora(snv.tipo);
              const isExpanded = expandedSNV === snv.rsID;

              return (
                <tr key={snv.rsID}>
                  <td colSpan={state.calculated ? 11 : 8} className="p-0">
                    <div
                      className={`border-b border-white/5 ${idx % 2 === 0 ? "bg-white/[0.01]" : ""}`}
                    >
                      <div className="flex items-center text-xs">
                        <button
                          onClick={() => setExpandedSNV(isExpanded ? null : snv.rsID)}
                          className="px-3 py-2.5 text-left text-purple-400 hover:text-purple-300 font-mono transition w-28 flex-shrink-0"
                        >
                          {snv.rsID}
                        </button>
                        <span className="px-3 py-2.5 text-gray-300 w-20 flex-shrink-0">{snv.gene}</span>
                        <span className={`px-3 py-2.5 w-24 flex-shrink-0 ${isProtec ? "text-emerald-400/70" : "text-red-400/70"}`}>
                          {snv.tipo}
                        </span>
                        <span className="px-3 py-2.5 text-center text-gray-300 w-12 flex-shrink-0 font-mono">{snv.wi}</span>
                        <span className="px-3 py-2.5 text-gray-400 w-12 flex-shrink-0 font-mono">{snv.alleleRef}</span>
                        <span className="px-3 py-2.5 text-gray-400 w-16 flex-shrink-0 font-mono">
                          {snv.altAlleles[poblacion] || snv.altAlleles["General"] || "—"}
                        </span>
                        <span className="px-1 py-2.5 w-16 flex-shrink-0">
                          <input
                            type="number" min="0"
                            value={reading?.n ?? ""}
                            onChange={e => onUpdateReading(snv.rsID, "n", e.target.value)}
                            placeholder="n"
                            className="w-full px-2 py-1 rounded bg-white/5 border border-white/10 text-white text-center font-mono text-xs focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                          />
                        </span>
                        <span className="px-1 py-2.5 w-16 flex-shrink-0">
                          <input
                            type="number" min="0"
                            value={reading?.k ?? ""}
                            onChange={e => onUpdateReading(snv.rsID, "k", e.target.value)}
                            placeholder="k"
                            className="w-full px-2 py-1 rounded bg-white/5 border border-white/10 text-white text-center font-mono text-xs focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                          />
                        </span>
                        {state.calculated && result && (
                          <>
                            <span className="px-3 py-2.5 text-center text-gray-300 w-16 flex-shrink-0 font-mono">
                              {result.pi.toFixed(3)}
                            </span>
                            <span className={`px-3 py-2.5 text-center w-16 flex-shrink-0 font-mono ${isProtec ? "text-emerald-400" : "text-red-400"}`}>
                              {result.aporte.toFixed(2)}
                            </span>
                            <span className="px-3 py-2.5 text-center text-gray-500 w-20 flex-shrink-0 font-mono text-[10px]">
                              {result.modo}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Panel expandido con detalle */}
                      {isExpanded && (
                        <div className="px-6 py-3 bg-white/[0.02] border-t border-white/5 text-[11px] space-y-2">
                          <p className="text-gray-400">
                            <strong className="text-gray-300">Función:</strong> {snv.funcion || "—"}
                          </p>
                          {result && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              <div>
                                <p className="text-gray-500">Priors HWE</p>
                                <p className="font-mono text-gray-300">
                                  [{result.prior0.toFixed(4)}, {result.prior1.toFixed(4)}, {result.prior2.toFixed(4)}]
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Posterior</p>
                                <p className="font-mono text-gray-300">
                                  [{result.post0.toFixed(4)}, {result.post1.toFixed(4)}, {result.post2.toFixed(4)}]
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Fuente priors</p>
                                <p className="font-mono text-gray-300">{result.priorSource}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Log</p>
                                <p className="font-mono text-gray-300">{result.log}</p>
                              </div>
                            </div>
                          )}
                          {snv.pubmedID && (
                            <p className="text-gray-500">
                              PubMed: <a href={`https://pubmed.ncbi.nlm.nih.gov/${snv.pubmedID}`} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">{snv.pubmedID}</a>
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ResultsView({ moduleStates, nombre, codigo }: {
  moduleStates: Record<number, ModuleState>;
  nombre: string;
  codigo: string;
}) {
  const calculated = Object.entries(moduleStates)
    .filter(([, s]) => s.calculated && s.result)
    .map(([m, s]) => ({ modNum: parseInt(m), ...s.result! }));

  if (calculated.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p>Calcula al menos un módulo para ver los resultados.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">
        Resultados {nombre && <span className="text-purple-400">— {nombre}</span>}
        {codigo && <span className="text-gray-500 text-sm ml-2">({codigo})</span>}
      </h2>
      <p className="text-sm text-gray-400 mb-6">{calculated.length} módulos calculados</p>

      {/* Gráfico de barras horizontal */}
      <div className="space-y-3 mb-8">
        {calculated.map(r => (
          <div key={r.modNum} className="flex items-center gap-4">
            <span className="text-xs text-gray-400 w-48 text-right flex-shrink-0 truncate">
              {MODULOS[r.modNum]}
            </span>
            <div className="flex-1 h-6 rounded-full bg-white/5 overflow-hidden relative">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min(100, r.indice)}%`,
                  background: r.indice > 60
                    ? "linear-gradient(90deg, #f59e0b, #ef4444)"
                    : r.indice > 30
                    ? "linear-gradient(90deg, #a855f7, #f59e0b)"
                    : "linear-gradient(90deg, #10b981, #a855f7)",
                }}
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white/70">
                {r.indice.toFixed(1)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabla resumen */}
      <div className="overflow-x-auto rounded-xl border border-white/5">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-white/[0.02] text-gray-400">
              <th className="text-left px-4 py-2 font-medium">Módulo</th>
              <th className="text-center px-4 py-2 font-medium">Índice (0-100)</th>
              <th className="text-center px-4 py-2 font-medium">Índice bruto</th>
              <th className="text-center px-4 py-2 font-medium">Riesgo</th>
              <th className="text-center px-4 py-2 font-medium">Protectora</th>
              <th className="text-center px-4 py-2 font-medium">SNVs</th>
            </tr>
          </thead>
          <tbody>
            {calculated.map(r => (
              <tr key={r.modNum} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="px-4 py-2.5 text-gray-300">{r.modNum}. {MODULOS[r.modNum]}</td>
                <td className="px-4 py-2.5 text-center">
                  <span className={`font-mono font-bold ${
                    r.indice > 60 ? "text-red-400" :
                    r.indice > 30 ? "text-amber-400" : "text-emerald-400"
                  }`}>
                    {r.indice.toFixed(1)}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-center font-mono text-gray-400">{r.indice.toFixed(4)}</td>
                <td className="px-4 py-2.5 text-center font-mono text-red-400/60">{r.riesgoTotal.toFixed(4)}</td>
                <td className="px-4 py-2.5 text-center font-mono text-emerald-400/60">{r.protectoraTotal.toFixed(4)}</td>
                <td className="px-4 py-2.5 text-center text-gray-400">{r.snvCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
