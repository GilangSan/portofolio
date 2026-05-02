"use client";

import { useEffect, useRef } from "react";

export function DotGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const spacing = 24;
    
    // Create dots array
    let dots: { x: number; y: number; currentAlpha: number; targetAlpha: number }[] = [];
    
    const initDots = () => {
      dots = [];
      const cols = Math.floor(width / spacing) + 1;
      const rows = Math.floor(height / spacing) + 1;
      
      const isDark = document.documentElement.classList.contains("dark");
      const defaultAlpha = isDark ? 0.15 : 0.10;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            x: i * spacing,
            y: j * spacing,
            currentAlpha: defaultAlpha,
            targetAlpha: defaultAlpha,
          });
        }
      }
    };

    initDots();

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      const isDark = document.documentElement.classList.contains("dark");
      const rgb = isDark ? "255, 255, 255" : "0, 0, 0";
      const baseAlpha = isDark ? 0.15 : 0.10;
      const maxAlpha = isDark ? 0.8 : 0.9;

      // Randomly pick a few dots to light up
      if (Math.random() < 0.2) {
        const idx = Math.floor(Math.random() * dots.length);
        if (dots[idx]) {
          dots[idx].targetAlpha = maxAlpha;
        }
      }

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        
        // ease towards target alpha
        if (Math.abs(dot.currentAlpha - dot.targetAlpha) > 0.01) {
          dot.currentAlpha += (dot.targetAlpha - dot.currentAlpha) * 0.05;
        } else if (dot.targetAlpha === maxAlpha) {
          // Once it reaches max, tell it to fade back down
          dot.targetAlpha = baseAlpha;
        } else {
          dot.currentAlpha = baseAlpha;
        }

        ctx.fillStyle = `rgba(${rgb}, ${dot.currentAlpha})`;
        ctx.fillRect(dot.x, dot.y, 1.5, 1.5);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initDots();
    };

    window.addEventListener("resize", handleResize);
    
    // Also listen for theme changes if possible, or just check on draw loop
    const observer = new MutationObserver(() => {
      // Re-initialize dot base alphas when theme changes
      initDots();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[-1] pointer-events-none" />;
}
