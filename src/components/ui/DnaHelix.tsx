"use client";

/**
 * Doble hélice de ADN animada en SVG.
 * Se usa como fondo decorativo en el hero y secciones especiales.
 */
export default function DnaHelix({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 600"
      fill="none"
      className={`opacity-[0.12] ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hebra 1 */}
      <path
        d="M40 0 C120 50, 80 100, 160 150 C80 200, 120 250, 40 300 C120 350, 80 400, 160 450 C80 500, 120 550, 40 600"
        stroke="url(#helix1)"
        strokeWidth="2"
        strokeDasharray="8 4"
        className="animate-dash"
      />
      {/* Hebra 2 */}
      <path
        d="M160 0 C80 50, 120 100, 40 150 C120 200, 80 250, 160 300 C80 350, 120 400, 40 450 C120 500, 80 550, 160 600"
        stroke="url(#helix2)"
        strokeWidth="2"
        strokeDasharray="8 4"
        className="animate-dash"
        style={{ animationDelay: "1s" }}
      />
      {/* Puentes de bases */}
      {[75, 150, 225, 300, 375, 450, 525].map((y, i) => (
        <line
          key={i}
          x1={i % 2 === 0 ? 70 : 50}
          y1={y}
          x2={i % 2 === 0 ? 130 : 150}
          y2={y}
          stroke={i % 3 === 0 ? "#a855c7" : i % 3 === 1 ? "#7c3aed" : "#e11d73"}
          strokeWidth="1.5"
          opacity="0.5"
        />
      ))}
      {/* Nucleótidos (puntos) */}
      {[75, 150, 225, 300, 375, 450, 525].map((y, i) => (
        <g key={`dots-${i}`}>
          <circle
            cx={i % 2 === 0 ? 70 : 50}
            cy={y}
            r="3"
            fill={i % 2 === 0 ? "#a855c7" : "#7c3aed"}
            opacity="0.7"
          />
          <circle
            cx={i % 2 === 0 ? 130 : 150}
            cy={y}
            r="3"
            fill={i % 2 === 0 ? "#e11d73" : "#a855c7"}
            opacity="0.7"
          />
        </g>
      ))}
      <defs>
        <linearGradient id="helix1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a855c7" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#e11d73" />
        </linearGradient>
        <linearGradient id="helix2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="50%" stopColor="#a855c7" />
          <stop offset="100%" stopColor="#c47ee0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
