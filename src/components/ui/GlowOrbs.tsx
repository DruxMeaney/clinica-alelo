"use client";

/**
 * Orbes de luz difusa para fondos de secciones.
 * Da sensación de profundidad y tecnología avanzada.
 */
export default function GlowOrbs({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div
        className="absolute w-[500px] h-[500px] rounded-full animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, rgba(168,85,199,0.25) 0%, transparent 70%)",
          top: "-10%",
          right: "-10%",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
          bottom: "-5%",
          left: "-5%",
          animationDelay: "2s",
        }}
      />
      <div
        className="absolute w-[300px] h-[300px] rounded-full animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, rgba(225,29,115,0.12) 0%, transparent 70%)",
          top: "40%",
          left: "30%",
          animationDelay: "4s",
        }}
      />
    </div>
  );
}
