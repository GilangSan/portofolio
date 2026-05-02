"use client";

import { useEffect, useState } from "react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing system...");
  const [isExiting, setIsExiting] = useState(false);
  const [terminalId, setTerminalId] = useState("");

  const logs = [
    "Fetching assets...",
    "Optimizing experience...",
    "Building interfaces...",
    "Loading creative modules...",
    "Ready."
  ];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2500; // 2.5 seconds

    setTerminalId(Math.random().toString(16).slice(2, 10).toUpperCase());

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(newProgress);

      const textIndex = Math.min(
        Math.floor((newProgress / 100) * logs.length),
        logs.length - 1
      );
      setLoadingText(logs[textIndex]);

      if (newProgress < 100) {
        requestRef = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 800);
        }, 500);
      }
    };

    let requestRef = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(requestRef);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-page transition-all duration-700 ease-in-out ${
        isExiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      <div className="w-[90%] max-w-[400px] flex flex-col gap-8 relative group">
        {/* Decorative elements */}
        <div className="absolute -inset-4 border border-[var(--border-subtle)] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity" />
        
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-muted leading-none">
              System Boot
            </span>
            <span className="text-[1.25rem] font-black tracking-widest text-heading leading-none">
              {Math.round(progress)}%
            </span>
          </div>
          
          {/* Progress Bar Container */}
          <div className="h-[2px] w-full bg-[var(--border-subtle)] relative overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-heading transition-all duration-100 ease-out shadow-[0_0_10px_rgba(var(--heading-color),0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-heading animate-pulse" />
            <span className="text-[0.75rem] font-medium tracking-wider text-body font-mono">
              {loadingText}
            </span>
          </div>
          <div className="pl-5 opacity-40">
             <span className="text-[0.6rem] font-mono text-muted uppercase">
               Terminal ID: 0x{terminalId || "00000000"}
             </span>
          </div>
        </div>

        {/* Interactive background text (subtle) */}
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-black text-heading opacity-[0.02] pointer-events-none select-none uppercase tracking-tighter">
           LANG
        </div>
      </div>
    </div>
  );
}
