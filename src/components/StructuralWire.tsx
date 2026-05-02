"use client";

export function StructuralWire() {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-[-1] opacity-60">
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <path
          d="M 5 0 L 5 20 L 95 20 L 95 45 L 5 45 L 5 70 L 95 70 L 95 95 L 50 95 L 50 100"
          vectorEffect="non-scaling-stroke"
          stroke="var(--border-subtle)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M 5 0 L 5 20 L 95 20 L 95 45 L 5 45 L 5 70 L 95 70 L 95 95 L 50 95 L 50 100"
          vectorEffect="non-scaling-stroke"
          stroke="var(--body-color)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          pathLength="100"
          className="animate-[snake-run_8s_linear_infinite]"
          style={{
            strokeDasharray: "10 100",
            filter: "drop-shadow(0 0 4px var(--body-color))"
          }}
        />
      </svg>
    </div>
  );
}
