"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

function useParallax(speed: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);

  const onScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const wh = window.innerHeight;
    if (rect.bottom < -300 || rect.top > wh + 300) return;
    const center = rect.top + rect.height / 2;
    const delta = center - wh / 2;
    setY(delta * speed);
  }, [speed]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return { ref, y };
}

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const floatWin = useParallax(0.12);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { el.classList.add("animate-fade-in-right"); obs.disconnect(); }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="md:col-span-5 relative w-full h-full opacity-0">
      <section
        id="about-card"
        className="w-full h-full bg-window border border-[var(--border-subtle)] window-shadow p-8 relative flex flex-col group hover:border-[var(--border-hover)] window-shadow-hover transition-all duration-300"
      >
        <div className="absolute top-0 left-0 w-full h-8 bg-titlebar border-b border-[var(--border-subtle)] flex items-center px-4 gap-2">
          <div className="w-2 h-2 rounded-full bg-dot" />
          <span className="text-[0.75rem] font-bold uppercase tracking-widest text-body ml-2">about.txt</span>
        </div>

        <div className="mt-8 flex flex-col gap-6">
          <div className="w-24 h-24 bg-titlebar border border-[var(--border-subtle)] overflow-hidden shrink-0 relative">
            <Image
              src="/images/me.jpg"
              alt="Portrait of Lang"
              fill
              className="object-cover grayscale"
              sizes="96px"
            />
          </div>
          <div>
            <h2 className="font-[var(--font-manrope)] text-[1.75rem] font-extrabold uppercase tracking-[0.2em] text-heading mb-4">who am i</h2>
            <p className="text-[1rem] font-light leading-[1.8] text-body">
              Hello! I'm Gilang, though most people just call me Lang. I am a passionate application developer hailing from Riau, Sumatra, Indonesia. Born in 2010, I've always been driven by an insatiable curiosity for how things work in the digital world. This curiosity quickly evolved into a deep-seated passion for coding and software development. I thrive on the challenge of learning new technologies and transforming complex problems into clean, functional applications.
            </p>
          </div>
        </div>
      </section>

      {/* Floating decorative window */}
      <div
        ref={floatWin.ref}
        className="hidden md:block absolute -right-6 -bottom-10 w-48 bg-[var(--window-bg)]/60 backdrop-blur-xl border border-[var(--border-subtle)] hover:border-[var(--border-hover)] window-shadow z-20 opacity-70 hover:opacity-100 transition-all duration-300 will-change-transform p-3"
        style={{ transform: `translate3d(0, ${floatWin.y}px, 0)` }}
      >
        <div className="border-b border-[var(--border-subtle)] pb-2 mb-2 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-dot" />
          <span className="text-[8px] font-bold uppercase tracking-widest text-body">
            sys_status
          </span>
        </div>
        <div className="text-[8px] font-mono text-body mt-2">
          CPU: [||||||||  ] 80%<br />
          MEM: [||||      ] 40%<br />
          NET: ONLINE
        </div>
      </div>
    </div>
  );
}
