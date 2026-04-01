"use client";
import { useState } from "react";
import { useTheme, type ThemeId } from "@/components/ui/ThemeProvider";

interface ThemeDef {
  id: ThemeId;
  name: string;
  tagline: string;
  // Three colors for the swatch preview
  swatchA: string;
  swatchB: string;
  swatchC: string;
  // Text color for name label over swatchC bg
  dark: boolean;
}

const THEMES: ThemeDef[] = [
  {
    id: "original",
    name: "Alelo Original",
    tagline: "Lila profundo",
    swatchA: "#6b1d7b",
    swatchB: "#a855c7",
    swatchC: "#e11d73",
    dark: false,
  },
  {
    id: "fucsia-noir",
    name: "Fucsia Noir",
    tagline: "Fucsia sobre negro puro",
    swatchA: "#000000",
    swatchB: "#f0025e",
    swatchC: "#ff4d88",
    dark: false,
  },
  {
    id: "magenta-cristal",
    name: "Magenta Cristal",
    tagline: "Magenta + blancos cristalinos",
    swatchA: "#0d0008",
    swatchB: "#cc0077",
    swatchC: "#fce7f3",
    dark: true,
  },
  {
    id: "rosa-ceniza",
    name: "Rosa Ceniza",
    tagline: "Fucsia + grafito difuminado",
    swatchA: "#1a1a1a",
    swatchB: "#e11d73",
    swatchC: "#f5f5f5",
    dark: true,
  },
  {
    id: "neon-fucsia",
    name: "Neon Fucsia",
    tagline: "Cyberpunk · neon sobre negro",
    swatchA: "#000000",
    swatchB: "#ff0080",
    swatchC: "#00ffcc",
    dark: false,
  },
  {
    id: "petalo-blanco",
    name: "Pétalo Blanco",
    tagline: "Fucsia + blanco elegante",
    swatchA: "#4a0030",
    swatchB: "#e91e63",
    swatchC: "#ffffff",
    dark: true,
  },
];

export default function PaletteSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const current = THEMES.find(t => t.id === theme) ?? THEMES[0];

  return (
    <>
      {/* Overlay to close panel */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Floating container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

        {/* Theme panel */}
        <div
          className="flex flex-col gap-2 rounded-2xl p-4 shadow-2xl transition-all duration-300"
          style={{
            background: "rgba(10,8,24,0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            width: 230,
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0) scale(1)" : "translateY(8px) scale(0.97)",
            pointerEvents: open ? "auto" : "none",
          }}
        >
          <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-1 px-1">
            Paleta de colores
          </p>

          {THEMES.map((t) => {
            const isActive = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => { setTheme(t.id); setOpen(false); }}
                className="flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-left transition-all"
                style={{
                  background: isActive ? "rgba(255,255,255,0.07)" : "transparent",
                  border: isActive
                    ? `1px solid ${t.swatchB}60`
                    : "1px solid transparent",
                }}
              >
                {/* Swatch preview */}
                <div className="flex-shrink-0 flex rounded-full overflow-hidden w-10 h-10 shadow-lg"
                  style={{ boxShadow: isActive ? `0 0 12px ${t.swatchB}60` : "none" }}>
                  <div style={{ flex: 1, background: t.swatchA }} />
                  <div style={{ flex: 1, background: t.swatchB }} />
                  <div style={{ flex: 1, background: t.swatchC }} />
                </div>
                {/* Labels */}
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-white truncate leading-tight">
                    {t.name}
                  </div>
                  <div className="text-[10px] text-gray-500 truncate leading-tight mt-0.5">
                    {t.tagline}
                  </div>
                </div>
                {/* Active indicator */}
                {isActive && (
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{ background: t.swatchB, boxShadow: `0 0 6px ${t.swatchB}` }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setOpen(v => !v)}
          aria-label="Cambiar paleta de colores"
          className="flex items-center gap-2.5 rounded-full pl-3 pr-4 py-2.5 shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            background: "rgba(10,8,24,0.92)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: `0 4px 24px ${current.swatchB}40, 0 1px 4px rgba(0,0,0,0.5)`,
          }}
        >
          {/* Mini 3-dot swatch */}
          <div className="flex gap-1 items-center">
            {[current.swatchA, current.swatchB, current.swatchC].map((c, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width:  i === 1 ? 11 : 8,
                  height: i === 1 ? 11 : 8,
                  background: c,
                  boxShadow: i === 1 ? `0 0 8px ${c}80` : "none",
                }}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-gray-300 whitespace-nowrap">
            {current.name}
          </span>
          <svg
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            className="text-gray-500 transition-transform duration-200"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </>
  );
}
