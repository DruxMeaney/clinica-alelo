"use client";

/**
 * Red molecular animada con nodos y conexiones.
 * Decoración de fondo para secciones de ciencia y tecnología.
 */
export default function MolecularGrid({ className = "" }: { className?: string }) {
  const nodes = [
    { x: 15, y: 20, r: 3, delay: 0 },
    { x: 40, y: 10, r: 2.5, delay: 1 },
    { x: 65, y: 25, r: 4, delay: 2 },
    { x: 85, y: 15, r: 2, delay: 0.5 },
    { x: 25, y: 50, r: 3.5, delay: 1.5 },
    { x: 50, y: 45, r: 2, delay: 3 },
    { x: 75, y: 55, r: 3, delay: 0.8 },
    { x: 90, y: 40, r: 2.5, delay: 2.5 },
    { x: 10, y: 75, r: 2, delay: 1.2 },
    { x: 35, y: 80, r: 3, delay: 0.3 },
    { x: 60, y: 70, r: 2.5, delay: 2.2 },
    { x: 80, y: 85, r: 3.5, delay: 1.8 },
    { x: 50, y: 90, r: 2, delay: 0.7 },
  ];

  const connections = [
    [0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 6], [3, 7],
    [4, 5], [5, 6], [6, 7], [4, 8], [5, 9], [6, 10], [7, 11],
    [8, 9], [9, 10], [10, 11], [9, 12], [10, 12],
  ];

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={`opacity-[0.08] ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Conexiones */}
      {connections.map(([a, b], i) => (
        <line
          key={`line-${i}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="#a855c7"
          strokeWidth="0.3"
          opacity="0.6"
        />
      ))}
      {/* Nodos */}
      {nodes.map((node, i) => (
        <circle
          key={`node-${i}`}
          cx={node.x}
          cy={node.y}
          r={node.r}
          fill={i % 3 === 0 ? "#a855c7" : i % 3 === 1 ? "#7c3aed" : "#e11d73"}
          opacity="0.5"
          className="animate-particle"
          style={{ animationDelay: `${node.delay}s` }}
        />
      ))}
    </svg>
  );
}
