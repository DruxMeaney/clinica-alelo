"use client";

/**
 * Gráfico radar/spider para visualizar los 7 módulos del Índice Alelo.
 * SVG puro, sin dependencias externas.
 */

interface RadarDataPoint {
  label: string;
  shortLabel: string;
  value: number; // 0-100
}

interface RadarChartProps {
  data: RadarDataPoint[];
  size?: number;
  className?: string;
}

export default function RadarChart({ data, size = 320, className = "" }: RadarChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.38;
  const n = data.length;

  // Ángulo por vértice (empezando desde arriba, sentido horario)
  const angleFor = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;

  // Coordenada para un valor (0-100) en el eje i
  const pointAt = (i: number, value: number) => {
    const r = (value / 100) * radius;
    const angle = angleFor(i);
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  // Polígono de los datos
  const dataPoints = data.map((d, i) => pointAt(i, d.value));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  // Grillas concéntricas (25, 50, 75, 100)
  const gridLevels = [25, 50, 75, 100];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className}>
      {/* Fondo */}
      <circle cx={cx} cy={cy} r={radius + 20} fill="rgba(139, 92, 246, 0.03)" />

      {/* Grillas concéntricas */}
      {gridLevels.map((level) => {
        const points = Array.from({ length: n }, (_, i) => {
          const p = pointAt(i, level);
          return `${p.x},${p.y}`;
        }).join(" ");
        return (
          <polygon
            key={level}
            points={points}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Ejes radiales */}
      {data.map((_, i) => {
        const p = pointAt(i, 100);
        return (
          <line
            key={i}
            x1={cx} y1={cy} x2={p.x} y2={p.y}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Área de datos */}
      <path
        d={dataPath}
        fill="url(#radarGradient)"
        stroke="rgba(168, 85, 247, 0.8)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Gradiente */}
      <defs>
        <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(168, 85, 247, 0.3)" />
          <stop offset="100%" stopColor="rgba(236, 72, 153, 0.15)" />
        </radialGradient>
      </defs>

      {/* Puntos de datos */}
      {dataPoints.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="3.5" fill="#a855f7" stroke="#1a1a2e" strokeWidth="1.5" />
          <circle cx={p.x} cy={p.y} r="1.5" fill="white" />
        </g>
      ))}

      {/* Labels */}
      {data.map((d, i) => {
        const labelR = radius + 28;
        const angle = angleFor(i);
        const lx = cx + labelR * Math.cos(angle);
        const ly = cy + labelR * Math.sin(angle);

        // Alinear texto según posición
        let anchor: "start" | "middle" | "end" = "middle";
        if (Math.cos(angle) > 0.3) anchor = "start";
        if (Math.cos(angle) < -0.3) anchor = "end";

        const valueColor =
          d.value > 60 ? "#f87171" : d.value > 30 ? "#fbbf24" : "#34d399";

        return (
          <g key={i}>
            <text
              x={lx} y={ly - 6}
              textAnchor={anchor}
              fill="rgba(255,255,255,0.5)"
              fontSize="8"
              fontFamily="system-ui, sans-serif"
            >
              {d.shortLabel}
            </text>
            <text
              x={lx} y={ly + 6}
              textAnchor={anchor}
              fill={valueColor}
              fontSize="10"
              fontWeight="bold"
              fontFamily="monospace"
            >
              {d.value.toFixed(0)}
            </text>
          </g>
        );
      })}

      {/* Labels de nivel en el eje superior */}
      {gridLevels.map((level) => {
        const p = pointAt(0, level);
        return (
          <text
            key={level}
            x={p.x + 4} y={p.y + 3}
            fill="rgba(255,255,255,0.2)"
            fontSize="7"
            fontFamily="monospace"
          >
            {level}
          </text>
        );
      })}
    </svg>
  );
}
