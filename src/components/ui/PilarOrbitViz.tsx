"use client";
import { useState, useEffect, useRef } from "react";

export interface OrbitGene {
  name: string;
  desc: string;
}

interface Props {
  genes: OrbitGene[];
  color: string;
  size?: number;
}

const SPEEDS   = [0.009, 0.007, 0.006, 0.008];
const RADII    = [36, 43, 40, 38];
const INIT_OFF = [0, Math.PI * 0.6, Math.PI * 1.2, Math.PI * 1.8];

export default function PilarOrbitViz({ genes, color, size = 120 }: Props) {
  const [angles, setAngles] = useState<number[]>(
    genes.map((_, i) => INIT_OFF[i % INIT_OFF.length])
  );
  const [hovered, setHovered] = useState<number | null>(null);
  const rafRef = useRef<number>(0);
  const cx = size / 2, cy = size / 2;

  useEffect(() => {
    if (hovered !== null) {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    const step = () => {
      setAngles((prev) =>
        prev.map((a, i) => a + SPEEDS[i % SPEEDS.length])
      );
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [hovered]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ overflow: "visible" }}
      >
        {/* Orbit rings */}
        {genes.map((_, i) => (
          <circle
            key={i}
            cx={cx} cy={cy}
            r={RADII[i % RADII.length]}
            fill="none"
            stroke={color}
            strokeWidth="0.6"
            opacity="0.18"
            strokeDasharray="2 5"
          />
        ))}

        {/* Central glow */}
        <circle cx={cx} cy={cy} r={12} fill={color} opacity="0.1" />
        <circle cx={cx} cy={cy} r={6}  fill={color} opacity="0.85" />

        {/* Orbiting gene dots + labels */}
        {genes.map((gene, i) => {
          const r = RADII[i % RADII.length];
          const x = cx + Math.cos(angles[i]) * r;
          const y = cy + Math.sin(angles[i]) * r;
          const isHov = hovered === i;

          // Decide label position: above or below the dot
          const labelOffY = y < cy ? -8 : 10;

          return (
            <g
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={x} cy={y}
                r={isHov ? 5.5 : 3.5}
                fill={color}
                opacity={isHov ? 1 : 0.75}
                style={{ transition: "r 0.15s ease, opacity 0.15s ease" }}
              />
              <text
                x={x} y={y + labelOffY}
                textAnchor="middle"
                fontSize={isHov ? 8.5 : 7}
                fontWeight={isHov ? "700" : "500"}
                fill={color}
                opacity={isHov ? 1 : 0.8}
              >
                {gene.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hovered !== null && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 pointer-events-none w-44">
          <div
            className="rounded-xl px-3 py-2 text-xs shadow-xl"
            style={{ background: "#0a0818", border: `1px solid ${color}40` }}
          >
            <div className="font-bold mb-0.5" style={{ color }}>
              {genes[hovered].name}
            </div>
            <div className="text-gray-300 leading-relaxed">
              {genes[hovered].desc}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
