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

export function HeroSection({ isReady = true }: { isReady?: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const content = useParallax(0.05);
  const floatWin1 = useParallax(-0.15);
  const floatWin2 = useParallax(-0.08);
  const circle = useParallax(0.1);
  const square = useParallax(0.05);

  const phrases = [
    "I'M LANG.",
    "CODE.",
    "CREATE.",
    "INNOVATE."
  ];
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isReady) return;

    const currentPhrase = phrases[phraseIndex];
    const typingSpeed = isDeleting ? 40 : 100;
    const delay = typedText === currentPhrase && !isDeleting
      ? 1500
      : typedText === "" && isDeleting
        ? 100
        : typingSpeed;

    const timer = setTimeout(() => {
      if (!isDeleting && typedText === currentPhrase) {
        setIsDeleting(true);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else {
        setTypedText(currentPhrase.substring(0, typedText.length + (isDeleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIndex, isReady]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { el.classList.add("animate-fade-in-up"); obs.disconnect(); }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const tools = [
    "VS CODE", "FIGMA", "GIT", "DOCKER", "POSTMAN", "MONGODB",
    "REACT", "NEXT.JS", "TAILWIND", "TYPESCRIPT", "NODE.JS", "PYTHON",
    "MYSQL"
  ];

  return (
    <div ref={sectionRef} className="w-full relative opacity-0">
      {/* Main Hero Card */}
      <section
        id="hero"
        className="w-full bg-window border border-[var(--border-subtle)] window-shadow p-8 md:p-16 flex flex-col justify-center min-h-[614px] relative overflow-hidden group hover:border-[var(--border-hover)] window-shadow-hover transition-all duration-300"
      >
        {/* Title bar */}
        <div className="absolute top-0 left-0 w-full h-8 bg-titlebar border-b border-[var(--border-subtle)] flex items-center px-4 gap-2 z-30">
          <div className="w-2 h-2 rounded-full bg-dot" />
          <div className="w-2 h-2 rounded-full bg-dot" />
          <div className="w-2 h-2 rounded-full bg-dot" />
          <span className="text-[0.75rem] font-bold uppercase tracking-widest text-body ml-2">
            LANG / index.html
          </span>
        </div>

        {/* Main content with parallax */}
        <div
          ref={content.ref}
          className="z-10 mt-8 max-w-4xl relative will-change-transform"
          style={{ transform: `translate3d(0, ${content.y}px, 0)` }}
        >
          <h1 className="font-[var(--font-manrope)] text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.1] tracking-[-0.04em] text-heading mb-3 uppercase relative">
            {/* Invisible placeholder to reserve height and prevent jumping when text wraps on mobile */}
            <span className="invisible select-none block" aria-hidden="true">
              INNOVATE.<span className="inline-block w-[0.4em] h-[0.9em] ml-2" />
            </span>
            <span className="absolute top-0 left-0 w-full h-full flex-wrap">
              {typedText}
              <span className="inline-block w-[0.4em] h-[0.8em] ml-2 bg-[var(--heading-color)] animate-pulse mb-[0.1em]" />
            </span>
          </h1>
          <p className="text-[1.125rem] font-light leading-[1.8] text-body max-w-2xl mb-6">
            Crafting modern web experiences through clean code and continuous learning. I build fast, functional applications that bring creative ideas to life.
          </p>

          <div className="flex items-center gap-2 sm:gap-4 bg-[var(--titlebar-bg)] border border-[var(--border-subtle)] p-2 sm:p-3 w-full sm:w-max window-shadow transition-all hover:border-[var(--border-hover)] mt-4">
            <div className="w-12 h-12 relative shrink-0 border border-[var(--border-subtle)] overflow-hidden flex items-center justify-center bg-[var(--window-bg)]">
              <Image
                src="https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg"
                alt="Blond - Frank Ocean"
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="flex flex-col pr-4">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-muted mb-1 flex items-center gap-1.5">
                Listening to
              </span>
              <span className="text-[0.875rem] font-bold text-heading leading-none mb-1">Godspeed</span>
              <span className="text-[0.75rem] text-body leading-none">Frank Ocean</span>
            </div>
            {/* Equalizer animation */}
            <div className="flex items-end gap-[2px] h-4 ml-2 pr-2">
              <div className="w-1 bg-body animate-[music-bar_0.8s_ease-in-out_infinite_alternate]" style={{ animationDelay: '0s' }} />
              <div className="w-1 bg-body animate-[music-bar_0.8s_ease-in-out_infinite_alternate]" style={{ animationDelay: '0.2s' }} />
              <div className="w-1 bg-body animate-[music-bar_0.8s_ease-in-out_infinite_alternate]" style={{ animationDelay: '0.4s' }} />
              <div className="w-1 bg-body animate-[music-bar_0.8s_ease-in-out_infinite_alternate]" style={{ animationDelay: '0.6s' }} />
            </div>
          </div>
        </div>

        {/* Seamless infinite marquee */}
        <div className="z-10 w-full overflow-hidden border-t border-b border-[var(--border-subtle)] py-4 mt-16 relative">
          <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-[var(--window-bg)] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-[var(--window-bg)] to-transparent z-20 pointer-events-none" />
          <div className="flex whitespace-nowrap animate-marquee w-max">
            {[0, 1].map((set) => (
              <div key={set} className="flex items-center shrink-0">
                {tools.map((tool, i) => (
                  <span
                    key={`${set}-${i}`}
                    className="text-sm font-bold uppercase tracking-[0.2em] text-body opacity-60 mx-8"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Decorative shapes with parallax */}
        <div
          ref={circle.ref}
          className="absolute bottom-[-10%] right-[-5%] w-1/2 aspect-square border border-[var(--border-subtle)] rounded-full z-0 pointer-events-none hidden md:block opacity-20 will-change-transform"
          style={{ transform: `translate3d(0, ${circle.y}px, 0)` }}
        />
        <div
          ref={square.ref}
          className="absolute bottom-[5%] right-[10%] w-1/4 aspect-square border border-[var(--border-subtle)] z-0 pointer-events-none hidden md:block opacity-20 will-change-transform"
          style={{ transform: `translate3d(0, ${square.y}px, 0)` }}
        />
      </section>

      {/* Floating decorative window 1 — sys_monitor (overlaps edge) */}
      <div
        ref={floatWin1.ref}
        className="hidden md:block absolute -right-8 top-16 w-64 bg-[var(--window-bg)]/60 backdrop-blur-xl border border-[var(--border-subtle)] hover:border-[var(--border-hover)] window-shadow p-4 z-20 opacity-80 hover:opacity-100 transition-all duration-300 will-change-transform"
        style={{ transform: `translate3d(0, ${floatWin1.y}px, 0)` }}
      >
        <div className="border-b border-[var(--border-subtle)] pb-2 mb-2 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-dot" />
          <span className="text-[8px] font-bold uppercase tracking-widest text-body">
            sys_monitor.exe
          </span>
        </div>
        <div className="space-y-2 mt-4">
          <div className="h-1 w-full bg-[var(--border-subtle)]" />
          <div className="h-1 w-3/4 bg-[var(--border-subtle)]" />
          <div className="h-1 w-5/6 bg-[var(--border-subtle)]" />
          <div className="h-1 w-1/2 bg-[var(--border-subtle)]" />
        </div>
      </div>

      {/* Floating decorative window 2 — logs (overlaps edge) */}
      <div
        ref={floatWin2.ref}
        className="hidden md:block absolute -left-6 bottom-12 w-48 bg-[var(--window-bg)]/60 backdrop-blur-xl border border-[var(--border-subtle)] hover:border-[var(--border-hover)] window-shadow p-4 z-20 opacity-70 hover:opacity-100 transition-all duration-300 will-change-transform"
        style={{ transform: `translate3d(0, ${floatWin2.y}px, 0)` }}
      >
        <div className="border-b border-[var(--border-subtle)] pb-2 mb-2 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-dot" />
          <span className="text-[8px] font-bold uppercase tracking-widest text-body">
            logs.txt
          </span>
        </div>
        <div className="text-[8px] font-mono text-body leading-relaxed">
          &gt; init process started<br />
          &gt; loading modules...<br />
          &gt; connection established<br />
          &gt; system ready_
        </div>
      </div>
    </div>
  );
}
