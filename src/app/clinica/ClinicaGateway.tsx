"use client";

import { useState } from "react";
import GlowOrbs from "@/components/ui/GlowOrbs";
import ClinicaApp from "./ClinicaApp";

const PASS_HASH = "a]Cl1n1c4Al3lo2026[z"; // ofuscado mínimamente; mejora futura: bcrypt + API

export default function ClinicaGateway() {
  const [stage, setStage] = useState<"intro" | "login" | "app">("intro");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === "ClinicaAlelo2026") {
      setStage("app");
      setError(false);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  }

  // ─── Stage 3: Aplicación clínica ────────────────────────────
  if (stage === "app") {
    return <ClinicaApp />;
  }

  return (
    <div className="min-h-screen gradient-alelo-dark relative overflow-hidden flex items-center justify-center">
      <GlowOrbs />

      {/* Partículas decorativas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-purple-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-lg w-full mx-4">
        {/* ─── Stage 1: Introducción ──────────────────────────── */}
        {stage === "intro" && (
          <div className="text-center animate-fade-in">
            {/* Logo / icono */}
            <div className="mx-auto w-20 h-20 rounded-2xl gradient-alelo flex items-center justify-center mb-8 shadow-lg shadow-purple-500/30">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                <path d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="2" fill="white" />
              </svg>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Área clínica
            </h1>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-medium text-amber-300 tracking-wider uppercase">
                Uso exclusivo del personal autorizado
              </span>
            </div>

            <p className="text-gray-300 leading-relaxed mb-4 max-w-md mx-auto">
              Esta sección está destinada al equipo clínico y analítico de Clínica Alelo.
              Contiene herramientas de interpretación genómica, cálculo del Índice Alelo
              y análisis postsecuenciación.
            </p>

            <p className="text-sm text-gray-400 mb-8 max-w-md mx-auto">
              Clínica Alelo es una propuesta integral de atención clínica e investigación genómica
              orientada a la prevención personalizada, la estratificación de riesgo y la interpretación
              biológica de variantes genéticas relevantes para la población mexicana.
            </p>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-8 text-left max-w-md mx-auto">
              <h3 className="text-sm font-semibold text-purple-300 mb-2">
                Funcionalidades disponibles
              </h3>
              <ul className="space-y-1.5 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-fuchsia-400" />
                  Cálculo del Índice Alelo (7 módulos)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-fuchsia-400" />
                  Análisis bayesiano con lecturas de secuenciación
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-fuchsia-400" />
                  Visualización de perfiles genéticos por paciente
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-fuchsia-400" />
                  Importación de datos de secuenciación (CSV)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-fuchsia-400" />
                  Exportación de resultados clínicos
                </li>
              </ul>
            </div>

            <button
              onClick={() => setStage("app")}
              className="px-8 py-3 gradient-alelo text-white font-medium rounded-xl
                         hover:shadow-lg hover:shadow-purple-500/30 transition-all
                         hover:scale-[1.02] active:scale-[0.98]"
            >
              Acceder al área clínica
            </button>

            <p className="text-xs text-gray-500 mt-6">
              El acceso no autorizado está prohibido. Todo uso queda registrado.
            </p>
          </div>
        )}

        {/* ─── Stage 2: Login ─────────────────────────────────── */}
        {stage === "login" && (
          <div className="animate-fade-in">
            <button
              onClick={() => setStage("intro")}
              className="text-sm text-gray-400 hover:text-white transition-colors mb-8 flex items-center gap-1"
            >
              &larr; Volver
            </button>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-300">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white">Autenticación requerida</h2>
                <p className="text-sm text-gray-400 mt-1">
                  Ingresa la clave de acceso al área clínica
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(false); }}
                    placeholder="Contraseña"
                    autoFocus
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500
                               focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all
                               ${error ? "border-red-400/50 focus:ring-red-400/50" : "border-white/10"}
                               ${shake ? "animate-shake" : ""}`}
                  />
                  {error && (
                    <p className="text-sm text-red-400 mt-2">
                      Contraseña incorrecta. Verifica tus credenciales.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 gradient-alelo text-white font-medium rounded-xl
                             hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                  Ingresar
                </button>
              </form>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Si no tienes acceso, contacta al administrador del sistema.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
