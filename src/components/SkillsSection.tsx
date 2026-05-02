"use client";

import { useEffect, useRef } from "react";

const frontend = ["HTML/CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind", "Alpine.js"];
const backend = ["Node.js", "Python", "PHP", "Laravel", "C#", "PostgreSQL", "MySQL"];
const systems = [
  { name: "Microservices", pct: 90 },
  { name: "API Design", pct: 95 },
  { name: "CI/CD", pct: 85 },
];
const toolsMisc = ["Docker", "Git", "Github", "Figma", "Lua", "Vercel"];

export function SkillsSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("animate-fade-in-left"); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="skills"
      className="md:col-span-7 h-full bg-window border border-[var(--border-subtle)] window-shadow p-8 relative flex flex-col group hover:border-[var(--border-hover)] window-shadow-hover transition-all duration-300 opacity-0"
    >
      <div className="absolute top-0 left-0 w-full h-8 bg-titlebar border-b border-[var(--border-subtle)] flex items-center px-4 gap-2">
        <div className="w-2 h-2 rounded-full bg-dot" />
        <span className="text-[0.75rem] font-bold uppercase tracking-widest text-body ml-2">skills.json</span>
      </div>

      <div className="mt-8 flex-grow">
        <h2 className="font-[var(--font-manrope)] text-[1.75rem] font-extrabold uppercase tracking-[0.2em] text-heading mb-6">
          TECH STACK &amp; EXPLORATIONS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkillBox title="Frontend" icon="code" tags={frontend} />
          <SkillBox title="Backend" icon="database" tags={backend} />
          <div className="bg-page border border-[var(--border-subtle)] p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] pb-2 mb-2">
              <span className="material-symbols-outlined text-[1rem] text-heading">hub</span>
              <span className="text-[0.75rem] font-bold uppercase tracking-widest text-heading">Systems</span>
            </div>
            <div className="space-y-3">
              {systems.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between mb-1">
                    <Tag>{s.name}</Tag>
                    <Tag>{s.pct}%</Tag>
                  </div>
                  <div className="w-full h-0.5 bg-skill-bar">
                    <div className="h-0.5 bg-heading animate-fill-bar" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <SkillBox title="Tools & Misc" icon="construction" tags={toolsMisc} />
        </div>
      </div>
    </section>
  );
}

function SkillBox({ title, icon, tags }: { title: string; icon: string; tags: string[] }) {
  return (
    <div className="bg-page border border-[var(--border-subtle)] p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] pb-2 mb-2">
        <span className="material-symbols-outlined text-[1rem] text-heading">{icon}</span>
        <span className="text-[0.75rem] font-bold uppercase tracking-widest text-heading">{title}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => <Tag key={t}>{t}</Tag>)}
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-1 border border-[var(--tag-border)] text-tag text-[10px] font-bold tracking-widest uppercase bg-tag-bg">
      {children}
    </span>
  );
}
