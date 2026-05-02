"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

const projects = [
  {
    id: "aiyrics",
    num: "01",
    category: "Tools",
    filenameRender: "aiyrics.exe / render",
    filenameInfo: "aiyrics.exe / info",
    title: "AIyrics",
    desc: "Aiyrics is an AI-powered application designed to generate, fetch, and analyze song lyrics effortlessly. Built to explore the intersection of artificial intelligence and music, this project provides a smart and intuitive way to interact with lyrics.",
    image: "/images/projects/first.png",
    codeUrl: "https://github.com/GilangSan/aiyrics",
    liveUrl: "https://aiyrics.isntlang.my.id/",
    reversed: false,
    imgSpeed: 0.05,
    infoSpeed: -0.08,
  },
  {
    id: "imagedit",
    num: "02",
    category: "Tools",
    filenameRender: "imagedit.exe / render",
    filenameInfo: "imagedit.exe / info",
    title: "Imagedit",
    desc: "Imagedit is a free, React JS-based web application that provides a variety of instant image editing tools. Designed for speed and accessibility, it allows users to modify their images quickly and effortlessly directly from their browser.",
    image: "/images/projects/second.png",
    codeUrl: "https://github.com/GilangSan/imagedit",
    liveUrl: "https://imagedit-nine.vercel.app/",
    reversed: true,
    imgSpeed: 0.06,
    infoSpeed: -0.07,
  },
  {
    id: "kulinerku",
    num: "03",
    category: "Food",
    filenameRender: "kulinerku.exe / render",
    filenameInfo: "kulinerku.exe / info",
    title: "Kulinerku",
    desc: "A web application demo built with Next.js, designed specifically for local culinary MSMEs (Micro, Small, and Medium Enterprises). Created as an academic project, it aims to help local food businesses establish a modern and fast online presence.",
    image: "/images/projects/third.png",
    codeUrl: "https://github.com/GilangSan/kulinerku",
    liveUrl: "https://kulinerku.isntlang.my.id/",
    reversed: false,
    imgSpeed: 0.04,
    infoSpeed: -0.06,
  }
];

/* ── useParallax hook ───────────────────────────────────────── */
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

/* ── Single project row ─────────────────────────────────────── */
function ProjectRow({
  num, category, filenameRender, filenameInfo, title, desc, image, codeUrl, liveUrl,
  reversed, imgSpeed, infoSpeed,
}: (typeof projects)[number]) {
  const img = useParallax(imgSpeed);
  const info = useParallax(infoSpeed);
  const rowRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add(reversed ? "animate-fade-in-left" : "animate-fade-in-right");
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reversed]);

  const titleLines = title.split("\n");

  return (
    <article
      ref={rowRef}
      className={`relative w-full flex flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"
        } items-center group opacity-0`}
    >
      {/* Hover backdrop */}
      <div className="absolute inset-0 bg-window border border-[var(--border-subtle)] window-shadow opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -m-8 md:-m-12 hidden md:block" />

      {/* Image panel */}
      <div
        ref={img.ref}
        className={`w-full md:w-3/5 relative z-10 overflow-hidden border border-[var(--border-subtle)] group-hover:border-[var(--border-hover)] window-shadow transition-all duration-700 will-change-transform ${reversed
          ? "md:group-hover:translate-y-6 md:group-hover:-rotate-1"
          : "md:group-hover:-translate-y-6 md:group-hover:rotate-1"
          }`}
        style={{ transform: `translate3d(0, ${img.y}px, 0)` }}
      >
        {/* Title bar */}
        <div className="absolute top-0 left-0 w-full h-6 bg-titlebar border-b border-[var(--border-subtle)] flex items-center px-2 gap-1 z-20">
          <div className="w-1.5 h-1.5 rounded-full bg-dot" />
          <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-body ml-1">
            {filenameRender}
          </span>
        </div>
        <div className="aspect-[16/10] bg-titlebar relative pt-6 overflow-hidden">
          <Image
            src={image}
            alt={titleLines.join(" ")}
            fill
            className="object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </div>
      </div>

      {/* Info panel (overlapping) */}
      <div
        ref={info.ref}
        className={`w-[95%] sm:w-full md:w-1/2 relative z-20 mx-auto ${reversed ? "md:-mr-24 md:mx-0" : "md:-ml-24 md:mx-0"
          } -mt-12 md:mt-0 bg-[var(--window-bg)]/60 backdrop-blur-xl border border-[var(--border-subtle)] group-hover:border-[var(--border-hover)] window-shadow p-6 sm:p-8 md:p-12 transition-all duration-700 will-change-transform ${reversed
            ? "md:group-hover:-translate-y-6 md:group-hover:rotate-1"
            : "md:group-hover:translate-y-6 md:group-hover:-rotate-1"
          }`}
        style={{ transform: `translate3d(0, ${info.y}px, 0)` }}
      >
        {/* Title bar */}
        <div className="absolute top-0 left-0 w-full h-6 bg-titlebar border-b border-[var(--border-subtle)] flex items-center px-2 gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-dot" />
          <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-body ml-1">
            {filenameInfo}
          </span>
        </div>
        <div className="mt-6">
          <span className="text-body text-xs tracking-[0.3em] uppercase block mb-4 border-b border-[var(--border-subtle)] pb-2">
            {num} // {category}
          </span>
          <h3 className="font-[var(--font-manrope)] text-[clamp(1.5rem,5vw,3rem)] text-heading mb-6 uppercase tracking-widest font-extrabold leading-tight">
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h3>
          <p className="text-body font-light leading-relaxed mb-10">{desc}</p>
          <div className="flex gap-4">
            <a
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-[var(--border-strong)] text-heading text-[10px] py-4 px-6 flex items-center justify-center gap-2 uppercase tracking-widest font-bold hover:bg-accent hover:text-accent-text transition-colors duration-200"
            >
              <span className="material-symbols-outlined text-[14px]">code</span>
              GitHub
            </a>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-[var(--border-strong)] text-heading text-[10px] py-4 px-6 flex items-center justify-center gap-2 uppercase tracking-widest font-bold hover:bg-accent hover:text-accent-text transition-colors duration-200"
            >
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ── Work section ───────────────────────────────────────────── */
export function WorkSection() {
  const ref = useRef<HTMLDivElement>(null);
  const heading = useParallax(0.04);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("animate-fade-in-up");
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div id="work" className="w-full">
      <div ref={ref} className="opacity-0">
        <div ref={heading.ref} style={{ transform: `translate3d(0, ${heading.y}px, 0)` }}>
          <h2 className="font-[var(--font-manrope)] text-[clamp(1.75rem,5vw,3rem)] font-extrabold text-heading mb-16 border-b border-[var(--border-subtle)] pb-4 uppercase tracking-[0.2em]">
            SELECTED WORKS
          </h2>
        </div>
      </div>
      <div className="flex flex-col gap-32">
        {projects.map((p) => (
          <ProjectRow key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}
