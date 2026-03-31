"use client";

import { useState, useEffect } from "react";

const SITE_PASSWORD = "3389177*";
const SESSION_KEY = "alelo_auth";

export default function SiteGate({ children }: { children: React.ReactNode }) {
  // null = aún cargando sessionStorage (evita flash)
  const [auth, setAuth] = useState<boolean | null>(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    setAuth(sessionStorage.getItem(SESSION_KEY) === "1");
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === SITE_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setAuth(true);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  }

  // Mientras resuelve sessionStorage no renderiza nada (evita parpadeo)
  if (auth === null) return null;

  // Autenticado → renderiza el sitio normalmente
  if (auth) return <>{children}</>;

  // Pantalla de acceso
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#080514" }}
    >
      {/* Orbes decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full blur-3xl opacity-20"
          style={{ width: 400, height: 400, top: "-100px", left: "-100px", background: "#8b2fa0" }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-15"
          style={{ width: 300, height: 300, bottom: "-80px", right: "-80px", background: "#7c3aed" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-sm mx-4">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
            style={{ background: "linear-gradient(135deg, #8b2fa0, #7c3aed)" }}
          >
            <svg width="28" height="28" viewBox="0 0 120 120" fill="white">
              <path d="M10 30 L10 110 L70 110 L70 70 L110 70 L110 10 L50 10 L50 30 Z" />
              <rect x="30" y="30" width="30" height="30" fill="#080514" />
            </svg>
          </div>
          <span
            className="text-white font-semibold text-lg tracking-wide"
            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            alelo
          </span>
          <p className="text-xs text-gray-500 mt-1 tracking-widest uppercase">
            Acceso restringido
          </p>
        </div>

        {/* Formulario */}
        <div
          className="rounded-2xl p-8"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <h2 className="text-white font-bold text-base mb-1 text-center">
            Ingresa la contraseña
          </h2>
          <p className="text-gray-500 text-xs text-center mb-6">
            Este sitio está en desarrollo privado.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(false); }}
                placeholder="Contraseña"
                autoFocus
                className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600
                           focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: error ? "1px solid rgba(248,113,113,0.5)" : "1px solid rgba(255,255,255,0.08)",
                  animation: shake ? "shake 0.4s ease" : "none",
                }}
              />
              {error && (
                <p className="text-xs text-red-400 mt-2 text-center">
                  Contraseña incorrecta.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white font-medium rounded-xl transition-all text-sm
                         hover:shadow-lg hover:shadow-purple-500/20"
              style={{ background: "linear-gradient(135deg, #8b2fa0, #7c3aed)" }}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
